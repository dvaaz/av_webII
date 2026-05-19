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