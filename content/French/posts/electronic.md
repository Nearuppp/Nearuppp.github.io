---
title: "Électronique"
date: 2024-05-26T12:00:00Z
tags: ["Électronique", "Microcontrôleur"]
categories: ["École","Électronique"]
---

## 1. Conversion (Binaire, Hexadécimal, etc.)

Comprendre les systèmes de numérotation est crucial dans le domaine de l'ingénierie, en particulier en informatique et en génie électrique. Voici un aperçu des différents systèmes de numérotation et comment les convertir entre eux.

### Binaire en Décimal
Les nombres binaires (base-2) utilisent uniquement 0 et 1. Pour convertir un nombre binaire en décimal (base-10), nous additionnons les produits de chaque bit et de sa puissance correspondante de 2. \
Ce sont les nombres à retenir : 1 2 4 8 16 32 64 128 256

**Exemple :**
Binaire : `1101`
Décimal : \(1 \times 2^3 + 1 \times 2^2 + 0 \times 2^1 + 1 \times 2^0 = 8 + 4 + 0 + 1 = 13\)
11010011 = 1∗1 + 1∗2 + 0∗4 + 0∗8 + 1∗16 + 0∗32 + 1∗64 + 1∗128 = 211

### Décimal en Binaire
Pour convertir un nombre décimal en binaire, nous divisons le nombre par 2 de manière répétée et enregistrons les restes.

**Exemple :**
Décimal : `13` \
13 ÷ 2 = 6 reste 1 \
6 ÷ 2 = 3 reste 0 \
3 ÷ 2 = 1 reste 1 \
1 ÷ 2 = 0 reste 1 

Binaire : `1101`

### Hexadécimal en Décimal
Les nombres hexadécimaux (base-16) utilisent les chiffres 0-9 et les lettres A-F. Pour convertir un nombre hexadécimal en décimal, nous multiplions chaque chiffre par sa puissance correspondante de 16.

**Exemple :**
Hexadécimal : `1A3`

Décimal : \(1 \times 16^2 + 10 \times 16^1 + 3 \times 16^0 = 256 + 160 + 3 = 419\)

### Décimal en Hexadécimal
Pour convertir un nombre décimal en hexadécimal, nous divisons le nombre par 16 de manière répétée et enregistrons les restes.

**Exemple :**
Décimal : `419`  
419 ÷ 16 = 26 reste 3  
26 ÷ 16 = 1 reste 10 (A)  
1 ÷ 16 = 0 reste 1  
Hexadécimal : `1A3`

## 2. Portes Logiques (Logigramme)

Les portes logiques sont les blocs de construction des circuits numériques. Elles effectuent des fonctions logiques de base et sont mises en œuvre à l'aide de commutateurs électroniques comme les transistors.

### Portes Logiques de Base
- **Porte AND :** Produit une sortie vraie (1) uniquement si les deux entrées sont vraies.
- **Porte OR :** Produit une sortie vraie si au moins une entrée est vraie.
- **Porte NOT (Inverseur) :** Produit l'opposé de l'entrée.
- **Porte NAND :** Produit une sortie fausse (0) uniquement si les deux entrées sont vraies.
- **Porte NOR :** Produit une sortie vraie uniquement si les deux entrées sont fausses.
- **Porte XOR :** Produit une sortie vraie si les entrées sont différentes.
- **Porte XNOR :** Produit une sortie vraie si les entrées sont identiques.


![Porte Logique](/img/Doors.png)

### Logigrammes
Un logigramme est une représentation graphique d'un circuit utilisant des symboles pour les portes logiques. Ces diagrammes aident à visualiser comment les différentes portes sont interconnectées pour effectuer une fonction spécifique.

## 3. Cartes de Karnaugh (K-maps)

Les cartes de Karnaugh (K-maps) sont une méthode pour simplifier les expressions algébriques booléennes. Elles fournissent un moyen visuel de minimiser les fonctions logiques en regroupant des cellules adjacentes représentant la table de vérité de la fonction.

### Comment Utiliser les K-maps
1. **Construire la K-map :** En fonction du nombre de variables, créez une grille où chaque cellule représente une combinaison possible de variables.
2. **Remplir la K-map :** Placez des 1 dans les cellules correspondant à la sortie de la fonction étant 1.
3. **Regrouper les 1 :** Formez des groupes de 1 en puissances de deux (1, 2, 4, 8, etc.). Les groupes doivent être aussi grands que possible et peuvent entourer les bords.
4. **Écrire l'expression simplifiée :** Chaque groupe se traduit par un terme produit (AND) dans l'expression booléenne simplifiée.

**Exemple :**
![Karnaugh](/img/Karnaugh.png)

  (a) = ā + dāb + c̄db + acđ + caƀ + aƀcđ 

## 4. Bascules (Bascule D, JK, RS)

Les bascules sont des éléments fondamentaux dans les circuits logiques séquentiels, utilisés pour stocker des données binaires.

### Bascule D
La bascule D (Data ou Delay) capture la valeur de l'entrée D à un moment particulier du cycle d'horloge (généralement le front montant ou descendant).

**Table de Caractéristiques :**
| D | Q(suivant) |
|---|------------|
| 0 |     0      |
| 1 |     1      |
![Chronogramme](/img/Dflipflop.png)

### Bascule JK
La bascule JK est une version plus polyvalente de la bascule SR qui élimine l'état invalide. Elle a deux entrées, J et K.

**Table de Caractéristiques :**
| J | K | Q(suivant) |
|---|---|------------|
| 0 | 0 |      Q     | 
| 0 | 1 |      0     |
| 1 | 0 |      1     |
| 1 | 1 |     Q'     |
![Chronogramme](/img/JKflipflop.png)

### Bascule RS (ou SR)
La bascule RS a deux entrées, Set (S) et Reset (R). Elle a un état potentiellement invalide lorsque S et R sont tous deux à 1.

**Table de Caractéristiques :**
| R | S | Q(suivant) |
|---|---|------------|
| 0 | 0 |      Q     |
| 0 | 1 |      1     |
| 1 | 0 |      0     |
| 1 | 1 |      X (Invalide) |

En comprenant ces concepts fondamentaux, nous posons les bases pour des sujets plus avancés en conception logique numérique et en architecture informatique. Ces concepts sont des outils essentiels dans la boîte à outils d'un ingénieur, nous permettant de concevoir et d'analyser des systèmes complexes de manière efficace.
