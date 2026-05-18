# Stage 1: build — compila TypeScript
# Utiliza uma imagem base do Node.js para a fase de construção
FROM node:20-alpine AS builder 
# Establece o diretório de trabalho
WORKDIR /app
# Copia os arquivos de configuração e dependências para o contêiner
COPY package*.json ./
# Instala as dependências do projeto
RUN npm install
# Copia os arquivos de configuração do TypeScript e o código-fonte para o contêiner
COPY tsconfig.json ./
# Compila o código TypeScript para JavaScript
COPY src ./src
# Executa o comando de build para compilar o código TypeScript
RUN npm run build
# # # # # # # # # #
# Stage 2: produção — apenas o JS compilado + deps de produção
FROM node:20-alpine
# Establece o diretório de trabalho para a fase de produção
WORKDIR /app
# Copia os arquivos de configuração e dependências para o contêiner
COPY package*.json ./
# Instala apenas as dependências de produção, omitindo as dependências de desenvolvimento
RUN npm install --omit=dev
# Copia os arquivos compilados do estágio de construção para o estágio de produção
COPY --from=builder /app/dist ./dist
# Expõe a porta 3001 para que o servidor possa ser acessado externamente
EXPOSE 3001
# Define o comando de entrada para iniciar o servidor Node.js
CMD ["node", "dist/server.js"]
