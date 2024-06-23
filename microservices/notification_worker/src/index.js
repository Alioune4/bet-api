const redisSubClient = require('./service/redisService');
const {notifyGameEvent} = require('./service/notificationService');
const {sequelize} = require('./database/sequelize');
const Favorite = require('./models/favorite')

async function handleGameEventReceived(message) {
    const gameEvent = JSON.parse(message);
    const {gameId, eventType} = gameEvent;
    const favorites = await Favorite.findAll({
        where: { gameId: gameId },
    })
    console.log('Favorites:', favorites)

    notifyGameEvent(gameEvent);
}

redisSubClient.subscribe("game_events", handleGameEventReceived)
    .then(() => {
        console.log("Subscribed to games channel");
    })
    .catch((err) => {
        console.error("Error while subscribing to games channel: ", err);
    });
