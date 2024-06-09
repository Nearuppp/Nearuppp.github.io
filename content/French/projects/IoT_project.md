---
title: "Alpha Hypervision"
date: 2024-06-09
description: "Vous trouverez ici le projet que j'ai créé avec mes amis à UniLaSalle"
tags: ["Projet", "Électronique", "Docker", "StormShield", "LoraWan", "Proteus", "The Things Network"]
---

## Aperçu du Projet
Alpha Hypervision est un projet collaboratif développé par moi-même et mes amis, Charles-Clement Andrade et Thomas Wimart, lors de notre cours sur l'IoT à **UniLaSalle Amiens**. L'objectif principal de ce projet était de créer un dispositif utilisant la **technologie LoRaWAN** pour améliorer la supervision et la surveillance des salles serveurs.

## Objectifs du Projet
L'objectif était de mettre en œuvre un système de surveillance complet pour les salles serveurs. Ce système suivrait diverses caractéristiques et conditions au sein de la salle serveur, assurant ainsi un fonctionnement et une maintenance optimaux.

## Mise en Œuvre
Pour y parvenir, nous avons conçu un pipeline de données en utilisant **Node-RED**. Ce pipeline collectait les données des capteurs et les transmettait via **The Things Network**. Les données étaient ensuite stockées dans une base de données **InfluxDB**. Nous avons créé un tableau de bord dynamique pour visualiser ces données, offrant ainsi à notre professeur un outil précieux pour surveiller et gérer la salle serveur.

## Technologies Utilisées
* **LoRaWAN** : Pour la communication sans fil à longue portée et à faible consommation d'énergie.
* **Docker** : Pour containeriser et déployer notre application.
* **StormShield** : Pour la sécurité des appareils IoT.
* [**Proteus**](../../project_folder/iot_project/proteus_alpha/) : Pour la conception et la simulation de circuits imprimés.
* **The Things Network** : Pour la transmission des données.
* **InfluxDB** : Pour le stockage des données en série temporelle.
* **Node-RED** : Pour la construction du pipeline de données.

## Résultats
Alpha Hypervision a réussi à fournir un moyen fiable et efficace de surveiller les conditions des salles serveurs, contribuant ainsi à maintenir la performance des serveurs et à prévenir les problèmes potentiels. Ce projet a non seulement atteint ses objectifs techniques, mais a également offert des avantages pratiques pour la gestion des salles serveurs.
