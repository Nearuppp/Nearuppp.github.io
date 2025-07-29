---
title: Introduction to Bash Scripting
excerpt: A beginner-friendly guide to Bash scripting basics, covering environment variables, script execution, shebang, and file permissions.
tags:
  - Bash
  - Scripting
  - Shell
  - Linux
  - Programming
  - Command
  - Line
  - English
category: Technology
---

# Bash scripting
We use bash script because bash is everywhere. in contrary to go and ruby or any new languages shell is already installed on most computers.

## The basics 
Mostly on Linux, shell is also used on Apple's OS.
You can install bash on Microsoft 10.

```shell
$ echo "Hello World"
```
It will display Hellow world to the screen

```shell
$ echo $PATH
```
It will print the current PATH environment variable 

```shell
$ which ruby
```
It shows the full path of the ruby executable that will run when you type ruby—i.e., it tells you where that command is located in your system.

```shell
$ cat ~/.bashrc
```
The cat command takes a filename as an argument and prints the contents of the file to the console screen.

```shell
$ echo $(which neqn)
$ cat $(which neqn)
```
In this script we display the location and then we display the content of the file
To call this bash file named intro:
```shell
$ sh intro
```
You can add this at the start of the file to not need sh.
```shell
$ !/bin/bash
```
Its called the shebang, it allows you to define which program run to interpret the script.

Now you'll still ned to set a file permission so you can execute the shell scrupt as a program.
Do this :
```shell
$ chmod +x intro
$ ./intro
```
chmod is change mod command and pass the argument x which make it executable. 
