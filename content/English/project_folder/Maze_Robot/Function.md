---
title: "Navigation Strategy"
date: 2024-07-28
description: "Detailed overview of the electronic components and wiring for the Maze Robot project at UniLaSalle."
tags: ["Project", "Electronics", "Robotics", "Arduino", "Sensors", "Wiring"]
---


1. **When the center sensor detects an obstacle more than 14 cm away:**
   - The robot can choose to move forward or turn slightly left or right.
   - To move forward, the left and right sensors must detect obstacles at least 8 cm away.

![Left center](/img/left.png)

2. **When the center sensor detects an obstacle within 14 cm:**
   - The robot adjusts its speed and direction to avoid obstacles using a variable calculated by the “map” command, which refines movement based on sensor data.

![Right center](/img/right.png)

The distance of 14 cm was found to be optimal for navigating mazes, while a 7 cm distance is ideal for obstacle avoidance given the robot's width and the path size.


## Navigation for Distances Less Than 14 cm

When the center sensor detects an obstacle within 14 cm, the robot exits "Regulation" mode and has two options: turn left or turn right.

To handle varying turning conditions, the robot uses the “map” function to adjust its turning speed based on the detected turn. Since the robot encounters turns with different angles and positions, the turning speed must be dynamically adjusted. For example, when turning left, if the right sensor detects a smaller distance compared to the left sensor, the right wheel will adjust its speed accordingly to navigate the turn smoothly.

![Right](/img/TurnRight.png)
![Left](/img/TurnLeft.png)

## Turning Adjustment

When the center sensor detects an obstacle within 14 cm, the robot adjusts its turning approach based on its position at that moment. The program modifies the angle of the dominant servo motor for the turn by incorporating the values from the right and left sensors. This adjustment ensures the robot can adapt to each turn and determine the optimal angle for the servomotors.

Our solution relies on this principle: a straightforward and effective approach using sensors combined with the control of two servomotors, which enabled the robot to successfully navigate the maze.