---
layout: post
title:  "Digital Ocean Server Setup"
---

## Droplet Setup

This server is going to have a bit of load so I will use the *$10* droplet with **1GB Ram** and **30GB SSD Disk**. Use the **Ubuntu 14.04 x64** image. I choose *Ubuntu* because there is a lot of documentation for it, but probably *Debian* or *CentOS* would be a better choise as a linux distro for a web server.

## Create a new super user

Its a good practice to create a new super user account that uses commands with ```sudo``` instead of using the **root** account where  all commands are executed with ```sudo``` by default.

    adduser demo

Type in your password and answer some stupid questions. Then give this *demo* user some **sudo** powers:

    gpasswd -a demo sudo

Now with the super user created switch from root to the new user:

    su - demo

Create a new folder for **SSH** keys and modify its permissions:

    sudo mkdir .ssh
    sudo chmod 700 .ssh

Now create a new file for your SSH key and paste your public key inside of it:

    nano .ssh/authorized_keys

Press ```Ctrl + X``` to exit nano, then ```Y``` to save and then hit ```Enter```.

Now restrict the permissions of the file with your key:

    chmod 600 .ssh/authorized_keys

After everything is done, go back to being the root user:

    exit

Now test login in as your new user in a new shell session:

    ssh demo@server_ip

If everything works, you won't need to type in your password, the server will log you in automatically using the SSH key.

## Remove root login

For security reasons, its a good ideia disable the root account login thru SSH and only log in with user accounts.

To remove the root login, first make sure you can log in with a different super user account. Then log in as **root** and run:

    nano /etc/ssh/sshd_config

Next, change ```PermitRootLogin``` to ```no```.

Press ```Ctrl + X``` to exit nano, then ```Y``` to save and then hit ```Enter```.

Now restart the SSH service:

    service ssh restart

And thats it! Now when you log out of the root account, you wont be able to log in again!

If you ever have to log in as the root user again, just change this settings back as your new super user using ```sudo``` before the commands.

## Configure FTP

    sudo apt-get install vsftpd

To change vsftpd configuration, run ```sudo nano /etc/vsftpd.conf```. Change the following settings:

    local_enable=YES
    write_enable=YES
    chroot_local_user=NO

With this configuration, the admin user will be able to log in via SFTP to any folder inside ```/var/www/```. After changing configurations, restart the service:

    sudo service vsftpd restart

## Change SWAP memory settings

For droplets with a low amount of RAM memory, its possible to increase the **SWAP memory**.

    $ sudo fallocate -l 1024M /mnt/swap.img
    $ sudo mkswap /mnt/swap.img
    $ sudo swapon /mnt/swap.img
    $ sudo vim /etc/fstab

## Install zshell

To install zshell and set it as your default shell:

    apt-get install zsh
    apt-get install git-core
    wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh
    chsh -s `which zsh`

After installing **zshell**, exit the *ssh session* and log back in.

## Install slap

    sudo apt-get remove --purge node
    sudo npm cache clean
    sudo apt-get install build-essential
    curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -
    sudo apt-get install -y nodejs
    sudo ln -s /usr/bin/nodejs /usr/bin/node

## Change hostname

To check the actual server hostname, run ```hostname --fqdn```. Then to change to a different hostname run:

    sudo hostname name.example.com

## System info with Archey

To install run:

    sudo apt-get install lsb-release scrot
    wget http://github.com/downloads/djmelik/archey/archey-0.2.8.deb
    sudo dpkg -i archey-0.2.8.deb

To use, just run the command ```archey```.

## Usefull commands

* ```sudo poweroff``` - turn off the droplet. It can be turned back on in the droplet control pannel.
* ```sudo reboot``` - restarts the server.
* ```landscape-sysinfo``` - simple system information. Use can use the flag ```  --exclude-sysinfo-plugins=Temperature,LandscapeLink,Processes```.
* ```find /usr/share/figlet -name *.?lf -exec basename {}  \; | sed -e "s/\..lf$//" | xargs -I{} toilet -f {} {}``` - Show demo of toilet fonts
* ```sudo apt-get clean``` - remove files from incomplete installations.
* ```sudo apt-get autoremove``` - remove unused packages.
* ```sudo apt-get update``` - update the package manager.
* ```sudo apt-get upgrade``` - update installed apps.

## Links

* [Initial Server Setup with Ubuntu 14.04 - Digital Ocean](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-14-04)
* [Additional Recommended Steps for New Ubuntu 14.04 Servers - Digital Ocean](https://www.digitalocean.com/community/tutorials/additional-recommended-steps-for-new-ubuntu-14-04-servers)
* [How To Protect SSH with Fail2Ban on Ubuntu 14.04 - Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-protect-ssh-with-fail2ban-on-ubuntu-14-04)
* [How To Connect To Your Droplet with SSH - Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-connect-to-your-droplet-with-ssh)
