---
title: "Maze Robot Programming and Control"
date: 2024-07-28
description: "Detailed overview of the programming structure and logic for the Maze Robot project at UniLaSalle."
tags: ["Project", "Programming", "Robotics", "Arduino", "Sensors", "Control Systems"]
---

## 2.3.1 Complete Structure
The programming phase was crucial for developing a solution to navigate the maze. We used an intelligent approach, coding various functions to handle all possible scenarios in the maze based on real-time analysis and execution.

### Code Structure:
- **Declarations**: Includes libraries for servo control (`servo.h`) and sensors (`VL6180X.h`). Defined sensor addresses and declared variables for sensor data handling.
  
 ```c
 #include<VL6180X.h>
 #define address1 0x20
 #define address2 0x22
 #define address3 0x24

 VL6180X CapteurGauche;
 VL6180X CapteurCentrale;
 VL6180X CapteurDroite;
 
 Servo MoteurDroite;
 Servo MoteurGauche;

 int CG=0;
 int CC=0;
 int CD=0;
 ```

- **Setup**: Initializations of ports and components. Servomotors were attached to digital pins and set to 90° to prevent premature movement. Sensors were initialized, addresses set, and measurement accuracy configured.

```c
 void setup() 
 { 
    Serial.begin(9700);
    MoteurDroite.attach(2);
    MoteurGauche.attach(4);
    pinMode(10, OUTPUT);
    pinMode(11, OUTPUT);
    pinMode(12, OUTPUT);
    digitalWrite(10, LOW);
    digitalWrite(11, LOW);
    digitalWrite(12, LOW);
    MoteurDroite.write(90);
    MoteurGauche.write(90);
    delay(1000);
    }
    //capteurG
    digitalWrite(12,HIGH);
    delay(50);
    capteurGauche.init();
    capteurGauche.configureDefault();
    capteurGauche.setAddress(address1);
    Serial.println(capteurGauche.readReg(0x212),HEX);
    capteurGauche.writeReg(VL6180X::SYSRANGE__MAX_CONVERGENCE_TIME, 30);
    capteurGauche.writeReg16Bit(VL6180X::SYSALS__INTEGRATION_PERIOD, 50);
    capteurGauche.setTimeout(500);
    capteurGauche.stopContinuous();
    capteurGauche.setScaling(1);
    delay(300);
    capteurGauche.startInterleavedContinuous(100);
    delay(100);
```

- **Loop**: This part continuously executes after setup, using sensor data to make navigation decisions. We implemented serial monitoring to display sensor values for troubleshooting and calibration.

```c
    void loop()
    {
        CapteurGauche=CapteurGauche.readRangeContinuousMillimeters();
        Serial.println(" Capteur gauche: ");
        Serial.println(CapteurGauche);
        CapteurCentrale=CapteurCentrale.readRangeContinuousMillimeters();
        Serial.println(" Capteur centre: ");
        Serial.println(CapteurCentrale);
        CapteurDroite=CapteurDroite.readRangeContinuousMillimeters();
        Serial.println(" Capteur droit: ");
        Serial.println(CapteurDroite);
    }
```

### Detailed Programming Elements:
- **Servo Motor Control**: Utilized `moteur.write(angle)` to control wheel movement based on sensor inputs.
- **Sensor Data Handling**: Collected distance measurements to inform movement decisions, ensuring the robot follows the maze path efficiently.

```c
    if(CapteurCentrale > 180)
    {
        if(CapteurGauche > 90 && CapteurDroite > 80)
        {
            MoteurGauche.write(120);
            MoteurDroite.write(60);
        }
        if(CapteurGauche < 80)
        {
            int dG = map(CapteurGauche,90,5,3,15);
            MoteurGauche.write(120);
            MoteurDroite.write(60+dG);
        }
        if(CapteurDroite < 80)
        {
            int dD = map(CapteurDroite,90,5,3,15);
            MoteurGauche.write(120-dD);
            MoteurDroite.write(60);
        }
    }

    if(CapteurCentrale < 180)
    {
        int dC = map(CapteurCentrale,140,10,5,20);
        int dD = map(CapteurDroite,100,10,1,7);
        int dG = map(CapteurGauche,100,10,1,7);
        if(CapteurDroite < CapteurGauche)
        {
            MoteurGauche.write(105-dC-dD);
            MoteurDroite.write(70);
        }
        if(CapteurDroite > CapteurGauche)
        {
            MoteurGauche.write(110);
            MoteurDroite.write(75+dC+dG);
        }
    }
```
### Main Cases for Servo Angles:
| Angle         | Left Servomotor | Right Servomotor |
|:--------------|:---------------:|-----------------:|
| [0 ; 90[      | Backward        | Forward          |
| 90            | Stop            | Stop             |
| ]90 ; 180]    | Forward         | Backward         |


The logic implemented ensures the robot can adapt to different maze configurations, advancing or turning as necessary to find the exit.

---

This summary captures the essence of the programming strategy and the technical details involved in making the Maze Robot function as intended. The images should be placed in the corresponding `path/to/your_image` locations, replaced with actual image file paths or URLs.
