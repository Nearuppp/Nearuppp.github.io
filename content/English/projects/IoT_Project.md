---
title: "Alpha Hypervision"
date: 2024-06-09
description: "Here you'll find the project I've created with my friends at UniLaSalle"
tags: ["Project", "Electronic","Docker","StormShield","LoraWan","Proteus","The Things Network"]
---


## Project Overview
Alpha Hypervision is a collaborative project developed by myself and my friends, Charles-Clement Andrade and Thomas Wimart, during our IoT class at **UniLaSalle Amiens**. The primary objective of this project was to create a device utilizing **LoRaWAN technology** to enhance the supervision and monitoring of server rooms.

## Project Goals
The goal was to implement a comprehensive monitoring system for server rooms. This system would track various characteristics and conditions within the server room, ensuring optimal operation and maintenance.
## Implementation
To achieve this, we designed a data pipeline using **Node-RED**. This pipeline collected data from sensors and transmitted it via **The Things Network**. The data was then stored in an **InfluxDB** database. We created a dynamic dashboard to visualize this data, providing our professor with a valuable tool for monitoring and managing the server room.

## Technologies Used
* [**LoRaWAN**](../../project_folder/iot_project/lorawan/): For long-range, low-power wireless communication.
* **Docker**: To containerize and deploy our application.
* **StormShield**: For IoT device security.
* [**Proteus**](../../project_folder/iot_project/proteus_alpha/) : For PCB design and simulation.
* **The Things Network**: For data transmission.
* **InfluxDB**: For time-series data storage.
* **Node-RED**: For building the data pipeline.
## Outcome
Alpha Hypervision successfully provided a reliable and efficient way to supervise server room conditions, helping to maintain server performance and prevent potential issues. This project not only met its technical goals but also offered practical benefits for server room management.