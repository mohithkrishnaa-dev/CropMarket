#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 <version-tag>  (example: v1.0.0)"
  exit 1
fi

TAG="$1"

if [[ ! "$TAG" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "Tag must match semantic pattern vX.Y.Z (example: v1.0.0)"
  exit 1
fi

echo "Checking current branch and remotes..."
git rev-parse --is-inside-work-tree >/dev/null

if ! git remote get-url origin >/dev/null 2>&1; then
  echo "Remote 'origin' is not configured."
  echo "Run: git remote add origin https://github.com/<USER>/<REPO>.git"
  exit 1
fi

echo "Creating and pushing tag: $TAG"
git tag "$TAG"
git push origin "$TAG"

echo "Done. GitHub Actions release workflow should now build/publish the APK."
