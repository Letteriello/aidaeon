#!/bin/bash

# Script de Deploy para AidaEon.com
# Autor: Gabriel de Jesus
# Descrição: Script para automatizar o deploy da aplicação

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funções de log
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar se está na raiz do projeto
if [ ! -f "package.json" ] || [ ! -f "turbo.json" ]; then
    log_error "Este script deve ser executado na raiz do projeto AidaEon"
    exit 1
fi

# Verificar se o arquivo .env existe
if [ ! -f ".env" ]; then
    log_error "Arquivo .env não encontrado. Copie .env.example para .env e configure as variáveis"
    exit 1
fi

# Carregar variáveis de ambiente
source .env

# Verificar se Docker está rodando
if ! docker info > /dev/null 2>&1; then
    log_error "Docker não está rodando. Inicie o Docker e tente novamente"
    exit 1
fi

# Verificar se bun está instalado
if ! command -v bun &> /dev/null; then
    log_error "Bun não está instalado. Instale o Bun e tente novamente"
    exit 1
fi

log_info "Iniciando deploy da aplicação AidaEon..."

# Função para fazer backup
backup_data() {
    log_info "Criando backup dos dados..."
    
    BACKUP_DIR="backups/$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$BACKUP_DIR"
    
    # Backup do banco PostgreSQL
    if docker ps | grep -q postgres; then
        log_info "Fazendo backup do PostgreSQL..."
        docker exec aidaeon-postgres-1 pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > "$BACKUP_DIR/postgres_backup.sql"
    fi
    
    # Backup dos volumes Docker
    log_info "Fazendo backup dos volumes Docker..."
    docker run --rm -v aidaeon_convex-data:/data -v "$(pwd)/$BACKUP_DIR":/backup alpine tar czf /backup/convex-data.tar.gz -C /data .
    docker run --rm -v aidaeon_n8n-data:/data -v "$(pwd)/$BACKUP_DIR":/backup alpine tar czf /backup/n8n-data.tar.gz -C /data .
    
    log_success "Backup criado em $BACKUP_DIR"
}

# Função para executar testes
run_tests() {
    log_info "Executando testes..."
    
    # Instalar dependências
    bun install --frozen-lockfile
    
    # Executar lint
    log_info "Executando lint..."
    bun run lint
    
    # Executar type check
    log_info "Executando verificação de tipos..."
    bun run type-check
    
    # Executar testes
    log_info "Executando testes unitários..."
    bun run test
    
    log_success "Todos os testes passaram!"
}

# Função para build da aplicação
build_application() {
    log_info "Fazendo build da aplicação..."
    
    # Build com Turborepo
    bun run build
    
    log_success "Build concluído com sucesso!"
}

# Função para deploy com Docker
deploy_docker() {
    log_info "Iniciando deploy com Docker..."
    
    # Parar containers existentes
    log_info "Parando containers existentes..."
    docker-compose down
    
    # Remover imagens antigas
    log_info "Removendo imagens antigas..."
    docker image prune -f
    
    # Build e start dos containers
    log_info "Construindo e iniciando containers..."
    docker-compose up -d --build
    
    # Aguardar containers ficarem prontos
    log_info "Aguardando containers ficarem prontos..."
    sleep 30
    
    # Verificar se os containers estão rodando
    if docker-compose ps | grep -q "Up"; then
        log_success "Containers iniciados com sucesso!"
    else
        log_error "Falha ao iniciar containers"
        docker-compose logs
        exit 1
    fi
}

# Função para verificar saúde da aplicação
health_check() {
    log_info "Verificando saúde da aplicação..."
    
    # Verificar frontend
    if curl -f http://localhost:3000/health > /dev/null 2>&1; then
        log_success "Frontend está respondendo"
    else
        log_warning "Frontend não está respondendo"
    fi
    
    # Verificar backend
    if curl -f http://localhost:8080/health > /dev/null 2>&1; then
        log_success "Backend está respondendo"
    else
        log_warning "Backend não está respondendo"
    fi
    
    # Verificar N8n
    if curl -f http://localhost:5678 > /dev/null 2>&1; then
        log_success "N8n está respondendo"
    else
        log_warning "N8n não está respondendo"
    fi
}

# Função para configurar SSL (Let's Encrypt)
setup_ssl() {
    log_info "Configurando SSL com Let's Encrypt..."
    
    # Criar diretório SSL se não existir
    mkdir -p nginx/ssl
    
    # Gerar certificados SSL (placeholder - implementar certbot)
    log_warning "Configuração SSL deve ser implementada com certbot"
    log_info "Execute: certbot --nginx -d aidaeon.com -d www.aidaeon.com"
}

# Função principal
main() {
    case "${1:-full}" in
        "backup")
            backup_data
            ;;
        "test")
            run_tests
            ;;
        "build")
            build_application
            ;;
        "deploy")
            deploy_docker
            ;;
        "health")
            health_check
            ;;
        "ssl")
            setup_ssl
            ;;
        "full")
            log_info "Executando deploy completo..."
            backup_data
            run_tests
            build_application
            deploy_docker
            health_check
            log_success "Deploy completo finalizado!"
            ;;
        *)
            echo "Uso: $0 [backup|test|build|deploy|health|ssl|full]"
            echo "  backup  - Criar backup dos dados"
            echo "  test    - Executar testes"
            echo "  build   - Fazer build da aplicação"
            echo "  deploy  - Deploy com Docker"
            echo "  health  - Verificar saúde da aplicação"
            echo "  ssl     - Configurar SSL"
            echo "  full    - Deploy completo (padrão)"
            exit 1
            ;;
    esac
}

# Executar função principal
main "$@"