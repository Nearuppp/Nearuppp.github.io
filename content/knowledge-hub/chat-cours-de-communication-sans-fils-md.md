---
title: Introduction to Wireless Communication
excerpt: Small Overview of technologies, features, and automation examples in home automation, combining electronics, computer science, and telecommunications for the connected home.
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

## La domotique  
La domotique regroupe l’ensemble des technologies utilisées dans l’habitat (Électronique, Informatique, Télécommunication).  
- **Étymologie** : *Domus* (maison) + *-tique* (technologies informatique et électronique)  

### Caractéristiques  
- Basée sur la mise en réseau des différents appareils électriques de la maison  
- Contrôlée par une “intelligence” centralisée :  
  - Une centrale programmable  
  - Une interface micro-informatique (serveur)  
- Outils de pilotage possibles :  
  - Téléphone portable  
  - Télécommande (universelle ou non)  
  - Écran + souris  

#### Exemples d’automatisations  
- Enclencher l’arrosage du jardin à 20 h  
- Maintenir une température donnée dans la maison  
- Diminuer le chauffage lorsque l’on part  

---

## Plan du cours  
1. **Introduction aux technologies radio**  
2. **Transmission de signaux numériques**  
3. **Bluetooth**  
4. **Zigbee**  
5. **Wi-Fi**  
6. **Solutions domotiques industrielles (propriétaires/fermées)**  
   - Z-Wave  
   - EnOcean  
   - Oregon  
   - X10  
   - Chacon  
   - BLY  
   - Visonic  
   - RFY  
   - XDD  

---

# I. Introduction  

### 1. Principe  
- Remplacer les câbles par des ondes radioélectriques  
- **Deux types de réseaux sans fil** : WPAN (Wireless Personal Area Network) et WLAN (Wireless Local Area Network)  
- Bandes de fréquences majoritaires : 2,4 GHz et 5 GHz  
- Débits variables : de 1 Mb/s à 450 Mb/s  
- Routage par bornes (le plus souvent)  
- Adaptateurs requis (boîtiers externes, cartes PCI/PCMCIA)  
- Deux modes de fonctionnement :  
  - Mode cellule (infrastructure)  
  - Mode ad-hoc (peer-to-peer) :contentReference[oaicite:1]{index=1}  

### 2. Objectifs  
- Permettre une parfaite mobilité des utilisateurs  
- Réduction des coûts dans les petits réseaux  
- Synchronisation rapide d’appareils (ex. : smartphones, capteurs)  
- Esthétique (suppression du câblage apparent)  

#### Applications typiques  
- Réseaux temporaires (conférences, salons)  
- Immeubles où le câblage fixe est difficile à mettre en place  
- Liaison point à point (entre deux bâtiments)  

---

## I.1 Technologies concurrentes  
1. **Bluetooth** (1994, Ericsson)  
   - Objectif : échange de données entre appareils numériques à courte distance  
   - Avantages :  
     - Implantation déjà répandue  
     - Bonne résistance aux interférences  
     - Faible consommation  
   - Inconvénients :  
     - Débit initial limité (~ 1 Mb/s)  
     - Portée réduite (10 à 30 m)  
     - Coûts matériels encore relativement élevés (au début)  
   - Évolutions : versions 2.0 (2004, 3 Mb/s), 3.0 HS (2009, 24 Mb/s), 4.0 (2010, faible consommation, 3 Mb/s), 4.1, 4.2 (2013–2014, évolutions IoT), 5.0 (prévue 2016) :contentReference[oaicite:2]{index=2}  

2. **Zigbee** (2004, Zigbee Alliance)  
   - Objectif : liaison courte distance, moins chère que Bluetooth, plus simple  
   - Avantages :  
     - Coûts très faibles  
     - Très faible consommation  
     - Besoin mémoire réduit (1/10 de Bluetooth)  
     - Portée moyenne (~ 100 m)  
   - Inconvénients :  
     - Débit limité (250 kbit/s) :contentReference[oaicite:3]{index=3}  

3. **HomeRF** (1998, Compaq/HP/IBM/Intel/Microsoft)  
   - Support de DECT  
   - Débit acceptable (11 Mb/s)  
   - Bonne portée (50 à 100 m)  
   - Inconvénient : concurrencé par Wi-Fi, aujourd’hui disparu  

4. **HiperLAN** (ETSI, normes européennes)  
   - HiperLAN 1 : 20 Mb/s  
   - HiperLAN 2 : 54 Mb/s  
   - Portée jusqu’à 100 m  
   - Bande 5 GHz  
   - Concurrence avec Wi-Fi, adoption limitée :contentReference[oaicite:4]{index=4}  

5. **Wi-Fi (IEEE 802.11)**  
   - Lancé en 1999 (802.11b à 11 Mb/s)  
   - Évolutions :  
     - 802.11g (2,4 GHz, 54 Mb/s)  
     - 802.11a (5 GHz, 54 Mb/s)  
     - 802.11n (2,4 + 5 GHz, 100 Mb/s)  
     - 802.11ac (2,4 + 5 GHz, 450 Mb/s)  
     - Antennes amplifiées (portée 8 à 33 km)  
   - Devenu standard mondial :contentReference[oaicite:5]{index=5}  

6. **Autres solutions domotiques industrielles**  
   - Bandes 433 MHz et 868 MHz (propriétaires, fermées)  
   - Exemples : Z-Wave, EnOcean, Oregon, X10, Chacon, BLY, Visonic, RFY, XDD :contentReference[oaicite:6]{index=6}  

---

## I.2 Cadre réglementaire  
- Utilisation du spectre radio très réglementée par l’ART (Autorité de Régulation des Télécoms)  
- Libéralisation progressive de l’usage de la bande ISM (Industrial, Scientific, Medical)  
- Depuis juillet 2001, Bluetooth et HiperLAN autorisés sous certaines conditions  
  - Procédure simplifiée pour les communes > 50 000 habitants  
  - Sinon, demande individuelle d’établissement nécessitant l’accord du Ministère de la Défense  

---

## I.3 Sécurité et enjeux  
### Problèmes de sécurité  
- Écoute clandestine (sniffing) des transmissions radio  
- Longueur des clés de cryptage sur quelques premiers dispositifs mobiles  
- Vulnérabilité aux attaques spécifiques :  
  - Blocage radio (jamming)  
  - Épuisement de batterie (battery exhaustion)  
- Solutions propriétaires en développement : régénération de clés toutes les 60 s :contentReference[oaicite:7]{index=7}  

### Concurrence et complémentarité  
- Ambivalence entre technologies radio et réseaux cellulaires 3G/4G  
- Enquête ART (février 2002) :  
  - Arguments des opérateurs contre réseaux radioélectriques :  
    - Portée jugée trop faible  
    - Multiplicité de standards (absence d’un standard unique)  
    - Coût supposé élevé  
    - Difficulté à se déplacer dans certains cas  
  - Soutien de collectivités locales (municipalités, universités)  

---

# II. Transmission numérique  

### 1. Notions générales  
- **Signal analogique** :  
  - Correspond à une grandeur physique continue (pression sonore, tension, intensité lumineuse…)  
  - Infinité de valeurs, continu dans le temps  
- **Signal numérique** :  
  - Suite de chiffres (binaire : 0/1)  
  - Discret dans le temps (échantillonnage), valeurs discrètes (quantification) :contentReference[oaicite:8]{index=8}  

#### 1.1 Échantillonnage  
- Transformation d’un signal continu en une suite d’échantillons selon une fréquence d’échantillonnage \( f_s \)  
- Sur- et sous-échantillonnage :  

```

s(t) ──┬─► Échantillonneur ─► s[n] ──► Reconstitution ─► Ŝ(t)  
│ (t = n·Te)

```

- Conditions de Nyquist : échantillonnage à au moins deux fois la fréquence maximale du signal  

#### 1.2 Quantification  
- Convertisseur analogique/numérique (CAN)  
- Nombre de bits = n → 2ⁿ niveaux de sortie  
- Sortie en parallèle ou en série  
- Exemple : TDA 8792 (8 bits, 25 MHz) :contentReference[oaicite:9]{index=9}  
- **Erreur de quantification** (bruit quantification) :  
- Différence entre signal analogique et valeur quantifiée  
- Rapport signal sur bruit (S/N) exprimé en dB  

#### 1.3 Spectre d’un signal binaire  
- Un signal binaire \( m(t) \in \{+1, -1\} \) a un spectre \(\approx \frac{1}{T} \) où \( T \) est la durée d’un bit (bps = 1/T).  
- Occupation spectrale approximative :  
\[
  B_f \approx bps
\]

---

## II.1 Modulations numériques  

### 2.1 Modulation d’amplitude (ASK/OOK)  
- **Amplitude Shift Keying (ASK)** :  
- Deux niveaux d’amplitude (k < 1)  
- **On-Off Keying (OOK)** :  
- Cas particulier d’ASK (k = 1)  
- Exemple de séquence binaire 11111110… corresponds à porte active/inactive :contentReference[oaicite:10]{index=10}  

### 2.2 Modulation de fréquence (FSK/GFSK)  
- **Frequency Shift Keying (FSK)** :  
- Différents états de fréquence pour représenter 0 ou 1  
- **Gaussian FSK (GFSK)** :  
- Filtre passe-bas gaussien pour limiter la bande  
- Utilisé dans Bluetooth  

### 2.3 Modulation de phase (BPSK/QPSK/O-QPSK)  
- **BPSK** :  
- Deux états de phase (0 ou π)  
- **O-QPSK** :  
- Variante de QPSK avec déplacements de phase plus petits (utilisé dans Zigbee)  

### 2.4 Exemples de signaux modulés  
- Signal modulé en fréquence (FSK) :  
```

1 1 10111110 0 0 0 1 0 1 … → saut de fréquence entre +Δf et –Δf

```
- Signal modulé en phase (BPSK) :  
```

1 1 10111110 0 0 0 1 0 1 … → phase = 0 pour “1”, phase = π pour “0”

```
:contentReference[oaicite:11]{index=11}

---

## II.2 Multiplexage géographique (Cellulaire)  
- Limitation de la portée de chaque cellule → Cellules adjacentes utilisant des fréquences différentes (reuse factor).  
- Exemple : technologies cellulaires 2G/3G/4G reposant sur un découpage en cellules (f₁, f₂, f₃, …). :contentReference[oaicite:12]{index=12}  

---

# III. Bluetooth  

## III.1 Origines et évolutions  
- **Né en 1994** par Ericsson, standardisé par le groupe de travail IEEE 802.15 (WPAN)  
- Objectif : remplacer les câbles de connexion (port série, IrDA, USB) pour interconnecter équipements personnels (PC, téléphone, PDA).   

### Versions majeures  
- **V1.0** (1998) → V1.1 (2002) → V1.2 (2005) → débit ~ 1 Mb/s  
- **V2.0** (2004) → V2.1 (2007) → débit ~ 3 Mb/s  
- **V3.0 HS** (2009) → débit jusqu’à 24 Mb/s (liaison Bluetooth + Wi-Fi)  
- **V4.0** (2010) → Bluetooth Low Energy (BLE), 3 Mb/s, très faible consommation  
- **V4.1** (2013), **V4.2** (2014) → optimisations pour Internet des Objets (IoT)  
- **V5.0** (annoncée juin 2016) → portée multipliée par 4, débit x2 (mise sur le marché Q1 2017)  

### Bande de fréquences  
- 2,400 MHz – 2,4835 MHz (bande ISM, sans licence)  
- Puissance < 100 mW en intérieur sur 2,4–2,454 MHz  
- Vanne à 2,454–2,4835 MHz : < 100 mW en intérieur, < 10 mW en extérieur  
- Bande divisée en 79 canaux de 1 MHz (en France, Japon, Espagne, seules 23 canaux accessibles)   

---

## III.2 Concepts fondamentaux  

### 1. Couche physique et sauts de fréquence  
- **Modulation** : GFSK (Gaussian Frequency Shift Keying)  
- **Étagement de spectre (FHSS)** : la porteuse saute pseudo-aléatoirement d’un canal à l’autre (hop scheduling)  
- **Fréquence de saut** : 1600 slots/s (1 slot = 625 μs)  
- Les clients (maître et esclaves) partagent la même séquence de sauts générée à partir de l’adresse MAC du maître (48 bits) et de son horloge (phase).   

### 2. Classes d’émission Bluetooth  
| Classe   | Puissance max (mW) | Puissance (dBm) | Portée approximative |
|----------|--------------------|-----------------|-----------------------|
| Classe 1 | 100                | 20 dBm          | ~ 100 m               |
| Classe 2 | 2,5                | 4 dBm           | ~ 10 m                |
| Classe 3 | 1                  | 0 dBm           | ~ 1 m                 | :contentReference[oaicite:16]{index=16}  

- Règle empirique d’atténuation :  
- 50 dB d’atténuation pour les 6 premiers mètres  
- 10 dB d’atténuation pour chaque 10 m supplémentaires  

---

## III.3 Architecture du protocole Bluetooth  

### 1. Topologies  
- **Piconet** :  
- Topologie en étoile maître/esclave  
- Jusqu’à 8 terminaux actifs (1 maître + 7 esclaves) et 255 esclaves “parked” (en attente)  
- Maître impose sa cadence temporelle (horloge) aux esclaves (synchronisation)  
- Communications entre esclaves passent obligatoirement via le maître  
- Tous les participants partagent la même séquence de sauts  
- **Scatternet** :  
- Interconnexion de plusieurs piconets  
- Un maître d’un piconet peut devenir esclave d’un autre piconet  
- Un esclave peut flotter entre plusieurs piconets, se “détacher” pour communiquer ailleurs, puis revenir  

### 2. Adressage  
- **Device Address (BD_ADDR)** : 48 bits, identifiant unique d’un module  
- **Active Member Address (AMA)** : 3 bits, identifiant d’un terminal actif dans le piconet  
- **Parked Member Address (PMA)** : 8 bits, identifiant d’un terminal parké  

---

## III.4 Structure des trames  

### 1. Composition d’une trame Bluetooth  
1. **Code d’accès (CAC, 72 bits)** :  
 - Préambule (0101… ou 1010…)  
 - Séquence de synchronisation (24 premiers bits de l’adresse Bluetooth)  
 - Trailer (0101… ou 1010…)  
2. **En-tête (54 bits, 3 × 18 bits)** : chaque bit transmis 3 fois (redondance)  
 - Adresse de l’esclave (3 bits)  
 - Type de paquet (4 bits)  
 - Bits de contrôle (contrôle d’erreur, état des buffers, …)  
3. **Données (0 à 240 bits)**  

- **Types de paquets** :  
- Courts (1 timeslot, max 240 bits)  
- Moyens (3 timeslots, max 1480 bits)  
- Longs (5 timeslots, max 2745 bits)  
- Saut de fréquence effectué après la transmission complète d’un paquet  

---

## III.5 Débits et performances  
- Débit maximal interne à un piconet ≈ 1 Mb/s (au plus 8 terminaux)  
- Débit effectif diminue rapidement avec le nombre de terminaux connectés  
- Un maître peut communiquer simultanément avec 2 esclaves sur des fréquences différentes pour augmenter son débit effectif  

---

## III.6 Protocoles supérieurs (Bluetooth Stack)  
- **L2CAP (Logical Link Control and Adaptation Protocol)**  
- Acheminement des paquets vers le protocole supérieur approprié  
- **RFCOMM**  
- Émulation de ports série (RS-232) au-dessus de L2CAP  
- **OBEX (Object Exchange Protocol)**  
- Échanges de fichiers et d’objets similaires à HTTP/GET-POST ou FTP  
- **SDP (Service Discovery Protocol)**  
- Découverte des services disponibles sur un périphérique  
- **TCS (Telephony Control Specification)**  
- Spécification de contrôle d’appels téléphoniques :contentReference[oaicite:17]{index=17}  

---

## III.7 Sécurité Bluetooth  
- Trois niveaux de sécurité :  
1. **Pas de gestion de sécurité**  
2. **Sécurité au niveau applicatif** (authentification accessoire/service)  
3. **Sécurité complète** (authentification + chiffrement via clés privées)  
- **Chiffrement et authentification** :  
- Génération de clés par session (numéro d’identité + clé partagée + générateur aléatoire interne)  
- Échanges de clés entre utilisateurs pour constituer un “pairing” sécurisé  
- **FEC (Forward Error Correction)** :  
- Code 2/3 (2 bits utiles protégés par 3 bits → 160 bits utiles dans un paquet court)  
- Code 1/3 (1 bit utile protégé par 3 bits → 80 bits utiles dans un paquet court) :contentReference[oaicite:18]{index=18}  

---

## III.8 États d’une station Bluetooth  
1. **Standby**  
 - Écoute allégée (toutes les 1,28 s) sur 32 porteuses d’éveil parmi les 79 canaux  
2. **Inquiry / Page**  
 - Inquiry : chercher des appareils inconnus  
 - Page : “paging” lorsque l’appareil cible est connu  
3. **Connected**  
 - Établissement de la liaison maître/esclave (définition des paramètres de connexion)  
 - Liaison active au bout de ~ 0,6 s  
4. **Hold**  
 - Lien maintenu, appareil reste synchronisé mais n’échange pas de données  
5. **Sniff**  
 - Appareil périodiquement “réveillé” pour écouter le piconet  
 - Économie d’énergie (intervalle configurable < 15 s)  
6. **Park**  
 - Appareil retiré du réseau actif, rend son AMA, synchronisation périodique pour revenir  

---

## III.9 Gestion d’interférences  
- Chaque piconet utilise une séquence de sauts différente → probabilité de collision très faible  
- En cas de collision → retransmission du paquet après procédure de back-off (genèse d’un nouveau slot) :contentReference[oaicite:19]{index=19}  

---

# IV. Zigbee  

## IV.1 Généralités  
- Norme de communication sans fil sécurisée, à bas coût et faible consommation (domotique, contrôle industriel)  
- Fondée sur IEEE 802.15.4 (couches Physique et MAC)  
- Modulations :  
- 2,4 GHz → O-QPSK (250 kbps)  
- 915 MHz (Amérique) → BPSK (40 kbps)  
- 868 MHz (Europe) → BPSK (20 kbps)   

### 1. Avantages  
- Faible coût de déploiement  
- Faible consommation (capteurs sur piles, sommeil prolongé)  
- Topologies flexibles : étoile, point à point, maillée  
- Sécurité optionnelle AES 128  
- Profil applicatif extensible (ZigBee Device Objects, Application Support Layer) :contentReference[oaicite:21]{index=21}  

---

## IV.2 Pile protocolaire Zigbee  
1. **IEEE 802.15.4 (couche Physique & MAC)**  
 - Physique : defines fréquences, modulation, débits (cf. section ci-dessus)  
 - MAC : CSMA-CA ou CSMA-CA slotté, confiabilité avec ACK, gestion des “superframes”  
2. **Couche Zigbee (NWK, APS, ZDO)**  
 - **ZDO (Zigbee Device Object)** : gestion de l’équipement, découverte, sécurité, formation du réseau  
 - **APS (Application Support Sublayer)** : livraison des données, liaison avec les objets “Application”  
 - **NWK (Network Layer)** : adressage, routage, formation, association, sécurité sur les trames  

---

## IV.3 Types de nœuds Zigbee  
- **Full Function Device (FFD)**  
- Peut jouer les trois rôles : Coordinateur (ZC), Routeur (ZR), Équipement terminal (ZED)  
- Fonctionne dans toutes topologies  
- Alimentation permanente (pour ZC et ZR)  
- **Reduced Function Device (RFD)**  
- Topologie en étoile uniquement (communiquant avec le Coordinateur)  
- Fonctionne comme équipement terminal  
- Composant simple, très peu consommateur (mode sommeil majoritaire)   

---

## IV.4 Topologies et routage  

### 1. Topologie maillée (Mesh)  
- Composition : routeurs (ZR) et terminaux (ZED)  
- Communication multi-hop :  
- Chaque routeur a plusieurs voisins  
- Choix du meilleur chemin selon coût (nombre de sauts)  
- Tolérance aux pannes, redondance  
- Avantages :  
- Robuste (routes de secours en cas de panne/interférence)  
- Extensible (couverture étendue, signaux faibles)  
- Inconvénients :  
- Complexité accrue (gestion des tables, contrôles, échanges de messages)   

### 2. Routage “No Routing” (éd. Simple)  
- Utilisable pour un coordinateur unique et ses “end-devices” (topologie en étoile)  
- Le coordinateur connaît tous ses end-devices  
- Chaque end-device communique uniquement avec le coordinateur (pas de routage multi-hop)  
- Équivalent à routage arborescent avec Rm = 0, Dm = ∞, Lm = 1   

### 3. Routage arborescent (Tree Routing)  
- Topologie en arbre : chaque nœud a un et un seul parent (sauf le coordinateur)  
- Les adresses courtes (16 bits) sont allouées selon la position dans l’arbre  
- Paramètres fournis par le coordinateur :  
- Rm = nombre maximal de routeurs enfants  
- Dm = nombre maximal d’équipements terminaux enfants  
- Lm = profondeur maximale de l’arbre  
- Adressage :  
- A(d) = nombre d’adresses allouées à un routeur de profondeur d  
  - Si d = Lm – 1 : A(d) = 1 + Dm + Rm  
  - Si 0 ≤ d < Lm – 1 : A(d) = 1 + Dm + Rm × A(d + 1)  
- Chaque routeur connaît son adresse, celle de son parent et de ses enfants  
- Routage :  
- Si destination dans sous-arbre → forward vers enfant approprié  
- Sinon → forward vers le parent (eventuellement up à la racine)   

### 4. Routage AODV (Ad hoc On-Demand Vector Routing)  
- **Route Request (RREQ)** : inondation initiale (broadcast) par la source  
- Chaque routeur intermédiaire propage le RREQ s’il offre une route meilleure (coût plus faible) que celle déjà connue  
- Clé de recherche : (source address + RREQ ID + destination address)  
- Valeur comparée : Forward cost (coût total du chemin)  
- **Route Reply (RREP)** : renvoyée par la destination (ou routeur intermédiaire disposant d’un chemin)  
- Transmise en unicast sur le chemin de moindre coût vers la source  
- Mise à jour des tables de routage et de découverte de route (NLDE/NWME)  
- Avantages : découverte dynamique, réactif aux changements de topologie :contentReference[oaicite:26]{index=26}  

---

## IV.5 Superframe (802.15.4)  
- **Superframe** : intervalle entre deux balises successives émises par le Coordinateur  
- Durée configurable entre 15 ms et 245 ms  
- Divisée en 16 slots (Time-Slots) :  
  - **CAP (Contention Access Period)** : accès par CSMA-CA slotté (partage du canal)  
  - **CFP (Contention Free Period)** : 7 GTS (Guaranteed Time Slots) réservés à des nœuds ayant des besoins temps réel (temps déterministe)  
- **Beacon Frame** : trame envoyée périodiquement par le Coordinateur pour synchroniser les nœuds (PAN ID, adresse, format de superframe)  

---

## IV.6 Scans et associations  

### 1. Scan d’énergie  
- Mesure de l’énergie détectée sur chaque canal  
- Permet au futur Coordinateur de choisir le canal le moins occupé  

### 2. Scan actif  
- Objectif : obtenir la liste des identifiants des PAN existants  
- Envoi d’une requête de beacon, à laquelle répondent les coordinateurs  
- Utilisé par :  
- Coordinateur souhaitant créer un nouveau PAN  
- Equipement cherchant à s’associer  

### 3. Scan passif  
- Écoute passive des balises sur chaque canal  
- Utilisé par un équipement voulant s’associer (sans générer de trafic)  

### 4. Scan d’orphelin  
- Utilisé par un équipement ayant perdu la synchronisation avec son Coordinateur  
- Permet de retrouver le Coordinateur (beacon id) après une panne temporaire  

---

## IV.7 Opérations réseau Zigbee  

### 1. Création de réseau  
1. Scan actif pour liste des PAN existants  
2. Choix d’un canal libre ou peu congestionné  
3. Initialisation du nouveau PAN (émission de beacon régulière)  

### 2. Association / Désassociation  
- **Association** :  
1. Scan actif ou passif pour identifier PAN et Coordinateur cible  
2. Envoi d’une demande d’association (transmission indirecte via beacon)  
3. Acceptation ou refus par le Coordinateur (en fonction des ressources disponibles)  
- **Désassociation** :  
- Initiée par l’équipement → notification indirecte au Coordinateur  
- Ou initiée par le Coordinateur → notification indirecte à l’équipement  

### 3. Synchronisation  
- Les balises du Coordinateur contiennent :  
- PAN ID  
- Adresse du Coordinateur  
- Intervalle de superframe  
- Les équipements synchronisent leur horloge locale sur les balises reçues (mise à jour périodique)  

---

## IV.8 Échanges de données  

### 1. Échanges directs (peer-to-peer)  
- Durant la période CAP (CSMA slotté)  
- Un nœud transmet à un autre directement si dans la même portée (1 hop)  

### 2. Échanges indirects  
- Si le destinataire est “end-device” en mode sommeil  
- Le Coordinateur tamponne les messages en attente  
- À la prochaine beacon, le destinataire apprend qu’il a des messages à récupérer (indirect polling)  

### 3. Échanges en GTS  
- Un équipement peut demander un GTS (Guaranteed Time Slot) au Coordinateur  
- Le Coordinateur peut réserver des slots (émission ou réception) pour cet équipement  
- Maximum de 7 GTS par superframe  
- Si le GTS n’est pas utilisé pendant un certain nombre de superframes, il peut être réattribué à un autre équipement  

---

## IV.9 Problèmes et limitations  
- **Collision de balises** (Beacon collision) :  
- Lorsqu’un équipement reçoit deux balises sur le même slot → confusion  
- Nécessite mécanismes d’évitement ou coordination des beacons entre réseaux voisins  
- **Limites de portée et interférences** (bande 2,4 GHz)  
- **Contraintes de routage** :  
- Certaines topologies (star/tree) manquent de résilience par rapport au mesh  
- Overhead de gestion de tables dans réseaux denses  

---

# VI. Wi-Fi (IEEE 802.11)  

## VI.1 Introduction et historique  
- IEEE a standardisé plusieurs réseaux locaux :  
- Ethernet (802.3)  
- Token Bus (802.4)  
- Token Ring (802.5)  
- **1990** : lancement du projet WLAN (Wireless Local Area Network)  
- Objectif : connectivité sans fil pour stations fixes/mobiles, déploiement rapide en environnement local  
- **2001** : publication d’IEEE 802.11 (Wi-Fi)  

---

## VI.2 Caractéristiques générales  
- **Bandes de fréquences** :  
- **2,4 GHz ISM** (2,400 – 2,4835 GHz) :  
  - Sans licence, mais réglementé (puissance maximum 100 mW en intérieur sur 2,4465 – 2,4835 GHz ; 10 mW sur 2,400 – 2,4835 GHz)  
  - Extérieur domaine privé : demande d’autorisation ART  
  - Extérieur domaine public : bandes réglementées  
- **5 GHz UN-II** (5,150 – 5,825 GHz) :  
  - Divisée en sous-bandes UN-II A/B/C  
  - Sans licence dans la plupart des régions, puissance limitée (100 mW ou moins selon pays)  
- **Communication** :  
- Directe (ad-hoc) : terminal → terminal (pas de relais possible)  
- Infrastruktur : terminal ↔ point d’accès (AP) → Distribution System (DS) (souvent Ethernet câblé)  
- **Débits** : varient selon codage et environnement  
- 802.11b : 1 – 11 Mb/s (réel 6 Mb/s)  
- 802.11a : 6 – 54 Mb/s (réel ~ 27 Mb/s)  
- 802.11g : 6 – 54 Mb/s (réel ~ 25 Mb/s)  
- 802.11n : jusqu’à 300 Mb/s réel (MIMO, 2,4 + 5 GHz)  
- 802.11ac : jusqu’à 1 Gb/s (configurations multi-antenne, bande UN-II) :contentReference[oaicite:27]{index=27}  

---

## VI.3 Architectures Wi-Fi  

### 1. Mode infrastructure  
- **Basic Service Set (BSS)** :  
- Groupe de stations communicant via un point d’accès (AP)  
- Couverture physique d’un BSS = Basic Service Area (BSA)  
- **Extended Service Set (ESS)** :  
- Ensemble de plusieurs BSS interconnectés via un Distribution System (DS)  
- DS = souvent réseau Ethernet filaire  
- AP connectés au DS→ ESS ; une station peut roamer (se réassocier) d’un AP à un autre  

### 2. Mode Ad-Hoc (IBSS)  
- Independent BSS (IBSS) : stations forment un réseau peer-to-peer, sans AP  
- Chaque station communique directement avec les autres dans la même portée  
- Utile pour réseaux temporaires ou absence d’infrastructure  

---

## VI.4 Modèle en couches (IEEE 802.11)  

### 1. Couche physique (PHY)  
- **802.11b/g (2,4 GHz, ISM)** :  
- Étalement de spectre DSSS (Direct Sequence Spread Spectrum) :  
  - 14 canaux de 20 MHz (seuls 1–13 utilisés en Europe)  
  - Une seule fréquence (canal) utilisée par trame, co-localisation de 3 réseaux (non-recouvrement)  
  - Débits 1 / 2 / 5,5 / 11 Mb/s (802.11b)  
  - Mécanisme de modulation adaptative (puissance, codage, afin d’optimiser débit selon qualité du lien)  
- **Portées** :  
  - 1 Mb/s → 150 m intérieur, 500 m extérieur  
  - 2 Mb/s → 100 m intérieur, 400 m extérieur  
  - 5,5 Mb/s → 75 m intérieur, 300 m extérieur  
  - 11 Mb/s → 50 m intérieur, 200 m extérieur   
- **802.11a (5 GHz, UN-II)** :  
- Modulation OFDM (Orthogonal Frequency Division Multiplexing) :  
  - 52 porteuses dans un canal de 20 MHz  
  - 8 débits possibles de 6 à 54 Mb/s  
  - Excellentes performances en présence de trajets multi-chemins (réflecteurs, obstacles)  
- 8 canaux co-localisés possibles dans 300 MHz (UN-II A/B/C)  
- Couches supérieures identiques à Ethernet  

- **802.11e (Qualité de Service)** :  
- Priorisation du trafic (voix, vidéo)  
- Différentiation des temporisateurs d’accès (IFS) selon classes de trafic  
- Sécurité renforcée (802.11i, authentification mutuelle, chiffrement)  

### 2. Couche MAC (Medium Access Control)  
- Basée sur CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance) :  
1. **Écoute du canal** (Carrier Sense) :  
   - Si libre pendant DIFS (DCF Inter-Frame Space) → transmission immédiate  
   - Sinon attente jusqu’à ce qu’il soit libre, puis temporisateur de back-off  
2. **Back-off** :  
   - Temporisateur initialisé aléatoirement dans [0, CW] (Contention Window)  
   - Quand le canal libre, décrémentation du temporisateur à chaque timeslot  
   - À 0 → transmission, sinon si canal occupé → blocage, puis reprise à prochain slot libre  
   - Collision → nouvelle tentative, CW doublé (max 1023)  
3. **ACK** :  
   - Station destinataire envoie un acquittement (ACK) après un SIFS (Short Inter-Frame Space) si trame reçue correctement (CRC ok)  
   - En cas d’absence d’ACK → retransmission (jusqu’à un nombre maximal de tentatives)  
- **Two coordination functions** :  
1. **DCF (Distributed Coordination Function)** : accès contention-based (CSMA/CA), Best Effort  
2. **PCF (Point Coordination Function)** : accès sans contention (polling par le point d’accès), pour trafic temps réel (voix/vidéo)  

---

## VI.5 Handovers et roaming  
- Lorsqu’un terminal se déplace d’un BSS à un autre (ESS), handover rapide pour conserver la session (802.11f – Inter-Access Point Protocol)  
- Mécanismes de synchronisation :  
- **Beacon Frames** (balises) émises périodiquement par chaque AP (intervalle 100 ms par défaut)  
- Contiennent : SSID, timestamp, intervalle, capacité du réseau (supported rates), authentification, chiffrement  
- Station synchronise son horloge interne sur le timestamp du beacon (jour nulle)  
- Lorsqu’un AP devient trop faible :  
1. Terminal détecte baisse de RSSI (Received Signal Strength Indicator)  
2. Scans de canaux voisins (actif ou passif) pour lister SSID disponibles  
3. Sélection d’un nouveau AP (critères : RSSI, taux d’erreur, charge)  
4. Réassociation (Reassociation Request) au nouvel AP → répartition des flux via DS  

---

## VI.6 Fragmentation / Réassemblage  
- **Objectif** : réduire le risque de perte de trame dans les transmissions radio à taux d’erreur élevé  
- **Fragmentation** :  
- Si trame > seuil `Fragmentation_Threshold`, découpée en fragments ≤ `Fragmentation_Threshold`  
- Chaque fragment transmis séquentiellement, support libéré uniquement après réception de tous les ACKs  
- En cas d’erreur pour un fragment, seuls les fragments restants sont retransmis (améliore les performances globales)  
- **Réassemblage** : reconstruire la trame d’origine à la réception de tous les fragments (identifiants de séquence, drapeaux)   

---

## VI.7 Sécurité 802.11 (WEP/WPA/WPA2)  
- **WEP (Wired Equivalent Privacy)** :  
- Chiffrement RC4, clés partagées (64 ou 128 bits)  
- Problèmes : IV (Initialization Vector) court (24 bits), vulnérabilités cryptographiques  
- **WPA (Wi-Fi Protected Access)** :  
- TKIP (Temporal Key Integrity Protocol) : rotation des clés, IV étendu (48 bits), MIC (Message Integrity Check)  
- Authentification via 802.1X/EAP (Enterprise) ou PSK (Pre-Shared Key)  
- **WPA2 (IEEE 802.11i)** :  
- Chiffrement AES-CCMP (Counter Mode with Cipher Block Chaining Message Authentication Code Protocol)  
- Authentification renforcée (802.1X)  
- Obligation pour entreprises, conformité obligatoire pour nouveaux équipements  

---

## VI.8 Exemples d’équipements Wi-Fi  
- **Point d’accès (AP)** :  
- Émetteur/récepteur sur bande 2,4 ou 5 GHz  
- Interface Ethernet (100 Mb/s ou plus) vers DS  
- Antennes internes/externes, balayage de canaux, gestion QoS (802.11e)  
- **Station cliente (STA)** :  
- Carte Wi-Fi PCI/USB/PCMCIA/mini-PCIe dans PC portable, dongle USB, chipset intégré dans smartphone/tablette  
- Logiciel de gestion (pilote, utilitaire réseau)  
- **Bridges/Repeaters** :  
- Relais de signal (Point-to-Point ou Point-to-MultiPoint)  
- Utilisent modes ad-hoc ou infrastructure  

---

# VIII. Solutions à rupture technologique  

## VIII.1 EnOcean  
- **Fréquence** : 868 MHz (Europe), modulation ASK, débit 125 kbps  
- **Trame** :  
- ID nœud (32 bits)  
- Données (8 à 32 bits)  
- CRC  
- **Transmission** : trois trames identiques envoyées à des instants aléatoires (~ 40 ms d’intervalle)  
- **Avantages** :  
- Périphériques autonomes sans pile (Energy harvesting : mouvements, vibrations, solaire, thermique)  
- Grande portée : 300 m en extérieur, 30 m en intérieur  
- Topologie “peer-to-peer” (chaque périphérique peut communiquer directement avec un autre)  
- **Inconvénients** :  
- Technologie émergente, recul limité  
- Topologie en étoile → portée interne réduite  
- Coûts encore élevés :contentReference[oaicite:30]{index=30}  

---

## VIII.2 io-homecontrol  
- **Bande** : 868 – 870 MHz (Europe)  
- Technologie bidirectionnelle (retour d’information natif)  
- Standard ouvert soutenu par de grands fabricants (VELUX, SOMFY, NIKO, Honeywell, CIAT, …)  
- Nouveau standard pour équipements d’habitat connectés (p.ex. volets roulants, chaudières, capteurs)  
- **Avantages** :  
- Interopérabilité entre différents acteurs de l’habitat  
- Retour d’information garanti (confirmations de réception, état)  
- **Inconvénients** :  
- Coûts de déploiement initiaux supérieurs à certaines alternatives  

---

## VIII.3 Autres problèmes et limites des solutions domotiques  
- **Saturation de la bande 433 MHz** (de nombreux dispositifs sans licence concurrents)  
- **Sécurité** souvent gérée par des solutions maison peu convaincantes (cryptage léger ou absent)  
- **Manque de visibilité** pour le consommateur dans le choix de la bonne solution (multiplicité des standards, interopérabilité limitée) :contentReference[oaicite:31]{index=31}  
