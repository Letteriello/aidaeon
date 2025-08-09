# Script de Deploy para AidaEon.com (PowerShell)
# Autor: Gabriel de Jesus
# Descrição: Script para automatizar o deploy da aplicação no Windows

param(
    [Parameter(Position=0)]
    [ValidateSet("backup", "test", "build", "deploy", "health", "ssl", "full")]
    [string]$Action = "full"
)

# Configurações
$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

# Funções de log com cores
function Write-Info {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Verificar se está na raiz do projeto
function Test-ProjectRoot {
    if (-not (Test-Path "package.json") -or -not (Test-Path "turbo.json")) {
        Write-Error "Este script deve ser executado na raiz do projeto AidaEon"
        exit 1
    }
}

# Verificar se o arquivo .env existe
function Test-Environment {
    if (-not (Test-Path ".env")) {
        Write-Error "Arquivo .env não encontrado. Copie .env.example para .env e configure as variáveis"
        exit 1
    }
}

# Verificar se Docker está rodando
function Test-Docker {
    try {
        docker info | Out-Null
        Write-Info "Docker está rodando"
    }
    catch {
        Write-Error "Docker não está rodando. Inicie o Docker Desktop e tente novamente"
        exit 1
    }
}

# Verificar se bun está instalado
function Test-Bun {
    try {
        bun --version | Out-Null
        Write-Info "Bun está instalado"
    }
    catch {
        Write-Error "Bun não está instalado. Instale o Bun e tente novamente"
        exit 1
    }
}

# Função para fazer backup
function Invoke-Backup {
    Write-Info "Criando backup dos dados..."
    
    $BackupDir = "backups\$(Get-Date -Format 'yyyyMMdd_HHmmss')"
    New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null
    
    # Backup do banco PostgreSQL
    $PostgresContainer = docker ps --filter "name=postgres" --format "{{.Names}}"
    if ($PostgresContainer) {
        Write-Info "Fazendo backup do PostgreSQL..."
        docker exec $PostgresContainer pg_dump -U "n8n" "n8n" | Out-File -FilePath "$BackupDir\postgres_backup.sql" -Encoding UTF8
    }
    
    # Backup dos volumes Docker
    Write-Info "Fazendo backup dos volumes Docker..."
    docker run --rm -v "aidaeon_convex-data:/data" -v "${PWD}\${BackupDir}:/backup" alpine tar czf /backup/convex-data.tar.gz -C /data .
    docker run --rm -v "aidaeon_n8n-data:/data" -v "${PWD}\${BackupDir}:/backup" alpine tar czf /backup/n8n-data.tar.gz -C /data .
    
    Write-Success "Backup criado em $BackupDir"
}

# Função para executar testes
function Invoke-Tests {
    Write-Info "Executando testes..."
    
    # Instalar dependências
    Write-Info "Instalando dependências..."
    bun install --frozen-lockfile
    
    # Executar lint
    Write-Info "Executando lint..."
    bun run lint
    
    # Executar type check
    Write-Info "Executando verificação de tipos..."
    bun run type-check
    
    # Executar testes
    Write-Info "Executando testes unitários..."
    bun run test
    
    Write-Success "Todos os testes passaram!"
}

# Função para build da aplicação
function Invoke-Build {
    Write-Info "Fazendo build da aplicação..."
    
    # Build com Turborepo
    bun run build
    
    Write-Success "Build concluído com sucesso!"
}

# Função para deploy com Docker
function Invoke-Deploy {
    Write-Info "Iniciando deploy com Docker..."
    
    # Parar containers existentes
    Write-Info "Parando containers existentes..."
    docker-compose down
    
    # Remover imagens antigas
    Write-Info "Removendo imagens antigas..."
    docker image prune -f
    
    # Build e start dos containers
    Write-Info "Construindo e iniciando containers..."
    docker-compose up -d --build
    
    # Aguardar containers ficarem prontos
    Write-Info "Aguardando containers ficarem prontos..."
    Start-Sleep -Seconds 30
    
    # Verificar se os containers estão rodando
    $RunningContainers = docker-compose ps --filter "status=running"
    if ($RunningContainers) {
        Write-Success "Containers iniciados com sucesso!"
    }
    else {
        Write-Error "Falha ao iniciar containers"
        docker-compose logs
        exit 1
    }
}

# Função para verificar saúde da aplicação
function Test-Health {
    Write-Info "Verificando saúde da aplicação..."
    
    # Verificar frontend
    try {
        $Response = Invoke-WebRequest -Uri "http://localhost:3000/health" -TimeoutSec 10
        if ($Response.StatusCode -eq 200) {
            Write-Success "Frontend está respondendo"
        }
    }
    catch {
        Write-Warning "Frontend não está respondendo"
    }
    
    # Verificar backend
    try {
        $Response = Invoke-WebRequest -Uri "http://localhost:8080/health" -TimeoutSec 10
        if ($Response.StatusCode -eq 200) {
            Write-Success "Backend está respondendo"
        }
    }
    catch {
        Write-Warning "Backend não está respondendo"
    }
    
    # Verificar N8n
    try {
        $Response = Invoke-WebRequest -Uri "http://localhost:5678" -TimeoutSec 10
        if ($Response.StatusCode -eq 200) {
            Write-Success "N8n está respondendo"
        }
    }
    catch {
        Write-Warning "N8n não está respondendo"
    }
}

# Função para configurar SSL
function Set-SSL {
    Write-Info "Configurando SSL..."
    
    # Criar diretório SSL se não existir
    if (-not (Test-Path "nginx\ssl")) {
        New-Item -ItemType Directory -Path "nginx\ssl" -Force | Out-Null
    }
    
    Write-Warning "Configuração SSL deve ser implementada manualmente"
    Write-Info "Para produção, configure certificados SSL válidos em nginx/ssl/"
}

# Função principal
function Main {
    Write-Info "Iniciando deploy da aplicação AidaEon..."
    
    # Verificações iniciais
    Test-ProjectRoot
    Test-Environment
    Test-Docker
    Test-Bun
    
    switch ($Action) {
        "backup" {
            Invoke-Backup
        }
        "test" {
            Invoke-Tests
        }
        "build" {
            Invoke-Build
        }
        "deploy" {
            Invoke-Deploy
        }
        "health" {
            Test-Health
        }
        "ssl" {
            Set-SSL
        }
        "full" {
            Write-Info "Executando deploy completo..."
            Invoke-Backup
            Invoke-Tests
            Invoke-Build
            Invoke-Deploy
            Test-Health
            Write-Success "Deploy completo finalizado!"
        }
    }
}

# Executar função principal
try {
    Main
}
catch {
    Write-Error "Erro durante a execução: $($_.Exception.Message)"
    exit 1
}

Write-Success "Script executado com sucesso!"