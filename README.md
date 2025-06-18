# minecraft

This template should help get you started developing with Vue 3 in Vite.

## Suivi du projet Todo List (Vue.js + SQLite)

### Ce qu’il reste à faire :

1. **Backend**
   - [x] Créer un serveur backend (Node.js + Express recommandé).
   - [x] Installer et configurer SQLite (via `sqlite3` ou `better-sqlite3`).
   - [x] Créer une table pour stocker les todos.
   - [x] Créer des routes API REST pour :
     - [x] Ajouter une todo.
     - [x] Lister toutes les todos.
     - [x] Supprimer une todo.
     - [x] Marquer une todo comme terminée.
2. **Frontend**
   - [x] Créer un composant Vue pour la todo-list.
   - [x] Connecter le frontend au backend via fetch/axios.
   - [x] Afficher la liste des todos.
   - [x] Ajouter la possibilité d’ajouter/supprimer/compléter une todo.
3. **Divers**
   - [x] Gérer le CORS entre le frontend (Vite) et le backend.
   - [ ] Mettre à jour le README à chaque étape.

### Ce qui a déjà été fait :

- [x] Initialisation du projet Vue.js avec Vite.
- [x] Configuration de base du projet (voir fichiers fournis).
- [x] Backend fonctionnel (Express + SQLite + API REST).
- [x] Frontend fonctionnel (TodoList.vue, intégration API, axios).

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

# Fichiers à conserver pour le projet Todo List :

- backend/ (tout le dossier, contient l'API et la base)
- index.html
- package.json
- package-lock.json
- vite.config.js
- src/App.vue
- src/main.js
- src/components/TodoList.vue
- public/favicon.ico

# Fichiers à supprimer (non nécessaires) :

- jsconfig.json
- README.md (optionnel, mais utile pour la doc)
- src/assets/ (base.css, logo.svg, main.css)
- src/components/icons/ (tous les fichiers)
- src/components/TheWelcome.vue
- src/components/WelcomeItem.vue
- .vscode/ (optionnel, utile pour config locale)
- node_modules/ (ne jamais supprimer manuellement, géré par npm)

# Remarque :

Supprimer les fichiers inutiles va alléger le projet, mais certains fichiers comme README.md ou .vscode peuvent être conservés pour la documentation ou la configuration locale.

# Action suivante :

Je peux supprimer tous les fichiers inutiles listés ci-dessus (sauf README.md et .vscode si tu veux les garder). Confirme si tu veux aussi supprimer README.md et .vscode.
