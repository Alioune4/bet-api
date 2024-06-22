const redisSubClient = require('./service/redisService');
const {notifyGameEvent} = require('./service/notificationService');

function handleGameEventReceived(message) {
    const gameEvent = JSON.parse(message);
    notifyGameEvent(gameEvent);
}

redisSubClient.subscribe("game_events", handleGameEventReceived)
    .then(() => {
        console.log("Subscribed to games channel");
    })
    .catch((err) => {
        console.error("Error while subscribing to games channel: ", err);
    });