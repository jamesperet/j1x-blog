---
layout: post
title:  "Gitlab with apache2 and multiple websites"
date:   2015-09-12 02:25:10
last_modified_at:  2015-12-10 03:05:00
excerpt: "How to configure Gitlab to use the Apache server instead of nginx"
categories: Guides
tags:  Linux, Git
image:
  feature: apache-gitlab.jpg
  topPosition: 0px
bgContrast: dark
bgGradientOpacity: darker
syntaxHighlighter: yes
published: true
---


This tutorial assumes you have a Ubuntu 14.04 droplet on Digital Ocean with 2GB of RAM. If you use a smaller droplet with 1Gb of RAM, GitLab will run out of memory some times and crash. With a smaller droplet, it will simply not work.

The idea is to first install the Gitlab Omnibus package, install apache and configure gitlab to use the installed apache server instead of its default nginx server.

## Gitlab Omnibus Install

First install all dependencies. Choose "Internet Site" during Postfix install. Then install the [GitLab Omnibus package](https://about.gitlab.com/downloads/#ubuntu1404):

```bash
sudo apt-get install curl openssh-server ca-certificates postfix
curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.deb.sh | sudo bash
sudo apt-get install gitlab-ce
```

Modify the GitLab configuration file located on ```/etc/gitlab/gitlab.rb```:

```ruby
external_url "https://gitlab.<yourdomain>/"
gitlab_rails['gitlab_email_from'] = "gitlab@<yourdomain>"
gitlab_rails['gitlab_support_email'] = "gitlab-support@<yourdomain>"
```

Then run ```sudo gitlab-ctl reconfigure``` to reboot GitLab with the new settings.

After the last step, GitLab should be working properly. Visit your GitLab URL and login using the username ```root``` and password ``` 5iveL!fe```.

## Installing apache2

Install apache2:

```bash
sudo apt-get update
sudo apt-get install apache2

sudo a2enmod proxy_http
sudo a2enmod proxy
sudo a2enmod rewrite
sudo a2enmod ssl
sudo a2enmod headers
sudo /etc/init.d/apache2 restart
```

If apache doesnt work with the [error](https://www.digitalocean.com/community/questions/98-address-already-in-use-ah00072-make_sock-could-not-bind-to-address-80-error):

```text
(98)Address already in use: AH00072: make_sock: could not bind to address [::]:80 - error
```

You can try to close other processes using port 80 with the commands:

```bash
# Find the process with
sudo lsof -i:80
# or
sudo netstat -ltnp | grep ':80'
# Then kill the process using its pid
sudo kill -9 1047
```

Another cause for this problem may be two directives in the apache configuration trying to bind to the same port.

```bash
grep Listen /etc/apache2/ports.conf
```

This command will show all lines that have the word "listen", including the port numbers. If there is more than one port 80 declaration in this file, remove one of them.

## Configuring apache virtual hosts for a new a website

To configure a website domain with apache virtual hosts, duplicate the file ```/etc/apache2/sites-available/000-default.conf``` and rename it to something like ```example-website.com.conf```. Than change the files configurations:

```apacheconf
<VirtualHost *:80>
  ServerName example-website.com
  ServerAdmin johndoe@gmail.com
  DocumentRoot /var/www/example-website.com/public_html
  ErrorLog ${APACHE_LOG_DIR}/error.log
  CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

After creating the virtual host, add it to the enabled-sites and restart apache:

```bash
a2ensite example-website.com.conf
apache2 restart
```

Don't forget to create a virtual host for your gitlab domain.

## Configuring gitlab to use apache2

In ```/etc/gitlab/gitlab.rb``` modify:

```ruby
external_url "http://gitlab.example.com"
# Disable nginx
nginx['enable'] = false
# Give apache user privileges to listen to GitLab
web_server['external_users'] = ['www-data']
```

Create the Virtual Host file for GitLab on ```/etc/apache2/sites-available/gitlab.conf``` with the contents below, modifying the URLs:

```apacheconf
<VirtualHost *:80>
  #This configuration has been tested on GitLab 6.0.0 and GitLab 6.0.1
  #Note this config assumes unicorn is listening on default port 8080.
  #Module dependencies
  #  mod_rewrite
  #  mod_proxy
  #  mod_proxy_http
  <VirtualHost gitlab.example.com:80>
  ServerName gitlab.example.com
  ServerSignature Off

  ProxyPreserveHost On

  # Ensure that encoded slashes are not decoded but left in their encoded state.
  # http://doc.gitlab.com/ce/api/projects.html#get-single-project
  AllowEncodedSlashes NoDecode

  <Location />
  # New authorization commands for apache 2.4 and up
  # http://httpd.apache.org/docs/2.4/upgrading.html#access
  Require all granted

  ProxyPassReverse http://127.0.0.1:8080
  ProxyPassReverse http://gitlab.example.com/
  </Location>

  #apache equivalent of nginx try files
  # http://serverfault.com/questions/290784/what-is-apaches-equivalent-of-nginxs-try-files
  # http://stackoverflow.com/questions/10954516/apache2-proxypass-for-rails-app-gitlab
  RewriteEngine on
  RewriteCond %{DOCUMENT_ROOT}/%{REQUEST_FILENAME} !-f
  RewriteRule .* http://127.0.0.1:8080%{REQUEST_URI} [P,QSA]

  # needed for downloading attachments
  DocumentRoot /opt/gitlab/embedded/service/gitlab-rails/public

  #Set up apache error documents, if back end goes down (i.e. 503 error) then a maintenance/deploy page is thrown up.
  ErrorDocument 404 /404.html
  ErrorDocument 422 /422.html
  ErrorDocument 500 /500.html
  ErrorDocument 503 /deploy.html

  LogFormat "%{X-Forwarded-For}i %l %u %t \"%r\" %>s %b" common_forwarded
  ErrorLog  /var/log/httpd/logs/gitlab.example.com_error.log
  CustomLog /var/log/httpd/logs/gitlab.example.com_forwarded.log common_forwarded
  CustomLog /var/log/httpd/logs/gitlab.example.com_access.log combined env=!dontlog
  CustomLog /var/log/httpd/logs/gitlab.example.com.log combined

</VirtualHost>
```

Then bind GitLab virtual host to enabled sites and restart apache:

```text
sudo a2ensite gitlab
sudo service apache2 restart
```

Then run ```sudo gitlab-ctl reconfigure``` to reload GitLab configurations. If you need to restart the server, use the command ```sudo gitlab-ctl restart```.

If by any chance you have to change the git-data file, its locate in ```/var/opt/gitlab/git-data```.

## Links

* [Using a non-bundled web-server - GiLab Help](https://gitlab.com/gitlab-org/omnibus-gitlab/blob/master/doc/settings/nginx.md#using-a-non-bundled-web-server)
* [Setting up Gitlab on Ubuntu 14.04 with Apache2 without owning a domain name - GitLab Forum](https://forum.gitlab.com/t/solved-setting-up-gitlab-on-ubuntu-14-04-with-apache2-without-owning-a-domain-name/679)
* [Host GitLab on Digital Oena - Geek Igor](http://igor.kupczynski.info/2014/07/08/host-gitlab-on-digitalocean.html)
* [Install GitLab on Ubuntu 14.04 using Apache2](http://paulshipley.id.au/blog/coding-tips/install-gitlab-on-ubuntu-14-04-using-apache2)
* [How To Install Linux, Apache, MySQL, PHP (LAMP) stack on Ubuntu 14.04 - Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-on-ubuntu-14-04)
* [Using gitlab's nginx to serve another app - Stack Overflow](http://stackoverflow.com/questions/24090624/using-gitlabs-nginx-to-serve-another-app)
