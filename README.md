# Mobile legends betting

## Description
This project is a simple implementation of a betting system for mobile legends games. It is composed of 5 services.

## How to run the project
To run the project, you need to have docker and docker-compose installed on your machine.
After that, you can run the following command at the root of the project:
```bash
docker-compose up
```

To see the logs of the notification worker, you can run the following command:
```bash
docker logs -f projet-javascript-notification-worker-1
```

## Mobile legends game description
Mobile legends is a 5v5 moba game where two teams of 5 players fight against each other to destroy the enemy base.
The game is won by the team that destroys the enemy base first.
Throughout the game, players can kill each other to gain gold and experience.
Games are played in a best of x format, where the first team to win x games wins the match.

## Implementation details
A game is composed of 4 states:


## Apis and workers description

### Game publisher api
This api is responsible for creating games, modifying their states and adding events to them.
All states changes and events added are directly saved in the database and published to the redis server.

### Bet api
This api is responsible for retrieving all games that are currently open for betting.

### Replay api
This api is responsible for replaying all events related to a game. The game must be finished to be replayed.

### Favorite games api

### Notification worker

## Chai version
We are using chai version 4.3.10 because since the version 5, common js syntax is not longer supported