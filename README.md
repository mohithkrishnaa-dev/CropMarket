# CropMarket Android App

This repository now contains an actual Android application (Kotlin + XML + ViewModel + LiveData).

## Features implemented
- Market price lookup with crop normalization and district fallback.
- Retry last query behavior.
- Watchlist capture for crop + district + price snapshot.
- Land unit converter (Acre/Hectare/Bigha/Kanal/Guntha).

## Project structure
- `app/` Android application module
- `app/src/main/java/com/cropmarket/` Activity + ViewModel
- `app/src/main/res/layout/activity_main.xml` main UI

## Build

```bash
gradle assembleDebug
```

> Note: Requires Android SDK configured via `ANDROID_HOME`/`ANDROID_SDK_ROOT`.
