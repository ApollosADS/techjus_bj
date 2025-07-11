#!/usr/bin/env bash
set -e

# Lint
npm run lint

# Vérification de la compilation TypeScript
npm run build

# (Optionnel) Lancer les tests si présents
if npm run | grep -q "test"; then
  npm test
else
  echo "Aucun script de test trouvé."
fi

echo "✅ Pré-déploiement terminé avec succès !" 