---
title: "Maze Robot"
date: 2024-07-28
description: "Project developed at UniLaSalle, focused on creating a maze-solving autonomous robot."
tags: ["Project", "Robotics", "Arduino", "Sensors", "Autonomous Systems", "Programming", "Engineering"]
---

## Project Overview
The "Maze Robot" is a collaborative project undertaken by myself and Benjamin Bonhomme at **UniLaSalle**. The primary objective was to design and build a robot capable of navigating and exiting a maze without external assistance.

## Implementation

### 1. Introduction
In this project, we developed a robot to autonomously navigate a maze, utilizing various electronic and mechanical components, including an Arduino board and distance sensors.

### 2. Hardware Presentation

#### 2.1 [Mechanical Part](../../project_folder/maze_robot/mechanical_electronic/)
- **Chassis**: Constructed using PLA, the chassis supported all components.
- **Wheels and Ball**: The robot featured wheels driven by servomotors and a multidirectional ball for stability.
- **Sensor Mount**: A custom mount was designed for optimal sensor placement, enhancing obstacle detection.

#### 2.2 [Electronic Part](../../project_folder/maze_robot/Electronic_part/)
- **Servomotors**: Controlled the wheels for precise movement.
- **Distance Sensors (VL6180X)**: Detected obstacles up to 20 cm away.
- **Maker Nano Board**: Served as the main control unit.
- **Battery**: Provided power for the entire system.

#### 2.3 [Microcontroller (Arduino, IDE...)](../../project_folder/maze_robot/Program_control/)
- **Programming**: The robot's software, developed in the Arduino IDE, processed sensor data to navigate the maze autonomously.

### 3. [Strategy and Program Presentation](../../project_folder/maze_robot/Function.md/)
The strategy involved using sensor data to make navigation decisions, controlling motors, and guiding the robot through the maze.

## Technologies Used
* **Arduino**: Central microcontroller for processing inputs and controlling outputs.
* **PLA**: Material used for 3D printing the chassis.
* **Servomotors**: For wheel control.
* **Distance Sensors**: For obstacle detection.
* **Arduino IDE**: For software development.


## Outcome
The "Maze Robot" successfully demonstrated the ability to navigate and exit a predefined maze autonomously. The project met its objectives by effectively integrating hardware and software, showcasing practical applications of robotics and sensor technology in problem-solving scenarios.

