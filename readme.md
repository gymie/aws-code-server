# AWS Code Server

Welcome! This is your go-to toolkit for running [Installer VS Code for the web](https://github.com/rioastamal/installer-vscode-for-web) on Amazon Lightsail. We've got two ways for you to set up your web-based code editor on Amazon Lightsail, and we're going to show you just how easy it is using either AWS CLI or AWS CDK.

## Prerequisites

Before we get our hands dirty, here's what you'll need to have in place:

- [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- [Configure AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)
- [Install AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html#getting_started_install)

## Key Lightsail Resource Parameters

When you're setting up your Lightsail resources, there are a few important parameters you'll need to know about:

- **Instance Name**: This is simply the name you want to give to your Lightsail instance.
- **Availability Zone**: In Amazon Lightsail, an "availability zone" is essentially a physically separate data center within an AWS region. AWS regions are divided into multiple availability zones to provide redundancy and fault tolerance. For example, in the Singapore region, you'll find availability zones like `ap-southeast-1a`, `ap-southeast-1b`, and `ap-southeast-1c`.

- **Blueprint ID**: In Amazon Lightsail, a "blueprint" is a pre-made configuration template for different types of instances or applications. Blueprints make it super easy to set up instances with specific software stacks, like a LAMP (Linux, Apache, MySQL, PHP) stack or a WordPress content management system.

Now, here are the blueprints you can choose from:
| Name | Blueprint ID |
| ----------------------------- | -------------------- |
| Amazon Linux 2023 | amazon_linux_2023 |
| Amazon Linux 2 | amazon_linux_2 |
| Ubuntu | ubuntu_22_04 |
| Ubuntu | ubuntu_20_04 |
| Ubuntu | ubuntu_18_04 |
| Debian | debian_11 |
| Debian | debian_10 |
| FreeBSD | freebsd_12 |
| openSUSE Leap | opensuse_15 |
| CentOS Stream 9 | centos_stream_9 |
| CentOS Linux | centos_7_2009_01 |
| WordPress | wordpress |
| WordPress Multisite | wordpress_multisite |
| LAMP (PHP 8) | lamp_8_bitnami |
| Node.js | nodejs |
| Joomla | joomla |
| Magento | magento |
| MEAN | mean |
| Drupal | drupal |
| GitLab CE | gitlab |
| Redmine | redmine |
| Nginx | nginx |
| Ghost | ghost_bitnami |
| Django | django_bitnami |
| PrestaShop | prestashop_bitnami |
| Plesk Hosting Stack on Ubuntu | plesk_ubuntu |
| cPanel & WHM for AlmaLinux | cpanel_whm_almalinux |

- **Bundle ID**: A "bundle" in Amazon Lightsail refers to a set of hardware resources such as CPU, RAM, and storage allocated to a Lightsail instance. Different bundles offer varying levels of performance and capacity. Take your pick!

| Name    | Instance Type | CPU Count | RAM Size (GB) | Disk Size (GB) | Price (Monthly) | Bundle ID   |
| ------- | ------------- | --------- | ------------- | -------------- | --------------- | ----------- |
| Nano    | nano          | 2         | 0.5           | 20             | $3.5            | nano_3_0    |
| Micro   | micro         | 2         | 1.0           | 40             | $5.0            | micro_3_0   |
| Small   | small         | 2         | 2.0           | 60             | $10.0           | small_3_0   |
| Medium  | medium        | 2         | 4.0           | 80             | $20.0           | medium_3_0  |
| Large   | large         | 2         | 8.0           | 160            | $40.0           | large_3_0   |
| Xlarge  | xlarge        | 4         | 16.0          | 320            | $80.0           | xlarge_3_0  |
| 2Xlarge | 2xlarge       | 8         | 32.0          | 640            | $160.0          | 2xlarge_3_0 |

## Installation Steps

Okay, let's get down to business! Here's how you can set up your AWS Code Server and get it running.

### Cloning the Repository

Start by cloning our repository. In your terminal:

```sh
git clone https://github.com/gymie/aws-code-server
cd aws-code-server
```

> By default, this setup uses the following parameters unless you decide to override them:

| Parameters        | Value               |
| ----------------- | ------------------- |
| instance_name     | "code-server"       |
| availability_zone | "ap-southeast-1a"   |
| bundle_id         | "small_3_0"         |
| blueprint_id      | "amazon_linux_2023" |

### Setting up with AWS CLI

1. First, give executable permission to lightsail-code-server.sh:

```sh
chmod +x ./lightsail-code-server.sh
```

2. Now, execute lightsail-code-server:

```sh
./lightsail-code-server
```

> If you want to customize your `blueprint_id` or `bundle_id` (refer to the table above), you can run the following command:

```sh
./lightsail-code-server \
--bundle_id medium_3_0 \
--blueprint_id ubuntu_22_04
```

3. You'll need to confirm the creation of a new instance:

```sh
Do you want to create a new code-server instance? (y/n): y
```

4. Then, provide a password for your web-based code editor access:

```sh
Please enter your password for Code Server: MyVeryLongPassword123
Strong password accepted: MyVeryLongPassword123
```

5. The shell script will kickstart the instance creation:

```sh
Start creating your code-server instance on ap-southeast-1a with small_3_0 bundle and amazon_linux_2023 blueprint...

CreateInstance  code-server     Started
OpenInstancePublicPorts code-server     Succeeded
```

6. Finally, you'll receive an output like this:

```sh
Here is your Code Server URL: https://xx.xx.xx.xx.nip.io
```

7. Use this URL to access your web-based code editor in your browser (after a few minutes).

> To delete your Lightsail instance, you can run `./lightsail-code-server.sh` again, and receive this prompt

```sh
An instance with the name 'code-server' already exists.

Do you want to delete it? (y/n): y
```

### Setting up with AWS CDK

1. Head over to the cdk-lightsail-code-server folder:

```sh
cd cdk-lightsail-code-server
```

2. Install the necessary package dependencies:

```sh
npm install
```

3. It's showtime! Run cdk deploy to create your new Lightsail instance:

```sh
cdk deploy
```

> If you want to tweak your `blueprint_id` or `bundle_id`, use this command:

```sh
cdk deploy \
--parameters bundle_id=medium_3_0 \
--parameters blueprint_id=ubuntu_22_04
```

4. CDK will roll up its sleeves and start creating your Lightsail instance.
5. You'll receive an output like this:

```sh
Outputs:
CdkLightsailCodeServerStack.CodeServerInstancePublicIp = https://xx.xxx.xx.xx.nip.io
```

6. Use this URL to access your web-based code editor in your browser (after a few minutes).

> To delete your Lightsail instance, you can run `cdk destroy`, and receive this prompt

```sh
Are you sure you want to delete: CdkLightsailCodeServerStack (y/n)? y
```

Now you're all set to dive into your web-based code editor adventure! Happy coding!
