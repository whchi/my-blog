---
title: '部署laravel應用程式到GKE上'
date: 2019-07-11T15:27:23+08:00
draft: false
author: 'whchi'
tags: ['devops', 'gke', 'laravel']
summary: '這是一篇 quick guide about 建立三層<del>肉</del>式架構'
---
<font color="red">內文僅記錄主要概念</font>

最近有機會接觸到 GKE 相關的東西, 趁記憶猶新趕緊紀錄一下, 流程大概為
1. 開啟 [GKE instance](https://cloud.google.com/kubernetes-engine/?hl=zh-tw)
2. 建立 & push laravel app docker image to [GCR](https://cloud.google.com/container-registry/)
3. 撰寫 yaml 檔並把程式部署到 GKE 上
> [GKE](https://cloud.google.com/kubernetes-engine/): 由 google 推出的 k8s engine 代管服務, 其他還有 AWS 的 EKS, M$ 的 AKS
## 名詞解釋
在 k8s 中有多種類型的 [resource objects](https://kubernetes.io/docs/reference/kubectl/overview/#resource-types), 下面簡單介紹本文所需知道的類型
|資源名稱|簡單說明|
|:--|:--|
|pod|組成的最小單位, 可由單一或是多個 container 組成, 撰寫 yaml 時建議直接用 deployment|
|node|實際提供 pods 環境的機器(虛擬 or 實體)|
|deployment|pods instance template|
|service|定義了如何連到 pods 的方式(protocol, port, kind)|
|ingress|think as L7 LBS(F5)|
|configmap|可在runtime時再把設定檔綁到特定的 pods 上, 讓設定更加彈性|
|persistentvolume|short for pv, think as external HD|
|persistentvolumeclaims|short for pvc, 存取pv的抽象層, 建好的 pv 需要透過 pvc 才能被掛載, 類似用 deploy 去掛 pod 的感覺|
|service.NodePort|讓叢集對外的最原始方式, 直接在 node 上開個 port|
|service.ClusterIP|預設的service type, 叢集中提供一個 cluster-internal ip讓叢集內/間的 pods 可以直接存取|
|service.LoadBalancer|一般對外的方式, 有需要的請參考[官方說明](https://kubernetes.io/docs/concepts/services-networking/service/#loadbalancer)|
|Ingress|不是 service type, 但能夠做到巷一台 L7 的服務掛給你對外|

## 架構圖
![](/images/k8s-infa-sample.png)

### 建立 laravel app image & push to GCR
[安裝完laravel](https://laravel.com/docs/5.8/installation)之後寫個 Dockerfile build image, 參考如下

* Dockerfile.php
{{< highlight docker >}}
FROM php:7.3.3

RUN apt-get update -y && apt-get install -y openssl zip unzip git
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN docker-php-ext-install pdo mbstring json sockets

WORKDIR /app
COPY MyProject /app
RUN composer install
RUN chown -R www-data:www-data /app/

USER www-data
CMD php artisan serve --host=0.0.0.0 --port=8000 #實務上不會這樣做, 本文只是為了可以建立環境所以這樣做
EXPOSE 8000
{{< / highlight >}}

* build & push image

```sh
docker build -t phpapp:1.0.0 -f Dockerfile.php .
# then
docker push gcr.io/{your-gcp-project-name}/phpapp:1.0.0
# 這裡以 gcr 為例, 推到 dockerhub 也可以, 總之要有一個本地連的到的地方
```

### yaml
這裡直接把 deploy 跟 service 寫在一起
#### nginx-k8s.yml
{{< highlight yml>}}
apiVersion: v1
data:
  nginx.conf: |
    user nginx;
    error_log  stderr warn;
    events {}
    http {
      server {
        listen 80;

        location / {
          proxy_pass http://phpapp-local:7777;
        }
      }
    }
kind: ConfigMap
metadata:
  name: nginx-config-local # configmap's name
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: nginx-local
spec:
  replicas: 1 # 建立幾個 pods
  template:
    metadata:
      labels:
        app: nginx # 建議需要設定 labels, 讓 service 可以透過 selector 選取
    spec:
      containers:
      - name: nginx
        image: nginx
        ports:
          - containerPort: 80
        resources: # 不設定也可, 但就不知道 k8s 會怎麼分配
          limits: # upper bound
            memory: 50Mi
          requests: # lower bound
            cpu: 10m # 1000m = 1CPU
        volumeMounts: # 要 mount 的資源資訊
        - name: config-volume
          mountPath: /etc/nginx # 掛載到此 pod 上的路徑
      volumes:
      - name: config-volume # 被 mount 的資源 key 與其設定
        configMap:
          name: nginx-config-local # 對應上面的 configmap's name
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-local
spec:
  ports:
  - port: 80 # service's port
    targetPort: 80 # pod's port
  selector:
    app: nginx # 這裡用 select 對應到實際的 deployment
  type: NodePort # 要注意的是, Ingress 目前只支援 NodePort, 如果不用 Ingress 的話可使用 ClusterIP
{{</ highlight >}}

#### php-k8s.yml
{{< highlight yml>}}
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: phpapp-local
spec: # pods instance
  strategy:
    type: RollingUpdate
  replicas: 1
  template:
    metadata:
      labels:
        app: phpapp
    spec:
      terminationGracePeriodSeconds: 10
      containers:
      - name: php
        image: gcr.io/{your-project-name}/phpapp:latest
        imagePullPolicy: IfNotPresent
        resources:
          limits:
            memory: 100Mi
          requests:
            cpu: 50m
        ports:
        - containerPort: 8000
---
apiVersion: v1
kind: Service
metadata:
  name: phpapp-local
spec:
  ports:
  - port: 7777 # cluster 的 port
    targetPort: 8000
  selector:
    app: phpapp
  type: ClusterIP

{{< / highlight >}}
### ingress.yml
{{< highlight yml >}}
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: ingress
  annotations:
    kubernetes.io/ingress.global-static-ip-name: external-ip-name # 預留外部靜態ip的名稱
spec:
  backend:
    serviceName: nginx-local #必須為 NodePort, 名稱為 nginx-k8s.yml 的 metadata
    servicePort: 80
{{< / highlight >}}
### mysql
## References
* [k8s overview](https://kubernetes.io/docs/tutorials/kubernetes-basics/explore/explore-intro/)
* [k8s pods concept](https://kubernetes.io/docs/concepts/workloads/pods/pod/)
* [介紹 k8s 的中文部落格](https://godleon.github.io/)
* [k8s resource types](https://kubernetes.io/docs/reference/kubectl/overview/#resource-types)
* [k8s service 概念詳解](https://tachingchen.com/tw/blog/kubernetes-service/)
* [k8s label and selector](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/)
* [(github issue) Ingress Controller for ClusterIP service type](https://github.com/Kong/kubernetes-ingress-controller/issues/85)
* [Ingress, ClusterIP and NodePort compression](https://medium.com/google-cloud/kubernetes-nodeport-vs-loadbalancer-vs-ingress-when-should-i-use-what-922f010849e0)
