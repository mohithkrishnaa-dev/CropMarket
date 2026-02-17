# CropMarket Android App

This repository contains a native Android application (Kotlin + XML + ViewModel + LiveData).

## Features implemented
- Market price lookup with crop normalization and district fallback.
- Retry last query behavior.
- Watchlist capture for crop + district + price snapshot.
- Land unit converter (Acre/Hectare/Bigha/Kanal/Guntha).

## Local build

```bash
gradle :app:assembleDebug
```

> Note: Local builds require Android SDK and a JDK compatible with Android Gradle Plugin.

## GitHub Actions (build + release APK)

Two workflows are included:

- **CI build**: `.github/workflows/android-ci.yml`
  - builds `app-debug.apk` on pushes/PRs
  - uploads APK as a workflow artifact

- **Release build**: `.github/workflows/android-release.yml`
  - runs on tags like `v1.0.0`
  - builds release APK
  - optionally signs APK (if signing secrets are configured)
  - publishes a GitHub Release with APK attached

### Optional signing secrets

Configure these repository secrets for signed releases:

- `ANDROID_KEYSTORE_BASE64`
- `ANDROID_KEY_ALIAS`
- `ANDROID_KEYSTORE_PASSWORD`
- `ANDROID_KEY_PASSWORD`

If these secrets are not set, the workflow still publishes the unsigned release APK.

## How to release an APK on GitHub

1. Push your branch to GitHub.
2. Merge to your main branch.
3. Create and push a tag:

```bash
git tag v1.0.0
git push origin v1.0.0
```

4. Open the **Releases** page in GitHub; the APK will be attached automatically.

## Can't see files on GitHub?

If GitHub still shows only the initial commit, your local commits are not pushed yet.

Run:

```bash
git log --oneline -5
git remote -v
```

Then follow the full guide:

- [`docs/github-sync-troubleshooting.md`](docs/github-sync-troubleshooting.md)
