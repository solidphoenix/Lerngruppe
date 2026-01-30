# Lerngruppe
Lerngruppe PFA - Umfrage-Website für Lerngruppen-Zeitplanung

## Über das Projekt
Diese Website ermöglicht es Teilnehmern einer Lerngruppe, ihre Verfügbarkeit anzugeben:
- **Datum**: Auswahl zwischen 09.02.26 und 10.02.26
- **Uhrzeit**: Beste Lernzeit
- **Dauer**: Gewünschte Lerndauer in 15-Minuten-Schritten (15 Min bis 3 Stunden)
- **Themenwünsche**: Optionale Angabe gewünschter Lernthemen

## Features
- 📅 Kalenderexport (ICS-Dateien) für mobile Geräte und Desktop-Kalender
- 💾 Lokale Speicherung der Einträge im Browser (localStorage)
- 🎨 Responsives Design für mobile und Desktop-Geräte
- ♿ Barrierearm mit Tastaturnavigation und ARIA-Labels

## GitHub Pages Deployment
Die Website wird automatisch auf GitHub Pages deployed bei jedem Push zum `main` oder `master` Branch.

### URL
Nach dem Deployment ist die Website erreichbar unter:
`https://solidphoenix.github.io/Lerngruppe/`

### Manuelles Deployment
Das Deployment kann auch manuell über den "Actions" Tab in GitHub gestartet werden.

## Lokale Entwicklung
Die Website ist eine statische Seite und kann direkt im Browser geöffnet werden:

```bash
# Mit Python Web Server
python3 -m http.server 8000

# Oder direkt index.html im Browser öffnen
```

## Technologie
- HTML5
- CSS3 (mit Gradient-Design)
- Vanilla JavaScript (ES6+)
- GitHub Pages für Hosting
