const request = require('supertest');
const express = require('express');
const replayRoutes = require('../src/router/replayRoutes');

jest.mock('../src/models/game', () => {
    const { Model } = require('sequelize');
    class MockGame extends Model {}
    MockGame.findByPk = jest.fn();
    return MockGame;
});

jest.mock('../src/models/game-event', () => {
    const { Model } = require('sequelize');
    class MockGameEvent extends Model {}
    MockGameEvent.findAll = jest.fn();
    return MockGameEvent;
});

const Game = require('../src/models/game');
const GameEvent = require('../src/models/game-event');

const app = express();
app.use(express.json());
app.use('/replay-api', replayRoutes);

describe('GET /replay-api/replay/:id', () => {
    beforeEach(() => {
        Game.findByPk.mockClear();
        GameEvent.findAll.mockClear();
    });

    it('should return game and its events', async () => {
        const mockGame = {
            id: 1,
            title: "Mpl Finals 2026",
            competitor1: "Evos",
            competitor2: "Tsp",
            startDate: "2025-05-10T18:00:00.000Z",
            endDate: "2025-05-10T20:00:00.000Z",
            status: "ENDED"
        };

        const mockGameEvents = [
            { id: 1, date: "2024-06-23T15:18:02.887Z", eventType: "kill", metadata: { killerTeam: "Evos", killer: "kilouane", killStreak: 2 }, gameId: 1 },
            { id: 2, date: "2024-06-23T15:20:02.887Z", eventType: "kill", metadata: { killerTeam: "Tsp", killer: "tijinou", killStreak: 1 }, gameId: 1 }
        ];

        Game.findByPk.mockResolvedValue(mockGame);
        GameEvent.findAll.mockResolvedValue(mockGameEvents);

        const response = await request(app).get('/replay-api/replay/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ game: mockGame, gameEvents: mockGameEvents });
    });

    it('should return 404 if game not found', async () => {
        Game.findByPk.mockResolvedValue(null);

        const response = await request(app).get('/replay-api/replay/1');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: "Game not found", gameId: "1" });
    });

    it('should handle errors', async () => {
        const errorMessage = 'Database error';
        Game.findByPk.mockRejectedValue(new Error(errorMessage));

        const response = await request(app).get('/replay-api/replay/1');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: "Error retrieving the game and its events :" });
    });
});
