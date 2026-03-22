FROM node:22-alpine

WORKDIR /app

# Копируем всё сразу
COPY . .

# Устанавливаем зависимости
RUN yarn install --frozen-lockfile

# Генерируем Prisma Client
RUN npx prisma generate

# Собираем Nest
RUN yarn build

# Даем права на entrypoint
RUN chmod +x entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]