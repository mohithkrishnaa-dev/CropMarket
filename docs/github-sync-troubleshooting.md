# GitHub Sync Troubleshooting

If GitHub only shows `LICENSE` and `README.md` (initial commit), your local commits were not pushed to the remote repository yet.

## 1) Verify local commits exist

```bash
git log --oneline -5
```

You should see recent commits such as Android app/workflow commits.

## 2) Check whether a remote is configured

```bash
git remote -v
```

- If this prints nothing, add your GitHub remote.

## 3) Add remote (first time only)

```bash
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO>.git
```

## 4) Push your branch

If your working branch is `work` and you want to update `main` on GitHub:

```bash
git push -u origin work
```

Then either:
- open a Pull Request `work -> main`, or
- push directly to main (only if intended):

```bash
git push origin work:main
```

## 5) Verify files are on GitHub

After push, refresh the repository page and switch to the correct branch in the branch dropdown.

## 6) Release APK after files are visible

Once the workflows are present on GitHub:

```bash
git tag v1.0.0
git push origin v1.0.0
```

Then open **GitHub → Releases** and **GitHub → Actions**.

---

## Quick diagnosis for this repository state

- Local branch contains multiple commits after `Initial commit`.
- No `origin` remote is configured locally.
- Therefore, GitHub will still show only the initial commit until remote is added and changes are pushed.
