---
title: Travaux Dirige of Bus of Communication
excerpt: A technical overview of communication interfaces, covering logical and physical adaptations for data exchange in digital and analog systems.
tags:
  - Electronics
  - Communication
  - Interfaces
  - Tutorial
  - DigitalSystems
  - French
category: Electronics
---
## Objectif
Mise en oeuvre d'une liaison serie asynchrone type RS232 autour du STM32.
## Sujet 
On se propose de concevoir un programme qui permettra au STM32 de communiquer avec un PC via Putty.
- Putty transmet sur le port serie choisi, les codes ASCII correspondant aux touches frappees au clavier. La frappe de la touche 'A' envoie le code ASCII de la lettre 'A' sur le port serie du PC (ligne TD).
- Putty affiche dans sa fenetre de reception les caracteres associes aux codes ASCII recus sur sont port serie.
## PARTIE 1 : etude du standard RS232
### A) Representez la connexion RS232 minimal entre le PC et la carte a MCBSTM32C pour une liaison Duplex.
Pour repondre, determinez le type de chaque appareil (ETTD ou ETCD) en vous aidant du schema en annexe. 

![Carte RS232](Carte%20RS232.md)
On peut voire que c'est un ETTD. Car c'est un ordinateur

| Signal | ETTD     | DB9         | DB9 MCBSTM32C (Role ETCD) |
| ------ | -------- | ----------- | ------------------------- |
| RX     | 2        | 2           | TX ==RX==                 |
| TX     | 3        | 3           | RX ==TX==                 |
| GND    | 5 (male) | 5 (femelle) |                           |

 Cable droit entre ETTD et DB9
### B) On transmet l'octet 0xAA sur une liaison serie asynchrone a 9600 bits/s avec 1 bit de stop et une parite paire
#### 1) dessinez le chronogramme en niveau logique de la ligne TD
Bit OxAA = 1010 1010
#### 2) dessinez le chronogramme en tension de la ligne TD au format RS232


![Chronogramme niveau logique](Chronogramme%20niveau%20logique.md)

## PARTIE 2 : etude de l'USART et du STM32 pour une liaison asynchrone
On veut ecrire un programme qui permette de recevoir des caracteres par scrutation (polling) des registres.

### 1) Lire la documentation technique des ports serie du STM32 (page 92)
### 2) Donnez les valeurs bit a bit des registres pour configurer l'USART2 comme suit :
- CR1
	- Autorisation de l'USART et blocage de l'émetteur et du récepteur 
- BRR
	- Vitesse de communication de 9600 Baud
- CR1 / CR2 / CR3 
	- Mode normal, parité impaire, 7bits/caractère (hors parite), 1 bit de STOP
	- Pas de commande automatique de RTS et CTS
	- Masquer toutes les interruptions émise par l'USART
Le bit de stop est a 00 car dans la documentation montre que 1bit de stop est egale a 00

Parite 7 bit donc CR1 word length = 0

9600 * (16 * USART DIV) = 36 MHz
16 * USART DIV = 36 Mhz/9600
USART DIV = (36 Mhz/9600s) / 16

![Pasted image 20250328094319](Pasted%20image%2020250328094319.png)
define USART2 ((USART_TypeDef*)USART2_BASE)
USART 2 - > BRR = 0xEA6;
### 3) Selon vous doit-on initialiser d'autre fonctions ou registres? 

- Activer les horloges de l'USART et du GPIOD
- Rediriger l'USART2 sur le GPIOD ( AFIO )
- Programme les lignes GPIOD selon les fonctionnalite

## Partie 3 : parametrage en langage C

### 1) Pour programmer en C les différents registres du STM32F107, nous allons utiliser le fichier stm32f10x_cl.h 
- Lisez ce fichier et expliquer sont utilité(certaines définitions sont fournies en annexe de ce TD).
- D'après la documentation des ports série asynchrones et sachant que l'adresse de base est 0x40014400, expliquez pourquoi le type de base des registres est un "uint16_t" et pourquoi on utilise des champs nommes "RESERVEDn" dans la structure globale?
1) Pas besoin de redéfinir les registres
2) reserved Pour que la structure logicielle soit identique a la structure matérielle (offsets et tailles)
### 2) En utilisant stm32f10x_cl.h ecrivez les instructions C pour initialiser le port serie 2 du STM32F107 avec les parametres vus dans "PARTIE 2/2". Pour l'ordre d'initialisation des registres, vous referer a la documentation.

void init USART2(void) 
{
//activer l'horloge USART2 (ABB1)
}

USART2 -> BRR = 0xEA6; //Example
7 6 5 4 3 2 1 0
F E P C B A x 0 
0 0 1 0 0 0 0 1
   2       1

```c
void initSerial(void){
	 RCC - > APB2ENR |=0x21;//init horloges AFIO et GPIOD
	 RCC - > APB1ENR |=1<<17;//init horloge USART 2
	 AFIO - > MAPR//redirection de l'USART2
					// 76543210 Ligne active
	 GPIOD - > CRL &=0xF00FFFFF // configuration des lignes 5 et 6 a 0 
	 GPIOD - > CRL |=0x04B00000//PD5 entree flottante
	 //PD6 sortie et alternative
	 USART2 - > BRR = 0xEA6
	 USART2 - > CR2 = 0;
	 USART2 - > CR3 = 0;
	 for(i=0;i<0x100,i++)__NOP(); //eviter un envoie de connecteur
	 USART2 - > CRL =0x2608; // USART2 en reception
}

int main(void){
	SystemInit();//Init de la PLLet des horloges systeme
	initSerial();//init USART2
	GLCD_Init(); //init LCD
	while(1){
		while((USART ->SR &0x20)!=0x20){}//attendre l'arrivee d'un caractere
	message[i]=USART2->DR &0x7F; //7bits
	message[i+1]="\0";//ajouter la fin de la chaine
	} //boucle infinie
}
```
![Broche STM32](Broche%20STM32.md)
## Partie 4 : Programme de réception de caractères
On désire stocker dans un tableau les 10 prochains caractères reçus sur le port série. Pour être averti de l'arrivée d'un caractère, il faut scruter un bit particulier du registre d'état SR.
Ecrivez le programme correspondant en C.

```c
#include <stdint.h>

#define SR    (*(volatile uint8_t*)0x40013800)  // Adresse fictive du registre d'état
#define DR    (*(volatile uint8_t*)0x40013804)  // Adresse fictive du registre de données
#define RXNE  (1 << 5)  // Supposons que le bit 5 de SR indique la disponibilité des données

void reception_characters(void) {
    char buffer[10];  // Tableau pour stocker les caractères reçus
    int count = 0;

    while (count < 10) {
        if (SR & RXNE) {  // Vérifie si un caractère est disponible
            buffer[count] = DR;  // Lecture du caractère
            count++;  // Incrémente le compteur
        }
    }// À ce stade, le buffer contient les 10 caractères reçus
}
```
Documentation fichier : [stm32f10x_cl.h](stm32f10x_cl.h.md)


## Partie 5 : Programme d'émission de caractères
### 1) Lorsque l'UART est configure, on envoie un caractère en l'écrivant dans le registre DR. Un programme peut-il envoyer plusieurs caractères en les écrivant de façon consécutive dans le registrer DR ?
Non : il faut attendre l'envoi du caractère précèdent
```Algo
debut
	init horloges system
	init USART2 en transmission
	faire
		attendre que TXE passe a 1
		si 1=0 envoyer "1" 1<-1
		sinon enovyer "2" 1<-0
		fin si
	toujours
fin
```
```c
#include <stdint.h>

#define SR    (*(volatile uint8_t*)0x40004400)  // Registre d'état USART2 (adresse fictive)
#define DR    (*(volatile uint8_t*)0x40004404)  // Registre de données USART2
#define TXE   (1 << 7)  // Bit TXE dans SR (prêt à transmettre)

void init_system_clock(void) {
    // Initialisation des horloges (dépend du microcontrôleur, à compléter)
}

void init_USART2(void) {
    // Configuration de l'USART2 en mode transmission (à compléter)
}

void send_char(char c) {
    while (!(SR & TXE));  // Attendre que TXE soit à 1 (prêt à transmettre)
    DR = c;  // Envoyer le caractère
}

int main(void) {
    init_system_clock();
    init_USART2();

    uint8_t etat = 0;

    while (1) {  // Boucle infinie
        if (etat == 0) {
            send_char('1');
            etat = 1;
        } else {
            send_char('2');
            etat = 0;
        }
    }
    
    return 0;  // Jamais atteint
}

```
### 2) Donnez un algorithme pour émettre alternativement les octets 31h puis 32h.
### 3) Ecrire le programme correspondant en C (initialisations + scrutation)
