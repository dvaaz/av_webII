# Passo X: Containerização Dinâmica com Docker e Orquestração com Docker Compose

Neste passo, você vai containerizar todos os serviços do monorepo utilizando um **único `Dockerfile` dinâmico na raiz do projeto** e orquestrá-los com o Docker Compose (`compose.yaml`). O objetivo é otimizar a manutenção do código de infraestrutura, garantindo que todo o sistema suba com um único comando, em um ambiente isolado, padronizado e reproduzível.

### Objetivo deste passo
Empacotar os três microsserviços reutilizando uma única receita de build (`Dockerfile`) através de argumentos de escopo de pastas (`workspaces`) e definir como os containers se comunicam entre si usando a rede interna do Docker Compose, expondo apenas a API Gateway para o mundo externo.

### Estrutura de Arquivos Gerada
Com esta abordagem, eliminamos a necessidade de múltiplos arquivos de build espalhados pelo projeto:

```text
/
├── compose.yaml       ← Orquestra os 3 serviços e passa os argumentos de pasta
├── Dockerfile         ← RECEITA ÚNICA: Build dinâmico baseado no workspace
├── package.json       ← Gerencia os workspaces do monorepo
└── apps/
    ├── product-service/
    ├── order-service/
    └── api-gateway/

### Como iniciar:
Como executar com Docker
# Build e inicializa todos os serviços ( @dvaaz Darley Vieira )

 1. Garante que qualquer resquício antigo de container (no Docker) seja destruído
* docker compose down --volumes --remove-orphans

 2. Força o build do zero absoluto usando o Dockerfile único da raiz
* docker compose build --no-cache

 3. Sobe os containers travando o terminal para chegar ao erro em tempo real
* docker compose up

 4. Verificar os logs das APIs
* docker compose logs api-gateway
* docker compose logs order-service
* docker compose logs product-service


-- Importante lembrar que caso esteja no Windows é importante instalar e iniciar o DOCKER DESKTOP
-- Caso esteja no Linux [text](https://docs.docker.com/desktop/setup/install/linux/)