---
title: "Proteus Alpha"
date: 2024-06-09
description: "Detailed description of the process for designing the PCB card for Alpha Hypervision using Proteus 8."
tags: ["Project", "PCB Design", "Proteus 8", "Arduino", "LoRa", "Multimeter"]
---

## PCB Design Process for Alpha Hypervision

For the Alpha Hypervision project, we chose to use **Proteus 8** software for designing our PCB (Printed Circuit Board). Here’s a detailed look at the steps involved in the process:

### Step 1: Schematic Design
The first step was to draw the schematic for each circuit. This involved:
- Designing the individual circuit components.
- Connecting these components to each other.
- Integrating them with the Arduino board to ensure proper connectivity.

![Circuit Schematic](/img/schematicproteus.png)

### Step 2: PCB Layout Design
Next, we transitioned to designing the PCB layout. This involved:
- Arranging the components on the PCB.
- Drawing the traces (pistes) to connect the components.
- Ensuring the traces were wide enough to prevent any printing issues.

![PCB Disposition](/img/PCBProteus.png)

### Step 3: Exporting and Printing
Once the PCB layout was complete, we:
- Exported the design files from Proteus 8.
- Sent these files to the PCB printer for fabrication.

![Printed card](/img/CarteImprime.png)

### Step 4: Drilling and Soldering
After the PCB was printed, we proceeded with:
- Drilling holes for each component.
- Soldering the components onto the PCB, ensuring that the pins corresponded correctly to the Arduino to create a shield for our LoRa explorer card.

![Drill](/img/perceuse.jpg)

### Step 5: Verification
The final step was to verify our work:
- Using a multimeter, we checked each connection to ensure they were functioning properly.
- Once confirmed, we plugged in our card for use.

### Here's the final