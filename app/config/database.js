/*
Wichtig:
Diese Version der Datenbank-Verbindung nutzt System Enviroments �ber Foreman

Alternativ kann nat�rlich auch hardcoded werden (zB: 'url' : 'mongodb://localhost/wallofhype')

F�r die lokale Entwicklung mit env's wird - vermutlich - nodejs foreman ben�tigt (https://github.com/strongloop/node-foreman)
 */
module.exports = {
    'url' : 'mongodb://' + process.env.DBUSER + ":" + process.env.DBPW + "@" + process.env.DBHOST + "/wallofhype"
};