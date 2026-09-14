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

Production images are built by GitHub Actions and stored in Tencent Cloud TCR.
