---
title: Travaux dirige to Wireless Communication
excerpt: Overview of technologies, features in actual problem, and automation examples in home automation, combining electronics, computer science, and telecommunications for the connected home.
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
## Exercice 1 :

Soit une communication bluetooth.
Une liaison de classe 3 pourra t’elle permettre une communication à une distance de 35m sachant que le récepteur utilisé à une sensibilité de  -70dBm.
Si non, dans quelle classe doit se mettre cette liaison pour permettre une transmission ?

Tu pers 50 dB pour les 6 premier mètre puis 1 dB par mètre
règle empirique = > -79 dBm
-79 > -71 - > Class 3 pas suffisante
## Exercice 2 :
Soit l’enregistrement de spectre suivant montrant une communication Bluetooth : ![Pasted image 20250410080815](Pasted%20image%2020250410080815.png)
1-     Quelles sont les fréquences des porteuses utilisées dans cette communication ?
2.4 GHz avec 10 boucle de 1 Mz de 2.400 a 2.410
2-     Mettez en évidence la longueur variable des paquets Bluetooth
Le paquet le plus long
3-     Donnez la largeur du spectre utilisé lors de l’émission d’un paquet
1 MHz
4-     Reconstituez les sauts de fréquences lors de l’échange
code d'acces = 72
entite = 54
donnees = 240
72 + 54 + 240 = 366
625 -366 = 259

Exercice 3 :
Sachant que le débit Bluetooth est de 1Mbps, calculez le temps restant sans données dans un slot
	1 slot : 625 microsecondes de long
Dans un paquet “court” (1 slot), on transmet au maximum :
- 72 bits de code d’accès
- 54 bits d’en-tête
- 240 bits de données utiles
soit 72 + 54 + 240 = 366 bits au total.
À 1 Mb/s, envoyer 366 bits prend exactement 366 µs. Comme le slot entier fait 625 µs, il reste 625 − 366 = 259 µs sans transmission de données (slot “vide”).
**Réponse : il reste environ 259 µs sans données dans un slot.**


Exercice 4 :
Calculs d’échange de données
-        Calculez le débit utile maximal d’une liaison Bluetooth duplex symétrique dans le cadre d’échange de messages courts, moyens et longs
-        Proposez une stratégie d’échange de paquet pour qu’un composant mémoire puisse envoyer un contenu le plus rapidement possible à un autre composant.
-        Ces données devant être protégées, nous utiliserons un code FEC 1/3. Quel début utile sera disponible ?


---
# TD 2
| **Critère**          | **Bluetooth**                                                      | **Zigbee**                                                           |
| -------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------- |
| **Portée**           | 1 à 100 m selon la classe (3 → 1 m, 2 → 10 m, 1 → 100 m)           | ~100 m (voire plus avec maillage)                                    |
| **Consommation**     | Moyenne à faible (BLE réduit fortement la conso)                   | Très faible (optimisé pour fonctionnement sur pile)                  |
| **Débit**            | ~1 Mb/s (Bluetooth classique), ~3 Mb/s (EDR), ~125–250 kb/s (BLE)  | 20–250 kb/s selon la bande                                           |
| **Latence**          | Faible (connexion rapide, mais dépend du profil)                   | Très faible pour petits paquets, mais latence possible en multi-saut |
| **Topologie**        | Piconet (maître/esclave) et scatternet                             | Étoile, arborescente, **maillée (mesh)**                             |
| **Nb d’équipements** | Jusqu’à 8 actifs par piconet (1 maître + 7 esclaves), + 255 parkés | Jusqu’à **65 000 nœuds** (adresses sur 16 bits)                      |
![Zigbee vs bluetooth](Zigbee%20vs%20bluetooth.png)

---
# TD3
Longueur de trame utile : 2312 octets
Entete = 34 octets
IFS = 10 microsecond
ACK = 116 + 34 = 150
Taille / taille utile = nombre de trame

