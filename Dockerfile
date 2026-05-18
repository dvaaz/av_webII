# **************************************************************** #
# Stage 1: build — compila TypeScript baseado no workspace ativo   #
# **************************************************************** #
FROM node:20-alpine AS builder
WORKDIR /app

# Recebe o nome do workspace vindo do compose (ex: apps/api-gateway)
ARG WORKSPACE_PATH

# Copia as configurações globais da raiz do monorepo
COPY package*.json ./
COPY tsconfig.json ./

# Copia a pasta inteira do microsserviço (incluindo o src dele)
COPY ${WORKSPACE_PATH}/ ./${WORKSPACE_PATH}/

# Instala as dependências na estrutura de monorepo
RUN npm install

# Compila apenas o workspace enviado pelo argumento do compose
RUN npm run build --workspace=${WORKSPACE_PATH}

# **************************************************************** #
# Stage 2: produção — imagem final leve                            #
# **************************************************************** #
FROM node:20-alpine
WORKDIR /app

ARG WORKSPACE_PATH

COPY package*.json ./
RUN npm install --omit=dev

# Copia a pasta dist gerada dentro do workspace específico
COPY --from=builder /app/${WORKSPACE_PATH}/dist ./dist

EXPOSE 3001

# Inicia o servidor de produção apontando para a dist compilada
CMD ["node", "dist/server.js"]