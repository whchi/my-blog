---
title: '安裝 Hbase'
date: 2020-05-25T14:46:39+08:00
draft: false
author: 'whchi'
tags: ['hadoop', 'hbase']
summary: 'hbase only'
---
最近幫公司架 hbase，快速筆記一下相關設定，這邊用`ubuntu 1804`

## hadoop
這裡只有用到他的 hdfs

0. prerequirements
```sh
sudo apt update
sudo apt install openjdk-8-jdk-headless
# setup hadoop user
sudo adduser hadoop
su - hadoop
ssh-keygen -t rsa -P '' -f ~/.ssh/id_rsa
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
chmod 0600 ~/.ssh/authorized_keys
```
1. download hadoop
```sh
# https://hadoop.apache.org/releases.html
wget http://ftp.twaren.net/Unix/Web/apache/hadoop/common/hadoop-3.2.1/hadoop-3.2.1.tar.gz
tar -zxvf hadoop-3.2.1.tar.gz
sudo mv hadoop-3.2.1 /opt/hadoop
```
2. setup env in `~/.bashrc`
```sh
export HADOOP_HOME=/opt/hadoop
export HADOOP_INSTALL=$HADOOP_HOME
export HADOOP_MAPRED_HOME=$HADOOP_HOME
export HADOOP_COMMON_HOME=$HADOOP_HOME
export HADOOP_HDFS_HOME=$HADOOP_HOME
export YARN_HOME=$HADOOP_HOME
export HADOOP_COMMON_LIB_NATIVE_DIR=$HADOOP_HOME/lib/native
export HBASE_HOME=/opt/hbase
export PATH=$PATH:$HADOOP_HOME/sbin:$HADOOP_HOME/bin:$HBASE_HOME/bin
```
3. file configurations
* $HADOOP_HOME/etc/hadoop/hadoop-env.sh
```sh
# find and replace
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64/
export HADOOP_OPTS="$HADOOP_OPTS -Djava.library.path=$HADOOP_HOME/lib/native"
```
* $HADOOP_HOME/etc/hadoop/core-site.xml
```xml
<configuration>
<property>
  <name>fs.default.name</name>
    <value>hdfs://localhost:9000</value>
</property>
</configuration>
```
* $HADOOP_HOME/etc/hadoop/hdfs-site.xml
```xml
<configuration>
    <property>
        <name>dfs.replication</name>
        <value>1</value>
    </property>
    <property>
        <name>dfs.namenode.name.dir</name>
        <value>file:///opt/hadoop/nodes/hdfs/namenode</value>
    </property>
    <property>
        <name>dfs.datanode.data.dir</name>
        <value>file:///opt/hadoop/nodes/hdfs/datanode</value>
    </property>
</configuration>
```
4. format node
```sh
cd $HADOOP_HOME/etc/hadoop && hdfs namenode -format
```
5. start hdfs
```sh
$HADOOP_HOME/sbin/start-dfs.sh
```
## hbase
啟動模式比較
{{< table "table table-bordered" >}}
| 模式               |   hdfs   |  production   | worker                     |
| :----------------- | :------: | :-----------: | :------------------------- |
| standalone         |    -     | don't do that | single node single process |
| pseudo distributed | optional | not recommend | single node multi process  |
| fully distributed  | required |      ok       | multi node multi process   |
{{</ table >}}

**使用 fully distributed 模式時建議 zookeeper 也要獨立一台機器提供服務**

1. download & install
```sh
cd
# https://hbase.apache.org/downloads.html
wget http://ftp.twaren.net/Unix/Web/apache/hbase/2.2.4/hbase-2.2.4-bin.tar.gz
tar -zxvf hbase-2.2.4-bin.tar.gz
sudo mv hbase-2.2.4 /opt/hbase
cd /opt/hbase
mkdir zookeeperdata
```
1. file configurations(這邊以 pseudo distributed 為例)

* hbase-env.sh
```sh
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64/
export HBASE_MANAGES_ZK=true
# 預設 localhost, 如果要做 fully-distributed 的話修改這份，移除localhost並設定其他regions
export HBASE_REGIONSERVERS=${HBASE_HOME}/conf/regionservers
```
* hbase-site.xml
```xml
<configuration>
    <property>
        <name>hbase.rootdir</name>
        <!-- 8020 is ok, set to namenode position -->
        <value>hdfs://localhost:9000/hbase</value>
    </property>
    <property>
        <name>hbase.cluster.distributed</name>
        <value>true</value>
    </property>
    <property>
        <name>hbase.zookeeper.quorum</name>
        <value>localhost</value>
    </property>
    <property>
        <name>dfs.replication</name>
        <value>1</value>
    </property>
    <property>
        <name>hbase.zookeeper.property.clientPort</name>
        <value>2181</value>
    </property>
    <property>
        <name>hbase.zookeeper.property.dataDir</name>
        <value>/opt/hbase/zookeeperdata</value>
    </property>
    <!-- standalone mode 時設定, 禁用hflush, hsync -->
    <!-- 這參數很怪，官網上說使用 hdfs 時不用設定，但我用的版本需要設定，可能跟hbase、hadoop相依性有關 -->
    <!-- <property>
        <name>hbase.unsafe.stream.capability.enforce</name>
        <value>false</value>
    </property> -->
    <property>
        <name>zookeeper.znode.parent</name>
        <value>/hbase</value>
    </property>
    <!-- prevent buffer overrun error -->
    <!-- @see https://docs.cloudera.com/runtime/7.1.0/troubleshooting-hbase/topics/hbase-thrift-server-crashes.html -->
    <!-- 有開下面這些參數的話接 thrift 的 client 也要特別指定 -->
    <property>
        <name>hbase.regionserver.thrift.framed</name>
        <value>true</value>
    </property>
    <!-- equals size per row if use batch -->
    <property>
        <name>hbase.regionserver.thrift.framed.max_frame_size_in_mb</name>
        <value>2</value>
    </property>
    <property>
        <name>hbase.regionserver.thrift.compact</name>
        <value>true</value>
    </property>
</configuration>
```
## up & running
```sh
$HADOOP_HOME/sbin/start-dfs.sh
$HBASE_HOME/bin/start-hbase.sh
# 要串接 thrift client 的話跑下面的指令
$HBASE_HOME/bin/hbase-daemon.sh start thrift -c -f -threadedselector
```
下面是比較有關的 port
{{< table "table table-bordered" >}}
| port number | usage                |
| :---------- | :------------------- |
| 9870        | Hadoop web ui        |
| 9864        | namenode web ui      |
| 9000/8020   | hdfs namenode        |
| 9090        | thrift server api    |
| 9095        | thrift server web ui |
{{</ table>}}
主要查看 9870 以及 9095 就能確定 hbase 能不能正常串接
## Reference
https://hbase.apache.org/book.html
