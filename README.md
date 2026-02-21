# CropMarket Android App

CropMarket is a native Android app prototype focused on helping farmers make better market decisions quickly.
It includes commodity price lookup, fallback handling for missing district data, watchlist support, and useful farm utilities.

---

## Table of Contents

- [Project Vision](#project-vision)
- [Current Features](#current-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Build and Run](#build-and-run)
- [APK Release Process](#apk-release-process)
- [GitHub Actions CI/CD](#github-actions-cicd)
- [Signing Configuration (Optional)](#signing-configuration-optional)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [License](#license)

---

## Project Vision

The app aims to provide reliable mandi price visibility and practical decision-support tools for farmers, with an emphasis on:

- fast crop price lookup
- resilient fallback behavior when district-specific data is missing
- simple UX for low-tech environments
- scalable Android architecture for future modules

---

## Current Features

### 1) Market Price Lookup
- Search by crop + district
- Crop alias normalization (example: `Wheat`, `गेहूं` → `WHEAT`)
- District-specific pricing with automatic general fallback

### 2) Retry Behavior
- Retry previous query from the UI without re-entering values

### 3) Watchlist Snapshot
- Add crop + district to watchlist
- Stores current snapshot text for quick tracking

### 4) Land Unit Converter
- Converts among:
  - Acre
  - Hectare
  - Bigha
  - Kanal
  - Guntha

---

## Tech Stack

- **Language:** Kotlin
- **UI:** XML layouts + Material Components
- **Architecture:** ViewModel + LiveData
- **Build:** Gradle (Android application module)
- **CI/CD:** GitHub Actions (debug artifact + tag-based release APK)

---

## Architecture

### MainActivity
Handles UI binding, click listeners, and observing view state.

### MainViewModel
Contains business logic for:
- crop normalization
- market price fallback logic
- watchlist data updates
- unit conversion

This keeps logic separated from Activity lifecycle/UI concerns.

---

## Project Structure

```text
CropMarket/
├── app/
│   ├── build.gradle
│   └── src/main/
│       ├── AndroidManifest.xml
│       ├── java/com/cropmarket/
│       │   ├── MainActivity.kt
│       │   └── MainViewModel.kt
│       └── res/
│           ├── layout/activity_main.xml
│           ├── values/strings.xml
│           ├── values/themes.xml
│           └── xml/
├── .github/workflows/
│   ├── android-ci.yml
│   └── android-release.yml
├── docs/
│   ├── github-sync-troubleshooting.md
│   └── next-steps-roadmap.md
├── build.gradle
├── settings.gradle
└── gradle.properties
```

---

## Getting Started

### Prerequisites

Install and configure:

- Android Studio (latest stable recommended)
- Android SDK Platform 34
- JDK 17 (recommended for AGP compatibility)
- Git

Set one of these environment variables:
- `ANDROID_HOME`
- `ANDROID_SDK_ROOT`

---

## Build and Run

### In Android Studio
1. Open project root (`CropMarket/`)
2. Let Gradle sync finish
3. Run app on emulator/device

### Command line

```bash
gradle :app:assembleDebug
```

Expected debug APK output:

```text
app/build/outputs/apk/debug/app-debug.apk
```

---

## APK Release Process

> I cannot directly publish to your GitHub account from this environment, but the repository is prepared so **you can release with a tag** once pushed.

### Step 1: Push project to GitHub

If not already configured:

```bash
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO>.git
git push -u origin work
```

Then merge `work` into `main` (PR recommended).

### Step 2: Create a release tag

```bash
git checkout main
git pull
git tag v1.0.0
git push origin v1.0.0
```

### Step 3: Download APK from GitHub

- Open **Actions** → `Android Release APK`
- Open **Releases** → release `v1.0.0`
- Download attached APK asset

---

## GitHub Actions CI/CD

### 1) `android-ci.yml`
- Runs on pushes and PRs
- Builds debug APK
- Uploads debug APK artifact

### 2) `android-release.yml`
- Runs on tags matching `v*`
- Builds release APK
- Optionally signs APK if secrets are configured
- Publishes GitHub Release with APK attached

---

## Signing Configuration (Optional)

For signed release APKs, add repository secrets:

- `ANDROID_KEYSTORE_BASE64`
- `ANDROID_KEY_ALIAS`
- `ANDROID_KEYSTORE_PASSWORD`
- `ANDROID_KEY_PASSWORD`

If secrets are missing, workflow still publishes unsigned release APK.

---

## Troubleshooting

### I can’t see new files on GitHub
Follow:
- [`docs/github-sync-troubleshooting.md`](docs/github-sync-troubleshooting.md)

### Gradle/JDK mismatch
Use JDK 17 and re-sync. If CLI build fails, check:

```bash
java -version
gradle -v
```

### APK not in release
Confirm tag pattern is `v*` (example: `v1.0.0`) and workflow succeeded.

---

## Roadmap

Planned modules and phased delivery notes are in:

- [`docs/next-steps-roadmap.md`](docs/next-steps-roadmap.md)

---

## License

This project is licensed under **GPL-3.0**. See [`LICENSE`](LICENSE).
