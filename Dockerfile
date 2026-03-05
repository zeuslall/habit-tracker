FROM node:20

WORKDIR /app

# Backend deps
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Frontend deps
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

# Copy rest
COPY . .

# Build frontend
RUN cd frontend && npm run build

EXPOSE 3000

CMD ["node", "backend/server.js"]
