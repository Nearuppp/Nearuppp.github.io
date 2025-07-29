---
title: Study guide on wireless communication
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

# Study Guide : Communication sans fils (C. Pollet – 2024–2025)

Ce guide regroupe les notions clés, définitions, comparaisons, schémas de fonctionnement et questions potentielles pour réviser le cours “Communication sans fils”.

---

## I. Concepts généraux et introduction

### 1. Définition de la domotique
- **Domotique** : Ensemble des technologies (électronique, informatique, télécommunication) pour piloter et automatiser un habitat.
  - Étymologie : *Domus* (maison) + *-tique* (technologie).
- **Objectifs** :
  - Mobilité accrue (réseau sans fil).
  - Réduction de câblage, coûts, et esthétique.
  - Contrôle centralisé (centrale programmable ou serveur).
- **Applications** :
  - Arrosage automatique, régulation de chauffage, scénarios d’éclairage, etc.

### 2. Réseaux sans fil (WPAN vs. WLAN)
- **WPAN** (Wireless Personal Area Network) : portée courte (quelques mètres), ex. Bluetooth, Zigbee.
- **WLAN** (Wireless Local Area Network) : portée plus importante (quelques dizaines à centaines de mètres), ex. Wi-Fi.
- **Bandes principales** : 2,4 GHz (ISM), 5 GHz (plus haut débit, moins encombré), 433 MHz & 868 MHz (solutions domotiques propriétaires).
- **Modes de fonctionnement** :
  - **Infrastructure (cellule)** : accès via point d’accès / borne.
  - **Ad-hoc** : communication peer-to-peer directe.
- **Routage** :
  - Généralement par bornes (AP, coordonnateur, routeur).
  - Adaptateurs réseau (cartes PCI, USB, modules externes).

### 3. Régulation et sécurité
- **Cadre réglementaire** :
  - Spectre ISM contrôlé par l’ART (France).
  - Autorisations nécessaires (notamment pour bandes 433 MHz, 2,4 GHz, 5 GHz).
  - Bluetooth & HiperLAN autorisés sous conditions depuis juillet 2001.
- **Enjeux de sécurité** :
  - **Sniffing** (écoute passive) : nécessité de cryptage.
  - **Jamming** (brouillage), **battery exhaustion** (attaque d’épuisement).
  - Longueur de clé, renouvellement fréquent (ex. clés régénérées toutes les 60 s).
- **Concurrence vs complémentarité** :
  - Radios vs réseaux cellulaires (3G/4G / 5G).
  - Multiplicité de standards, interopérabilité limitée.
  - Adoption par collectivités (universités, municipalités).

---

## II. Transmission numérique et modulations

### 1. Signal analogique vs numérique
- **Signal analogique** : continu en amplitude et en temps (ex. son, lumière).
- **Signal numérique** : échantillonné (discret en temps) et quantifié (discret en amplitude) en binaire.

#### 1.1 Échantillonnage
- Fréquence d’échantillonnage \( f_s = \frac{1}{T_e} \).
- **Théorème de Nyquist** : \( f_s \ge 2 f_{\max} \) pour éviter le repliement spectral.

#### 1.2 Quantification
- CAN (convertisseur analogique-numérique) : \( n \) bits → \( 2^n \) niveaux.
- Erreur de quantification → bruit quantification, rapport S/B (dB).

### 2. Modulations numériques principales
1. **ASK / OOK** (Amplitude Shift Keying / On-Off Keying)
   - Deux niveaux d’amplitude (0/1). OOK : cas k = 1 (porte active / inactive).
2. **FSK / GFSK** (Frequency Shift Keying / Gaussian FSK)
   - Deux (ou plus) fréquences pour symboliser 0 et 1.
   - GFSK (Bluetooth) applique un filtre gaussien avant modulation pour limiter la bande.
3. **PSK / O-QPSK** (Phase Shift Keying / Offset-QPSK)
   - BPSK : phase 0↔π pour 1/0.
   - QPSK : 4 états de phase (00, 01, 10, 11).
   - O-QPSK (Zigbee) déphase légèrement les changements de phase pour réduire les “peaks”.

### 3. Occupation spectrale d’un signal binaire
- Largeur approximative \( B_f \approx \text{débit (en bps)} \).
- Exemple : 250 kbps → ~250 kHz de bande passante.

---

## III. Bluetooth (IEEE 802.15.1)

### 1. Historique & versions
- **Créé en 1994** (Ericsson), standardisé IEEE 802.15.
- **Évolutions majeures** :
  - V1.x (1999–2005) : débit ~1 Mb/s.
  - V2.x (2004–2007) : EDR → ~3 Mb/s.
  - V3.0 HS (2009) : jusqu’à 24 Mb/s (liaison Wi-Fi pour transfert de données).
  - V4.x (2010–2014) : BLE (Bluetooth Low Energy), faible conso (~1 Mb/s ou 3 Mb/s).
  - V5.0 (annoncée 2016) : portée ×4, débit ×2 (sur le marché début 2017).

### 2. Caractéristiques physiques
- **Bande** : 2 400–2 483,5 MHz (ISM, 79 canaux de 1 MHz) — en France/Japon/Espagne : 23 canaux.
- **FHSS** (Frequency Hopping Spread Spectrum) :
  - 1 600 sauts/s (1 slot = 625 μs).
  - Séquence pseudo-aléatoire dérivée de l’adresse MAC (BD_ADDR) et de l’horloge maître.
- **Classes de puissance** :
  | Classe   | Puissance (mW) | Puissance (dBm) | Portée approximative |
  |----------|----------------|-----------------|----------------------|
  | Classe 1 | 100            | 20 dBm          | ~ 100 m             |
  | Classe 2 | 2,5            | 4 dBm           | ~ 10 m              |
  | Classe 3 | 1              | 0 dBm           | ~ 1 m               |
- Atténuation : ~ 50 dB pour les 6 premiers mètres, puis ~ 10 dB tous les 10 m.

### 3. Topologie & adressage
- **Piconet** : 
  - Star maître/esclave (1 maître + 7 esclaves actifs + 255 parkés).
  - Maître gère la synchronisation (horloge, séquence de sauts).
  - Adresse unique BD_ADDR (48 bits) → identifie chaque unité Bluetooth.
  - **AMA** (Active Member Address, 3 bits) : pour terminaux actifs.
  - **PMA** (Parked Member Address, 8 bits) : pour terminaux en veille (park).
- **Scatternet** :
  - Ensemble de plusieurs piconets interconnectés.
  - Un maître peut devenir esclave dans un autre piconet; un esclave peut “flotter” entre piconets.

### 4. Structure des paquets
1. **Code d’accès (CAC, 72 bits)** : préambule, synchronisation (24 premiers bits du BD_ADDR), trailer.
2. **En-tête (54 bits)** : chaque bit doublé (×3 pour tolérance aux erreurs).
   - Adresse esclave (3 bits), type de paquet (4 bits), bits de contrôle.
3. **Données** : 0 à 2 745 bits selon le format (courts : 1 slot → 240 bits, moyens : 3 slots → 1 480 bits, longs : 5 slots → 2 745 bits).
- Saut de fréquence après envoi complet d’un paquet.

### 5. Débits & performances
- Débit maximum nominal ~ 1 Mb/s pour un piconet (jusqu’à 8 terminaux).
- Débit effectif diminue quand plusieurs esclaves communiquent simultanément.
- Technique : un maître peut utiliser deux fréquences distinctes pour dialoguer en même temps avec 2 esclaves.

### 6. Pile protocolaire (Bluetooth Stack)
- **L2CAP** : adaptation et fragmentation pour les couches supérieures.
- **RFCOMM** : émulation port série (RS-232).
- **OBEX** : échange d’objets (fichiers, contacts), type HTTP/FTP.
- **SDP** : découverte des services disponibles sur un périphérique.
- **TCS** : contrôle d’appels téléphoniques.

### 7. Sécurité
- **Niveaux** :
  1. Pas de sécurité.
  2. Sécurité applicative (authentification accessoire/service).
  3. Sécurité complète (authentification + chiffrement).
- **Pairing** : échange de clés (numéro d’identification, clé partagée, random interne).
- **FEC** (Forward Error Correction) :
  - Code 2/3 : 2 bits utiles → 3 bits transmis (160 bits utiles max).
  - Code 1/3 : 1 bit utile → 3 bits transmis (80 bits utiles max).

### 8. États d’une station
1. **Standby** : écoute allégée (toutes les 1,28 s sur 32 canaux).
2. **Inquiry / Page** : découverte nouveaux appareils (Inquiry) ou “paging” (appareil connu).
3. **Connected** : lien maître/esclave établi (~ 0,6 s pour setup).
4. **Hold** : lien maintenu, plus d’échange de données (sync minimale).
5. **Sniff** : réveille périodiquement pour écouter le piconet (économie énergie).
6. **Park** : enlève un appareil du réseau actif, sync minimale pour revenir.

### 9. Gestion d’interférences
- Séquences de sauts différentes → faible probabilité de collision.
- En cas de collision, back-off puis retransmission sur slot ultérieur.

---

## IV. Zigbee (IEEE 802.15.4)

### 1. Positionnement & vocations
- **Zigbee **: standard bas débit (20–250 kbps), faible consommation, coût faible.
  - Vocation : domotique, capteurs, automatisme industriel, IoT.
- **Fréquences** :
  - 2,4 GHz (mondial) → O-QPSK, 250 kbps.
  - 915 MHz (Amérique) → BPSK, 40 kbps.
  - 868 MHz (Europe) → BPSK, 20 kbps.
- **Avantages** : 
  - Coût très faible, consommation pile réduite, très bonne portée (~ 100 m).
  - Sécurité AES-128, profils applicatifs modulaires (ZigBee Pro, ZDO, APS).
  - Topologies flexibles : étoile, maillée, point à point.

### 2. Pile protocolaire Zigbee
1. **IEEE 802.15.4** :
   - **PHY** : définitions fréquence, modulation, débits, canaux (16 canaux 2,4 GHz).
   - **MAC** : CSMA-CA slotté, ACK, gestion de superframes (beacons, GTS).
2. **Zigbee (au-dessus du MAC)** :
   - **ZDO** (Zigbee Device Object) : discovery, join, security, formation du réseau.
   - **NWK** (Network Layer) : routage, adressage court (16 bits), maintenance de tables.
   - **APS** (Application Support Sub-Layer) : acheminement données vers couche application, fragmentation, sécurité.

### 3. Types de nœuds
- **FFD** (Full Function Device) :
  - Peut être Coordinateur (ZC), Routeur (ZR) ou End-Device (ZED).
  - Alimentation permanente.
  - Participe au routage (ZR).
- **RFD** (Reduced Function Device) :
  - Seuls rôle possible : End-Device.
  - Fonctionne en étoile, très faible conso, principalement en sommeil.

### 4. Topologies & routage
1. **Mesh (maillée)** :
   - Routeurs (ZR) + End-Devices (ZED).
   - Routage multi-hop (AODV-style ou Tree Routing).
   - Avantages : robuste, redondance, couverture étendue.
   - Inconvénients : overhead de maintenance, complexité.
2. **Tree Routing (routage arborescent)** :
   - Coordonnateur attribue Rm (max routeurs enfants), Dm (max end-devices enfants), Lm (profondeur max).
   - Adresses allouées en fonction de la position dans l’arbre.
   - Simple mais moins tolérant aux pannes qu’un mesh.
3. **“No Routing” (star)** :
   - Un seul Coordonnateur + end-devices.
   - Pas de routage inter-end-devices, chaque appareil communique uniquement avec le coordonnateur.
   - Simple, adapté petits réseaux.

### 5. Superframe (802.15.4)
- Intervalle périodique entre deux beacons (15 ms à 245 ms).
- 16 slots (Time-Slots) :
  - **CAP** (Contention Access Period) : accès CSMA-CA slotté.
  - **CFP** (Contention Free Period) : jusqu’à 7 GTS (Guaranteed Time Slots) pour trafic temps réel.
- **Beacon Frame** : contient PAN ID, adresse coordonnateur, information de superframe (intervalle, slot structure).

### 6. Scans et associations
1. **Scan énergie** : mesurer activité sur chaque canal avant création d’un réseau.
2. **Scan actif** : envoi requête beacon → réponse des coordonnateurs existants.
3. **Scan passif** : écoute passive des beacons pour identifier réseaux à portée.
4. **Scan orphelin** : lorsque end-device perd son coordonnateur (panne), cherche de nouveau beacon.

### 7. Création & gestion du réseau
- **Création** :
  1. Scan actif → lister PAN et coordonnateurs existants.
  2. Choix d’un canal libre ou faiblement occupé.
  3. Émission périodique de beacons (création du PAN).
- **Association** :
  1. Scan actif/passif pour trouver coordonnateur cible.
  2. Envoi requête d’association.
  3. Acceptation par le coordonnateur (ressources disponibles).
- **Désassociation** :
  - Initiée par end-device ou coordonnateur (notification via beacon).
- **Synchronisation** :
  - End-devices synchronisent sur le timestamp des beacons.

### 8. Échanges de données
- **Direct (peer-to-peer)** : pendant le CAP, CSMA-CA slotté, 1 hop direct.
- **Indirect** : coordonnateur bufferise messages pour end-device en sommeil, informe sur beacon suivant.
- **GTS (Guaranteed Time Slot)** :
  - End-device peut demander un GTS pour trafic déterministe.
  - Jusqu’à 7 GTS par superframe (émission ou réception).

### 9. Limites & problèmes
- **Conflits de beacon** : deux réseaux sur même slot → confusion, nécessité de coordination.
- **Interférences** : bande 2,4 GHz très partagée (Wi-Fi, Bluetooth, micro-ondes…).
- **Portée limitée** : ~ 100 m en extérieur, moins en intérieur.
- **Overhead de routage** : importante dans réseaux denses (mesh), tables volumineuses.

---

## V. Wi-Fi (IEEE 802.11)

### 1. Historique & standards
- **Années 1990** : projets WLAN par IEEE 802.11.
- **1999** : publication 802.11b (11 Mb/s, 2,4 GHz).
- **Évolutions principales** :
  - **802.11a** (1999) : 5 GHz, OFDM, 54 Mb/s.
  - **802.11g** (2003) : 2,4 GHz, 54 Mb/s.
  - **802.11n** (2009) : MIMO, 2,4 + 5 GHz, jusqu’à 300 Mb/s réel.
  - **802.11ac** (2013) : 5 GHz, multi-antenne, jusqu’à 1 Gb/s réel.
  - **802.11ax** (Wi-Fi 6, 2019) : OFDMA, MU-MIMO avancé, meilleure efficacité spectrale.
  - **802.11be** (Wi-Fi 7, en cours) : 320 MHz, 4096-QAM, Multi-Link Operation.

### 2. Couche physique (PHY)
1. **802.11b/g (2,4 GHz, DSSS)** :
   - 14 canaux de 20 MHz (en Europe : 1–13).
   - Débits 1 / 2 / 5,5 / 11 Mb/s (802.11b), 6–54 Mb/s (modulation adaptative pour 802.11g).
   - Portées (802.11b) :
     - 1 Mb/s : 150 m intérieur, 500 m extérieur.
     - 11 Mb/s : 50 m intérieur, 200 m extérieur.
2. **802.11a (5 GHz, OFDM)** :
   - 52 porteuses dans un canal 20 MHz, débits 6–54 Mb/s.
   - Moins sensible aux interférences multipaths.
3. **802.11n/ac/ax** :
   - MIMO (plusieurs antennes TX/RX).
   - Canaux plus larges (40 MHz, 80 MHz, 160 MHz).
   - OFDM amélioré, modulation plus dense (256-QAM, 1024-QAM).

### 3. Couche MAC (CSMA/CA)
- **CSMA/CA** :
  1. Écoute du canal pendant DIFS (DCF IFS).
  2. Si libre → transmission. Sinon → mise en place d’un back-off aléatoire dans [0, CW].
  3. Décrémentation du back-off quand canal libre, arrêt si canal occupé.
  4. À 0 → transmission. Destinataire répond par ACK après SIFS (Short IFS).
  5. Collision ou absence d’ACK → retransmission, CW doublé (max 1023).
- **DCF** (Distributed Coordination Function) : accès contention-based (best effort).
- **PCF** (Point Coordination Function) : accès sans contention (polling du point d’accès) pour QoS temps réel (voix, vidéo). Rarement implémenté.

### 4. Architectures de réseau
1. **Mode Infrastructure** :
   - **BSS** : groupe de stations communicant via un AP.
     - Couverture physique : Basic Service Area (BSA).
   - **ESS** : ensemble de BSS interconnectés (via DS, ex. Ethernet).
     - Permet roaming (reassociation) d’un AP à l’autre.
2. **Mode Ad-Hoc (IBSS)** :
   - Pas d’AP, stations communiquent directement.
   - Utile pour réseaux temporaires, déploiement rapide.

### 5. Mobilité (handover / roaming)
- **Beacons** : balises périodiques (intervalle ~100 ms) émises par chaque AP.
  - Contiennent SSID, timestamp, supported rates, capacités, authentification, chiffrement.
- **Processus** :
  1. Détection de la baisse de RSSI.
  2. Scan actif/passif pour lister APs voisins.
  3. Sélection du nouvel AP (critères : RSSI, taux d’erreur, qualité, charge).
  4. Reassociation : Reassociation Request → Reassociation Response.
  5. Continuité de session via DS (Distribution System).

### 6. Fragmentation / réassemblage
- **Objectif** : diminuer risque de perte d’une trame dans canaux bruyants.
- Si une trame > seuil `Fragmentation_Threshold`, elle est divisée en fragments ≤ seuil.
- Réception d’ACK pour chaque fragment : si fragment perdu, on retransmet seulement ce fragment.
- Réassemblage basé sur identifiants de séquence.

### 7. Sécurité Wi-Fi
1. **WEP** (Wired Equivalent Privacy) :
   - Chiffrement RC4, IV 24 bits. Vulnérabilités cryptographiques (IV court, attaques passives).
2. **WPA** (Wi-Fi Protected Access) :
   - **TKIP** : rotation de clé, IV 48 bits, MIC (Message Integrity Check).
   - Auth via 802.1X/EAP (Enterprise) ou PSK (Pre-Shared Key).
3. **WPA2** (802.11i) :
   - Chiffrement **AES-CCMP** (256 bits).
   - Authentification 802.1X (Enterprise) ou PSK (Personal).
4. **WPA3** (depuis 2018) :
   - SAE (Simultaneous Authentication of Equals), protection contre attaques par dictionnaire.
   - WPA3-Enterprise : chiffrement 192 bits.

### 8. Équipements typiques
- **AP (Point d’accès)** : émetteur/récepteur 2,4 GHz / 5 GHz, interface Ethernet, gestion QoS (802.11e), antennes.
- **STA (Station cliente)** : carte PCI/USB/mini-PCIe dans PC, dongle USB, chipset intégré smartphone/tablette.
- **Bridge / Repeater** : relai point-à-point ou multi-point, modes ad-hoc ou infrastructure.

---

## VI. Autres solutions domotiques industrielles

### 1. Bandes libres 433 MHz et 868 MHz
- Fréquences non-licenciées avec régulations (puissance limitée).
- Fréquemment utilisées par systèmes propriétaires fermés (quelques protocoles ci-dessous).

### 2. Z-Wave
- **Bande** : 868 MHz (Europe), 908 MHz (USA).
- **Topologie** : maillée (mesh), jusqu’à 232 nœuds.
- **Débit** : ~ 100 kbps.
- **Avantages** : très faible consommation, large écosystème, portée ~ 30–100 m.
- **Inconvénients** : licence et frais associés, moins standardisé qu’IEEE.

### 3. EnOcean
- **Bande** : 868 MHz (Europe), ASK, débit 125 kbps.
- **Principe** : “energy harvesting” (sans pile) – alimentation par vibrations, solaire, thermique.
- **Trame** :
  - ID nœud (32 bits), données (8–32 bits), CRC.
- **Transmission** : triple envoi aléatoire (~ 40 ms entre trames) pour fiabilité.
- **Portée** : ~ 300 m extérieur, 30 m intérieur.
- **Limites** : coûts élevés, topologie en étoile, recul réduit.

### 4. io-homecontrol
- **Bande** : 868–870 MHz (Europe).
- **Caractéristiques** :
  - Bidirectionnel (ack automatique), standard ouvert (VELUX, SOMFY, Honeywell…).
  - Interopérabilité multi-fabricants.
  - Usage : volets roulants, capteurs, chaudières, équipements habitat.
- **Inconvénients** : coût d’entrée plus élevé qu’alternatives.

### 5. Autres exemples
- **Oregon**, **X10**, **Chacon**, **BLY**, **Visonic**, **RFY**, **XDD** : solutions variées 433 MHz/868 MHz, souvent non standards, faible interop.
- **Problèmes communs** :
  - Saturation bande 433 MHz, interférences, sécurité faible (cryptage souvent léger ou absent).
  - Choix difficile pour utilisateur (multiplicité standards, manque d’informations).

---

## Questions potentielles pour l’examen

1. **Comparer Bluetooth, Zigbee et Wi-Fi** :
   - Bande, débit, portée, consommation, topologies supportées.
   - Cas d’usage appropriés pour chaque technologie.
2. **Expliquer le principe de l’étalement de spectre FHSS et DSSS** :
   - Avantages en termes de robustesse aux interférences.
   - Exemple d’utilisation dans Bluetooth (FHSS) et Wi-Fi 802.11b (DSSS).
3. **Décrire les étapes d’association / authentification dans un réseau Zigbee** :
   - Scan actif vs scan passif.
   - Rôle du coordonnateur, échange de beacons, demande d’association.
4. **Expliquer le fonctionnement du CSMA/CA dans le MAC 802.11** :
   - Différences entre DCF et PCF.
   - Séquences de back-off, IFS (SIFS, DIFS), retransmissions.
5. **Quels mécanismes de sécurité ont été mis en place dans WPA2 vs WEP ?** :
   - Différences entre RC4+IV 24 bits vs AES-CCMP+IV 48 bits.
   - Exemples d’attaques contre WEP (ex. “FMS attack”).
6. **Qu’est-ce qu’un piconet et un scatternet Bluetooth ?** :
   - Nombres maximum de nœuds actifs et “parked”.
   - Gestion de la synchronisation et des sauts de fréquence.
7. **Définir le routage AODV dans Zigbee** :
   - Processus RREQ (Route Request), RREP (Route Reply).
   - Critères de sélection de la route (coût, nombre de sauts).
8. **Quels sont les avantages et limites d’EnOcean par rapport à un réseau Zigbee classique ?**
   - Principe d’energy harvesting vs pile.
   - Portée, coût, topologie, sécurité.

---

## Conseils de révision

- **Tableaux comparatifs** : regrouper fréquences, débits, portées, topologies, sécurités pour Bluetooth / Zigbee / Wi-Fi / Z-Wave / EnOcean.
- **Fiches synthèse par protocole** : architecture en couches, modes, adresses, formats de trame.
- **Schémas d’association et de routage** : visualiser le flux d’un « scan actif » Zigbee, la séquence de pairing Bluetooth, le mécanisme de handoff Wi-Fi.
- **Exercices pratiques** :
  - Calculer bande nécessaire pour un flux binaire données à 250 kbps (Zigbee).
  - Simuler back-off CSMA/CA (802.11) pour différents CW initiaux.
  - Énumérer étapes de création d’un réseau Zigbee ou d’un piconet Bluetooth.
- **Points d’attention** :
  - Règle de Nyquist pour échantillonnage.
  - Avantages/inconvénients modulations (ASK vs FSK vs PSK).
  - Différences entre superframe Zigbee et beacon Wi-Fi.
  - Rôles des protocoles L2CAP/RFCOMM/SDP en Bluetooth.
  - Impact des interférences dans la bande 2,4 GHz (coexistence Wi-Fi/Bluetooth/Zigbee).
  - Contraintes réglementaires locales (France : ART, puissance, canaux autorisés).
