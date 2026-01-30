# GitHub Pages Setup-Anleitung

## Was wurde gemacht

Die Website ist jetzt bereit für GitHub Pages Deployment! Folgende Dateien wurden hinzugefügt:

1. **`.github/workflows/deploy.yml`** - Automatisches Deployment-Workflow
2. **Aktualisiertes `README.md`** - Mit Projekt-Dokumentation

## Nächste Schritte zum Aktivieren von GitHub Pages

### Schritt 1: Branch zu Main mergen

1. Gehe zu deinem GitHub Repository: `https://github.com/solidphoenix/Lerngruppe`
2. Klicke auf "Pull requests"
3. Finde den Pull Request für `copilot/create-survey-website`
4. Überprüfe die Änderungen und klicke auf "Merge pull request"
5. Bestätige den Merge

### Schritt 2: GitHub Pages aktivieren

1. Gehe zu **Settings** (Einstellungen) in deinem Repository
2. Klicke im linken Menü auf **Pages**
3. Unter **Source** (Quelle):
   - Wähle **"GitHub Actions"** aus dem Dropdown-Menü
4. Klicke auf **Save** (Speichern)

### Schritt 3: Deployment starten

Nach dem Aktivieren gibt es zwei Möglichkeiten:

**Option A: Automatisch (empfohlen)**
- Das Deployment startet automatisch beim nächsten Push zum `main` Branch
- Wenn der Merge gerade erfolgt ist, läuft es bereits!

**Option B: Manuell**
1. Gehe zum **Actions** Tab in deinem Repository
2. Klicke auf den Workflow "Deploy to GitHub Pages"
3. Klicke auf "Run workflow"
4. Wähle den `main` Branch
5. Klicke auf "Run workflow"

### Schritt 4: Website aufrufen

1. Gehe zum **Actions** Tab
2. Warte bis der Workflow erfolgreich durchgelaufen ist (grünes Häkchen)
3. Deine Website ist jetzt verfügbar unter:

   **`https://solidphoenix.github.io/Lerngruppe/`**

## Workflow-Details

Der Workflow wird automatisch ausgeführt bei:
- ✅ Jedem Push zum `main` oder `master` Branch
- ✅ Manueller Ausführung über den Actions Tab

Der Deployment-Prozess:
1. Checkt den Code aus
2. Konfiguriert GitHub Pages
3. Erstellt ein Deployment-Artifact
4. Deployed die Website

## Troubleshooting

### "Pages not found"
- Stelle sicher, dass GitHub Pages in den Settings aktiviert ist
- Wähle "GitHub Actions" als Source

### Workflow läuft nicht
- Überprüfe ob der `main` Branch existiert
- Stelle sicher, dass GitHub Actions aktiviert sind (Settings → Actions)

### 404 Error auf der Website
- Warte ein paar Minuten nach dem ersten Deployment
- Lösche den Browser-Cache
- Überprüfe die URL: `https://solidphoenix.github.io/Lerngruppe/`

## Zukünftige Updates

Nach dem Setup:
- Jede Änderung, die zu `main` gepusht wird, deployed automatisch
- Kein manuelles Deployment mehr nötig
- Die Website ist immer auf dem neuesten Stand

## Lokale Tests

Um die Website lokal zu testen:

```bash
# Mit Python
python3 -m http.server 8000

# Dann öffne: http://localhost:8000
```

---

Bei Fragen oder Problemen, überprüfe den Actions Tab für Deployment-Logs.
