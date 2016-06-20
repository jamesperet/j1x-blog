---
layout: post
title:  "Jasper Install"
date:   2016-03-24 21:14:01
categories: article diary
published: false
image:
  feature: artpimp-radio.jpg
  topPosition: 0px
bgContrast: dark
bgGradientOpacity: darker
syntaxHighlighter: yes
---

This tutorial will cover how to install the Jasper speech project in a Raspberry Pi 3 using the Raspbian Jesse OS.

## Configuring Audio

Follow this [tutorial](http://cagewebdev.com/index.php/raspberry-pi-getting-audio-working/) to get audio working on the raspberry pi using a external microfone or sound card. To keep your configurations aftwards, follow this [tutorial](http://www.linuxcircle.com/2013/05/08/raspberry-pi-microphone-setup-with-usb-sound-card/.)

## python pip problems

If you have problems with pip, try uninstalling it and then using *easy_install* to reinstall pip:

```bash
    apt-get remove python-pip
    easy_install pip
```

## Links

- [Making Jasper use the AT&T Speech API](http://changingjasper.blogspot.de/2014/06/making-jasper-use-at-speech-api.html)
- [Better system for sharing modules](https://github.com/jasperproject/jasper-client/issues/163) - Interesting conversation about a module sharing system
- [Jasper Module Hub](http://jaspermoduleshub.herokuapp.com/) - Experimental website with some jasper modules
- [Parsing English in 500 lines of Python](https://spacy.io/blog/parsing-english-in-python)
- [Give "Jasper" a different name](https://github.com/jasperproject/jasper-client/issues/8)
- [Building application with pocketsphinx](http://cmusphinx.sourceforge.net/wiki/tutorialpocketsphinx)
