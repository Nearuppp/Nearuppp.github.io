---
title: Arch Linux Installation Guide
excerpt: Step-by-step instructions to create a bootable USB and install Arch Linux, including wifi setup, SSH enablement, and configuration details using archinstall.
tags:
  - Arch
  - Linux
  - Linux
  - Installation
  - Bootable
  - USB
  - Wifi
  - Setup
  - SSH
  - Linux
  - Kernel
  - System
  - Configuration
  - English
category: Technology
---

So get a laptop and start installing Arch Linux. 

With a flash drive use rufus[https://rufus.ie/en/] or any other software to a create bootable USB. 
Download the iso file of ARCH Linux [https://archlinux.org/download/]
In rufus select DD Mode, make sure GPT + UEFI is selected.


Go in your BIOS, disable the secure boot and chose your USB stick as your bootable option. 
Once you are done with your installation you can reenable the secure boot.

## How to use Wifi
If you are using ethernet when you type
``` shell 
ip addr show
```
You should see ythat you are connected.
If not you have to connect to your wifi. To see the different name of your wifi type this to get it.

To activate the wifi protocole :
```shell
iwctl
```
You should see [iwd] in green.
Now type
```shell
station wlan0 get-networks
```
exit the prompt
Now to connect type:
```shell
iwctl --passphrase "password" station wlan0 connect "wifiname"
```

### SSH
You could enable ssh if you want to ssh on your computer for the installations.
check if ssh is enable
```shell
systemctl status sshd
```
If it is not active you can start it with 
```shell
systemctl start sshd
```
You have to put a password to root toi be able to use it in ssh
so 
```shell
passwd
```
Enter your password twice and you can now use root on ssh !

Now on your terminal on another computer on the same network you can connect with ssh 
``` shell
ssh root@IPAdress
```

### Installer 
```shell
archinstall
```
In each section configure.
#### Mirrors
In this section you chose where the software come from.
For us its the US.
#### Locales
This is your keyboard settings. Please check it.

#### Disk Configuration
So to keep it simple let's choose "Use a best-effort Default partition layout"
Make sure the appropriate drive. And chose the ext4 filesystem. And select yes for the separation of partition of /home

#### Bootloader
Leave at Systemd-boot

#### Swap
Swap on zram allow you to compress things inside RAM. Make things better so say yes.

#### Root Password
Set yourself a good password only in ASCII character

#### User account
Create a user account on your computer. Recommended
Create a user, password and make it a superuser so its easier. 
Dont forget to confirm and exit

#### Profiles
For this tutorial we gonna chose Desktop.
Chose the desktop environment GNOME
Chose your graphics driver for me its an Intel so i chose Intel drivers.

#### Audio
Chose Pipewire for the audio server.

#### Kernels
I recommend you pick 2 kernel so linux and linux-lts so in case one break you can recover with the other.

#### Network Configuration
Chose "Use NetworkManager" because of GNOME. 

#### Timezone
Don't forget to chose your timezone for your time.

#### Automatic time sync (NTP)
Leave it enabled.

Finally you can "Install" your Arch Linux. You should see an output of all the setting if you want to automatize everything.
Reboot the system and you should have arch !

