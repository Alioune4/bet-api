


function notifyGameEvent(event) {
    console.log(`Notification - Utilisateur: ${event.userId}, Game: ${event.gameId}, Type: ${event.eventType}, Données de mise à jour: ${event.metadata}`);
}

module.exports = {notifyGameEvent};
