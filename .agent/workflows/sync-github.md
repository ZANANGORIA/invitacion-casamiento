---
description: Sincronizar cambios con GitHub
---

Este workflow te permite sincronizar fácilmente tus cambios con GitHub.

## Sincronización rápida

// turbo-all

1. Agregar todos los cambios:
```bash
git add -A
```

2. Crear commit con mensaje automático:
```bash
git commit -m "Update: cambios del $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
```

3. Push a GitHub:
```bash
git push
```

## Uso

Simplemente escribí `/sync-github` y yo ejecutaré automáticamente los 3 pasos.

## Verificar estado

Para ver qué cambios hay pendientes:
```bash
git status
```

## Pull (traer cambios)

Si trabajaste desde otro equipo:
```bash
git pull
```
