/*
Wichtig:
Diese Version der Datenbank-Verbindung nutzt System Enviroments über Foreman

Alternativ kann natürlich auch hardcoded werden (zB: 'url' : 'mongodb://localhost/wallofhype')

Für die lokale Entwicklung mit env's wird - vermutlich - nodejs foreman benötigt (https://github.com/strongloop/node-foreman)
 */
module.exports = {
    'url' : 'mongodb://' + process.env.DBUSER + ":" + process.env.DBPW + "@" + process.env.DBHOST + "/wallofhype"
};