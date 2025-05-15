# Etapa 1: imagem base para construção
FROM node:20-alpine AS builder

# Diretório de trabalho no container
WORKDIR /app

# Copia os arquivos de dependência
COPY package.json yarn.lock ./

# Instala apenas as dependências de produção
RUN yarn install --frozen-lockfile

# Copia todo o código-fonte para o container
COPY . .

# Compila a aplicação NestJS (saída será em dist/)
RUN yarn build

# Etapa 2: imagem base para execução
FROM node:20-alpine

# Diretório de trabalho no container
WORKDIR /app

# Copia os arquivos de produção da etapa de build
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Porta que a aplicação usará
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/main.js"]
