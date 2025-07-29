---
title: TD – Entrepôt de Données et Analyse OLAP
excerpt: A hands-on data warehouse modeling exercise covering fact/dimension tables, star schema design, cube navigation, and OLAP operations such as drill-down and roll-up.
tags:
  - Data
  - OLAP
  - Cube
  - BI
  - Data
  - Warehouse
  - TD
  - French
category: Data
---

# TD 1
**Exercice 1 : Définitions**

1. **Table de faits** : table centrale contenant les indicateurs chiffrés (ex : montant de vente) et les clés étrangères vers les dimensions.
2. **Table de dimension** : table d’information liée à un axe d’analyse (ex : client, produit, temps).
3. **Indicateur** : donnée mesurable, souvent une valeur numérique (ex : CA, nb de ventes).
4. **Hiérarchie** : relation d’agrégation entre niveaux (ex : jour < mois < année).

**Exercice 2 : Quiz**

- OLTP est conçu pour l'analyse ? **Faux**
- Un cube OLAP permet d'éviter des requêtes SQL complexes ? **Vrai**
- Roll-up = zoomer sur les données ? **Faux** (c'est l'inverse)
- Drill-down = regrouper les données ? **Faux** (c'est zoomer)

**Exercice 3 : Visualisation du cube**

- Vues 2D possibles : Produit x Date, Produit x Client, Client x Date
- Roll-up sur la date : passer du jour à la semaine, ou au mois
- Drill-down sur le produit : aller de famille → produit → référence

# TD 2

Modélisation d’un entrepôt de données 
Une entreprise vend des produits. 
Chaque vente concerne : 
- un produit (lié à une famille) 
- un client  un vendeur (lié à un service) 
- une date (semaine, mois, année) 
- un montant de vente 
Travail demandé 
1. Identifier la table de faits et ses indicateurs 
2. Identifier les dimensions 
3. Créer un schéma en étoile 
4. Préciser les clés primaires et étrangères
### 1. La Table de Faits et ses Indicateurs

**Table de faits : F_Vente**  
Cette table va enregistrer chaque opération de vente et contiendra les mesures ainsi que les clés étrangères pointant vers les dimensions.
- **Mesure principale** :
    - _Montant_Vente_ (la valeur de chaque vente)    
- **Clés étrangères associées aux dimensions** :
    - _ID_Produit_  
    - _ID_Client_
    - _ID_Vendeur_
    - _ID_Date_
> Dans cette modélisation, le montant vendu est la seule mesure (indicateur) observée. D’autres mesures (par exemple nombre d’unités vendues ou remises) pourraient être ajoutées selon les besoins analytiques.
### 2. Les Dimensions

Pour permettre des analyses multi-dimensionnelles, plusieurs tables de dimensions seront créées :
- **Dimension Produit (Dim_Produit)**  
    Cette dimension contient toutes les informations relatives aux produits vendus.
    - Attributs : _ID_Produit_ (clé primaire), _Nom_Produit_, _Description_, etc.
    - **Lien hiérarchique avec la famille** :
        - Vous pouvez choisir d’inclure directement le nom ou l’identifiant de la famille dans cette dimension (par exemple _Famille_Produit_)
        - Alternativement, si la granularité ou les attributs de la famille sont nombreux, vous pouvez créer une dimension spécifique _Dim_Famille_ qui sera reliée à _Dim_Produit_.   
- **Dimension Client (Dim_Client)**  
    Contient les informations démographiques ou commerciales sur les clients
    - Attributs : _ID_Client_ (clé primaire), _Nom_Client_, _Localisation_, _Catégorie_ (particuliers, entreprises, etc.)
- **Dimension Vendeur (Dim_Vendeur)**  
    Enregistre les données sur les vendeurs
    - Attributs : _ID_Vendeur_ (clé primaire), _Nom_Vendeur_, _Email_, etc.
    - **Lien avec le service** :
        - De même, la dimension peut inclure directement _Nom_Service_ ou _ID_Service_ comme attribut.
        - En cas de besoin de détail sur le service, on peut modéliser une dimension _Dim_Service_ qui sera reliée à _Dim_Vendeur_.
- **Dimension Date (Dim_Date)**  
    Fournit une granularité temporelle pour l’analyse.
    - Attributs : _ID_Date_ (clé primaire), _Date complète_, _Jour_, _Semaine_, _Mois_, _Trimestre_, _Année_, etc.
    - La dimension date facilitera les agrégations temporelles telles que la vente par mois ou par année.
### 3. Le Schéma en Étoile
Le schéma en étoile regroupe la table de faits au centre, entourée des tables de dimensions. Voici une représentation :

```
                      Dim_Date
                         │
                         │
   Dim_Produit   ── F_Vente ── Dim_Client
        │                  │
        │                  │
   (Famille)         Dim_Vendeur  
                        (Service)
```
**Description :**
- **F_Vente** est la table de faits centrale.
- Les clés étrangères dans **F_Vente** pointent respectivement vers **Dim_Produit**, **Dim_Client**, **Dim_Vendeur** et **Dim_Date**.
- Les dimensions « Produit » et « Vendeur » contiennent chacune des attributs supplémentaires (comme la famille et le service) qui peuvent être directement intégrés ou modélisés via une table de dimension secondaire en cas de besoin d’une granularité plus fine.
### 4. Clés Primaires et Clés Étrangères
**Table de Faits : F_Vente**
- **Clé primaire** : Une clé composite constituée généralement de l’ensemble des clés étrangères, par exemple _(ID_Produit, ID_Client, ID_Vendeur, ID_Date)_ 
    - _Remarque_ : Une clé composite convient si chaque combinaison est unique. Sinon, un identifiant de faits (par exemple, _ID_Vente_) peut être ajouté en tant que clé primaire, avec chaque clé étrangère conservée pour la jointure.
- **Clés étrangères** :
    - _ID_Produit_ → Référence vers **Dim_Produit(ID_Produit)**
    - _ID_Client_ → Référence vers **Dim_Client(ID_Client)**
    - _ID_Vendeur_ → Référence vers **Dim_Vendeur(ID_Vendeur)**
    - _ID_Date_ → Référence vers **Dim_Date(ID_Date)**
**Dimension Produit (Dim_Produit)**
- **Clé primaire** : _ID_Produit_
- (Optionnel) Si vous avez créé une table pour la famille, **Dim_Famille** :
    - **Clé primaire** : _ID_Famille_
    - Dans **Dim_Produit**, vous ajouteriez une clé étrangère _ID_Famille_.
**Dimension Client (Dim_Client)**
- **Clé primaire** : _ID_Client_
**Dimension Vendeur (Dim_Vendeur)**
- **Clé primaire** : _ID_Vendeur_
- (Optionnel) Pour la relation avec le service, si une table spécifique est créée pour les services (**Dim_Service**) :
    - **Clé primaire** : _ID_Service_
    - Dans **Dim_Vendeur**, inclure une clé étrangère _ID_Service_.
**Dimension Date (Dim_Date)**
- **Clé primaire** : _ID_Date_
### Conclusion

La modélisation proposée repose sur une table de faits centrale (_F_Vente_) regroupant l’information sur chaque vente (avec le montant en indicateur) et quatre dimensions principales (_Dim_Produit_, _Dim_Client_, _Dim_Vendeur_, _Dim_Date_). La structure en étoile facilite les analyses multi-dimensionnelles, les agrégations et offre une flexibilité pour ajouter éventuellement de nouvelles dimensions (par exemple, une dimension _Famille_ ou _Service_) selon l’évolution des besoins analytiques de l’entreprise.

Cette approche garantit également la bonne intégrité référentielle à travers l’utilisation de clés primaires dans les dimensions et de clés étrangères dans la table de faits.

## Correction
**Partie 2 : Modélisation d'un entrepôt de données**

**Table de faits**

- **Ventes** : contient : code_produit, code_client, code_vendeur, date, montant_vente

**Tables de dimensions**

- **Produit** : code_produit (PK), nom, code_famille
- **Client** : code_client (PK), nom, csp
- **Vendeur** : code_vendeur (PK), nom, code_service
- **Date** : id_date (PK), jour, semaine, mois, année

**Schéma en étoile**

- Une table centrale (ventes) liée à 4 tables de dimension via des clés étrangères

## TD 3
Lecture d’un cube et navigation 
Cube à 4 dimensions : Produit, Client, Vendeur, Date Questions : 
1. Quels sont les 4 cubes à 3 dimensions qu’on peut en déduire ? Et que pourrait-on analyser en conséquence ? 
2. À quoi sert un drill-down ? Un roll-up ? 
3. Combien de vues 2D peut-on extraire de ce cube ? 
Exemple d’analyse : 
- Quelle coupe utiliser pour analyser la performance d’un vendeur sur un modèle en particulier ?
- Et pour voir la saisonnalité des ventes d'un produit ?

## 1. Identification des sous-cubes à 3 dimensions et axes d’analyse

À partir d’un cube à 4 dimensions, on peut déduire 4 cubes à 3 dimensions en retirant une dimension à chaque fois. Les options sont :

- **Cube 1 : Produit – Client – Vendeur**  
    _Analyse possible :_
    
    - Étudier la répartition des ventes selon les produits et la performance des vendeurs auprès de différents segments de clients.
        
    - Identifier quels vendeurs se distinguent sur tel produit auprès de certaines clientèles.
        
- **Cube 2 : Produit – Client – Date**  
    _Analyse possible :_
    
    - Analyser la tendance des ventes de produits dans le temps et observer le comportement d’achat selon différents segments de clients.
        
    - Détecter des saisons fortes/faibles en fonction des produits et de la clientèle ciblée.
        
- **Cube 3 : Produit – Vendeur – Date**  
    _Analyse possible :_
    
    - Suivre la performance des vendeurs sur un produit ou une gamme de produits dans le temps.
        
    - Comparer l’évolution des ventes par vendeur et visualiser des tendances temporelles (périodes promotionnelles ou saisonnières).
        
- **Cube 4 : Client – Vendeur – Date**  
    _Analyse possible :_
    
    - Évaluer l’impact des actions des vendeurs sur la fidélisation ou l’acquisition de clients au fil du temps.
        
    - Examiner les variations de performances commerciales en fonction des périodes et des types de clients.
        

En résumé, chaque cube à 3 dimensions permet de focaliser l’analyse sur un axe transversal (par exemple, le temps, le comportement client ou la performance produit/vendeur) en excluant une dimension moins pertinente selon le contexte de décision.

---

## 2. Drill-Down et Roll-Up

**Drill-down :**

- Permet d’approfondir l’analyse en passant d’un niveau de détails global à un niveau plus granulaire.
    
- Par exemple, on peut passer d’une analyse des ventes par trimestre à une analyse mensuelle ou quotidienne, afin d’identifier précisément les périodes critiques.
    

**Roll-up :**

- Correspond à un agrégat des données, c’est-à-dire de passer d’un niveau de détail élevé à un niveau synthétisé.
    
- Par exemple, on regroupe les ventes journalières en ventes mensuelles ou annuelles, facilitant ainsi l’identification de tendances globales et la comparaison de périodes.
    

Ces opérations sont essentielles dans la navigation multidimensionnelle d’un cube, car elles permettent à l’utilisateur de modifier dynamiquement le niveau de détail en fonction de ses objectifs analytiques.

---

## 3. Extraction des vues 2D du cube

Un cube à 4 dimensions offre plusieurs perspectives en 2 dimensions (des vues plates) lorsqu’on considère toutes les combinaisons possibles de 2 dimensions parmi 4.

- Le nombre de combinaisons est calculé par la formule du nombre de combinaisons :
    
    (42)=6\binom{4}{2} = 6

Ainsi, on peut extraire **6 vues 2D**, à savoir :

- Produit – Client
    
- Produit – Vendeur
    
- Produit – Date
    
- Client – Vendeur
    
- Client – Date
    
- Vendeur – Date
    

---

## Applications pratiques (Exemples d’analyses)

- **Analyser la performance d’un vendeur sur un modèle en particulier :**  
    Pour répondre à cette question, il est pertinent de _« trancher »_ le cube le long des dimensions **Produit** et **Vendeur**.
    
    - Vous pourriez extraire une vue (ou un sous-cube) « Produit – Vendeur – Date » où vous fixez le modèle de produit désiré et étudiez l’évolution temporelle des ventes associées à un vendeur spécifique.
        
    - Le **drill-down** sur la dimension Date vous permettra de descendre dans le détail pour visualiser la performance sur une période précise.
        
- **Analyser la saisonnalité des ventes d’un produit :**  
    Dans ce cas, la vue la plus appropriée est la combinaison **Produit – Date**.
    
    - En fixant le produit à analyser, vous pouvez examiner l’historique des ventes au fil des différentes périodes (mois, trimestre, saison).
        
    - Un **roll-up** sur la dimension Date vous aidera à regrouper les données au niveau mensuel ou saisonnier, facilitant ainsi la détection de cycles ou de variations saisonnières.
        

---

En conclusion, la navigation dans un cube multidimensionnel permet d'extraire des perspectives variées et adaptées aux besoins analytiques. Les opérations de drill-down et de roll-up offrent une flexibilité indispensable pour explorer les données aussi bien en détails qu’à un niveau synthétique, tandis que l’extraction de vues 2D et 3D favorise des analyses ciblées sur des axes spécifiques tels que la performance des vendeurs ou la saisonnalité des ventes.