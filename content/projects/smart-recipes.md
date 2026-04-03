---
title: "Smart Recipes"
date: "2026-04-03"
excerpt: "An offline-first Flutter mobile application that intelligently matches recipes with your available ingredients, featuring barcode scanning, cloud synchronization, and a custom recipe scraping API."
tags: ["Flutter", "Dart", "Firebase", "Node.js", "Express", "Hive", "OpenFoodFacts API", "Web Scraping", "NixOS"]
category: "Full-Stack Development"
featured: true
image: "/images/smartrecipesimage.jpg"
repoUrl: "https://github.com/Artek60744/Smart_Recipes"
isMainProject: true
---

# Smart Recipes

An intelligent recipe management system that helps users discover recipes based on their available ingredients, with support for offline operations and seamless cloud synchronization.

## Overview

Smart Recipes is a full-stack mobile application built with Flutter that combines product inventory management with smart recipe matching. The application leverages barcode scanning to quickly add products, maintains an offline-first architecture for reliable operation, and intelligently suggests recipes based on ingredient availability. A custom Node.js backend scrapes and serves over 50 French recipes from Marmiton.org, while Firebase provides authentication and cloud storage.

## Key Features
### Product Management

- **Barcode scanning** with real-time camera preview and QR code detection
- **OpenFoodFacts API integration** providing detailed product information including nutritional data (Nutriscore), ingredients, and images
- **Inventory tracking** with quantity management, expiration dates, and automatic sync status

### Smart Recipe Matching

- **Fuzzy ingredient matching algorithm** that calculates recipe availability based on user's inventory (0-100% match score)
- **Advanced filtering system** by difficulty (1-4), budget (1-3), preparation time, and ratings
- **Real-time recipe recommendations** highlighting "fully available" (100%) and "mostly available" (≥80%) recipes
- **50+ pre-scraped French recipes** from Marmiton.org with step-by-step instructions

### Offline-First Architecture

- **Local-first operations** using Hive NoSQL database for instant responsiveness
- **Automatic background sync** with Firebase Firestore when connectivity is restored
- **Intelligent conflict resolution** with last-write-wins strategy and quantity accumulation
- **Sync status tracking** (synced, pending_add, pending_update, pending_delete) with visual indicators

### Authentication & Cloud Storage

- **Google Sign-In** OAuth integration with Firebase Authentication
- **User-specific data isolation** with Firestore security rules
- **Unlimited offline cache** for seamless operation across network conditions

## Implementation

### Frontend Architecture (Flutter)

The application follows a **feature-based modular architecture** with clean separation of concerns:

```
lib/
├── core/                          # Business logic layer
│   ├── models/                    # Data models with Hive annotations
│   ├── services/                  # Singleton services (Auth, Scanner, APIs)
│   └── repositories/              # Offline-first data coordination
├── features/                      # Feature modules
│   ├── auth/                      # Google Sign-In screens
│   ├── barcode_scanner/           # Scanner UI + Product details
│   ├── storage/                   # Inventory management
│   ├── recipes/                   # Recipe browsing + Smart matching
│   └── home/                      # Bottom navigation shell
└── main.dart                      # App initialization + Hive setup
```

**State Management**: Provider pattern with ValueNotifiers for reactive UI updates

**Offline Strategy**: Repository pattern coordinates between local Hive storage and cloud Firestore, ensuring local operations complete immediately while queuing cloud sync for background execution.

### Backend Services

#### Marmiton Recipe API (Node.js)

- **Express.js REST API** serving scraped recipe data
- **Fixed web scraper** updated for 2026 Marmiton.org HTML structure changes
- **Ethical rate limiting** (2-5 second delays between requests)
- **Firebase Admin SDK integration** for bulk recipe uploads

**Key Endpoint**: `GET /recipe?q=query&limit=N`

#### Firebase Cloud Services

- **Firestore Collections**:
  - `storage`: User inventory items (`{barcode}_{userId}` document IDs)
  - `recipe`: Recipe database (50+ documents)
- **Authentication**: Firebase Auth with Google provider
- **Region**: `europe-west1` with offline persistence

### Reproducible Development Environment

The project uses **Nix flakes** to create a fully reproducible development environment:

```nix
# NixOS 25.11 with Android SDK, NDK, CMake, Flutter
- Android SDK: Platforms 34, 36
- Build Tools: 35.0.0
- NDK: 28.2.13676358
- JDK: OpenJDK 17
- Gradle configuration with AAPT2 override
```

**Benefits**:
- Identical build environments across all developer machines
- No manual Android SDK installation or PATH configuration
- Deterministic dependency resolution

**Usage**: `nix develop` to enter the shell, `exit` to leave

### Deployment

- Docker containers for web development and Android APK builds
- GitHub Actions CI/CD with Nix-based automated APK generation
- Multi-platform support: Android (primary), Web (secondary)

## ## Getting Started

### Prerequisites

- Nix package manager with flakes enabled
- Firebase project credentials
- (Optional) Docker for containerized development

### Running the Application

1. **Clone the repository**
   ```bash
   git clone https://github.com/Artek60744/Smart_Recipes.git
   cd Smart_Recipes
   ```

2. **Enter Nix development shell**
   ```bash
   nix develop
   ```
   Note: First run downloads ~8-10GB of Android SDK tools

3. **Run on web**
   ```bash
   cd src
   flutter pub get
   flutter run -d web-server --web-port 8080
   ```

4. **Build Android APK**
   ```bash
   cd src
   flutter build apk --release
   ```
   Output: `build/app/outputs/flutter-apk/app-release.apk`

### Alternative: Docker Deployment

```bash
docker-compose up flutter-dev      # Web development (port 8080)
docker-compose up flutter-mobile   # Android APK build
```

## ## Challenges Overcome

### 1. Cross-Platform Development Environment Consistency

**Challenge**: The team worked across multiple operating systems (Windows, macOS, Linux), leading to inconsistent development environments, dependency conflicts, and build reproducibility issues. Traditional Flutter setup required manual Android SDK installation, PATH configuration, and Gradle setup, which varied significantly across platforms.

**Solution**: Implemented Nix flakes to create a completely reproducible development environment. The flake.nix configuration declaratively specifies all dependencies (Android SDK, NDK, CMake, JDK, Flutter), ensuring every developer enters an identical environment with a single `nix develop` command. This eliminated "works on my machine" problems and streamlined onboarding.

**Impact**: Reduced environment setup from hours of troubleshooting to a single automated command. Team members could switch between machines/OS without reconfiguration, and GitHub Actions CI/CD inherited the same environment for reliable builds.

### 2. Recipe Database Population & Ethical Web Scraping

**Challenge**: Building a comprehensive recipe database required acquiring hundreds of recipes with detailed metadata (ingredients, instructions, timings, images). Manual entry was impractical, and many recipe APIs lacked French-language content or required expensive subscriptions. Additionally, scraping at scale risked IP bans from rate limiting violations.

**Solution**: Developed a custom Node.js scraper using the marmiton-api package to ethically extract recipe data from Marmiton.org. When the original library broke in 2025 due to HTML structure changes, the team debugged and fixed the CSS selectors (updated from `main div > a` to `a.card-content__title`). Implemented rate limiting (2-5 second delays) and leveraged Schema.org JSON-LD structured data for reliable extraction. Successfully scraped 50+ high-quality recipes and uploaded them to Firebase Firestore.

**Impact**: Created a fully automated recipe ingestion pipeline that populates the database without manual data entry. The ethical rate limiting approach prevented IP bans while maintaining respect for Marmiton.org's infrastructure. The fixed scraper remains maintainable for future recipe additions.

### 3. Ingredient Matching Between Heterogeneous Data Sources

**Challenge**: Products scanned via OpenFoodFacts API used standardized ingredient names and units (e.g., "sucre", "250g"), while Marmiton recipes used natural French language with varied expressions (e.g., "2 cuillères à soupe de sucre", "un peu de farine"). Direct string matching produced zero results, as the data formats were incompatible.

**Solution**: Implemented a fuzzy ingredient matching algorithm that:
1. Normalizes ingredient text (lowercase, trim whitespace)
2. Tokenizes recipe ingredients into individual words
3. Searches for any product name substring within recipe ingredients
4. Calculates match percentage (matched ingredients ÷ total ingredients × 100)
5. Categorizes recipes as "fully available" (100%), "mostly available" (≥80%), or partial matches

The algorithm prioritizes recall over precision, ensuring users see recipes even with imperfect matches, while the percentage score provides transparency.

**Impact**: Enabled practical recipe recommendations despite data source incompatibilities. Users can now discover 100% available recipes and see which ingredients are missing for partial matches, creating actionable shopping lists. The flexible matching algorithm handles French linguistic variations (plurals, articles, abbreviations) gracefully.

## ## Technologies Used

### Frontend

- Flutter SDK (Dart ^3.9.2) - Cross-platform UI framework
- Hive (^2.2.3) - Fast NoSQL local database
- Provider (^6.1.2) - State management
- Mobile Scanner (^5.1.1) - Barcode/QR code scanning

### Backend & APIs

- Node.js with Express.js (^5.2.1) - Recipe API server
- Firebase Admin SDK (^13.6.0) - Cloud operations
- marmiton-api (^3.0.0) - Recipe scraping library
- OpenFoodFacts API (^3.25.1) - Product information

### Cloud Services

- Firebase Authentication (^5.7.0) - Google Sign-In
- Cloud Firestore (^5.4.5) - NoSQL cloud database
- Connectivity Plus (^6.0.3) - Network state monitoring

### Development Tools

- Nix Flakes (NixOS 25.11) - Reproducible environments
- Docker & Docker Compose - Containerized development
- GitHub Actions - CI/CD automation
- Build Runner (^2.4.9) + Hive Generator (^2.0.1) - Code generation

### Testing & Quality

- Mockito (^5.4.4) - Unit testing framework
- Flutter Lints (^5.0.0) - Code quality enforcement

## ## Project Status

**Current Phase**: 58% complete (7/12 phases)

### Completed

- ✅ Offline-first architecture with Hive + Firestore
- ✅ Barcode scanning and product management
- ✅ Recipe scraping backend with 50+ recipes
- ✅ Smart recipe matching algorithm
- ✅ Google authentication integration
- ✅ Automatic background sync with connectivity monitoring

### In Progress

- 🟡 Data migration service (old schema → new schema)
- 🟡 Comprehensive unit test coverage

### Planned

- ⚪ Production validation and manual testing
- ⚪ Performance optimization and caching improvements

## ## Architecture Highlights

### Offline-First Design Pattern

```
User Action → Local Storage (Hive - Immediate Response)
                     ↓
              Mark as pending_add/update/delete
                     ↓
              Background Sync (if online)
                     ↓
              Firestore Update → Mark as synced
                     ↓
         Connectivity Listener → Auto-sync on network restore
```

### Data Models with Code Generation

```dart
@HiveType(typeId: 1)
class StorageItemModel {
  @HiveField(0) final String barcode;
  @HiveField(1) final String userId;
  @HiveField(11) final String syncStatus; // 'synced' | 'pending_add' | ...
  // ... additional fields
}
```

Generated type adapters ensure type-safe serialization with zero runtime reflection overhead.

### Smart Recipe Matching Flow

1. User scans product → OpenFoodFacts API → Add to inventory
2. User opens Recipes tab → Load all recipes from Firestore
3. For each recipe:
   - Normalize ingredient text
   - Search for user's products in ingredient list
   - Calculate match percentage
4. Sort recipes by availability percentage
5. Display with visual indicators (🟢 100%, 🟡 ≥80%, ⚪ <80%)

## Team & Development

- **Development Period**: Academic project (2026)
- **Team Size**: Collaborative team across multiple operating systems
- **Repository**: Private GitHub repository
- **Languages**: Dart (Flutter), JavaScript (Node.js), Nix

## Future Enhancements

- Shopping list generation from missing ingredients
- Meal planning with weekly recipe scheduling
- Nutritional analytics using OpenFoodFacts Nutriscore data
- User-contributed recipes with community ratings
- iOS deployment (currently Android + Web only)
- Recipe photo uploads using device camera

---

This project demonstrates modern mobile development practices including offline-first architecture, intelligent data matching algorithms, ethical web scraping, and reproducible build environments using cutting-edge tools like Nix flakes.