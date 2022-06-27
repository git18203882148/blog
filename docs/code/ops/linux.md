---
editLink: false
date: '2022-06-22'
title: 'linux'
---

#### 1.配置

##### 	1.设置静态IP

修改“/etc/sysconfig/network-scripts/ifcfg-enp0s3”文件：

```shell

sudo vim /etc/sysconfig/network-scripts/ifcfg-enp0s3

# BOOTPROTO=dhcp      #dhcp动态分配
BOOTPROTO=static      #static静态分配
IPADDR=192.168.0.121  #静态IP地址
NETMASK=255.255.255.0 #子网掩码
GATEWAY=192.168.0.1   #默认网关
DNS1=223.5.5.5        #阿里云公共DNS
DNS2=180.76.76.76     #腾讯公共DNS
————————————————
#重新加载配置文件，并重启网卡，使设置生效：
sudo nmcli c reload     #重新加载网络连接
sudo nmcli c up enp0s3  #重启网卡

```

##### 2.防火墙 - 端口开放

```shell
#firewalld
systemctl status firewalld    #查看firewalld服务状态
systemctl start firewalld     #开启firewalld服务
systemctl enable firewalld    #firewalld服务开机自启
systemctl is-enable firewalld #查看firewalld服务开机自启
systemctl disable firewalld   #禁止firewalld服务开机自启
service firewalld start       #开启firewalld服务
service firewalld restart     #重启firewalld服务
service firewalld stop        #关闭firewalld服务
#firewall-cmd
firewall-cmd --state        #查看防火墙状态
firewall-cmd --reload       #重载防火墙 - 更改规则后需要重载
firewall-cmd --list-all     #查看防火墙规则
firewall-cmd --list-ports   #查看所有打开的端口
firewall-cmd --add-port=25565/tcp --permanent     #永久添加25565端口(全局)
firewall-cmd --remove-port=25565/tcp --permanent  #永久删除25565端口(全局)
firewall-cmd --add-port=65001-65010/tcp --permanent      #永久增加65001-65010端口(全局)
firewall-cmd --zone=public --add-port=25565/tcp --permanent     #永久添加25565端口(public)
firewall-cmd --zone=public --remove-port=25565/tcp --permanent  #永久删除25565端口(public)

```

##### 3.authorized_keys - 公钥登录



