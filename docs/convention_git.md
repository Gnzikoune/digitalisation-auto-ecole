# 📋 Convention Git — Plateforme Auto-Écoles Gabon

---

## 🌿 Stratégie de branches (Gitflow adapté)

```
main                    ← Production uniquement (code stable, validé)
  └── staging           ← Pré-production (tests d'intégration)
        └── develop     ← Développement intégré
              ├── feature/bdd-schema-initial
              ├── feature/api-auto-ecoles
              ├── feature/auth-keycloak
              ├── fix/correction-login
              └── hotfix/urgent-en-prod
```

### Règles absolues

| Règle | Détail |
|---|---|
| ❌ Push direct sur `main` | Interdit — uniquement via Pull Request validée |
| ❌ Push direct sur `staging` | Interdit — uniquement depuis `develop` |
| ✅ `main` | Code en production uniquement |
| ✅ `staging` | Tests d'intégration et validation finale |
| ✅ `develop` | Intégration continue des features |
| ✅ `feature/*` | Une branche par fonctionnalité |

---

## 🌱 Cycle de vie d'une fonctionnalité

```
1. Créer la branche depuis develop
   git checkout develop
   git checkout -b feature/nom-de-la-feature

2. Développer et committer régulièrement
   git commit -m "feat(module): description en français"

3. Pousser et ouvrir une Pull Request → develop
   Tests automatiques + revue de code

4. Merge dans develop (feature validée)

5. Déploiement sur staging (tests d'intégration)

6. Si validé : merge develop → staging → main (production)
```

---

## ✍️ Convention des commits (en français)

### Format
```
type(scope): description courte en français

[corps optionnel]

[pied de page optionnel]
```

### Types de commits

| Type | Usage | Exemple |
|---|---|---|
| `feat` | Nouvelle fonctionnalité | `feat(candidats): ajout de l'inscription en ligne` |
| `fix` | Correction de bug | `fix(auth): correction de l'expiration du token` |
| `refactor` | Refactorisation | `refactor(api): restructuration des contrôleurs` |
| `test` | Ajout/modif de tests | `test(examens): ajout des tests unitaires` |
| `docs` | Documentation | `docs(bdd): mise à jour du schéma de la base` |
| `chore` | Maintenance | `chore(deps): mise à jour des dépendances` |
| `style` | Mise en forme | `style(front): correction de l'indentation` |
| `perf` | Performance | `perf(api): optimisation des requêtes SQL` |
| `ci` | CI/CD | `ci: ajout du pipeline de déploiement staging` |
| `hotfix` | Correctif urgent prod | `hotfix(securite): patch de la faille d'injection` |

### Scopes disponibles

| Scope | Module concerné |
|---|---|
| `bdd` | Base de données / migrations |
| `api` | API REST générale |
| `auth` | Authentification / IAM |
| `auto-ecoles` | Module auto-écoles |
| `candidats` | Module candidats |
| `examens` | Module examens |
| `moniteurs` | Module moniteurs |
| `inspection` | Module inspection/conformité |
| `analytics` | Dashboards et rapports |
| `securite` | Sécurité transversale |
| `front` | Front-end général |
| `infra` | Infrastructure / DevOps |
| `docs` | Documentation |

### Exemples concrets

```bash
feat(auto-ecoles): ajout du formulaire de création d'auto-école
fix(examens): correction du calcul du taux de réussite
refactor(candidats): séparation du service d'inscription
test(auth): ajout des tests de connexion avec MFA
docs(bdd): mise à jour du diagramme entité-relation
chore(infra): configuration Docker Compose pour le développement
```

---

## 🏷️ Nommage des branches

```bash
# Fonctionnalités
feature/bdd-schema-initial
feature/api-auto-ecoles-crud
feature/auth-keycloak-rbac
feature/module-candidats
feature/module-examens
feature/module-inspection
feature/dashboard-etat
feature/export-rapports

# Corrections
fix/correction-calcul-score-examen
fix/bug-login-inspecteur

# Correctifs urgents production
hotfix/securite-faille-sql
hotfix/crash-module-examens

# Releases
release/v1.0.0-pilote
release/v1.1.0-extension-national
```

---

## 🔄 Workflow complet (du code à la production)

```
┌─────────────────────────────────────────────────────────┐
│                DÉVELOPPEMENT                            │
│  feature/xxx                                           │
│  └── Coder + commits réguliers en français             │
│  └── Tests unitaires locaux                            │
└───────────────────────┬─────────────────────────────────┘
                        │ Pull Request
┌───────────────────────▼─────────────────────────────────┐
│                  INTÉGRATION                            │
│  develop                                               │
│  └── Revue de la PR                                    │
│  └── Tests automatiques (CI)                           │
│  └── Merge si tout est vert ✅                         │
└───────────────────────┬─────────────────────────────────┘
                        │ Merge develop → staging
┌───────────────────────▼─────────────────────────────────┐
│               PRÉ-PRODUCTION                            │
│  staging                                               │
│  └── Tests d'intégration complets                      │
│  └── Validation fonctionnelle (auto-école pilote)      │
│  └── Validation sécurité                               │
└───────────────────────┬─────────────────────────────────┘
                        │ Merge staging → main (validé ✅)
┌───────────────────────▼─────────────────────────────────┐
│                 PRODUCTION                              │
│  main                                                  │
│  └── Déploiement serveur Gabon                        │
│  └── Tag de version : v1.0.0                          │
└─────────────────────────────────────────────────────────┘
```

---

## 🏷️ Tags de version (Semantic Versioning)

```bash
v1.0.0  ← Version majeure (pilote Libreville)
v1.1.0  ← Nouvelle fonctionnalité (extension nationale)
v1.1.1  ← Correctif (patch mineur)
```

---

## 📁 Structure du dépôt

```
plateforme-auto-ecoles-gabon/
├── backend/              ← API NestJS
│   ├── src/
│   │   ├── modules/      ← Un dossier par module métier
│   │   ├── common/       ← Utilitaires partagés
│   │   └── config/       ← Configuration
│   └── test/
├── frontend/             ← Next.js
│   ├── app/
│   └── components/
├── database/             ← Migrations SQL + seeds
│   ├── migrations/
│   └── seeds/
├── infrastructure/       ← Docker, configs serveur
│   ├── docker-compose.yml
│   └── keycloak/
├── docs/                 ← Documentation technique
└── .github/
    └── PULL_REQUEST_TEMPLATE.md
```

---

## ✅ Template de Pull Request

Chaque PR doit répondre à :

```markdown
## 📋 Description
Résumé des changements apportés.

## 🔗 Issue liée
Ferme #[numéro]

## ✅ Checklist avant merge
- [ ] Code testé localement
- [ ] Tests unitaires ajoutés/mis à jour
- [ ] Documentation mise à jour si nécessaire
- [ ] Pas de secrets ou données sensibles dans le code
- [ ] Nommage des commits en français respecté

## 📸 Captures d'écran (si front-end)
[captures ici]
```
