---
description: Traer cambios desde GitHub
---

Este workflow trae los últimos cambios desde GitHub al equipo local.

## Pull automático

// turbo-all

1. Traer cambios del repositorio remoto:
```bash
git pull --rebase
```

## Uso

Simplemente escribí `/pull-github` antes de comenzar a trabajar para asegurarte de tener la última versión.

## Verificar cambios remotos

Para ver si hay cambios en GitHub sin descargarlos:
```bash
git fetch
git status
```
