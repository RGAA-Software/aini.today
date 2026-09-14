# AINI

AINI is an English graded-story platform built with ASP.NET Core and React.

## Local development

```powershell
dotnet run --project src/Aini.Api
```

```powershell
cd web
npm install
npm run dev
```

## Verification

```powershell
dotnet test Aini.slnx
cd web
npm ci
npm run build
```

## Development workflow

Do not develop normal features directly on `main`. Create a short-lived branch such as `feature/favorites`, test locally, push it, and open a pull request:

```powershell
git switch main
git pull
git switch -c feature/favorites

# After development and local verification
git add .
git commit -m "Add story favorites"
git push -u origin feature/favorites
```

Pull requests run the GitHub Actions verification job without deploying. Merging a verified pull request into `main` runs verification again and deploys production automatically. Direct pushes to `main` should be reserved for exceptional, low-risk maintenance.

GitHub Actions compiles the application, transfers the deployment package to the Beijing server, builds the production containers there, and stores the versioned images in Tencent Cloud TCR.
