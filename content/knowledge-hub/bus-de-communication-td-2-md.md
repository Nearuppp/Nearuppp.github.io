---
title: Travaux Dirige 2 of Bus of Communication
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
Mise en œuvre d'une liaison série CAN autour du STM32
## Sujet
On se propose de concevoir un programme qui permettra au STM32 de communiquer avec d'autres appareils ( USB_MUX_6C6L) sur une liaison CAN.
- Le module USB_MUX_6C6L est un boitier capable d'analyser et d'envoyer a partir d'une outil logiciel MuxTrade des trames au format CAN ou au format LIN sur six ports indépendants

## PARTIE 1 : étude du standard CAN
### A) Comment les arbitrages de priorités sont-ils effectues sur le bus CAN?

L'arbitrage bit a bit non destructif sur le champ d'arbitrage (identifiant + RTR)

![Pasted image 20250404082734](../images/Pasted%20image%2020250404082734.png)
Les priorité du bus CAN sont effectue sur la priorité des bit du message en fonction de leur bit dominant et récessif
### B) Décrire les différents champs constituant une trame de données CAN au format standard. Donner les éléments permettant de distinguer une trame de données d'une trame de requête

- Début de trame (Start of Frame ou SOF) 
- champ d’Arbitrage (Arbitration Field) 
- champ de Contrôle (Control Field) 
- champ de Données (Data Field) 
- champ de CRC (CRC Field) 
- champ d’Acquittement (ACK Field) 
- Fin de trame (End of Frame)

![Pasted image 20250404082858](../images/Pasted%20image%2020250404082858.png)
![Pasted image 20250404083009](../images/Pasted%20image%2020250404083009.png)
![Pasted image 20250404083138](../images/Pasted%20image%2020250404083138.png)
![Pasted image 20250404083659](../images/Pasted%20image%2020250404083659.png)
Pour les trames en format Standard le IDE = 0 et pour les trames étendu IDE = 1

### C) Reprendre la définition et décrire une trame au format étendu

IDE = 1. RTR = 0 pour la trame au format étendu. En tous la trame étendu fait 32 bit
Une trame de format standard sera toujours prioritaire que étendu. L'IDE standard est a 0 sur standard donc il sera forcement sur un bit dominant.
![Pasted image 20250404083910](../images/Pasted%20image%2020250404083910.png)
(Pour une trame de requête le RTR est a 1 sinon il a 0)
## PARTIE 2 : analyse d'une trame CAN HS ( High Speed )
### A) Donner les niveaux elecrtriques correspondant aux deux etats Logiques du bus CAN.

Le bit SOF est dominant donc 1

![Pasted image 20250404084955](../images/Pasted%20image%2020250404084955.png)
### Un operateur a relevé a l'oscilloscope le chronogramme suivant sur un bus CAN. Analyser la trame et en déduire les éléments suivants : l'identifiant, le nombre d'octets, les data (si présentes) la valeur du CRC.
![Partie 2 TD Bus de communication](../Excalidraw/Partie%202%20TD%20Bus%20de%20communication.md)

![Pasted image 20250404100706](../images/Pasted%20image%2020250404100706.png)
## Partie 3 : etude du controleur CAN du STM32 pour l'envoi de trames
On veut ecrire un programme d'envoi de trames sur le bus CAN en mode polling.
### Lire la documentation technique des ports bxCAN du STM32
## Donner les valeurs bit a bit des registres pour configurer le controleur CAN1 comme suit :
- BTR
	- Vitesse de communication 500Kb/s (horlogre tPCLK = 1/36MHz)
	- On choisira tBS1 = 3 Tq et tBS2=4 * Tq et tJW=1 * Tq
- MCR
	- Pas de mode Time Triggering
	- Gestion automatique du bus off
	- Pas de wakeup automatique
	- Pas de blocage de la retransmission
	- Mode lock pour les FIFO de reception
	- Priorite chronologique des messages
	- Autre fonctions desactivees
![Pasted image 20250404113228](../images/Pasted%20image%2020250404113228.png)
Page 68 et 63 
## Quels sont les autres parametrages a effectuer ?

Bus CAN utilise PD0 et PD1, activer les horloges GPIOD et BxCAN
CANTx eb sortie aternative PP
CANRx en entree flottante

# PARTIE 4 : Parametrage et transmission en langage C
PARTIE 4: paramétrage et transmission en langage C 
## 1) Pour programmer en C les différents registres du STM32F107, nous allons réutiliser le fichier stm32f10x cl.h. 
### • Lisez la partie relative au bus CAN (certaines définitions sont fournies en annexe de ce TD
u8 = unsigned char

```c
unsigned char CAN_Init(void)
	u8 InitStatus = 0;
	u16 WaitAck;
	RCC ->APB2ENR |= 0x21;//Horloge AFIO et GPIOD
	RCC ->APB1ENR |= 1<<25;//Horloge du BusCAN
	AFIO -> MAPR |= 3 <<13;//ou 0x6000 redirection sur GPIOD
	GPIOD -> CRL &=0xFFFFFF00;//raz conf PD0 et PD1
	GPIOD ->CRL |=0x000000A4; //PD1 sortie alt PP2MHz
							  //PD0 entree flottante
	CANL -> MCR = 1; //mode init BxCAN (INRQ=1)
	if((CAN1 -> MSR & 1)==0)
	{
	waitAck = 4;
	InitStatus = CANINITFAILED;
	else{
		CAN1 - > MCR = 0x4D; //conserver INKQ a 1
		CAN1 - > BTR = 0x320008; // vitesse 500 Kb/s
		InitStatus = CANINITOK;
		CAN1 - > MCR & = ~ 1; //INRQ=0
		for(i=0;i<0x4000;i++){}//attente
		if((CAN1 - > MSR &1) == 1)//verif de sortie d'init
			initStatus = CANINITFAILED;
		}
	return initStatus
	}
```
## 2) En utilisant stm32fl0x_cl.h écrivez les instructions C pour initialiser le module CANI du STM32F 107 avec les paramètres vus dans la partie précédente. Ne pas oublier de forcer le mode adéquat. 
## 3) Ecrire un programme de transmission d'une trame données en mode polling. La trame d'identifiant 17 doit contenir un octet de donnée valant OxFC. Vous utiliserez la structure CanTxMsg et la fonction CAN_Transmit décrites en annexes. 

```c
u8 CAN_TX_Pulling(void)
{
	CanTxMsg TxMessage; u32 i=0;
	u8 TransmitMailBox;
	TxMessage StdId = 0x11;
	RTR = 0; //data
	IDE = 0; //standard
	DLC = 1; // 1 octet
	Data[0] = 0xFC;//
	TransmitMailBox=CANTransmit (&TxMessage);
	i = 0;
	while( CAN_TransmitStatus(TransmitMailBox)!=CANTXOK)&&(i!=0xFF)
	
}
```
# PARTIE 5: étude du contrôleur CAN du STM32 pour la réception de trames. 
On désire ajouter la fonction de réception de trames depuis le bus CAN. Pour cela il faudra paramétrer les filtres d'acceptation des FIFO et aller récupérer les éléments de messages qui sont acceptés. 
Les éléments du message à capter sont les suivants : 
- ID : 100 
- Identifiant sur 32 bits. 
Paramétrer le filtre 0 du module CAN1 de manière à accepter les messages de ce type. 
# PARTIE 6: Programme de réception de trames en langage C. 
## 1) Ecrire la fonction CAN_FilterInit de paramétrage du filtre selon les éléments de la partie précédente. 
## 2) Ecrire une fonction void CAN_FIFORelease(u8 FIFONumber) qui libère la FIFO FIFONumber une fois le message lu (cf. utilisation dans la fonction CAN_Receive). 
## 3) Programme de réception de messages : on désire réceptionner les trames sous interruption. Quelles sont les opérations à effectuer pour y parvenir.