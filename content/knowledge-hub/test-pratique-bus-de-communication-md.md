---
title: Travaux Dirigés – Bus de Communication
excerpt: A practical study session on communication buses, covering UART, RS232, RS485, CAN bus, and I2C protocols with real-world calculation examples.
tags:
  - Electronics
  - Communication
  - UART
  - CAN
  - RS485
  - I2C
  - Study
  - French
category: Electronics
---
![Page 1 test pratique Bus de Communication](Page%201%20test%20pratique%20Bus%20de%20Communication.jpeg)
Pour le premier Octet representant l'address du camion (10) 10₁₀ = 000 1010₂= 0x0A
Le deuxieme Octet D = marche avant donc 1, C = sur 14 pas donc 0 et  B₃B₂B₁B₀=0101 donc = 01100101 = 0x65
Le troisieme XOR entre 000 1010 et 01100101
0000 1010
0110 0101
0110 1111= 0x6F = 111 en decimal
En UART on dois envoyer a l'envers donc chaque bit:
0000 1010 -> 0101 0000
0110 0101 ->1010 0110
0110 1111 ->1111 0110
Chaque octet commence par une descente de 1->0 (start bit)
Puis octet, 8 bit et enfin le bit de fin a 1 (stop bit)
![Image Exercice 1 Bus de communication](Image%20Exercice%201%20Bus%20de%20communication.png)
-1c donc au total 30 bits pour un bit 1/9600 = 104.17 μs
Total = 30 * 104.17 μs = 3.125ms
![Page 2 test pratique Bus de Communication](Page%202%20test%20pratique%20Bus%20de%20Communication.jpeg)
1d 
**RS232** :
- Liaison **point-à-point** (1 émetteur, 1 récepteur)
- Transmission **asymétrique** (un seul fil + masse)
- Sensible au bruit et limité en distance (~15 m)
**RS485** 
- Liaison **multi-point** (plusieurs appareils sur le bus)
- Transmission **différentielle** (deux fils)
- Meilleure résistance aux perturbations électromagnétiques
- Portée beaucoup plus longue (~1200 m)
**Pourquoi choisir RS485 ici ?**
- Parce que le camion et le STM32 peuvent être éloignés
- Parce que plusieurs camions pourraient partager le même bus série (communication multi-esclave)
1 e
Peut-on faire un contrôle de flux avec RS485 ?
Oui, **mais pas de manière automatique** comme avec RS232 (qui utilise RTS/CTS). Il faut le gérer **dans le protocole logiciel**, pas avec des fils dédiés.
Qu’est-ce qu’un contrôle de flux ? C’est un mécanisme pour éviter qu’un appareil **envoie trop de données** plus vite que l’autre ne peut les traiter.
Deux types de contrôle de flux :
1. **Contrôle matériel (RTS/CTS)**
    - Utilise des fils physiques (RS232 uniquement)
    - Pas possible en RS485 directement
2. **Contrôle logiciel (XON/XOFF)**
    - Envoie de caractères spéciaux pour dire « stop » ou « continue »
    - Peut être utilisé avec RS485 si le protocole les prend en compte
![Page 3  test pratique Bus de Communication](Page%203%20%20test%20pratique%20Bus%20de%20Communication.jpeg)

![Correction Matthieu et Thomas Bus de comm exo 2](Correction%20Matthieu%20et%20Thomas%20Bus%20de%20comm%20exo%202.png)111100000100000100000100100000100010000010010100100000101110111111111111111
ID = 00000000000
Nb Data = 2octet
CRC =0100100000011101

2b 
Premier octet = 00000001
Deuxieme octet = 00000001
(1* 100)*1 =  100km/h
![2a partie 2 Bus de communication](2a%20partie%202%20Bus%20de%20communication.png)
2c
Le champ **ACK (Acknowledge)** contient **2 bits** :
-  **ACK Slot** → bit dominant (`0`) envoyé par un nœud récepteur si le CRC est correct.
- **ACK Delimiter** → bit récessif (`1`) qui suit toujours l’ACK Slot.
Le **champ ACK est positionné par les nœuds récepteurs** de la trame (ex. : la carte STM32)
2d
Si c'est une trame classic donc 66 bit * 10 microseconde
![Page 4  test pratique Bus de Communication](Page%204%20%20test%20pratique%20Bus%20de%20Communication.jpeg)
3a formule du quantum = Vref/2^n
3.3/2^16 
3b 
La broche SCL et SDA . SCL est l'horloge et SDA est la donnee
3c

|Module ADS1115|STM32 (ex : STM32F103)|
|---|---|
|VDD|3.3V|
|GND|GND|
|SDA|SDA (ex : PB7)|
|SCL|SCL (ex : PB6)|
|ADDR|GND (adresse I2C = 0x48)|
|A0-A3|Potentiomètres (entrée analogique)|
Horloge 36MHz
BRR
	USARTDIV =  fCLK /(16 * 9600) = 234.375 
	Mantisse = 234
	on decale de 4 bit a gauche = 3750
	Fraction 0.375 * 16 = 6
	BRR=(mantisse<<4)∣fraction
	(234 << 4) | 6 = 0xEA6
CR1
	- `1 << UE` → `1 << 13` → 0x2000
	- `1 << TE` → `1 << 3` → 0x0008
	- `1 << RE` → `1 << 2` → 0x0004
	CR1 = 0x2000 | 0x0008 | 0x0004 = 0x200C
	0x2000 = 0010 0000 0000 0000
	0x0008 = 0000 0000 0000 1000
	0x0004 = 0000 0000 0000 0100
	
	0x200C = 0010 0000 0000 1100

CR2 
	Pas d'option particulière (pas de linemode, stop = 1 bit par défaut) : CR2 = 0x0000
CR3
	Aucune interruption, DMA ou fonctionnalité avancée : CR3 = 0x0000
![Page 5  test pratique Bus de Communication](Page%205%20%20test%20pratique%20Bus%20de%20Communication.jpeg)
4b

![Page 6  test pratique Bus de Communication](Page%206%20%20test%20pratique%20Bus%20de%20Communication.jpeg)