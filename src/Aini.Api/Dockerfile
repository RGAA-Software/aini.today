FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["src/Aini.Api/Aini.Api.csproj", "src/Aini.Api/"]
COPY ["src/Aini.Application/Aini.Application.csproj", "src/Aini.Application/"]
COPY ["src/Aini.Domain/Aini.Domain.csproj", "src/Aini.Domain/"]
COPY ["src/Aini.Infrastructure/Aini.Infrastructure.csproj", "src/Aini.Infrastructure/"]
RUN dotnet restore "src/Aini.Api/Aini.Api.csproj"

COPY . .
RUN dotnet publish "src/Aini.Api/Aini.Api.csproj" -c Release -o /app/publish --no-restore /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Aini.Api.dll"]
