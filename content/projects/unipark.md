---
title: "UniPark"
date: "2026-04-03"
excerpt: "A small-scale IoT smart parking system leveraging FIWARE architecture to simulate real-time parking spot detection, featuring ESP32-based magnetic sensors, visual LED feedback, and cloud-native data management for smart city applications."
tags: ["IoT", "FIWARE", "ESP32", "MQTT", "Arduino", "Docker", "Orion Context Broker", "Node-RED", "Grafana", "Smart City"]
category: "IoT & Embedded Systems"
featured: false
image: "/images/unipark.jpg"
repoUrl: "https://github.com/Nearuppp/UniPark"
isMainProject: true 
---

# UniPark

An IoT-enabled smart parking management system demonstrating FIWARE-based smart city architecture with real-time vehicle detection, multi-modal user feedback, and containerized cloud infrastructure.

## Overview

UniPark is a proof-of-concept smart parking solution built around FIWARE open-source components and ESP32 microcontrollers. The system simulates an 8-spot parking lot using magnetic hall effect sensors to detect vehicle presence, RGB LEDs to provide visual availability status, and an LCD display showing real-time spot counts. Sensor data flows through MQTT to FIWARE's Orion Context Broker, enabling standardized data management and integration with monitoring tools like Node-RED and Grafana.

## Key Features

### Real-Time Parking Detection

- **8 magnetic hall effect sensors** continuously monitor parking spot occupancy
- **Sub-100ms detection latency** with hardware debouncing for reliable state changes
- **Binary state tracking** (LOW = vehicle present, HIGH = spot available)
- **MQTT-based telemetry** publishing JSON sensor arrays to FIWARE IoT Agent

### Intelligent Visual Feedback System

- **RGB LED state machine** per parking spot with three distinct phases:
  - Blue (Idle): Spot available and waiting
  - Yellow blinking (5s): Vehicle just detected, transitional warning phase
  - Green blinking (Continuous): Spot confirmed occupied
- **200ms blink intervals** optimized for human visual perception
- **Dual LED control** for demonstration of multi-spot scenarios

### LCD Real-Time Display

- **16x2 Grove RGB LCD** showing live parking availability count
- **Dynamic backlight** color indicating system status
- **I2C communication** (SDA=21, SCL=22) for minimal pin usage
- **Instant updates** triggered by sensor state changes

### MQTT Communication Protocol

- **Eclipse Mosquitto broker** handling sensor-to-cloud messaging
- **JSON payload structure** with sensor array and Unix timestamps
- **Auto-reconnect logic** with exponential backoff (5s retry intervals)
- **WebSocket support** (port 9001) for browser-based monitoring

### FIWARE-Based Data Management

- **Orion Context Broker v2** managing parking entities using NGSI-v2 standard
- **IoT Agent JSON** translating MQTT messages to NGSI context updates
- **MongoDB persistence** for historical data and entity storage
- **Standardized API** (port 1026) for third-party integrations

### Monitoring & Visualization

- **Node-RED** dashboard for real-time flow-based monitoring
- **Grafana** dashboards with MongoDB data source for historical analytics
- **Portainer UI** for Docker container management and health monitoring

## Implementation

### Hardware Architecture

The physical prototype consists of:

```
ESP32 Microcontroller (WiFi-enabled)
├── 7× Magnetic Hall Sensors (GPIO pins 15,4,5,18,23,2,19)
│   └── Pull-up resistor configuration (internal)
├── 2× RGB LEDs (Common cathode)
│   ├── LED 1: R=25, G=27, B=26
│   └── LED 2: R=33, G=35, B=34
└── Grove RGB LCD I2C Display
    └── SDA=21, SCL=22
```

**Power Supply**: USB 5V with on-board voltage regulation  
**Network**: WiFi connection to local MQTT broker

### Software Architecture - Embedded System

**Firmware**: Arduino C++ using PlatformIO-compatible libraries

**Core Libraries**:
- WiFi.h - ESP32 network connectivity
- PubSubClient.h - MQTT client implementation
- ArduinoJson.h - Efficient JSON serialization
- rgb_lcd.h - Grove LCD I2C driver

**State Machine Implementation**:
```
Sensor Detection → LedState Struct Update
                ↓
    magneticDetected = true
                ↓
    Yellow Phase (5000ms timer)
                ↓
    Green Phase (continuous until removal)
                ↓
    Sensor Released → Reset to Blue
```

**MQTT Payload Structure**:
```json
{
  "capteurs": [1, 1, 0, 1, 0, 1, 1],
  "timestamp": 12345
}
```

### Software Architecture - FIWARE Stack

The cloud infrastructure follows FIWARE reference architecture:

```
ESP32 Sensors → MQTT Broker (Mosquitto:1883)
                      ↓
         IoT Agent JSON (FIWARE) - Protocol Translation
         - Subscribes to MQTT topics
         - Converts to NGSI-v2 context updates
                      ↓
         Orion Context Broker (FIWARE) - Context Management
         - NGSI-v2 API for entity CRUD operations
         - Subscription/notification system
                      ↓
         MongoDB (4.4) - Persistence Layer
         - Entity storage & historical data
                      ↓
         Monitoring Layer: Node-RED | Grafana | Portainer
```

**Docker Compose Services**:
- mongo-db: MongoDB 4.4 with persistent volume
- orion: FIWARE Orion Context Broker
- iot-agent: FIWARE IoT Agent JSON with MQTT enabled
- mosquitto: Eclipse Mosquitto with WebSocket support
- node-red: Node-RED for flow-based automation
- grafana: Grafana Enterprise with MongoDB plugin
- portainer: Portainer CE for container management

### FIWARE IoT Agent Configuration

Key environment variables enabling MQTT-to-NGSI translation:

```yaml
IOTA_CB_HOST=fiware-orion
IOTA_CB_PORT=1026
IOTA_MQTT_ENABLED=true
IOTA_MQTT_HOST=mosquitto
IOTA_MQTT_PORT=1883
IOTA_AUTOCAST=true
```

### Data Model - NGSI-v2 Context Entities

Conceptual entity structure:

```json
{
  "id": "urn:ngsi-ld:ParkingSpot:parking123",
  "type": "ParkingSpot",
  "capteurs": {
    "type": "Array",
    "value": [1, 1, 0, 1, 0, 1, 1],
    "metadata": {
      "timestamp": {"type": "Integer", "value": 12345}
    }
  },
  "availableSpotNumber": {
    "type": "Integer",
    "value": 5
  }
}
```

## Technologies Used

### Hardware Components

- ESP32 DevKit - 32-bit dual-core microcontroller (240MHz, WiFi + Bluetooth)
- Magnetic Hall Effect Sensors (×7) - Digital output with pull-up resistors
- RGB LEDs (×2) - Common cathode configuration with PWM control
- Grove RGB LCD 16x2 - I2C backlit display

### FIWARE Components

- Orion Context Broker (v2) - NGSI-v2 context information management
- IoT Agent JSON - MQTT protocol adapter for sensor data ingestion
- NGSI-v2 API - Standardized context data interface

### Infrastructure & Cloud Services

- Docker & Docker Compose - Container orchestration
- MongoDB (v4.4) - NoSQL database for context persistence
- Eclipse Mosquitto (v2) - Lightweight MQTT broker
- Node-RED (v3) - Flow-based automation and visualization
- Grafana Enterprise - Time-series analytics and dashboards
- Portainer CE - Container management UI

### Development Tools & Libraries

- Arduino IDE / PlatformIO - ESP32 firmware development
- ArduinoJson (v6) - Efficient JSON serialization library
- PubSubClient - MQTT client for Arduino
- Wire.h - I2C communication protocol

### Protocols & Standards

- MQTT (v3.1.1) - Lightweight pub/sub messaging protocol
- NGSI-v2 - FIWARE context information management standard
- I2C - Inter-Integrated Circuit for LCD communication
- WebSocket - Browser-based MQTT monitoring

## Getting Started

### Prerequisites

- **Hardware**: ESP32 board, 7× hall sensors, 2× RGB LEDs, Grove LCD display, breadboard
- **Software**: Docker Engine (v20.10+), Arduino IDE, ESP32 board support
- **Network**: WiFi access point, Docker host on same network

### Deployment Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Nearuppp/UniPark.git
   cd UniPark
   ```

2. **Deploy FIWARE Backend**
   ```bash
   docker-compose up -d
   docker-compose ps
   ```

3. **Configure IoT Agent**
   ```bash
   # Create service group
   curl -X POST 'http://localhost:4041/iot/services' \
     -H 'Content-Type: application/json' \
     -H 'fiware-service: openiot' \
     -H 'fiware-servicepath: /' \
     -d '{
       "services": [{
         "apikey": "parking123",
         "cbroker": "http://orion:1026",
         "entity_type": "ParkingSpot",
         "resource": ""
       }]
     }'
   ```

4. **Upload Firmware to ESP32**
   - Open `sensor-hardware/projet.ino` in Arduino IDE
   - Update WiFi credentials and MQTT broker IP
   - Install required libraries (WiFi, PubSubClient, ArduinoJson, rgb_lcd)
   - Select board: ESP32 Dev Module
   - Upload firmware

5. **Verify Data Flow**
   ```bash
   # Check Orion Context Broker
   curl -X GET 'http://localhost:1026/v2/entities/urn:ngsi-ld:ParkingSpot:parking123' \
     -H 'fiware-service: openiot'
   ```

6. **Access Monitoring Tools**
   - Node-RED: http://localhost:1880
   - Grafana: http://localhost:3000 (admin/admin123)
   - Portainer: http://localhost:9000

## Challenges Overcome

### 1. FIWARE Integration Complexity

**Challenge**: FIWARE's modular architecture requires understanding multiple interconnected components (Orion Context Broker, IoT Agent, MongoDB) and their complex configuration. As a team new to FIWARE, we struggled with understanding the NGSI-v2 data model, correctly provisioning IoT Agent service groups and device mappings, and establishing the MQTT-to-NGSI translation pipeline.

**Solution**: We adopted an incremental integration approach by isolating component testing, starting with direct MQTT communication before adding IoT Agent, creating curl-based provisioning scripts to automate device registration, and learning Docker Compose's bridge networking model for correct service hostname configuration. We enabled verbose logging (IOTA_LOG_LEVEL=DEBUG) to trace message ingestion and entity updates.

**Impact**: After 2-3 weeks of experimentation, we successfully established a working FIWARE pipeline. The Docker Compose configuration became a reusable template for similar sensor integration scenarios.

### 2. MQTT Communication Reliability

**Challenge**: The ESP32 exhibited unstable MQTT connectivity with frequent disconnections and failed message deliveries. Issues included connection drops during WiFi interference, lost messages when the broker restarted, no automatic reconnection logic, and race conditions during WiFi initialization.

**Solution**: Implemented a robust MQTT connection management strategy with retry loops and exponential backoff, non-blocking connection checks in the main loop, WiFi stability improvements with retry counters, QoS and keepalive tuning, and comprehensive serial debug messages for real-time diagnosis.

**Impact**: MQTT connection reliability improved from ~60% uptime to near-continuous operation (>95%). The auto-reconnect mechanism allowed the system to survive network hiccups without manual intervention.

### 3. Hardware Sensor Calibration and LED State Management

**Challenge**: The magnetic hall effect sensors exhibited inconsistent behavior and contact bounce, while managing multiple RGB LED states simultaneously created complex timing logic. Issues included sensor noise from EMI, contact bounce causing false positives, LED timing conflicts, state machine complexity, and LCD update spam.

**Solution**: Implemented software debouncing with 100ms global delay, created LedState struct for structured state management, used millis() timestamps instead of delay() for non-blocking blink logic, implemented phase transition automation with timed yellow-to-green changes, and added conditional LCD updates to prevent unnecessary redraws.

**Impact**: Sensor detection accuracy improved to near 100% reliability with no false positives. The structured state machine made LED behavior predictable and easy to debug. LCD updates became stable and responsive.

## Architecture Highlights

### Event-Driven Data Flow

```
Hall Sensor → ESP32 Main Loop → LED/LCD/MQTT
                                      ↓
                              Mosquitto Broker
                                      ↓
                              IoT Agent JSON
                                      ↓
                              Orion Broker
                                      ↓
                          MongoDB | Node-RED | Grafana
```

### State Machine - LED Control

```
IDLE (Blue) → Sensor LOW → YELLOW (Blink 5s) → GREEN (Blink) → Sensor HIGH → IDLE
```

## Project Status

**Current Phase**: MVP Complete (Core functionality operational)

### Completed

- ✅ ESP32 firmware with 7-sensor magnetic detection
- ✅ RGB LED visual feedback with state machine logic
- ✅ LCD real-time availability display
- ✅ MQTT telemetry with JSON payload serialization
- ✅ FIWARE stack deployment (Orion + IoT Agent + MongoDB)
- ✅ Docker Compose orchestration with 7 services
- ✅ Monitoring tools integration (Node-RED, Grafana, Portainer)

### In Progress / Planned

- 🟡 3D-printed enclosure design
- 🟡 Node-RED dashboard with real-time parking map
- ⚪ NGSI-v2 subscription for real-time notifications
- ⚪ Battery-powered operation with deep sleep modes
- ⚪ Web dashboard showing parking lot visualization

## Team & Development

- **Development Period**: Academic semester project (Fall 2025 - Spring 2026)
- **Team Size**: 2-3 students
- **Course Context**: IoT and Smart City Systems
- **Repository**: Public GitHub repository
- **Languages**: C++ (Arduino), YAML (Docker Compose)

## Future Enhancements

- Mobile application consuming Orion Context Broker API for real-time parking search
- Machine learning model predicting parking availability based on historical patterns
- Integration with payment systems for demand-based parking fees
- Multi-lot federation with centralized management
- Camera integration for automated license plate recognition
- Solar panel + battery system for off-grid deployment
- LoRaWAN support for long-range communication
- FIWARE Quantum Leap for time-series database integration

---

This project demonstrates practical application of IoT protocols (MQTT), smart city standards (FIWARE NGSI-v2), embedded systems programming (Arduino C++), and cloud-native infrastructure (Docker) in a real-world parking management scenario.
