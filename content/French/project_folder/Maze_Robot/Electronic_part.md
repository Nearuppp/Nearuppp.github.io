---
title: "Électronique et câblage du robot labyrinthe"
date: 2024-07-28
description: "Aperçu détaillé des composants électroniques et du câblage pour le projet de robot labyrinthe à UniLaSalle."
tags: ["Projet", "Électronique", "Robotique", "Arduino", "Capteurs", "Câblage"]
---

## 2.2.1 Structure Générale
Le système électronique constitue le noyau du mécanisme de contrôle de notre robot. Il comprend un microcontrôleur, des servomoteurs à rotation continue, des capteurs de distance et une batterie, tous essentiels pour le fonctionnement autonome du robot.

### Composants Clés :
- **Microcontrôleur (Maker Nano)** : Exécute le code et contrôle divers périphériques, y compris les servomoteurs et les capteurs.
![Électronique du robot labyrinthe](/img/makernano.jpg)
- **Servomoteurs** : Conduisent les roues du robot, offrant un équilibre entre faible consommation d'énergie et vitesse adéquate (environ 100 RPM à 4,8V).
![Servomoteur](/img/servomoto.jpg)
- **Capteurs de distance (VL6180X)** : Fournissent des mesures de précision millimétrique jusqu'à 20 cm, cruciales pour naviguer dans le labyrinthe.
![VL6180X](/img/VL6180X.jpg)
- **Batterie (PB-Lipstick)** : Fournit 2500 mAh, garantissant un temps de fonctionnement prolongé sans avoir besoin de recharger fréquemment.
![(PB-Lipstick)](/img/(PB-Lipstick).jpg)

## 2.2.2 Principe de câblage et de fonctionnement
Comprendre le fonctionnement de chaque composant était essentiel avant l'installation, pour assurer un câblage optimal et non intrusif.
![Schéma de câblage](/img/Assembly.png)

### Détails de câblage :
- **Servomoteurs** : Connexions simples avec alimentation (5V), masse (GND), et signaux de contrôle reliés aux ports numériques du Nano.
![Schéma de servomoteur](/img/servoschema.png)
- **Capteurs** : Connectés via le protocole I2C, utilisant les lignes SDA et SCL pour les signaux de données et d'horloge, respectivement. Des broches GPIO0/CE uniques permettent l'adressage individuel des capteurs.
![Schéma du VL6180X](/img/VL6180XS.png)

### Fonctionnement des servomoteurs :
Les servomoteurs ajustent leur position en fonction des signaux d'entrée, contrôlés via le code. Le mécanisme interne comprend une boucle de rétroaction avec un potentiomètre et des engrenages, assurant un contrôle précis des mouvements.
![Tension](/img/tension.png)

### Fonctionnement des capteurs :
Les capteurs VL6180X utilisent le protocole I2C pour communiquer avec le microcontrôleur, mesurant les distances pour guider la navigation du robot dans le labyrinthe.
