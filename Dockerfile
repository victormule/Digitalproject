# Étape 1 : Construire l'application
FROM node:18-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de package et installer les dépendances
COPY package.json package-lock.json* ./
RUN npm install

# Copier le reste de l'application
COPY src ./src
COPY . .

# Construire l'application pour la production
RUN npm run build

# Étape 2 : Servir l'application avec un serveur statique
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Installer Vite en tant que dépendance globale pour utiliser 'vite preview'
RUN npm install -g vite

# Copier les fichiers construits depuis l'étape précédente
COPY --from=builder /app/dist ./dist

# Exposer le port utilisé par Vite Preview (par défaut 4173)
EXPOSE 4173

# Commande pour servir l'application en mode production
CMD ["vite", "preview", "--port", "4173", "--host"]
