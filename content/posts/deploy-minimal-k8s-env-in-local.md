---
title: '在本地部署 k8s 最小環境'
date: 2023-08-06T21:16:19+08:00
draft: false
author: 'whchi'
tags: ['k8s']
summary: ''
preview_figure: ''
preview_figcaption: ''
---

紀錄一下如何在本機建立一個最小的 k8s 環境 with ssl 以便於開發測試。

環境為 ingress + nginx service + app service

## 前置作業
1. 安裝 minikube
2. 啟用 ingress addon: `minikube addons enable ingress`


## k8s config
### tls-secret.yml
```yml
apiVersion: v1
kind: Secret
metadata:
  name: my-tls-secret
  namespace: default
data:
  tls.crt: <base64 encoded cert>
  tls.key: <base64 encoded key>
type: kubernetes.io/tls
```
或是直接用 cmd 建立
```sh
kcc secret generic my-tls-secret \
--from-file=tls.crt=/path/to/cert \
--from-file=tls.key=/path/to/cery-key
```
### ingress.yml
```yml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: local-ingress
  annotations:
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
spec:
  tls:
  - hosts:
    - my.local.example
    secretName: my-tls-secret
  rules:
  - host: "my.local.example"
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: nginx-service
            port:
              number: 80

```
### nginx-service.yml
```yml
apiVersion: v1
kind: ConfigMap
metadata:
  name: nginx-config
data:
  nginx.conf: |
    user nginx;
    worker_processes  3;
    error_log  /var/log/nginx/error.log;
    events {
      worker_connections  10240;
    }
    http {
      log_format main
              'remote_addr:$remote_addr\t'
              'time_local:$time_local\t'
              'method:$request_method\t'
              'uri:$request_uri\t'
              'host:$host\t'
              'status:$status\t'
              'bytes_sent:$body_bytes_sent\t'
              'referer:$http_referer\t'
              'useragent:$http_user_agent\t'
              'forwardedfor:$http_x_forwarded_for\t'
              'request_time:$request_time';
      access_log	/var/log/nginx/access.log main;
      include /etc/nginx/virtualhost/virtualhost.conf;
    }
  virtualhost.conf: |
    upstream nextjs {
      server app-service;
    }
    server {
      listen 80;
      server_name my.local.example;

      server_tokens off;

      gzip on;
      gzip_proxied any;
      gzip_comp_level 4;
      gzip_types text/css application/javascript image/svg+xml;

      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;

      location / {
        proxy_pass http://nextjs$request_uri;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
      }
    }

---
# nginx-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          volumeMounts:
            - name: nginx-conf
              mountPath: /etc/nginx
          image: nginx:1.25
          ports:
            - containerPort: 443
      volumes:
        - name: nginx-conf
          configMap:
            name: nginx-config
            items:
              - key: nginx.conf
                path: nginx.conf
              - key: virtualhost.conf
                path: virtualhost/virtualhost.conf
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  type: NodePort
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80

```
### app-service.yml
```yml
# app-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: YOUR_IMAGE_NAME
        imagePullPolicy: Never
        ports:
        - containerPort: 3000

---
apiVersion: v1
kind: Service
metadata:
  name: app-service
spec:
  type: ClusterIP
  selector:
    app: my-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
```
## 啟用
1. 依序 apply：ingress -> app-deployment -> nginx-deployment
2. 啟用 `minikube tunnel` 讓本地可以連到你的 ingress
3. 完成
