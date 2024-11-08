---
title: 'Install Docker on Ubuntu 2404'
date: 2024-11-08T09:00:46+08:00
draft: false
author: 'whchi'
tags: ['devops']
summary: ''
preview_figure: ''
preview_figcaption: ''
---

To install Docker on Ubuntu 24.04, you can follow these steps:

### Step 1: Update Your System

First, ensure your system is up-to-date:

```bash
sudo apt-get update
sudo apt-get upgrade
```

### Step 2: Install Required Packages

Install the required packages for Docker:

```bash
sudo apt-get install apt-transport-https ca-certificates curl software-properties-common
```

### Step 3: Add Docker’s Official GPG Key

Add Docker’s official GPG key to your system:

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

### Step 4: Add Docker Repository

Add the Docker repository to APT sources:

```bash
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

```

### Step 5: Update Package Database

Update the package database with Docker packages from the newly added repository:

```bash
sudo apt-get update
```

### Step 6: Install Docker

Finally, install Docker:

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

### Step 7: Verify Docker Installation

Verify that Docker is installed correctly by running the `hello-world` image:

```bash
sudo docker run hello-world
```

### Optional Step: Manage Docker as a Non-root User

To avoid typing `sudo` whenever you run the `docker` command, add your username to the Docker group:

```bash
sudo usermod -aG docker ${USER}
```

To apply the new group membership, log out and back in.

### Optional Step: Enable Docker to Start on Boot

Enable Docker to start on boot:

```bash
sudo systemctl enable docker
```

After following these steps, Docker should be installed and running on your Ubuntu 24.04 system.

# single shell script
```sh
#!/bin/sh

sudo apt-get update
sudo apt-get upgrade

sudo apt-get install apt-transport-https ca-certificates curl software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io


sudo docker run hello-world
sudo usermod -aG docker ${USER}

sudo systemctl enable docker

```
