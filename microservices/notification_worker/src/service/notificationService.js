


function notifyGameEvent(event) {
    console.log(`Notification - Utilisateur: ${update.userId}, Match: ${update.matchId}, Type de mise à jour: ${update.updateType}, Données de mise à jour: ${update.updateData}`);
}

module.exports = {notifyGameEvent};
