---
title: "Maze Robot Electronics and Wiring"
date: 2024-07-28
description: "Detailed overview of the electronic components and wiring for the Maze Robot project at UniLaSalle."
tags: ["Project", "Electronics", "Robotics", "Arduino", "Sensors", "Wiring"]
---

## 2.2.1 General Structure
The electronic system forms the core of our robot's control mechanism. It includes a microcontroller, continuous rotation servomotors, distance sensors, and a battery, all essential for the robot's autonomous operation.


### Key Components:
- **Microcontroller (Maker Nano)**: Executes the code and controls various peripherals, including servomotors and sensors.
![Maze Robot Electronics](/img/makernano.jpg)
- **Servomotors**: Drive the robot's wheels, offering a balance of low power consumption and adequate speed (around 100 RPM at 4.8V).
![ServoMotor](/img/servomoto.jpg)
- **Distance Sensors (VL6180X)**: Provide millimeter-precision measurements up to 20 cm, crucial for navigating the maze.
![VL6180X](/img/VL6180X.jpg)
- **Battery (PB-Lipstick)**: Supplies 2500 mAh, ensuring long operation time without the need for frequent recharging.
![(PB-Lipstick)](/img/(PB-Lipstick).jpg)



## 2.2.2 Wiring and Operation Principle
Understanding the operation of each component was vital before installation, ensuring an optimal and non-intrusive wiring setup.
![Wiring Diagram](/img/Assembly.png)

### Wiring Details:
- **Servomotors**: Simple connections with power (5V), ground (GND), and control signals linked to the Nano's digital ports.
![ServoMotor Schema](/img/servoschema.png)
- **Sensors**: Connected via the I2C protocol, using SDA and SCL lines for data and clock signals, respectively. Unique GPIO0/CE pins allow individual sensor addressing.
![VL6180X Schema](/img/VL6180XS.png)

### Servomotor Function:
Servomotors adjust their position based on input signals, controlled via code. The internal mechanism includes a feedback loop with a potentiometer and gears, ensuring precise movement control.
![Tension](/img/tension.png)

### Sensor Function:
The VL6180X sensors use the I2C protocol to communicate with the microcontroller, measuring distances to guide the robot's navigation through the maze.

