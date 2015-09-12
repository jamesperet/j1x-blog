---
layout: post
title:  "Raspberry Pi Getting Started Guide"
date:   2015-06-27 22:31:00
last_modified_at:  2015-08-02T19:05:00-03:00
excerpt: "A how to guide to setting up Atom Editor"
categories: software
tags: tutorial
image:
  feature: raspberry-pi.jpg
  topPosition: 0px
bgContrast: dark
bgGradientOpacity: darker
syntaxHighlighter: yes
published: true
---

## Install and configure

### Creating the Raspbian boot disk on a Mac

Insert a MicroSD card to your computer and find out the disk identifier (ex: ```disk4```):

    diskutil list

Unmount the SD card using the disk identifier:

    diskutil unmountDisk /dev/disk4

Copy the raspbian img to the SD card:

    sudo dd bs=1m if=Desktop/2015-05-05-raspbian-wheezy.img of=/dev/rdisk4

This command will take a while. You can check the progress using ```SIGINFO``` by pressing ```CTRL + T```.

For more information on creating a disk image of the Raspbian OS on a micro SD card from a mac or other operating systems, read the official instructions [here](https://www.raspberrypi.org/documentation/installation/installing-images/mac.md).

### First Boot

The username and password for Raspbian “squeeze” are:

    $ Username: Pi

    $ Password: raspberry

To start the Raspbian GUI, run the command:

    $ startx

### Setting up Wi-Fi and Ethernet

To set up multiple wired and wi-fi connections using WICD-CURSES app, follow this [instructions](http://www.raspyfi.com/wi-fi-on-raspberry-pi-a-simple-guide/).

To set up a single wi-fi connection, follow this [instructions](http://www.howtogeek.com/167425/how-to-setup-wi-fi-on-your-raspberry-pi-via-the-command-line/)

### Installing Apps

```sudo apt-get update```

This will update the repository on the raspberry pi with locations of software and general software updates.

To search for software by name type the following command

```sudo apt-cache search```

*Example: ```sudo apt-cache search chromium```*

To install software by name

```sudo apt-get install```

*Example: ```sudo apt-get install chromium```*

To uninstall software

```sudo apt-get remove```

*Example: ```sudo apt-get remove chromium```*

### Setting up SSH

To find out the ip address of the raspberry pi, run ```hostname -I```.

http://www.howtogeek.com/141157/how-to-configure-your-raspberry-pi-for-remote-shell-desktop-and-file-transfer/all/

### Setting up VNC

http://www.howtogeek.com/141157/how-to-configure-your-raspberry-pi-for-remote-shell-desktop-and-file-transfer/all/

#### x11vnc

```apt-get install x11vnc```

```x11vnc -display :0 -noxdamage -ncache 10 -ncache_cr```

* [x11vnc](http://www.karlrunge.com/x11vnc/) ([command list](http://www.karlrunge.com/x11vnc/x11vnc_opts.html))
* [Stack Overflow](http://raspberrypi.stackexchange.com/questions/9590/tightvncserver-show-the-same-screen-on-hdmi-and-vncclient)

## Video Players

### VLC media Player

To start a video, use the command the following command. The ```vvv``` is for *verbose mode*.

More information on  **VLC** command line interface [here](https://www.videolan.org/doc/vlc-user-guide/en/ch04.html) and more advanced commands [here](https://www.videolan.org/doc/play-howto/en/ch04.html).

```vlc -vvv my_file.mpg```

To [play a video with VLC thru a ssh session](http://stackoverflow.com/questions/9636268/play-a-video-with-vlc-in-x11-from-remote-terminal), use the command:

```cvlc --quiet --fullscreen --no-osd --loop  playlist.xspf --x11-display :0```

* [How to use VLC with hardware acceleration on a Raspberry pi](http://www.oblivion-software.de/index.php?id=56&type=98)

### HPlayer

[HPlayer](https://github.com/Hemisphere-Project/HPlayer) is a OSC controllable and GPU accelerated video player for Raspberry Pi with OpenGL shaders support.

## Misc

### Useful commands

* **Shutdown** - ```sudo shutdown -h now``` or ```sudo halt``` ([more info](http://raspi.tv/2012/how-to-safely-shutdown-or-reboot-your-raspberry-pi))
* **Reboot** - ```sudo shutdown -r now``` or ```sudo reboot``` ([more info](http://raspi.tv/2012/how-to-safely-shutdown-or-reboot-your-raspberry-pi))
* **Copy files using ssh** - ([more info ](http://unix.stackexchange.com/questions/106480/how-to-copy-files-from-one-machine-to-another-using-ssh))
  * To copy a file from B to A while logged into B:
  ```scp /path/to/file username@a:/path/to/destination```.
  * To copy a file from B to A while logged into A: ```scp username@b:/path/to/file /path/to/destination```

### Other Tools

* [termflix](https://github.com/asarode/termflix) - Stream torrent movies to vlc thru the command line
