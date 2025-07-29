---
title: Introduction to Wireless Communication
excerpt: Overview of technologies, features, and automation examples in home automation, combining electronics, computer science, and telecommunications for the connected home.
tags:
  - Wireless
  - communication
  - Technology
  - Smart
  - Home
  - Automation
  - Electronics
  - Computer
  - Science
  - Telecommunications
  - French
category: Technology
---
## Domotique
La domotique regroupe l'ensemble des tech utilisées dans l'habitat
- Electronique
- Informatique
- télécommunication

La base est de relie tous les appareils sur le réseaux. Aka passerelle avec connexion internet.
![Domotique](Domotique.png)

Basée sur la mise en réseau des différents appareils électrique de la maison
Contrôles par une intelligence centralisée
- une centrale programmable
- une interface micro-informatique(serveur)
Les outils de pilotage peuvent être 
- un téléphone portable, une télécommande universelle ou non
- un écran + souris
Possible de programmer soi-même sa maison
- enclencher l'arrosage du jardin a 20h
- maintenir une température donnée dans la maison
- diminuer le chauffage lorsque l'on part
## Plan
- introduction aux technologies radio
- transmission de signaux numériques
- Bluetooth
- Zigbee
- Wifi
- Solutions domotiques industrielles
	- Zwave / Enocean / Oregon / X10 / Chacon / BLY / Visonic / RFY / XDD

## Introduction
- Principe 
- Objectif
- Les technologies
- Les réseaux sans fils pour demain ?
	- Le cadre règlementaire
	- la sécurité
	- une technologie trop concurrente
### Les reseaux sans fils:
- Remplace les cables par des ondes radioelectriques
- 2 types : WPAN et WLAN
- Exploitent majoritairements les gammes de frequences de 2,4 GHz et 5 GHz
- Debit allant de 1 a 450 Mb/s
- Routage par bornes le plus souvent
- necessitent l'aquisition d'un adaptateur (existe sous la forme de boitiers cartes PCI ou cartes PCMCIA)
- 2 modes de fonctionnement : le mode cellule et le mode ad-hoc
	

Objectif principal : permettre une parfaite mobilite des utilisateurs
- Economie certaine dans les petites reseaux
- permet la synchronisation rapide d;appareils
- souci esthetique
- application
	- reseaux temporaires
	- immeubles ne pouvant etre modifie 
	- liaison entre 2 batiments
Bluetooth
- Lance par Ericsson en 1994
- Objectif initial : permettre l'echange de donnees entre les appareils numeriques
- Avantage : 
	- Deja bien implante
	- resiste aux interferences et consomme peu
- Inconvenients
	- Debits moyens (1Mb/s)
	- Faible portee (10 a 30 m)
	- Materiel encore onereux
- Versions de plus en plus performantes prevues
### ZigBee
Lance par les membres de la Zigbee Alliance en 2004
Objectif initial : offrir une liaison courte distance moins cher que le bluetooth et plus simple
Avantage :
- Cout tres faible
- Faible consommation des composants
- besoin memoire reduit (10x mois que pour bluetooth)
- Portee moyenne (100m environ)
Inconvenient:
- Debit moyens(250Kbits/s)
## HomeRF
Invente pour un usage domestique en 1998
soutenu a l'origine par Compaq, HP, IBM, Intel et Microsoft (le homerf working group)
Avantages:
- Debits acceptables(11Mb/s)
- Support DECT
- Bonne portee(50 a 100m)
Inconvenient:
- Durement concurrence par Wi-fi
Aujourd

## HiperLAN
Elaboree sous la tutelle de l'ETSI (european telecommunicationn standards institute)
Standard uniquement europeen
bon debits:
- Hiperlan 1 : 20 Mb/s
- Hiperlan 2 : 54 Mb/s
Bonne portee (100m)
exploite la gamme de frequence 5 GHz
Souffre du succes de Wi-fi

Promu par la WECA (Wireless Ethernet Compatibility Alliance)
Norme conforme au standard IEEE 802.11b adopte en 1999
Offre des debits eleves (11/54/100/500 Mb/s)
Bonne portee (50 a 100m)
Evolutions d'ores et deja prevues :
- 802.11g(frequence 2,5GHz debit de 54 Mb/s)
- 802.11a(frequence 5 GHz, debit de 54 Mb/s)
- 802.11n ( frequence 2,4 et 5 GHz debit de 100Mb/s)
- 802.11ac(frequence 2,4 et 5Ghz debit de 450 Mb/s)
- Antennes amplifies de porte 8 a 33km
Aujourdhui un standard

## Solution domotique industrielles
- 433 Mhz
- 868 Mhz
- Domotique grand public
- Solutions proprietaires et fermees
![Solution domotique industrielle](Solution%20domotique%20industrielle.png)
### Le cadre réglementaire :
- Utilisation du spectre radio très réglementé par l ’ART         ( Autorité de Régulation des Télécoms )
- Libéralisation imminente de l ’usage de ce spectre
- Depuis Juillet 2001, BlueTooth et Hiperlan sont autorisés sous certaines conditions
- Procédure simplifiée pour les communes de plus de 50 000 habitants
- SINON cas par cas : demande individuelle d ’établissement, nécessitant l ’accord du ministère de la défense

![Spectre de frequences](Spectre%20de%20frequences.png)
![Cellulaire](Cellulaire.png)

## Probleme de securite
- Ecoute clandestine du support
- longueur des decryptages sur les portables
- Problemes de consommation de la batterie
- 2 nouveaux type d'attaques
	- Blocage radio
	- epuisement de la batterie
- Solutions proprietaire en cours de developpement, permettant de re-generer des cles toutes les 60 secondes

#### Des technologies tres concurrentes
- Ambivalence complementarite / concurrence avec les technologies
- Enquete lancee par l'ART en fevrier 2002
- Les operateurs multiplient les arguments contre les reseaux radioeletrique
	- Trop faible portee
	- aucune technologie STANDARD
	- cout trop eleve
	- impossibilite de se deplacer
- Support des collectivites
![Schema reseaux](Schema%20reseaux.png)
![Norme commuication](Norme%20commuication.png)

## Transmission numerique
Transmissions numeriques en bande de base
- Spectre des signaux centre sur la frequence nulle
- Cependant ce type de transmissions est insuffisant
	- Pas directement adapte aux canaux de transmission
	- Necessite de partager la bande de frequence entre plusieurs utilisateurs
	- Taille d'emetteurs trop importante en basse frequence
- Transposition de l'info dans une bande de frequence appropriee
### Avantage technique
- Immunite au bruit
- Optimalisation de la bande passante
- Facilite de traitement de l'info
- facilite de traitement de l'info
### Optimisation des couts
- Separation d'une application en sous-ensembles
- Utilisation de composants a grande tolerance
### Siganl analogique
- Analogue a une grandeur physique
- Continu dans le temps
- infinite de valeurs
### Signal numerique
- represente par une suite de chiffres
	- Systeme binaire
- Discret dans le temps (echantillonage)
- Valeur discrete (quantification)
Signal echantillone
![Signal echantillone](Signal%20echantillone.png)

Sur et sous echantillonnage
![Sur et sous echantillonnage](Sur%20et%20sous%20echantillonnage.png)
### Quantification
- Convertisseur Analogique/numerique
	- Nom,bre de bits : n
	- Niveaux de sortie : 2^N
- Sortie
	- Parallele 
	- Serie
- TDA 8792
	- 8 bits parallele
	- 25 MHz
![TDA8792](TDA8792.png)
### Erreur de quantification
Difference entre 
- signal analogique
- signal numerique
Bruit de quantification
- Rapport S/N
- dB
![Signal numerique et analogique](Signal%20numerique%20et%20analogique.png)
Signal numerique : 
![Signal numerique equation](Signal%20numerique%20equation.png)
![Numerique equation frequence](Numerique%20equation%20frequence.png)
Spectre : Encombrement spectral ~fb

### Modulation d'amplitude
2 Types
- k<1:Amplitude Shift Keying (ASK)
- k=1: On-Off Keying (OOK)
- ![Amplitude Modulation](Amplitude%20Modulation.png)
Signal module en frequence: 
![Signal module en frequence](Signal%20module%20en%20frequence.png)
Signal module BPSK
![Signal module BPSK](Signal%20module%20BPSK.png)
### Multiplexage geographioque
- Limitation de la portee de transmission
- Technologie cellulaire
![Multiplexage geographique](Multiplexage%20geographique.png)

## Bluetooth
Specification de l'industrie des telecommunications
But : remplacer les cables electriques
Versions :
- V1,0 en 1998  V1,1 en 2002   V1,2 en 2005   à   1Mb/s
- V2,0 en 2004   V2,1 en 2007  à   3Mb/s
- V3,0 HS en 2009 (high speed)  à  24Mb/s
- V4,0 en 2010  à faible consommation, 3Mbit/s
- V4.1 en 2013, V4.2 en 2014  à internet des objets
- V5 prévue en juin 2016 : Distance x4 et vitesse x2 -> Q1 2017
Bande de frequences :
- 2,4-2,454Mhz avec une puissance <100mW
- 2,454-2,4835Mhz avec puissance <100mw en intérieur et 10mW à l’extérieur des batiments

### Origines
Standard Bluetooth initialise apr Ericsson et un groupe de travail reunissant plusierus grand industriels ( IBM, Intel, Nokia, Toshiba)
Bluetoth : interface radio
- Entre 2 equipements mobiles
- Ou entre 1 equipment movile et 1 capteur
Objectif: interconnecter differents type de portables d'un meme utilisateur
Caracteristiques definies par le groupe de travail IEEE 802.15

#### Evolution
- Depuis annees 60 : utilisation du port serie pour les peripheriques
- entre 1990 et 2000 : Infrared Data Association: IrDA
- Probleme : les peripheriquies sont relies 2 a 2
- A partir de 1996 USB : Universal Serial bus
- A partir de 1998 Bluetooth
Groupe IEEE 802.15 : WPAN (Wireless Personal Area Networks)
- Mise en place en mars 1999
- Son but 
	- Normaliser les reseaux d'une portee d'une dizaine de metre
	- realiser des connexions entre les differents portables d'un meme utilisateur ou de plusieurs utilisateurs
	- Ex : interconnecter un PC portable, un portable telephonique et un assistant personnel
### 2-3 groupes de services
A
- Utilisation de la bande du spectre sans licencce d'utilisation(2,45 GHz)
- Tres bas cout de mise en place et d'utilisation 
- Taille reduite
- Consommation electrique faible
- Mode sans connexion
- Possibilite de superposition avec l'IEEE 802.11
B : Performances en augmentation
- Utilisation d'une couche MAC jusqu'a 10 Kbit/s
- Possibilite de connecter au moins 16 machines
- Utilisation de QoS pour autoriser certaine applications dont la parole
- Jusqu'a 10m de portee
- Temps max df'1s pour se raccorder au reseau
- passerelles avec d'autre categories de reseaux
C : Introduit de nouvelles fonctionnalites importantes pour les particulies et les entreprises
- Securite de la communication
- Transmission de la video
- Possibilite de roaming (itinerance) vers un autre reseau PAN

Mise en palce de groupements industriels, Specification ouverte de connexion sans fil entre equipement personnels
- Bluetooth : communication en forme de liaison radio entre 2 équipements
- HomeRF : connexion des PCs avec toutes les machines domestiques sur une portée de 50 m
Bluetooth SIG
Bluetooth Special Interest Group (SIG)
- Au depart : Ericsson, IBM, Intel, Nokia et Toshiba
- Rejoint par + 2500 societes
Nom de la nomre : chef Viking , Harald "Dent Bleu"
But : developper des produits interoperables
Solution du SIG
- Creer une specification sans licence pour ses membres, pour developper des produits et des logiciels utilisant la specification Bluetooth
- Politique de propriete intellectuelle sans licence (License Free intellectually Property ou IP) pour les membres du SIG, selon certaine condition
- Pas de charges pour etre membre
- Il existe des regle de confidentialite pour les membres

Technologie peu onereuse
- Forte integration des composants electroniques sur une puce unique de 9mm sur 9mm
Frequence utilise comprise entre 2400 et 2483.5 MHz
- Cette meme gamme de frequence se retrouve dans la plupart des reseaux snas fils utilises dan sun environnement prive (entreprise ou personnel)
- Pas de licence d'exploitation requise
- Bande au dessus de 2.4GHZ divisee en sous bandes de 1 MHz
	- 79 canaux d'une largeur de 1 MHz
	- En France, Japon, Espagne : seules 23 frequences sont accessibles

La liaison RD a 2,45Ghz depende
- De la puissance emise : 3 classes d'emission
	- Controle de la puissance pour un meilleur compromis taux d'erreur/puissance
- Gain des antennes
	- Antennes de bonne qualite ->portee augmentee
	- Mais difficile a miniaturiser (et mettre dans l'objet)
- Environnement
	- Contournement des obstacles, diffraction, interferences
![Classes de fonctionnement](Classes%20de%20fonctionnement.png)

#### Modulation
La porteuse est modulee en frequence par le signal fibre par un passe bas gaussien -> modulation GFSK (Gaussian Frequency Shift Keying)
![Modulation Bluetooth](Modulation%20Bluetooth.png)

#### Proctection contre les brouillages
- PRotection contre les perturbations par etalement de spectre, les bandes de frequences (1MHz) sont les plus larges que necessaires
- La porteuse saute d'un canal a l'autre regulierement
- Avant de moduler la porteuse, on melange le signal avec une sequence pseudo aleatoire  de debit plus elevee.
![Sequence pseudoi aleatoire](Sequence%20pseudoi%20aleatoire.png)
Une interface bleutooth est constitue des elements suivants :
- Un synthetiseur de frequence qui sert a l'emission et a la reception alternativement
- Le VCO (Oscillateur controle en tension) modulable en frequence
- un amplicateur RF de faible puissance
- Une antenne (la moins encomhrante possible)
- Un recepteur a changement de frequence
- Un processeur bande de base qui gere la liaison et produit le signal binaire filtre
![Bluetooth diagram](Bluetooth%20diagram.png)

