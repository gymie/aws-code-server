# AWS Code Server

This a support tools to run [Installer VS Code for the web](https://github.com/rioastamal/installer-vscode-for-web) on Amazon Lightsail. In this repo we provide 2 way to configure your web-based code editor on Amazon Lightsail using AWS CLI or AWS CDK.

## Prerequisites

- [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- [Configure AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)
- [Install AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html#getting_started_install)

## Lightsail Resource Parameters

When creating Lightsail resources, there are some key parameters we need to provide :

- **Instance Name**: This is to provide name for our Lightsail instance.
- **Availability Zone**: In Amazon Lightsail, an "availability zone" is essentially a physically separate data center within an AWS region. AWS regions are divided into multiple availability zones to provide redundancy and fault tolerance. For example, in the Singapore region, you'll find availability zones like `ap-southeast-1a`, `ap-southeast-1b`, and `ap-southeast-1c`.

- **Blueprint ID**: In Amazon Lightsail, a "blueprint" is a pre-made configuration template for different types of instances or applications. Blueprints make it super easy to set up instances with specific software stacks, like a LAMP (Linux, Apache, MySQL, PHP) stack or a WordPress content management system.

| Name                          | Blueprint ID         |
| ----------------------------- | -------------------- |
| Amazon Linux 2023             | amazon_linux_2023    |
| Amazon Linux 2                | amazon_linux_2       |
| Ubuntu                        | ubuntu_22_04         |
| Ubuntu                        | ubuntu_20_04         |
| Ubuntu                        | ubuntu_18_04         |
| Debian                        | debian_11            |
| Debian                        | debian_10            |
| FreeBSD                       | freebsd_12           |
| openSUSE Leap                 | opensuse_15          |
| CentOS Stream 9               | centos_stream_9      |
| CentOS Linux                  | centos_7_2009_01     |
| WordPress                     | wordpress            |
| WordPress Multisite           | wordpress_multisite  |
| LAMP (PHP 8)                  | lamp_8_bitnami       |
| Node.js                       | nodejs               |
| Joomla                        | joomla               |
| Magento                       | magento              |
| MEAN                          | mean                 |
| Drupal                        | drupal               |
| GitLab CE                     | gitlab               |
| Redmine                       | redmine              |
| Nginx                         | nginx                |
| Ghost                         | ghost_bitnami        |
| Django                        | django_bitnami       |
| PrestaShop                    | prestashop_bitnami   |
| Plesk Hosting Stack on Ubuntu | plesk_ubuntu         |
| cPanel & WHM for AlmaLinux    | cpanel_whm_almalinux |

- **Bundle ID**: A "bundle" in Amazon Lightsail refers to a set of hardware resources such as CPU, RAM, and storage allocated to a Lightsail instance. Different bundles offer varying levels of performance and capacity.

| Name    | Instance Type | CPU Count | RAM Size (GB) | Disk Size (GB) | Price (Monthly) | Bundle ID   |
| ------- | ------------- | --------- | ------------- | -------------- | --------------- | ----------- |
| Nano    | nano          | 2         | 0.5           | 20             | $3.5            | nano_3_0    |
| Micro   | micro         | 2         | 1.0           | 40             | $5.0            | micro_3_0   |
| Small   | small         | 2         | 2.0           | 60             | $10.0           | small_3_0   |
| Medium  | medium        | 2         | 4.0           | 80             | $20.0           | medium_3_0  |
| Large   | large         | 2         | 8.0           | 160            | $40.0           | large_3_0   |
| Xlarge  | xlarge        | 4         | 16.0          | 320            | $80.0           | xlarge_3_0  |
| 2Xlarge | 2xlarge       | 8         | 32.0          | 640            | $160.0          | 2xlarge_3_0 |

## How to Install

## Configure with AWS CLI

1. Download the shell script

```sh
curl -s -L https://raw.githubusercontent.com/gymie/aws-code-server/main/lightsail-code-server.sh
chmod +x ./ligtsail-code-server
```
