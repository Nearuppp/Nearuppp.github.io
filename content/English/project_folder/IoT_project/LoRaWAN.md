---
title: "LoRaWAN Integration in Alpha Hypervision"
date: 2024-06-09
description: "Detailed description of the LoRaWAN integration in the Alpha Hypervision project."
tags: ["Project", "LoRaWAN", "IoT", "Wireless Communication", "The Things Network", "Arduino", "SODAQ", "MQTT"]
---

## LoRaWAN Integration in Alpha Hypervision

In the Alpha Hypervision project, we integrated **LoRaWAN** technology to facilitate efficient and long-range wireless communication for server room supervision. Here’s an overview of the process and the steps we took to implement this technology:

### Step 1: Understanding LoRaWAN
**LoRaWAN** (Long Range Wide Area Network) is a protocol designed for low-power wireless communication over long distances. It is particularly suitable for IoT applications due to its low energy consumption and ability to cover wide areas.

### Step 2: Selecting the Hardware
For our project, we chose the **LoRa Explorer Kit**, which includes the necessary modules to set up a LoRaWAN network. The kit consists of:
- LoRa modules
- Arduino-compatible microcontrollers
- Sensors for monitoring environmental conditions in the server room

### Step 3: Utilizing the SODAQ Library
To simplify the development process, we used the **SODAQ LoRaWAN library** for Arduino. This library provides a straightforward way to interface with LoRa modules and facilitates the communication process. The steps involved were:
- Installing the SODAQ LoRaWAN library via the Arduino Library Manager
- Using the library functions to initialize the LoRa module, configure settings, and send data
- Writing Arduino sketches to read sensor data and transmit it over the LoRa network

```c 
#include <Sodaq_RN2483.h> 

void setup() {
    // Initialize LoRa module
    Sodaq_RN2483 LoRaBee;
    LoRaBee.init();

```

### Step 4: Setting Up the Network
We configured the LoRaWAN network using **The Things Network (TTN)**, an open-source infrastructure that facilitates the deployment of LoRaWAN networks. The setup involved:
- Registering our devices on The Things Network
- Configuring the network server to manage the data flow
- Setting up the gateways to connect the devices to the network

![Registration](/img/registrationTTN.png)

### Step 5: Data Collection and Transmission
Once the network was set up, we focused on collecting data from various sensors. The sensors monitored different parameters in the server room, such as temperature, humidity, and air quality. The collected data was then transmitted via LoRaWAN to The Things Network. The process involved:
- Programming the microcontrollers to read data from the sensors using the SODAQ library
- Sending the data packets to the LoRa gateway
- Ensuring reliable and secure transmission of data to the network server

![Uplink](/img/Uplink.png)

### Step 6: Using MQTT with TTN
To manage and utilize the data within **The Things Network (TTN)**, we employed **MQTT (Message Queuing Telemetry Transport)**, a lightweight messaging protocol ideal for IoT applications. The steps included:
- Configuring MQTT integration in TTN to subscribe to device data
- Setting up an MQTT client to connect to TTN’s MQTT broker
- Using the MQTT protocol to retrieve and process data from TTN, ensuring real-time data availability

### Step 7: Data Processing and Visualization
After the data was transmitted to The Things Network and retrieved via MQTT, it was processed and stored in an **InfluxDB** database. We used **Node-RED** to create a data pipeline that facilitated the processing and routing of data. The final step involved visualizing the data using **Grafana** to create a dynamic dashboard for monitoring the server room conditions. This included:
- Setting up Node-RED flows to handle data ingestion and processing from MQTT
- Storing the processed data in InfluxDB
- Creating dashboards in Grafana to display real-time data

### Step 8: Testing and Optimization
The final phase involved testing the entire setup to ensure its reliability and accuracy. We conducted extensive tests to verify:
- The range and coverage of the LoRaWAN network
- The accuracy and consistency of the sensor data
- The responsiveness and functionality of the dashboard

### Conclusion
Integrating LoRaWAN into the Alpha Hypervision project provided us with a robust and efficient solution for monitoring server room conditions. The long-range, low-power capabilities of LoRaWAN, combined with the flexibility of The Things Network and the use of the SODAQ library for Arduino and MQTT for data management, enabled us to create a reliable system that can operate effectively in an IoT environment.
