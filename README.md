# 🇬🇦 Plateforme Nationale Auto-Écoles & Examens — Gabon

Plateforme numérique souveraine de gestion des auto-écoles et des examens de conduite au Gabon, visant la lutte contre la fraude, la traçabilité des dossiers et la modernisation du secteur.

## 🚀 Structure du Projet

- `backend/` : API REST NestJS (Node.js)
- `frontend/` : Application Web Next.js
- `database/` : Migrations et schémas PostgreSQL
- `infrastructure/` : Configuration Docker, Keycloak (IAM) et serveurs
- `docs/` : Documentation technique et fonctionnelle

## 🛠️ Stack Technique

- **Backend** : NestJS (TypeScript)
- **Database** : PostgreSQL
- **Auth / IAM** : Keycloak
- **Frontend** : Next.js
- **Infra** : Docker, MinIO (Stockage fichiers)

## 🏗️ Développement

Consultez le fichier `docs/convention_git.md` pour connaître les règles de nommage des branches et des commits.

### Branches principales
- `main` : Production stable
- `staging` : Pré-production et validation finale
- `develop` : Intégration continue des fonctionnalités

### Workflow Git
1. Créer une branche `feature/nom-feature` depuis `develop`.
2. Commiter en **français** selon la convention `type(scope): message`.
3. Ouvrir une Pull Request vers `develop`.

---
© 2026 — Projet de Modernisation des Transports (Gabon)
