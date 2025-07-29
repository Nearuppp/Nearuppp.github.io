---
title: Course on Bus of Communication
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

Interface : un dispositif qui permet d'echanger des infos entre 2 systeme.
Generalement pour les grandeurs en binaire, TOR(Boolean) ou en binaire codees (du texte,etc...)
Son but est de adapter les formats LOGIQUE et PHYSIQUE de l'info. 
Comprehensible par le systeme numerique et le procede.
Physique :
- Adapatation du niveau de tension
- isolation galvanique
- transmission en bande de base
- transposition en frequence (modulation)
Logique:
- Modification de la structure des donnees pour le canal d'echange
Respecter le protocole d'echange des informations
- Besoin de signaux supplementaire pour gerer le protocole et synchroniser les echanges.

## Structure Logique
### l'interface comporte
- Des structure d'echange de donnees
	- Registres de donnes, us de donnees
	- Bus d'adresses
- Des circuits de commandes et de controle de la communication
	- Signaux supplementaire registre de commande regtistres d'etat

## Interface dans le numerique
### Paralleles
Elles permettente de transporter les informations binaires simples ou binaires codees.
- Les n bits sont transmis simultanement a l'aide du minimum n+1 signaux.
### Series
Elles permettent le transport d'informations binaires codees.
- Les n bits d'un mots sont transmis de facon sequentielle
- Les interfaces series sont plus economiques que les interface paralleles pour les grandes distances.
## Interface dans l'analogique
### analogique / numerique
- realisee par un circuit electronique nomme "convertisseur analogique numerique" (CAN/ADC)
- La grandeur electrique continue d'entree "Ue" est :
	- Echantillonee (discretisation temporelle)
	- Quantifiee (discretisatiopn d'amplitude)
		- Obtinent une valeur numerique "N codee sur n bits."
### Relation entre les grandeurs
Ue = Nq +- (q/2)
### Interface numerique analogique
- Realisee par un "convertisseurs numerique analogique" (CNA / DAC)
	- Transforme une valeur numerique codee sur n bits en un signal electrique continu.
## Interface analogique definition
#### q = resolution ou quantum
- Variation minimal de Ue qui fait varier N de 1 unite (LSB)
#### Pour un CAN 8 bit de plage d'entree 0 a 5V
- Mot binaire compris entre 0 et FFh (2^8 - 1)
- Valeur du quantum :
	- Ue = Nq +- (q/2)
	- q = (5-0)/256 = 0,019V
### La periode / Frequence d'echantillonnage
- Le nombre de conversions par seconde est limite
	- Conversion pas instantanée
- dépend de la méthode de conversion
- dépend de la technologie de fabrication du CAN
## Communication microprocesseur / interface
- Localisation des interfaces
	- Dans l'espace adressable du processeur
	- Lecture et écriture identiques a celles de la mémoire
- Type maitre / esclave
	- Seul le processeur peut avoir l'initiative de l'echange
	- le circuit d'interface ne peut que répondre a une requête du processeur
- Des débits d'info différents.
	- Nécessite de synchroniser les échanges pour ne pas perdre d'info.
### Echange  a l'initiative du microprocesseur
#### Echange non synchro : périphérique simple
- Lire ou écrire un registre du circuit d'interface sans se préoccuper de son état.
- convient pour lire i registre d'état pour pour des interfaces sans protocole (commande T.O.R)
#### Echange avec synchro logicielle : périphérique évolue
```pseudo code
do{
	lire(registreEtat);
}while(pasPret)
requete();
```
- Sans synchro : risque de perte d'info si le circuit d'interface n'est pas prêt pour recevoir ou donner une info.
	- Demander l'envoi d'un caractère a une liaison série alors que le caractère précèdent n'est pas totalement transmis
- Le registre d'état de l'interface informe le microprocesseur des évènements qui se sont récemment produits.
	- Dans une liaison série un bit indique si le dernier caractère est transmis
	- un bit indique si un caractère a été reçu etc.
- Le microprocesseur lit le registre d'état pour savoir si l'interface est prête
	- Le microprocesseur scrute le registre (polling)
#### Echange a l'initiative de la périphérie
La méthode de scrutation
- Le processeur utilise beaucoup de son temps a attendre un évènement
- risque de perde des info si le micropro ne lit pas souvent les registres du circuit d'interface
	- Cas de la gestion simultanée de plusieurs périphériques
La génération d'une demande d'interruption
- Les circuits d'interface disposent d'une ligne de demande d'interruption qui est connecte au microprocesseur
	- Interne ou externe
- Le microprocesseur est informe d'un évènement sans scruter en permanence le registre d'état
	- Abandonne les taches moins importante pour traiter l'évènement
#### Echange par acces direct a la memoire
L'echange sous interruption est adapte pour :
- Une quantite de donnees faible (<100octets)
- Une frequence des interruptions peu elevee(<10000/s)
- Le mecanique possede un debit d'information (Ko/s) assez moyen:
	- Temps important utilise pour sauvegarder les registres dans la pile
	- Chaque mot passe par le microprocesseur et necessit l'execution d'une instruction (plusieurs cycle)
	- Un test execute pour arreter le transfert
- Illustration pour un sous-programme d’interruption du MC68000:
![Illustration pour un sous-programme d’interruption du MC68000](/images/Illustration%20pour%20un%20sous-programme%20d’interruption%20du%20MC68000.png)
#### Le DMAC
Pour de gros bloc d'informations :
- le peripherique doit acceder directement a la memoire
	- "court circuite" le micropro
	- Methode utilisee pour les liaisons Ethernet
Fonction assuree par un circuit DMAC (Direct Memory Access Controller)
- N'effectue qu'une seule instruction (la copie)
	- Pas de decodage d'instruction (cable)
Acces direct memoire 2 a 8 fois plus rapide qu'un transfert classique

#### Le transfert DMA
Acces direct memoire en 2 phases:
- La preparation du transfert
- la transfert effectif des informations
La preparation du transfert
- Programmer le DMAC pour fixer:
	- L'addresse source des info
	- si l'adresses source reste constante, doit s'incrementer ou se decrementer apres chaque transfert
	- La longueur de bloc a copier
	- si on transfert des octers, des mots etc...
Le transfert
- Declenche par le peripherique connecte auy controleur de DMA.
	- DMA : demande de bus processeur
	- DMA : Transfert de bloc a vitesse maximale, limitee par celle de la memoire ou du peripherique
	- DMA : restitution du bus au micropro
### Les interfaces paralleles
#### Le principe
- Les n bits d'un mots sont transmis simultanement sur n+1
- Objectif : fournir des liaisons a haut debit pour des distances tres courtes (<10m)
	- Informations generalemetn transmises en bande de base
	- les liaisons osnt simplex ou half duplex
#### Les caracteristiques principales:
- Le nombre de bits transmis simultanement(largeur du bus, generalement 8 bits pour les liaisons extrea systeme)
- Le protocole materiel d'echange utilise
- Le debit maximal(exprime en Ko ou Mo/sec)
#### Protocole d'echange materiel et logiciel
Protocole matériel, gere les echanges
- Lignes supplémentaire sur lesquelles on va envoyer des signaux en respectant des règles.
- Echange synchrones
	- Déroulement des échanges divise en plusieurs phases
		- cadencees par un signal d'horloge.
		- activation des bons signaux au bon moment sous peine de perdre des donnees
		- Impose que les acteurs travaillent a la meme vitesses
			- Pas de signal supplementaire pour synchro les acteurs 
			- debit d'info plus eleve
Echange asynchrone
- L'emetteur adapte la vitesse de transmission au(x) recepteur(s)
- Le recepteur confirme le transfert pour relancer un nouvel echange
	- Protocole plus lent
	- Permet de connecter des systemes travaillant a des vitesses differentes
Protocole logiciel specifique a l'application 
- "Surcouche" qui depende des info echange

#### Protocole materiels : asservissement
##### Sans fils d'asservissement
- Echange impose par l'emetteur
	- l'etat des lignes est fige entre 2 echanges
	- l'emetteur memorise donc cet etat
- Principe utilise pour les commandes TOR ou la lecture de recepteurs passifs (LED,relais,interrupteurs, capteur a seuil)
#### Avec 1 fil d'asservissement
- Echange impose par l'emetteur
	- Utilise un fil pour signaler de nouvelles info
	- Cette ligne indique au recepteur de lire les lignes de donnees
- Type d'interface est tres courant puisqu'il s'agit de l'ecriture dans un registre, circuit memoire etc.
Chronogramme des signaux : 
![Chronogramme des signaux](Chronogramme%20des%20signaux.png)
#### Avec 2 fils d'asservissement
- Dialogue avec echange type poignees de main
- Constat
	- Le recepteur n'ext pas toujorus pret a recevoir des info
	- Le recepteur n'enregistre pas toujours correctement les informations
- La deuxième ligne provenant du récepteur gere ces etat
![Deux fils](Deux%20fils.png)
- Le signal (E) contrôle par l'émetteur indique au récepteur la disponibilité de nouvelle donnes
- Le signal(R) par le récepteur indique a l'émetteur si le récepteur est prêt
![Deux fils signal](Deux%20fils%20signal.png)
#### Detection des erreurs & Controle de flux
Detection des erreurs
- Effectue en general par logiciel
	- envoi d'un code supplementaire pour evaluer la presence d'erreur dans le message
	- Somme de verification (CHECKSUM), code cyclique (CRC), etc.
- Le controle de flux
	- Methode materielle
		- Le protocole asynchrone avec 2 fils d'asservissement constitue deja une forme de controle de flux materiel
			- Tant que le recepteur n'est pas pret, l'emetteur n'envoie pas de donnees.
	- Methode Logicielle
		- La methode de controle de flux logiciel depend l'application.
		- Basee eventuellement sur des caracteres comme dans les interfaces serie
#### L'interface historique IEEE - 488
Historique
- Dev par HEWLETT PACKARD
	- Interface dediee aux apareils de mesures, l'interface HP-IB Interface Bus)
	- Permet de piloter les appareils de mesures de facon automatique a partir d'une interface parallele
Caracteristique
- Possibile de piloter plusieurs appareils (15)
- vitesse de transfert elevee sur le bus (1 Mo/s)
- protocole supportant des conceps evolues
- standardisation des circuits d'interfaces
Autre nom : bus GP-IB (General Purpose Interface Bus) ou bus ASCII ou bien sur bus HP-IB

#### Connexions
Signaux et connectique
- Signaux de donneesx et de controle
- Connecteur CENTRONIS 24 points dont la partie femelle se trouve toujours sur l'appareil
#### Aspect electrique
Niveau electrique compatible TTL mais en logique negative
- courant draine maximal au niveau electrique"0" : 48mA
- courant draine maximal au niveau electrique"1" : 5.2mA
- 15 appareils maximum peuvent etre connecte sur le bus
#### Les interfaces serie
Différentiation des applications selon la longueur et le debit de la liaison
- Représentation des différents système de communication selon ces critères 
- N'aborde pas les réseaux(LAN,MAN, ou WAN) mais des liaisons a très courtes distances.
![Diagramme interface serie](Diagramme%20interface%20serie.png)

#### Liaison serie
Principe
- n bits d'un mot transmis de facon sequentielle sur la meme ligne electrique
- les bits se succedent les un aux autres dans le temps
- Avantage :cout reduit du support notamment pour les longues distances
- c'est le telegraphe electromagnetique qui est a l'origine des liaisons series
Les caracteristiques
- Le codage des signaux
	- Methode utilisee pour associer aux etats logiques 0/1 des etats electriques sur la ligne de transmission
	- le codage est necessaire car les lignes de transmission ont une bande passante reduite en haute et basses frequences
	- le choix d'un codage s'effectue aussi selon le "rendement" du codage. Les codages sont nombreux et nous allons etudier les plus simples
- La bande de base
	- la transmission en bande de base signifie que le signal transmis n'est pas le résultat d'une modulation entre le signal transmis est proche du spectre du signal de base contenant l'information et une onde porteuse
	- En consequence le spectre du signal transmis est proche du spectre du signal de base contenant l'information.
#### Codages en bande de base
##### Codage RZ (Return to Zero)
Ce codage consiste a associer des etats electrique specifiques (ex : +V et -V) aux niveaux logiques 1 et 0 respectivement pendant la moitie de la duree d'un bits avec un retour a 0V au demi bit suivant. La bande de frequence utilisee est le double de la bande utile mais ce copdage ne necessit pas l'horloge.
###### Codage NRZ (No Return to Zero)
Ce codage plus simple consiste a associer des etats electriques specifique (ex: +V et -V) aux niveaux logiques 1 et 0 respectivement mais sans retour a 0V. Avec ce codagem une transition au niveau logiqe correspond a une transition au niveau electrique. Lors de longues suites de 1 ou de 0, le spectre de puissance transmise n'est pas au voisinage 0
##### Codage NRZI (NRZ Inverted)
Ce codage utilise au 2 état +V et -V constants pour la durée d'un bits. Pour le nouveau bit on conserve l'etat precedent de la ligne si le bit est 1, et on choisit l'etat inverse si le bit est 0. +/-V et la valeur du bit transmis.
##### Codage biphase : Manchester 1
L'etat du signal est constant pendant la moitie de la duree T du bit. Un bit est donc transforme en 2 etats successifs de duree T/2
- Si le bit vaut 0, les etats seront +V puis - V (front descendant)
- Si le bit vaut 1, les etats seront -V puis +V (front montant)
Ce code presente un specte de puissance centre au voisinage de la fre2quence 2/T et la puissance transmise au basses frequences est negligeable.
![Codage des signaux](Codage%20des%20signaux.png)
#### La modulation
	- La modulation consiste a faire vaier les parametre d'un signal appele porteuse par le signal contenant l'information et appele modulatrice
	- Les parametre asservis de la porteuse peuvent etre l'amplitude, la frequence, la phase ou une combinaison de ces cas.
	- Les parametre de la porteuse sont asservis par un MODEM(MODulateur / DEModulateur)
- Transmission en bande porteuse
	- La transmission en bande porteuse ne permet pas de faire une transmission duplex
- Transmission en largeur bande
	- La transmission en large bande consiste a utiliser plusieurs porteuses de frequences differentes
	- Le spectre utilisable du support est ainsi scinde en plusieurs bandes
	- Chaque bande constitue un canal de transmission. On peut alors realiser plusieurs transmission duplex
### Liaison synchrone ou asynchrone
Pour une transmission correcte, il faut que le recepteur la coherence temporelle des signaux.
- Cette coherence est assuree soit par une transmission synchrone soit par une transmission asynchrone
#### Asynchrone
Le temps entre la transmission de 2 caractere n'est pas fixe
- L'emetteur et le recepteur possedent chacun une horloge distincte (reduction du nomre de lignes de la liaison)
- les horloges ont des frequences identiques en theorie
Transmission des caracteres
- Synchronisation emetteur/recepteur pour l'echange de caractere:
	- precede d'un bit de valeur 0 (bit de START)
	- suivi de 1 ou 2 bits de valeur 1(bits de STOP)
- Nombre de bits variable (5 a 8 voire plus)
![Asynchrone](Asynchrone.png)
##### Synchronisation
Synchronisation pour : 
- Augmenter l'immunite aux bruits, aux impulsions parasites
- S'affranchir du decalage de phase entre les horloges
- le recepteur echantillonne la ligne de transmission a une frequence Fr en general egale a 16 ou 64 fois la frequence de transmission Ft des bits
La ligne de transmission etant au repos au niveau 1, un front 1->0 indique le depart d'un nouveau caractere
L'horloge du recepteur utilise ce front pour demarrer un compteur modulo Ft/Fr.
- La ligne de transmission est echantillonnee lorsque le compteur est a la moitie
Dans certains systemes, le recepteur prend 3 voir 5 echantillons afin d'etre sur de l'etat du bit actuellement transmis
![Synchronisation](Synchronisation.png)
#### Parametre d'une liaison asynchrone
Les 4 parametres essentiels d'une liaison serie asynchrone sont:
- La vitesse de transmission 
- Le nombre dew bits par caractere (5-8)
- Le nombre de bits de STOP (1-2)
- La parite (voir paragraphe sur la detection des erreurs)
Type de liaison limite a un debit inferieur a 100Kb/s
- Les debits sont normalises et les valeurs les plus courantes sont 75, 150, 400, 600, 1200, 2400, 4800, 9600, 19200, 38400, 56800 bit/s
Les bits de synchronisation reduisent le rendement de la liaison (Kbits utilses/Kbits transmis) a environ 80%
#### Liaison asynchrone
Temps entre la transmission de 2 messages constant
- L'emetteur et le recepteur utilisent la meme horloge
- ils sont synchronises en frequence et en phase
- Le signal d'horloge
	- Est soit transmis par une ligne supplementaire
	- soit melange aux donne (codage Manchester)
Une transmission synchrone permet des debits jusqu;a 100Mb/s
- Le nombre de bits par message transmis depende du protocole utilise
Debut de trame
- souvent les trames de bits commencent par un ensemble de bits unique (par exemple0111 1110) appele drapeau
- Le drapeau signale au recepteur l'arrivee d'un nouveau message
#### Liaison simplex, duplex et semi-duplex
##### Simplex
Une liaison simplex signifie que les messages circulent toujours de l'element A vers l'element B
##### Semi-duplex
Une liaison semi-duplex signifie que les messages circulent de l'element A vers l'element B ou l'inverse
##### Duplex
Une liaison duplex signifie que les messages circulent simultanement de l'element A vers l'element B et de l'element B vers l'element A
#### Detection et correction des erreurs
Erreurs sur les donnees due aux lignes de transmission
- Taux d'erreur variable selon le debit d'info, le type de support, le milieu ou est installee la ligne etc...
- Peut varier de 10^-4 a 10^-7 Souvent inacceptable pour les applications
Ajout d'info aux donnees a transmettre pour detecter, voir de corrigerm, les erreurs de transmission
- Transformation des donees initiales a l'aide d'un code, puis transmission des donnees codees.
Plusieurs type de codes:
- Code lineaires, les codes BCH, les codes cycliques, les codes polynomiaux et les codes convolutionnels
- Codages des donnees realise de facon logicielle ou algorithmes de codage cables dans les circuits electroniques de transmission de donnee
#### Codes de niveau caractere
##### Codes lineaires
Le code de parite paire:
- Le bit de parite est dans un etat tel que le nombre de bits a 1 du mots code(y compris le bit de parite) est paire
Frequemment utilise dans les liaisons serie asynchrones
- Recepteur recalcule le bit de parite a partir des k bits de donnees
- Lorsque le resultat est identique au bit de controle recu la transmission s'est probablement effectuee sans erreur/
Calcul realise par un circuit combinatoire simple (portes NON OU exclusif)
Ne detecte pas toutes les erreurs
- Ex :2bits theoriquement a 0 passent a 1 (parite identique) a celle recue.
Le code de parite impaire
- Le bit de controle est dans un etat tel que le nombre de bits a un du mots code est impaire
Exemple :
- Parite paire
	- Caracterere a transmettre 0x34 (sur 7 bits)
		- 011 0100 bit de parite = 1
	- Si caractere recu (0x38)
		- 011 1000 bit de parite = 1
		- Defaut non detecte
	- Si caractere recu (0x3C)
		- 011 1100 bit de parite = 0
		- Defaut detecte
- Parite impaire
	- Caractere a transmettre 0x25 (7bits)
		- 010 0101 bit de parite = 0
#### Codes de trames
Somme de verification (checksum)
- Consiste a ajouter un mot de N bits aux mots d'information
- La valeur de ce mots est la somme des mots d'information modulo 2^N. Il est courant de prendre N=8 ou N=16.
- Exemple: mots d'info 52h, 9Ah, 7E, 45h
- Somme de verification (N=8): AFh
- Code cycliques (CRC : Code de Rebondance Cyclique)
	- S'appuie sur un calcul polynomial effectue avant d'emettre
	- Ex : polynome generateur CRC16 g(x)=X^16 + X^12 X^5 +1
	- g(X) = 1 + X + X^2+X^4 +X^5 +X^8+X^10 +X^11 +X^12 +X^16 +X^22 +X^23 +X^26 +X^32 (ethernet)
	- La trame et le reste de la division de P(x)* xn par g(x) sont envoyes.
	- Le recepteur effectue a son tour le meme calcul sur la trame complete et doit trouver 0.
	- Cette methode est tres efficace et permet de detecter 999 erreurs sur 1000. (EX:CRC16)
###### Example Code CRC X modem
```c
/* Calculating XMODEM CRC-16 in 'C' ================================ */
#define poly 0x1021
/*
 * On entry:
 *   addr => start of data
 *   num  = length of data
 *   crc  = incoming CRC
 */
int crc16(char *addr, int num, int crc) {
    int i;

    for (; num > 0; num--) {                 // Step through bytes in memory
        crc ^= (*addr++ << 8);               // Fetch byte, XOR into CRC top byte

        for (i = 0; i < 8; i++) {            // Rotate 8 bits
            if (crc & 0x8000)                // b15 is set...
                crc = (crc << 1) ^ poly;     // Rotate and XOR with XMODEM polynomial
            else                             // b15 is clear...
                crc <<= 1;                   // Just rotate
        }

        crc &= 0xFFFF;                       // Ensure CRC remains 16-bit
    }

    return crc;                              // Return updated CRC
}
```
#### Necessite du controle du flux
Les system a relier sont capables de traiter des debits de donnees differents
- Si le debits emetteur est superieur au debit acceptable par le recepeteur
	- Envoi de nouvelles donnees emetteur alors que le recepteur n'a pas fini de traiter les precedentes
- Il va y avoir ecrasement d'informations
Necessite d'un mecanisme pour bloquer temporairement l'emetteur
- Le recepteur peut terminer son traitement, puis demander a l'emetteur de reprendre sa transmission.
- Ce mecanisme peut etre realise de facon materielle ou de facon logicielle
#### Controle de flux
##### Methode materielle
methode materielle consiste a utiliser une ligne electrique supplementaire
- ligne pilotee par le recepteur en entree pour l'emetteur
- l'etat de la ligne indique a l'emetteur s'il doit arreter ou poursuivre l'emission de donnees
Cette methode est souvent utilisee pour les liaisons de courte distance (<100m) Au dela le cout du cable devient une contrainte majeur
Remarque :
- Pour une liaison duplex, il faudra 2 lignes supplementaires : une pour l'emetteur etune pour le recepteur
- Le recepteir doit activer cette ligne avant qu'il y ait perte de donnees s'il veut eviter toute reemission partielle des dernieres donnees.
Avec une liaison duplex, l'emetteur peut aussi interroger l'esclave pour savoir ou il doit reprendre sa transmission
Cette methode ne requiert pas de tampon de reception bien qu'il soit recommande
##### Methode logicielle
Necessite l'utilisation d'un tampon de donnees par le recepteur
le recepteur envoie une donne particuliere pour demander a l'emetteur d'interrompre sa transmission
Pour reprendre la transmission, le recepteir envoie un autre caractere particulier
Dans les liaisons asynchrones, ces caracteres sont souvent appeles Xon et Xoff.
- Valeur des caracteres issue de la table ASCII (Xon = 17 (10) / Xoff = 19 (10))
- Le recepteur envoie Xoff pour demander a l'emetteur d'arreter la transmission et Xon pour qu'il la reprenne
![Controle de flux Xoff Xon](Controle%20de%20flux%20Xoff%20Xon.png)
#### Le controle de flux logiciel
- N'est applicable que si on dispose d'une liaison duplex
- N'est applicable que si on utilise un tampon de donnees en reception
- Recepteur envoie Xoff bien avant qu'il ait perte de donnees
	- Evite toute reemission partielle des dernieres donnees
- Ne requiert pas de ligne supplementaire
#### Interfaces normalisees historiques
Boucle de courant
- Cette interface a ete tres utilisee sur les teleimprimeurs avant la creation du standard RS232
- Elle permet une liaison point a point
- L'information binaire 0/1 se traduit par l'absence/presence d'un courant sur la ligne. La valeur du courant n'est pas normalisee. Neanmoins les valeurs classiques sont 20mA ou 60mA.
Avantages:
- Sa simplicite (on peut aussi utiliser une technologie a semi conducteur)
- une bonne immunite aux parasite
- l'adequation aux longues distance(<1km)en ajustant la tension du generateur
Inconvenient
- Le debit faible inferieur a 1kbit/s (bande passante reduite)
- il s'agit d'une liaision simplex
Encore tres utilisee dans l'industrie pour la liaison des capteurs et actionneurs
- Peut aussi servir de source d'alimentation

La norme RS232 ou V24 et V28
- Recommande Standard definie par l'EIA
- Sa derniere version est la RS232D et date de 198
- Correspond aux normes V24/V28 emis par le CCITT.
	- V24 concerne les signaux et la connectique
	- V28 concerne les specifications electriques
- Initialement prevue pour la liaison entre un ETTD et ETCD
Specifie les caracteristiques de l'interface
- mecaniques et electriques et le role des signaux 
- ETTD (Equipment Terminal de Transmission de donnees / DTE)
	- un ordinateur ou un terminal
	- ETCD (Equipement de Terminaison de Circuit de Donnees/ DCE)
		- un MODEM, une imprimante
#### Liaison RS232
Adaptee pour des liaisons synchrone ou asynchrome
- Duplex
- debit limite a 20kBit/s
- longueur inferieur a 25 metres
Aussi utilisee pour relier 2 ETTD(ordianeurs - terminaux)
- Utilisation deviee
![Liaison RS232 entre 2 ETTD](Liaison%20RS232%20entre%202%20ETTD.png)
#### Les signaux
| Nom signal                            | Broche | Description                                                                                                                                                                                       |
| ------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TxD / Transmit Data                   | 2      | Ligne de transport des données du DTE vers le DCE                                                                                                                                                 |
| RxD / Receive Data                    | 3      | Ligne de transport des données du DCE vers le DTE                                                                                                                                                 |
| RTS / Request To Send                 | 4      | Ligne pilotée par le DTE pour placer le DCE en mode local (RTS=0) ou en mode transmission (RTS=1). Lorsque le DCE est en mode transmission,le DTE est en liaison directe avec le DCE/DTE distant. |
| CTS / Clear To Send                   | 5      | Ligne pilotée par le DCE pour confirmer au DTE le passage en mode transmission.                                                                                                                   |
| DCE Ready / DSR / Data Set Ready      | 6      | Ligne pilotée par le DCE pour confirmer que la connexion est établie avec le canal de communication                                                                                               |
| DTE Ready / DTR / Data Terminal Ready | 20     | Ligne pilotée par le DTE pour demander au DCE de se connecter au canal de communication                                                                                                           |
| RI / Ring Indicator                   | 22     | Ligne pilotée par le DCE pour indiquer au DTE qu’un appel pour le DCE est en cours                                                                                                                |
| RLSD / DCD / Data Carrier Detected    | 8      | Ligne pilotée par le DCE pour indiquer qu’un signal connu a été détecté sur le canal de communication (par exemple la porteuse du DCE distant).                                                   |
| GND                                   | 7      | Masse commune des signaux                                                                                                                                                                         |
| Shield                                | 1      | Signal de blindage du câble de transmission. Ce signal peut être relié à la terre d’un DCE.                                                                                                       |

#### Aspect mecaniques et electriques
Aspect Mecanique
- Connecteur type D a 25 points(DB25/SubD25)
- male sur l'ETTD(terminal)
- femelle sur l'ETCD (MODEM)
- Cable de longueur maxi conseille 25m (liee a la capacite d'une ligne)
Aspect electrique
Caracteristiques d'un emetteur:

| Caractéristique                                        | Valeur      |
| ------------------------------------------------------ | ----------- |
| Tension en circuit fermé sur une charge de 3 à 7 kohms | +15V à -15V |
| Tension en circuit ouvert                              | -25V à +25V |
| Impédance de sortie                                    | < 300 ohms  |
| Capacité maximale de la ligne                          | 2.5 nF      |
| Débit maximal                                          | 20 kBit/s   |
| Vitesse d'évolution maximale des signaux               | 30 V/µs     |
##### Codage 
Les lignes de donnees sont en logique negative 
Les lignes de controle sont en logique positive

| Circuits de donnees |            |     | Circuite de controle |            |
| ------------------- | ---------- | --- | -------------------- | ---------- |
| Niveau logique      | Tension    |     | Niveau logique       | Tension    |
| 0                   | +3V a +15V |     | 0                    | -15V a +3V |
| 1                   | -15V a +3V |     | 1                    | +3V a +15V |
##### Cablage
Le type de cable depende du typoe de liaison a etablir
- Le standard RS232D propose un tableau recapitulatif des signaux a utiliser pour differentes configurations
Liaison complete entre un ETTD (Ordinateur) et un ETCD (MODEM)
![Cablage ETTD ETCD](Cablage%20ETTD%20ETCD.png)

| Signal | Ordinateur (Pin) | MODEM (Pin) |
|--------|------------------|-------------|
| TxD    | 2                | 2           |
| RxD    | 3                | 3           |
| RTS    | 4                | 4           |
| CTS    | 5                | 5           |
| DSR    | 6                | 6           |
| DTR    | 20               | 20          |
| RI     | 22               | 22          |
| DCD    | 8                | 8           |
| GND    | 7                | 7           |
#### Utilisation DETOURNEE du standard RS232D
Liaison de 2 ETTD (Ordinateurs)
- Liaison minimale duplex entre 2 ETTD
- On croise simplement les lignes RxD et TxD

| Ordinateur (Pin) | MODEM (Pin) |
| ---------------- | ----------- |
| (TxD) 2          | 3(RxD)      |
| (RxD)3           | 2(TxD)      |
| (GND)7           | 7           |
![Liaison entre ligne RxD et TxD](Liaison%20entre%20ligne%20RxD%20et%20TxD.png)
Liaison duplex entre 2 ETTD (ordinateurs) avec controle de flux materiel
- Lignes RTS et CTS utilisees comme lignes de controle de flux
- elles sont croisees

| Ordinateur (Pin) | MODEM (Pin) |
| ---------------- | ----------- |
| (TxD) 2          | 3(RxD)      |
| (RxD)3           | 2(TxD)      |
| (GND)7           | 7           |
| (RTS)4           | 5(CTS)      |
| (CTS)5           | 4(RTS)      |
![Liaison 2 ETTD detournee RS232D](Liaison%202%20ETTD%20detournee%20RS232D.png)
#### Connecteur DB9
8 Singaux seuleemnt sont utilises dans 90% des liaisons au standard RS232
- Un connecteur plus petit le DB9 est donc tres utilise mais pas normalise
- Connecteur DB9 d'un ETTD

| Signal | DB9 Pin | DB25 Pin |
| ------ | ------- | -------- |
| TxD    | 3       | 2        |
| RxD    | 2       | 3        |
| RTS    | 7       | 4        |
| CTS    | 8       | 5        |
| DTR    | 4       | 20       |
| DSR    | 6       | 6        |
| DCD    | 1       | 8        |
| RI     | 9       | 22       |
| GND    | 5       | 7        |

#### Faiblesse de la RS232
Le standard RS232 encore utilise dans l'industrie
- facile a mettre en oeuvre
Mais possede plusieurs limitation:
- Scpecifitie a la liaison ETCD -ETTD
- Debit theorique limite a 20kBits/s (921kBiut/s en pratique sur certains ETTD)
- Distance maximal de liaison inferieure a 25m
- Liaison type "point a point"
- Standard monolithique (specifie les aspects elecrtiques / signaux / connectique / protocole)
l'EIA a cree 4 nouvelles specifications resuimees ci dessous:
- RS449: (V24-V54 CCITT) spécification signaux et connectique 
- RS423: (V10) spécification électrique (650m, 300kBits/s, 1 émetteur / plusieurs récepteurs) 
- RS422: (V11) spécification électrique (différentiel, 1350m, 10Mbits/s, 1 émetteur / plusieurs récepteurs) 
- RS485 spécification électrique (différentiel, 1350m, 10Mbits/s, plusieurs émetteurs / plusieurs récepteurs)
Ces specifications sont plus modulaires et il en faut plusieurs pour definir l'interface serie.

###### Transmission differentielle, un seul maitre
![Transmission differentielleun seul maitre](Transmission%20differentielleun%20seul%20maitre.png)
###### Transmission differentielle, multipoints
![Transmission differentielle, multipoints](Transmission%20differentielle,%20multipoints.png)
#### Liaison synchrones
Transmission des donees et de l'horloge
Liasions 2 fils (I2C et SMBus)
- Transmission par paquet
- Vitesses 100Kb/s, 400Kb/s, 3.4Mb/s
- Communication inter-composants (parfois utilise en inter-systemes)
Liaisons 3 fils(SPI, QSPI, MICROWIRE)
- Transmission par mots (8 bits, QSPI 16 bits)
- Vitesses jusqu'a 100MHz
- Communication inter-composants
	- Maître (Master) est le composant qui émet l'horloge (SCL), initie et termine le transfert. Il fournit comme première information l'adresse de l'esclave sélectionné et le type de cycle (lecture ou écriture) désiré.
	- Esclave (Slave) est le composant sélectionné pour le transfert par un maître. Il reçoit l'horloge du maître.
	- Émetteur (Transmitter) est celui qui transmet une donnée sur le bus. Si le maître désire effectuer une lecture, l'esclave est l'émetteur, si le maître désire effectuer un écriture il est l'émetteur.
	- Récepteur (Receiver) est celui qui reçoit une donnée du bus. Selon le sens du transfert, ce sera le maître ou l'esclave.
	- Multi-maîtres (Multimaster) est un système où plusieurs maîtres peuvent prendre le bus sans compromettre les données.
	- Arbitrage (Arbitration) est la procédure pour prendre le bus si plusieurs maîtres désirent le faire en même temps.
	- Synchronisation (Synchronization) est la méthode pour synchroniser l'horloge entre plusieurs maîtres circuits.
#### I2C cablage
2 lignes pour tous 
- SCL : CLk, horloge
- SDA : Data, donnee
Transmission:
- Multipoint
- synchroine
- par paquet
![Cablage I2C](Cablage%20I2C.png)
Lignes bidirectionnelles, collecteur ouvert
- SCL : CLk, horloge,
	- toujkours activee par maitre
	- peut etre maintenue a '0' par esclave
- SDA : Data donnee
![Lignes bidirectionnelles](Lignes%20bidirectionnelles.png)
Differente Phases
- Repos liognes a l'etat 'H'
- Start : SDA 'H' - > 'L', avec SCL 'H'
- Stop : SDA 'L'->'H' avec SCL 'H'
- changement de SDA lorsque SCL = 'L'
![Differente Phases](Differente%20Phases.png)
##### Echange simple
Echange : 1er octet
- Adresse destinataire 7 bits
- sens du transfert 1 bits
- Acknowledge (quittance)
![Premier octety](Premier%20octety.png)
![Autre echange](Autre%20echange.png)
##### Arbitrage multi-maitre
Bit dominant et recessif
- 0 dominant du a la structure electronique
Adressage
- L'emetteur dont le bit est different de SDA se met en ecoute
![Arbitrage multi-maitre](Arbitrage%20multi-maitre.png)
##### Ralentissement d'horloge
Cause par un esclave
- Maintient de l'horloge a 0
![Ralentissement d'horloge](Ralentissement%20d'horloge.png)
##### BUS SPI (MOTOROLA)
Bus 3 fils
- full duplex, multimaitres
- signal supplementaire de selection d'esclave
Signaux
- MOSI Masteur Out, Slave In,
- MISO Master In, Slave Out,
- SCK Serial ClocK
	- Horloge de transmission serie, fourni par le maitre
- SS Slave Select, 1 par esclave
![SPI Exemple de cablage](SPI%20Exemple%20de%20cablage.png)
![Implementation sur uC 68HC11](Implementation%20sur%20uC%2068HC11.png)
### IDE : Code, Compilation & edition de liens
Compilation en 2 phases
- Preprocesseur : cree un fichier temporaire
	- Inclusion des definitions externes
	- Remplacement des defines par leur equivalent
- Compilateur : travaille avec ce fichier temporaire (.s ou .asm ou...)
	- Repartition des elements de programmes en sections. (.text,.data ,.bss)
	- Appelle l'outil assembleur : produit un fichier objet(.o ou .obj ou ...)
- Edition de lines (linker)
	- Creation du programme a partir des fichier objets
![Fichier object compiler](Fichier%20object%20compiler.png)
#### Debogue : les differentes methodes
Utilisation de GPIO ou du printf (intrusif :cours de programmation)
- Necessit d'adapter le code
ROM monitor (intrusif)
- Programme lie avec l'appli : utilise unport de communication serie pour dialoguer avec l'hote (PC)
Emulateur (non intrusif mais plus utilise, methode ancienne et onereuse)
- Remplacement du processeur par une sonde et un systeme jouant son role
Debogueur (intrusif ou non : utilise un bloc silicium specifique dans le processeur)
	- assurer de la presence de cette fonctionnalite (ex:BDM, JTAG)
	- Necessite un outil materiel adapte
		- Processeur supplementaire avec son programme (ex : integre dans les cartes d'evaluation Nucleo de chez STmicroelectronics)
		- Outil commercial (ez :jtagjet, SIGNUM)
	- Une appli logicielle
		- Interface utilisateur : chargement de code, lancement, point d'arret, pas a pas, visualisation///
		- St-link (ST)
		- Chameleon (SIGNUM)
#### Elements de langage C : types de base
Types de base
- entiers
	- entiers de 8 bits
		- char (-128 ≤ n ≤127) unsigned char 0≤ n ≤255) 
	- entiers de 16 bits
		- short (-32768 ≤ n ≤ 32767) unsigned short (0 ≤ n ≤ 65535)
- entiers adapté au processeur
	-  int et unsigned int : en général 16 ou 32 bits 
- entiers de 32 bits
	- long (-2.147.483.648 ≤ n ≤ 2.147.483.647) unsigned long (0 ≤ n ≤ 4.294.967.295)
- Nombres décimaux (codage IEEE754)
	- float (32bits) ( ± ~1,19e-38 à ~3,4e+38) 
	- double (64bits) ( ± ~2,22e-308 à ~1,79e+308)

Tableaux
- Type nomduTableau[dimension]

### STM32 : UART & USART
Le microcontroleur SDMT32F107VC dispose de :
- 3 peripherique USART (Universal Synchronouse Asynchronous Receiver Transmitter)
	- peuvent aussi fonctionner en mode synchrone, IRDA, LIN et multipoints
- 2 UART (Universal Asynchronous Receiver Transmitter)
	- Exclusivement asynchrones
Specificte des peripheriques integres
- Chaque periph dispose d'une horloge a l'arret par defaut
	- A activer pour pouvoir le parametrer et l'utiliser
- Acces aux broches du microcontroleur s'effectue par l'intermediaire des ports paralleles
	- Choisir le mode entree ou sortie alternative (autre que General Purpose IO)
- Redirection possible sur different ports
	- a faire pour utiliser l'USART2 sur le port D. (Cf schema)
Fonctionnalite principales des UART 1 a 3 :
- Vitesse de comm programmable
	- 2,25Mbaud(4,5Mbaud pour l'UART 1)
- Comm en mode duplex
- controle de flx materiel avec les lignes RTS et CTS
- Une gestion sous interruption ou par DMA

#### Emetteur
A activer pour pouvoir transmettre des donnees
- bit TE=1 dans le registre de commande (USARTx_CR1)
Indique qu'il peut accepter un caracter a emettre
- bit TXE = 1 dans le registre d'etat (USARTx_SR)
A l'ecriture d'un caractere dans le registre d'emission (Data Register)
- le bit TXE passe a 0
- caractere copie dans le registre a decalage des que le caractere precedent est completement transmis
- le bit TXE repasse alors automatiquement a 1
L'emetteur transforme le caractere du registre a decalage en une trame de bit transmise sur la ligne Tx
- ajoute les bits de START, de STOP et eventuellement le bit de parite
- ligne Tx repasse au niveau haut(Vcc) en fin de transmission
Lorsque le registre a decalage et le registre d'emission sont vide
- le bit TC (transmit complete) du registre d'etat passe a 1
#### Recepteur
Doit etre active pour pouvoir recevoir des donnees
- bit RE=1 dans le registre CR1
Le recepteur
- attend un front descendant (Vcc->0V sur la ligne Rx)
- En fonction de la vitesse programmee, attend 1/2 bit et lit alors l'etat de la ligne Rx
	- Si la ligne est toujoursa 0V, il s'agit d'un bit de START
	- Lecture de la ligne Rx au rythme de l'horloge jusqu'au bit de STOP pour reconstituer le caractere transmis
- Met a jour les bits d'erreur dans le registre d'etat
- ecrit le caractere recu dans le registre de reception
	- Les bits d'erreur sont remis a jour apres chaqwuie lecture du rtegistre de recpetion(RD)
	- Il faut donc les lire avant de lire le registre de reception
Les erreurs
- L'erreur de trame (framing)
	- Manque de bit de STOP (ligne Rx au niveau bas)
- L'erreur de parite
	- parite recue differe de la parite calculee
- Le bit d'ecrasement (overrun)
	- a 1 si le nouveau caractere recu n'a pu etre ecrot dams ;e regostre de reception RD car le caractere precedent n'a pas encore ete lu
Possibilite d'utiliser un des controlers DMA pour des vitesses de communication elevees.

#### Masque et interruption
Chaque interface serie dispose d'un unique vecteur d'interruption de priorite modifiable
- gere par le controleur d'interruption (Nested Vectored Interrupt Controller)
- Le controleur NVIC distingue 16 niveaux de priorite
Dans l'interruption USART il faudra donc tester les drapeaux utiles dans le cadres de l'application a developper

| **Interruption**  | **Drapeau** | **Bit de contrôle** |
| ----------------- | ----------- | ------------------- |
| TDR vide          | TXE         | TXEIE               |
| Drapeau CTS       | CTS         | CTSIE               |
| Tx terminée       | TC          | TCIE                |
| Caractère reçu    | RXNE        | RXNEIE              |
| " écrasé          | ORE         | RXNEIE              |
| Ligne au repos    | IDLE        | IDLEIE              |
| Erreur de parité  | PE          | PEIE                |
| Break détection   | LBD         | LBDIE               |
| Erreur (multi B.) | NE\|ORE\|FE | EIE (si DMA)        |
![Masque USART](Masque%20USART.png)

##### Format de donnees et caracteres speciaux
Le format des caracteres peut etre de 8 ou 9 bits incluant la parite
L'USART gere aussi les caracteres BREAK et IDLE
![BREAK IDLE USART](BREAK%20IDLE%20USART.png)
##### Etape essentielles de programmation
Étapes préalables:  
1. activer l'horloge de l'USART 
2. rediriger si besoin l'USART 
3. activer les ports parallèles concernés choisir la bonne direction des lignes 

Pour initialiser le port série, il faut dans l’ordre: 
1. activer l'USART en forçant le bit UE du registre CR1 puis désactiver l’émetteur et le récepteur (pour les paramétrer) 
2. choisir la taille des mots (bit M de CR1) 
3. choisir le nombre de bits de stop 
4. si besoin programmer le mode DMA 
5. choisir le baud rate (registre BRR)
6. Activer l’émetteur ou le récepteur ou les 2. (CR1) 
7. Écrire dans TDR ou attendre que RXNE=1 (caractère transféré dans le RDR) 

Pour une gestion du port série sous interruption il faut ajouter après le 5) 
1. Écrire la fonction d’interruption (portant le nom du vecteur correspondant) 
2. Valider les interruptions du contrôleur série (TXEIE, RXNEIE, etc.) 
3. valider l'interruption UART auprès du contrôleur d'interruptions (NVIC)

##### Modele de programmation
LEs registres accessibles en mode 16bits
- l'USART2 se situe a partir de l'adresse 0x40014400
Ne pas oublier : parametrer l'horloge du peripherique et les lignes du port D partagees avec l'USART pour que ce dernier prenne le pas sur la fonction GPIO
![USART registre](USART%20registre.png)
#### Utilisation en langage C
Structure de donnees :
```c
typedef struct
{
  volatile unsigned short SR;         // Status Register
  unsigned short RESERVED0;
  volatile unsigned short DR;         // Data Register
  unsigned short RESERVED1;
  volatile unsigned short BRR;        // Baud Rate Register
  unsigned short RESERVED2;
  volatile unsigned short CR1;        // Control Register 1
  unsigned short RESERVED3;
  volatile unsigned short CR2;        // Control Register 2
  unsigned short RESERVED4;
  volatile unsigned short CR3;        // Control Register 3
  unsigned short RESERVED5;
  volatile unsigned short GTPR;       // Guard time and Prescaler Register
  unsigned short RESERVED6;
} USART_TypeDef;

#define USART2_BASE 0x40014400
```
Declaration de pointeur

## Registre de contrôle USART 1 (`USARTx_CR1`)

Ce registre est utilisé pour configurer divers aspects du périphérique USART (Universal Synchronous Asynchronous Receiver Transmitter). Il est accessible en lecture et en écriture.

![USARTx_CR1(1)](USARTx_CR1(1).png)
![USARTx_CR1(2)](USARTx_CR1(2).png)
![USARTx_CR2](USARTx_CR2.png)
![USARTx_CR3](USARTx_CR3.png)
- **DMAR – DMA enable Receiver (bit 6)**
    
    - Méthode de réception des données par DMA.
    - **0** : Réception par DMA désactivée.
    - **1** : Réception par DMA activée.
- **SCEN – Smart Card mode Enable (bit 5)**
    
    - Active ou désactive le mode carte à puce.
    - **0** : Mode Smart Card désactivé.
    - **1** : Mode Smart Card activé.
- **NACK – Smart Card Nack Enable (bit 4)**
    
    - Contrôle la transmission d'un caractère NACK en cas d'erreur de parité en mode Smart Card.
    - **0** : Pas de transmission du caractère NACK en cas d'erreur de parité.
    - **1** : Transmission du caractère NACK en cas d'erreur de parité.
- **HDSEL – Half Duplex Select (bit 3)**
    
    - Active ou désactive le fonctionnement en mode semi-duplex.
    - **0** : Mode semi-duplex désactivé.
    - **1** : Mode semi-duplex activé.
- **IRLP – IrDA Low Power (bit 2)**
    
    - Choix du mode IrDA normal ou faible consommation.
    - **0** : Mode normal.
    - **1** : Mode faible consommation.
- **IREN – IrDA mode Enable (bit 1)**
    
    - Active ou désactive le mode IrDA. Fonctionnement en mode impulsions.
    - **0** : IrDA désactivé.
    - **1** : IrDA activé.
- **EIE – Error Interrupt Enable (bit 1)**
    
    - **NOTE IMPORTANTE**: Ce bit est également défini comme Bit 1, comme `IREN`. Cela suggère qu'il pourrait s'agir d'un conflit dans la documentation fournie, ou que `EIE` est conditionnel au `DMAR` bit (comme mentionné : "lorsque DMAR=1"). Dans les microcontrôleurs STMicroelectronics (STM32 par exemple), `EIE` est souvent dans `CR3` et `IREN` dans `CR1` ou `CR3` mais à des positions distinctes. Si ces deux définitions sont pour le _même_ bit, il y a une ambiguïté. En général, `EIE` est pour les erreurs DMA.
    - Activation de l'interruption d'erreurs lorsque `DMAR=1` (réception multi-buffer).
    - **0** : Interruption désactivée.
    - **1** : Interruption activée (lorsque `DMAR=1` dans `CR3` et que `FE=1` ou `ORE=1` ou `NE=1` dans le registre `SR`)
![USARTx_SR](USARTx_SR.png)
- **RXNE – Read data register not Empty flag (bit 5)**
    
    - Positionné par l'USART lorsque le contenu du registre à décalage de réception a été transféré dans le registre de lecture `DR`.
    - L'effacement recommandé s'effectue par la lecture du registre `DR`, ou par forçage à 0 pour le mode multi-buffer.
    - **0** : Pas de donnée reçue.
    - **1** : Une donnée reçue peut être lue dans le registre `DR` (une interruption est générée si le bit `RXNEIE=1` dans `CR1`).
- **IDLE – Idle line detect flag (bit 4)**
    
    - Positionné par l'USART lorsqu'une ligne au repos a été détectée (ligne maintenue à l'état haut (1) pendant la durée d'un bit de start + caractère + n bits de stop, suivie d'un bit de start).
    - L'effacement recommandé s'effectue par la lecture du registre `SR` suivie d'une lecture du registre `DR`, ou par forçage à 0 pour le mode multi-buffer.
    - **0** : Pas de caractère de ligne au repos détecté.
    - **1** : Caractère de ligne au repos détecté (une interruption est générée si le bit `IDLEIE=1` dans `CR1`).
    - **Note** : Le drapeau `IDLE` ne sera revalidé qu'après la réception d'un caractère (`RXNE=1`) et une nouvelle détection de ligne au repos.
- **ORE – Overrun Error (bit 3)**
    
    - Bit d'erreur d'écrasement. Positionné par l'USART quand un nouveau caractère reçu dans le registre à décalage est prêt à être écrit dans le registre `DR`, mais que le bit `RXNE` est déjà à 1 (indiquant que le précédent caractère n'a pas encore été lu du registre `DR`).
    - Ce bit est effacé par une séquence logicielle : lecture du registre `SR` suivie d'une lecture du registre `DR`.
    - **0** : Pas d'écrasement détecté.
    - **1** : Caractère écrasé (une interruption est générée si le bit `RXNEIE=1` dans `CR1`).
    - **Note** : Le contenu du registre `DR` n'est pas perdu, mais le caractère dans le registre à décalage est écrasé par le nouveau. En mode multi-buffer, une interruption sera déclenchée si le bit `EIE=1` dans `CR3`.
- **NE – Noise Error flag (bit 2)**
    
    - Bit d'erreur de bruit. Positionné par l'USART quand il détecte des parasites sur la ligne de réception.
    - Effacé par une séquence logicielle : lecture du registre `SR` suivie d'une lecture du registre `DR`.
    - **Note** : Aucune interruption n'est générée directement par `NE`, car son positionnement a lieu en même temps que `RXNE`, qui peut générer une interruption.
    - **0** : Pas de bruit détecté.
    - **1** : Bruit détecté.
    - **Note** : En mode multi-buffer, une interruption sera déclenchée si le bit `EIE=1` dans `CR3`.
- **FE – Frame Error flag (bit 1)**
    
    - Bit d'erreur de trame (absence de bit d'arrêt). Positionné par l'USART quand il ne détecte pas de bit d'arrêt sur la ligne de réception.
    - Effacé par une séquence logicielle : lecture du registre `SR` suivie d'une lecture du registre `DR`.
    - **Note** : Aucune interruption n'est générée directement par `FE`, car son positionnement a lieu en même temps que `RXNE`, qui peut générer une interruption.
    - **0** : Pas d'erreur de trame détectée.
    - **1** : Erreur de trame ou caractère "break" détecté.
    - **Note** : En mode multi-buffer, une interruption sera déclenchée si le bit `EIE=1` dans `CR3`.
- **PE – Parity Error flag (bit 0)**
    
    - Bit d'erreur de parité. Positionné par l'USART quand il détecte une erreur dans la parité du caractère reçu.
    - Effacé par une séquence logicielle : lecture du registre `SR` suivie d'une lecture du registre `DR`.
    - Le programme doit attendre que `RXNE` soit positionné pour effacer le bit `PE` (l'erreur est détectée avant la fin de la réception du caractère).
    - **0** : Pas d'erreur de parité.
    - **1** : Erreur de parité détectée (une interruption est générée si le bit `PEIE=1` dans `CR1`).

![USARTx_DR](USARTx_DR.png)

DR – Data Register (bit [8:0]) 
Contient le caractère reçu ou à transmettre selon l'opération (lecture ou écriture). Il y a en fait 2 registres à la même adresse : le registre TDR utilisé pour l'écriture et le registre RDR pour la lecture. Lorsque la parité est autorisée (PCE=1 dans CR1),le bit de poids fort (7 ou 8 selon le format) est remplacé par le bit de parité calculé.

![USARTx_BRR](USARTx_BRR.png)
Pour les TP, l'horloge source fCK qui entre dans le diviseur de l'USART2 a une fréquence de 36MHz. On considère que le fonctionnement sera correct si l'erreur sur la vitesse ne dépasse pas 3%. 
DIV_mantissa – Divider Mantissa (bit [15:4]) 
	Contient la mantisse du diviseur d'horloge USARTDIV. 
DIV_fraction – Divider Fraction (bit [3:0]) 
	Contient la partie fractionnaire du diviseur d'horloge USARTDIV. 

**USARTDIV = DIV_mantissa + (DIV_fraction/16)**

### Exercice / exemple
Definir la valeur de BRR pour obtenir une vitesse de 2400 baud
USARTDIV = DIV_mantissa + (DIV_fraction/16)
Tx/Rx baud = fck / (16* USARTDIV)
#### Programme test
```c
int main(void) {
    char dispBuf[20 + 1]; /* display buffer */
    int i = 0, j, temp;
    const char MESS[] = " EX RS232 ";

    /*--------------------------------------------------------------------------*/

    SystemInit();   /* Initialize clocks */
    init_serial();  /* Initialize USART #2 7bits/car no parity */
    GLCD_Init();    /* Initialize the GLCD */
    GLCD_Clear(White); /* Clear the GLCD */
    GLCD_SetBackColor(Blue); /* Set the Back Color */
    GLCD_SetTextColor(White); /* Set the Text Color */
    GLCD_DisplayString(0, 0, " MCBSTM32C ");
    GLCD_DisplayString(1, 0, (unsigned char*)MESS); // Cast to unsigned char* as GLCD_DisplayString expects it
    GLCD_SetBackColor(White); /* Set the Back Color */
    GLCD_SetTextColor(Blue); /* Set the Text Color */

    while (1) { /* loop forever */
        // attendre l'arrivée d'un caractère
        // lire le caractère avec contrôle d'erreur
        // si une erreur est détectée en afficher le label
        // sinon faire un écho du caractère
    }
}
```

## Le BUS CAN (Controller Area Network)
Concu en 1983 par la societe allemande Robert BOSCH Gmbh
- Concu pour l'automobile
- maintenat utilise dans l'industrie
4 classes d'applications pour la SAE (Societyof Automotive Engineers) dans les vehhicules :
- A, B, C et D
- De la commande de leve vitres (A) jusqu'au systeme de navigations bases sur les GPS (D)
Classification en deux classes d'applications pour l'ISO
- Vitesse de transmission lente définie comme étant inférieure à 125 Kbits/s 
- Vitesse de transmission élevée considérée comme étant supérieure à 125 Kbits/s
#### Presentation
Le CAN est un systeme de communication en temps reel par liaison serie asynchrone multiplexee horloge/ donnees temporellement
- Concu pour relier des composants interllignets ainsi que des capteurs et des actionnerus dans une machine ou un procede
Il possede des proprietes multi maintres
- Plusierus noeds peuvent simultanement demander l'acces au bus
- pas de systeme d;adressage mais un systeme d'allocation de priorite au messages
	- Base sur l'identificateur attribue a chaque message
Un emetteur transmet un message sans indication de destinataire sur la base de l'identificateur associe a ce message
- Chaque noeud decide de traiter ou d'ignorer ce message
Dans le bus CAN, le protocole de communication est assure par des composants electroniques.

#### Principe du BUS CAN
Le bus CAN constitue un reseau local
- Meme particularite que le reseaux locaux en general
- permet le transfer de donnees d'au moins un point source vers au moins uyn point de destination
- normalisation rigoureuse pour permettre l'interconnexion
- modele de structuration de protocle appele OSI (Open Systems Interconnection) de l'ISO
La specification CAN
- Norme ISO DIS 1159-1 du Bus CAN definit deux parties A et B
	- partie A : un champ d'identification sur 11 bits (format dit standard)
	- partie B : un champ d'identification sur 29bits (format dit etendu)
#### Propriete du protocole CAN
Principales propriete:
- Garantie des temps de latence
- Souplesse de configuration
- Receptionde mulitples souirces avec synchronisation
- Fonctionnement en multi maitre
- Detection et signalisations d'erreurs
- retransmiussion de messages alteres des que le bus est libre
- distinction des types d'erreurs (fonctionnement ou temporelle)
- Deconnection des noeuds defecteux
##### Couches ISO du BUS CAN
Definit selon la normalisation ISO :
- Une partie de la couche 1 : la definition du signal physique, interfacage electriquea et le codage des bits ainsi que a totalite de la couche 2 (liaison de donnees)
![Architecture des couches du bus CAN](Architecture%20des%20couches%20du%20bus%20CAN.png)
#### Echange de donnees
Principe de transmission sur un bus CAN
- Aucun adresse cible physique n'est prescrite
- Le contenu d'un message est identifie parun identificateur univoque sur l'etendu du reseau
	- Tous les noeds (capteurs, calculateur, etc) rtepartis sur le reseau diffusent leurs informationjs
	- evite que chaque organe de commande n'ait son propre capteur
	- systeme de "diffusion generale multi destinataire"
- L'identificateur determine egalement la priorite de message
	- Determinant pour l'assignation d'un bus lorsque plusieurs messages sont en concurrence
En pratique pour envoyer un message
- L'unite centrale d'une des stations fouurnit le message et son identifiant a son controleur CAN
- celui ci constitue et transmet le message
	- Des qu'il recoit l'assignation du bus  ("emission du message")
	- toiutes les autres stations du reseau se mettent a l'ecoute ("reception du message")
	- chaque station du reseau CAN est en mesure d'ignore ou de prendre compte le message qui est sur le bus ("selection")
Permet une grande flexibilite au niveau de la configuration

#### Valeurs du bus
Codage des info
- format NRZ
Deux valeurs logiques complementaires possibles :
- Etat DOminant ou Recessif
Pas de support physique specifie
- Fils, infrarouge,hertzien,...
- illustration des etas dominant et recessif

![Illustrations donne bus CAN](Illustrations%20donne%20bus%20CAN.png)
##### Arbitrage bit a bit non destructif
Valeur de l'identificateur le plus proprietaire est le node 3
![Bus arbitration method](Bus%20arbitration%20method.png)
##### Valeurs electriques du bus CAN
Pas de support materiel specifique
- Implementation a partir de lignes differentielles tres frequente
- permet de garantir une bonne immunite vis a vis des parasites
![Can Low Can High](Can%20Low%20Can%20High.png)
#### Notion de bit stuffing
Eviter de confondre les trames 0x00 ou 0xFF avec un Pb sur le reseau
- Systeme de bourrage
- apres 5 bits de meme valeur trasnmis, ajout d'un bit de valeur opposee.
![Bit de stuffing](Bit%20de%20stuffing.png)
#### Attribution du bus
Procedes generaux d'attribution de bus nombreux:
- Attribution a tranches de temps fixe :
	- Sequentille au niveau de chaque poste pour une fourchette de temps maximale, sans se preoccuper du fait que la station a besoin du bus a ce moment la (Ex: TOken Slot)
- Assignation en fonction des besoins:
	- Fonction de la volonte de transmettre seules les stations souhaitant emettre sont prises en compte
	- procede utilise par le bus CAN
Acces non destructif au bus
- Chaque acces au bus par une ou plusieurs stations conduit toujours a l'attribution univcoque du buis
- l'acces destructif impose qu;'en cas d'acces simultatne par pluisieeurs stations, il faut interrompre les tentatives d'emission
- rattachement de la priorite d'acces au contenu du message
Le bus CAN est dote d'un controle decentralise de l'acces au bus
- tous les mecanismes essentiels a la communication y compris le controle de l'acces au bus, sont repris en plusieurs points du reseau
- permet d'empecher de ramener ces mecanismes vers une seule unite
	- en cas de panne difficile a substituer 
	- une station redondante mettra beaucoup de temps a prendre en charge la gestion du bus (peut empecher le fonctionnement en temps reel)
#### Messages CAN
4 types de messages :
- DATA FRAME
	- Trame de donnees
	- transporte les donnes d'un emetteur vers un ou des recepteurs
- REMOTE FRAME
	- Trame de requete transmise par un noeud
	- demande la transmission d'une DATA FRAME avec le meme IDENTIFICATEUR
- ERROR FRAME
	- Trame d'erreur
	- Transmise par une unite lorsqu'elle detecte une erreur de bus
- OVERLOAD FRAME
	- Trame de surcharge
	- utilisee pour generer un retard supplementaire entre les trames DATA FRAME ou REMOTE FRAME

### Trames de donnees
Destinée a la transmission d'info par le bus comporte 7 champs caracteristiques
- Start of Frame (SOF)
- Arbitration Field
- Control Field
- Data Field
- CRC Field
- ACK Field
- End of Frame (EOF)
![DATA Frame](DATA%20Frame.png)

#### Start of Frame
Constitue d'un seul bit "Dominant" 
- Signale la transmission d'une trame de donnees ou d'une trame de requete
- Toutes les stations doivent se synchroniser sur le front de transition du bit SOF de la station qui a commence la transmission en premier
Cf bit timing plus loin

#### Arbitration Field
Format standard : 11 bits
	- ID-0 a ID10 pour l'id (transmis MSB en premier)
	- Correspond a l'ID de base du format
	Suivi du bit RTR
	Suivi du bit IDE (IDentier Extention)
	- Dominant en format standard
Format Etendu : deux partie
	- ID base sur 11 bit
	- ID etendu sur 18 bits
	Bit SRR (Substitute Remote Request)
	- Substitue le bit RTR bit recessif
	Bit IDE (IDentier Extention)
	- Recessif en format etendu
	La partie etendue de l'identifiant 
	Le bit RTR (Remote Transmission Request)
Bit RTR (Remote Transmission Request)
- definit la nature de la trame de donnees
L'identificateur permet de determiner la priorite du message correspondant
- La priorite est autant plius eleve que la vasleur de l'id est faible
- les bits ID10a ID4 ne doivent pas etre tous recessif en meme temps dans le meme identificateur
![Arbitration field](Arbitration%20field.png)

#### Control Field
Constitue de 6 bits
- 2 "dominants" r0 et r1 en reserve d'usage ulterieur
- 4 (DLC0-DLC4) indiquent le nombre d'octers (Data Length Code)
![Control field](Control%20field.png)
#### Data field
Contient de 0 (signalisation) a 8 octets de donnees
- octet 1 de la trame en premier
- 8 bits de chaque octet transferes MSB first
![Data field](Data%20field.png)

#### CRC Field
Contient la sequnce CRC sur 15 bits
suivi d'un bit "recessif" delimiteur de CRC
Permet de detecter jusqu'a 5 erreurs reparties dfans le champs
![CRC Field](CRC%20Field.png)
#### ACK Field
Compose de deux bits ACK SLOT et ACK DELIMITER
- Transmis a l'etat "recessif"
- toutes les stations ayant valide la sequence CRC envoient un etat "dominant" dans le bit ACK SLOT
- le noeud emetteur sait alorts que son message a ete recu par au moins une station
![ACK field](ACK%20field.png)
#### EOF Field
7 bits "Recessif" SANS bit-stuffing
![EOF Field](EOF%20Field.png)

#### Trame de requetes 
Permet a une station de demander une info (remote frame)
- meme id que celui de l'objet qu'elle souahite
- la station qui detient l'info repond avec la trame de donnees correspondante
- une trame de donnees est toujours prioritaire par rapport a une trame de requete (RTR dominant dans le champ arbitration)
La trame de requete comporte 6 champs:
- SOF
- Arbitration field
- Control Field
- CRC Field
- ACK Field
- EOF
![Request frame](Request%20frame.png)
