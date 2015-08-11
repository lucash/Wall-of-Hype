# Wall of Hype

Quellcode von http://wallofhype.de/, eine Abbildung der Wall of Hype bekannt aus der RocketbeansTV-Sendung "Game PLUS"

## Prerequisites

1. NodeJS (mind. v0.10.13)
2. MongoDB (lokal oder hosted)

## Installation

1. ```npm install```
2. ```app/config/database.js``` öffnen und den Anweisungen folgen
3. Im Root-Directory ```node index``` ausführen ODER ```nf start``` (Sofern node-foreman verwendet wird)

Die Web-App wird jetzt unter localhost:3000 oder localhost:5000 ausgeführt.

## Usage

#### Q: Ey, wie benutz ich den Kram jetzt?

Für die Benutzung des Adminpanels muss zuerst ein Benutzer-Account erstellt werden. Die "Registrierungs"-Seite ist allerdings derzeit auskommentiert (weil ich zu faul war mir etwas besseres einfallen zu lassen lel (Wer 'ne bessere Idee hat, kann gerne contributen) und befindet sich in /app/routes.js
Hier müssen lediglich beide Routen unter "SIGNUP" auskommentiert werden und die Seiten sind benutzbar.

#### Q: Und wie füge ich neue Spiele hinzu?

Über das Adminpanel! /admin (Vorher natürlich über /login einloggen)

Wer das ganze Admin-Interface schön machen will, contributen ;) 


## Contribute

Generell für alle Veränderungen offen. Forked und schreibt eine Pull-Request und ich werde sie wahrscheinlich annehmen. Bin für jede Hilfe dankbar

## Todo

1. Grafische Überarbeitung
2. Möglichkeit dynamische "News" zu verfassen 
3. Eigenes Voting-System (strawpoll entfernen)
...


### License

MIT. Mehr unter LICENSE
