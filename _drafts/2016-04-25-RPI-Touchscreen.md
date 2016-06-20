---
layout: post
title:  "Raspberry Pi Touchscreen Tutorial"
date:   2016-04-25 15:25:01
categories: article diary
published: false
image:
  feature:
  topPosition: 0px
bgContrast: dark
bgGradientOpacity: darker
syntaxHighlighter: yes
---

Sainsmart doesn’t provide any sources or usefull information, but the module is very easy to use.

First, install the display module on the Raspberry Pi board, and power it.

Now, install fbtft kernel with SPI DMA support.

sudo REPO_URI=https://github.com/notro/rpi-firmware rpi-update
Download waveshare overlays and copy them in /boot/overlays/.

cd /tmp
git clone https://github.com/swkim01/waveshare-dtoverlays.git
sudo cp waveshare-dtoverlays/*.dtb /boot/overlays/
Specify this overlay file in your /boot/config.txt along with activating SPI.

sudo nano /boot/config.txt
Add these 2 lines at the end of the file :

dtparam=spi=on
dtoverlay=waveshare32b
Enable console on the display

Edit /boot/cmdline.txt

sudo nano /boot/cmdline.txt
At the end of the line, add this :

fbcon=map:10
This is also where you could rotate the console display, with fbcon=rotate:n where n is a different orientation (0,1,2,3)

Enable X window on the display

Edit xorg config file and change default framebuffer device (fb0) to our new framebuffer (fb1)

sudo nano /usr/share/X11/xorg.conf.d/99-fbturbo.conf
Change this line to fb1 :

Option          "fbdev" "/dev/fb1"
Now, reboot your Pi. Your console should show on the display.


5- Console touch calibration

Edit, 2016.02.14 : A bug in the Debian 8 « Jessie » libsdl component prevents the touchpanel to work reliably in Pygame, from the console. For a workaround, please read this blog article if you are using Debian Jessie.

Input devices get a device name which depends on the order of detection (/dev/input/eventX).

These udev rules will create a symlink /dev/input/touchscreen pointing to the touch controller device. Reloading the driver or rebooting is necessary for the change to take effect.

/etc/udev/rules.d/95-ads7846.rules

SUBSYSTEM=="input", KERNEL=="event[0-9]*", ATTRS{name}=="ADS7846*", SYMLINK+="input/touchscreen"
/etc/udev/rules.d/95-stmpe.rules

SUBSYSTEM=="input", ATTRS{name}=="stmpe-ts", ENV{DEVNAME}=="*event*", SYMLINK+="input/touchscreen"
Now, reboot.

In order to use the touch panel with python, X, and to calibrate it, a few packages need loading :

sudo apt-get install -y libts-bin evtest xinput python-dev python-pip
sudo pip install evdev

# install ts_test with Quit button
sudo wget -O /usr/bin/ts_test http://tronnes.org/downloads/ts_test
sudo chmod +x /usr/bin/ts_test
To calibrate the touchscreen :

sudo TSLIB_FBDEVICE=/dev/fb1 TSLIB_TSDEVICE=/dev/input/touchscreen ts_calibrate
6- X windows touch calibration

xinput-calibrator provides a way to calibrate the touchpanel for X windows use. Install

cd /tmp
wget http://tronnes.org/downloads/xinput-calibrator_0.7.5-1_armhf.deb
sudo dpkg -i -B xinput-calibrator_0.7.5-1_armhf.deb
rm xinput-calibrator_0.7.5-1_armhf.deb
Configure xinput-calibrator to autostart with X windows.

sudo wget -O /etc/X11/Xsession.d/xinput_calibrator_pointercal https://raw.github.com/tias/xinput_calibrator/master/scripts/xinput_calibrator_pointercal.sh
echo "sudo /bin/sh /etc/X11/Xsession.d/xinput_calibrator_pointercal" | sudo tee -a /etc/xdg/lxsession/LXDE-pi/autostart
On first start of X windows a calibration window will be displayed.

startx
Delete /etc/pointercal.xinput and restart X to recalibrate.

### Touch panel rotation

xinput-calibrator doesn’t handle touchpanels with X/Y swapped.
If your calibration results in swapped axis, add these config files.

`/usr/share/X11/xorg.conf.d/99-ads7846-cal.conf`

```
Section "InputClass"
        Identifier      "calibration"
        MatchProduct    "ADS7846 Touchscreen"
        Option  "SwapAxes"      "1"
        Option "InvertX" "true"
EndSection
```

`/usr/share/X11/xorg.conf.d/99-stmpe-cal.conf`

```
Section "InputClass"
        Identifier      "calibration"
        MatchProduct    "stmpe-ts"
        Option  "SwapAxes"      "1"
        Option "InvertX" "true"
EndSection
```

### Disable screen blanking

Edit /boot/cmdline.txt and add consoleblank parameter

sudo nano /boot/cmdline.txt
add this to the end of the line :

consoleblank=0
Edit /etc/kbd/config and edit display blanking parameters

sudo nano /etc/kbd/config
Find these lines and replace the values with 0 (zero) :

BLANK_TIME=0
POWERDOWN_TIME=0
8- Use the buttons

The 3 buttons are very easy to use, once pinout is found.

Here is a very simple python example :

import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BOARD)

GPIO.setup(12, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(16, GPIO.IN, pull_up_down = GPIO.PUD_UP)
GPIO.setup(18, GPIO.IN, pull_up_down = GPIO.PUD_UP)

while True:
	if(GPIO.input(12) == 0):
	print(“Button 1 pressed”)
	if(GPIO.input(16) == 0):
	print(“Button 2 pressed”)
	if(GPIO.input(18) == 0):
	print(“Button 3 pressed”)

GPIO.cleanup()
Save it to /home/pi/buttons.py (for an example) and execute it with

python /home/pi/buttons.py
Once your are happy with your script, execute it at boot.

sudo nano /etc/rc.local
Add your script before the exit line, with a « & » to make it non-blocking :

python /home/pi/buttons.py &
You could find easily adaptable and more advanced scripts on my previous articles here and here.

9- Conclusion

This is nice little display with good view angles, a good brightness and 3 usefull buttons. It is also easy to set up, which is nice.

Sources
- https://github.com/notro/fbtft/wiki/FBTFT-on-Raspian
- http://hardware-libre.fr/2015/07/review-guide-waveshare-sainsmart-3-2-inch-rpi-lcd/
- http://www.circuitbasics.com/raspberry-pi-touchscreen-calibration-screen-rotation/
- [Joy-it 3,2“ Touch-Display-V2 manual](http://files.voelkner.de/1300000-1399999/001380381-an-01-de-8_13_CM__3_2__TOUCH_DISPLAY_320X240_PX.pdf)
