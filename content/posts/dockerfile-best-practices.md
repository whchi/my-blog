---
title: '[翻譯]Best practices for writing Dockerfiles'
date: 2021-06-07T17:12:05+08:00
draft: false
author: 'whchi'
tags: ['dockerfile', 'translate']
summary: '很難翻出原始意義的就不翻'
preview_figure: '/images/preview/docker-logo.webp'
preview_figcaption: '原文位置 https://docs.docker.com/develop/develop-images/dockerfile_best-practices/'
preview_image: '/images/preview/docker-logo.webp'
---
本文範圍涵蓋建立有效率的 images 的最佳實踐方法

docker 透過讀取 Dockerfile 建立 image．其有自訂的規範與指示, 可參考 [Dockerfile reference](https://docs.docker.com/engine/reference/builder/) 找到更多解釋

一個 Docker image 由 多個指令所建構出的 read-only layer 所組成．這些 layer 彼此堆疊，且各 layer 為前一層的 delta of changes．圖為一範例 Dockerfile

```docker
FROM ubuntu:18.04
COPY . /app
RUN make /app
CMD python /app/app.py
```

每個指令都建立了一個 layer：

- `FROM` creates a layer from the `ubuntu:18.04` Docker image.
- `COPY` adds files from your Docker client’s current directory.
- `RUN` builds your application with `make`.
- `CMD` specifies what command to run within the container.

當你 run 一個 container，等同於是在底層的 layer 之上增加了新的 "writable layer(container layer)", 所有對 container 的操作，例如檔案異動、新增檔案等都會被寫入這個 layer

更多關於  image layer 以及 docker 是如何建置與儲存 image 的資訊可參考 [storage driver](https://docs.docker.com/storage/storagedriver/)

# 一般性指導原則與建議

## 建立 ephemeral container

在 Dockerfile 的定義所建立的 container 應盡量 "ephemeral" —可以很容易的被停止、刪除並重建以使用最小設定取代，原因參考 *The Twelve-factor App* methodology 的 [process](https://12factor.net/processes)

## 理解 build context

當觸發 `docker build` 時當下的工作目錄就是所謂的 build context．在預設的情況下會假設當前目錄存在一份 Dockerfile，但也可以透過`-f` 指令決定要 build 的 Dockefile．不管 Dockerfile 在哪裏，所有在工作目錄底下的檔案與目錄都會作為 build context 送到 docker daemon 裡面，參考範例如下

```bash
# Build context example

Create a directory for the build context and cd into it. Write “hello” into a text file named hello and create a Dockerfile that runs cat on it. Build the image from within the build context (.):

mkdir myproject && cd myproject
echo "hello" > hello
echo -e "FROM busybox\nCOPY /hello /\nRUN cat /hello" > Dockerfile
docker build -t helloapp:v1 .
# Move Dockerfile and hello into separate directories and build a second version of
# the image (without relying on cache from the last build).
# Use -f to point to the Dockerfile and specify the directory of the build context:

mkdir -p dockerfiles context
mv Dockerfile dockerfiles && mv hello context
docker build --no-cache -t helloapp:v2 -f dockerfiles/Dockerfile context
```

沒有需要進入 build context 的 file 就不要放在 context 中，避免花費額外資源建立 image 寫進去．在建立context的過程會看到如下圖的資訊

```bash
Sending build context to Docker daemon  187.8MB
```

## Pipe Dockerfile through stdin

善用`stdin` 建立一次性的 docker build

```bash
# The examples in this section use here documents for convenience,
# but any method to provide the Dockerfile on stdin can be used.

# For example, the following commands are equivalent:

echo -e 'FROM busybox\nRUN echo "hello world"' | docker build -
# or
docker build -<<EOF
FROM busybox
RUN echo "hello world"
EOF
```

### 使用 stdin 實現不發送 build context 的 dockerfile 建立

使用下面的語法把 Dockerfile 發送到 stdin 中建立 image 並不發送 build context

```bash
# The hyphen (-) takes the position of the PATH,
# and instructs Docker to read the build context (which only contains a Dockerfile) from stdin instead of a directory
docker build [OPTIONS] -
```

下面的語法展示了如何傳入一個 Dockerfile 到 stdin 中

```bash
docker build -t myimage:latest -<<EOF
FROM busybox
RUN echo "hello world"
EOF
```

忽略 build context  在當你不需要任何檔案複製到 image 時特別有用，可以用更快的速度建立 image

另一個方法是使用 `.dockerignore` 來縮減 build context，語法同 `.gitignore`，更多相關內容參考 [exclude with .dockerignore](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#exclude-with-dockerignore)

上述內容參考範例

```bash
# Note: Attempting to build a Dockerfile that uses COPY or ADD will fail if this syntax is used.
# The following example illustrates this:

# create a directory to work in
mkdir example
cd example

# create an example file
touch somefile.txt

docker build -t myimage:latest -<<EOF
FROM busybox
COPY somefile.txt .
RUN cat /somefile.txt
EOF

# observe that the build fails
...
Step 2/3 : COPY somefile.txt .
COPY failed: stat /var/lib/docker/tmp/docker-builder249218248/somefile.txt: no such file or directory
```

### 使用 stdin 在本地建立 local build context

使用下面的語法把 Dockerfile 發送到 stdin 中建立 image 並發送 build context

```bash
# using a hyphen (-) as filename to instruct Docker to read the Dockerfile from stdin
docker build [OPTIONS] -f- PATH
```

下面的範例把 `.` 當作 build context 發送

```bash
# create a directory to work in
mkdir example
cd example

# create an example file
touch somefile.txt

# build an image using the current directory as context, and a Dockerfile passed through stdin
docker build -t myimage:latest -f- . <<EOF
FROM busybox
COPY somefile.txt .
RUN cat /somefile.txt
EOF
```

### BUILD FROM A REMOTE BUILD CONTEXT, USING A DOCKERFILE FROM STDIN

使用以下的語法接收遠端的 build context 以建立 image

```bash
docker build [OPTIONS] -f- PATH
```

同上面的語法，不過把 path 的部分換成遠端的 build context即可

```bash
docker build -t myimage:latest -f- https://github.com/docker-library/hello-world.git <<EOF
FROM busybox
COPY hello.c .
EOF
```

這個方法在想要 build 的 image 沒有 Dockerfile 或是不想要 clone repo 下來管理時特別好用

> 注意事項
當使用遠端的 repo 作為 build context 的時候，docker 會進行 git clone並把repo的東西發送給 docker daemon，因此本機需要有裝 git

## Exclude with .dockerignore

用法同 `.gitignore` 更多說明參考 [.dockerignore  file](https://docs.docker.com/engine/reference/builder/#dockerignore-file)

## 進行多階段 builds

多階段建置讓你能夠再不用糾結於縮減層數的情況下大幅地減少最終 image 的大小

因為 image 在建立最終階段的過程中已經被 build 過了，可以使用 [leveraging build cache](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#leverage-build-cache) 的技巧減少 layers

舉例來說，你可以調整順序讓改變頻率較低的 layer 拉到改變頻率較高的 layer 中以確保 build cache 可以被重複使用，參考以下順序

- Install tools you need to build your application
- Install or update library dependencies
- Generate your application

以下舉個 go 的例子

```docker
FROM golang:1.11-alpine AS build

# Install tools required for project
# Run `docker build --no-cache .` to update dependencies
RUN apk add --no-cache git
RUN go get github.com/golang/dep/cmd/dep

# List project dependencies with Gopkg.toml and Gopkg.lock
# These layers are only re-built when Gopkg files are updated
COPY Gopkg.lock Gopkg.toml /go/src/project/
WORKDIR /go/src/project/
# Install library dependencies
RUN dep ensure -vendor-only

# Copy the entire project and build it
# This layer is rebuilt when a file changes in the project directory
COPY . /go/src/project/
RUN go build -o /bin/project

# This results in a single layer image
FROM scratch
COPY --from=build /bin/project /bin/project
ENTRYPOINT ["/bin/project"]
CMD ["--help"]
```

## 不要安裝不必要的 package

## 解耦應用程式

每個 container 應該只考慮一件事，這樣才能保持 container 的可規模化與重用性

另外，限制每個 container 只能使用一個 process 雖然是個好的經驗法則 ，但不是個硬性規定，比如說 apache 預設 worker  本身會對每個 request 開啟一個 process

盡量在不同的情況下保留 container 的簡單與模組性，如果彼此有相依性則可使用 [networks](https://docs.docker.com/network/) 的設定確保彼此可以溝通

## 最小化 layers 數量

在早期的 docker 版本中，最小化 layers 的數量是很重要的，為此 docker 有進行過一系列優化如下

- 只有 `RUN`、 `COPY`、 `ADD`會建立  layers，其餘的建立暫存的中介 image，這些 image 不會增加 build 的大小
- 在可能的時候使用 [multi-stage builds](https://docs.docker.com/develop/develop-images/multistage-build/)，並指把必要的東西放到最終的 image  中．這樣可以讓你在不增加  image 大小的情況下取得更多 debug 的資訊

## Sort multi-line arguments

在可能的時候把改變的順序依照字母進行排序，這樣可以讓後續使用者更好維護，參考如下

```docker
RUN apt-get update && apt-get install -y \
  bzr \
  cvs \
  git \
  mercurial \
  subversion
```

## Leverage build cache

docker 在 build image 的時候是依照 Dockerfile 的指令順序執行．當每個指令被執行的時候 docker 會去尋找是否有被 cache 的 image

如果不想使用 cache 的話加入`--no-cache=true` 即可．以下為 docker 找尋 cache 的基本大綱

- Starting with a parent image that is already in the cache, the next instruction is compared against all child images derived from that base image to see if one of them was built using the exact same instruction. If not, the cache is invalidated.
- In most cases, simply comparing the instruction in the `Dockerfile` with one of the child images is sufficient. However, certain instructions require more examination and explanation.
- For the `ADD` and `COPY` instructions, the contents of the file(s) in the image are examined and a checksum is calculated for each file. The last-modified and last-accessed times of the file(s) are not considered in these checksums. During the cache lookup, the checksum is compared against the checksum in the existing images. If anything has changed in the file(s), such as the contents and metadata, then the cache is invalidated.
- Aside from the `ADD` and `COPY` commands, cache checking does not look at the files in the container to determine a cache match. For example, when processing a `RUN apt-get -y update` command the files updated in the container are not examined to determine if a cache hit exists. In that case just the command string itself is used to find a match.

當 cache 失效的時候所有後續的指令會建立新的 image

[Dockerfile instructions](https://www.notion.so/3ed6b42404974f89a2344c6aa7683c7c)

- entrypoint 範例

```bash
#!/bin/bash
set -e

if [ "$1" = 'postgres' ]; then
    chown -R postgres "$PGDATA"

    if [ -z "$(ls -A "$PGDATA")" ]; then
        gosu postgres initdb
    fi

    exec gosu postgres "$@"
fi

exec "$@"
# Configure app as PID 1
# This script uses the exec Bash command so that the final running application becomes the container’s PID 1.
# This allows the application to receive any Unix signals sent to the container.
# For more, see the ENTRYPOINT reference.
# https://stackoverflow.com/questions/39082768/what-does-set-e-and-exec-do-for-docker-entrypoint-scripts
# set -e .... exec "$@" basically takes all the extra command line arguments and execs them as a command.
```

## 其他官方範例

- [Go](https://hub.docker.com/_/golang/)
- [Perl](https://hub.docker.com/_/perl/)
- [Hy](https://hub.docker.com/_/hylang/)
- [Ruby](https://hub.docker.com/_/ruby/)
