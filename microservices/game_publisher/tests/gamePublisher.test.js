const request = require('supertest');
const express = require('express');
const matchRoutes = require('../src/router/matchRoutes');
jest.mock('../src/models/game', () => {
    const { Model } = require('sequelize');
    class MockGame extends Model {}
    MockGame.findByPk = jest.fn();
    MockGame.create = jest.fn();
    MockGame.save = jest.fn();
    return MockGame;
});

jest.mock('../src/models/game-event', () => {
    const { Model } = require('sequelize');
    class MockGameEvent extends Model {}
    MockGameEvent.findAll = jest.fn();
    MockGameEvent.create = jest.fn();
    MockGameEvent.save = jest.fn();
    return MockGameEvent;
});

const Game = require('../src/models/game');
const GameEvent = require('../src/models/game-event');

const app = express();
app.use(express.json());
app.use('/match-api', matchRoutes);

describe('match-api endpoints', () => {

    beforeEach(() => {
        Game.findByPk.mockClear();
        Game.create.mockClear();
        GameEvent.findAll.mockClear();
        GameEvent.create.mockClear();
        GameEvent.save.mockClear();
        Game.save.mockClear();
    });

    describe('POST /match-api/games', () => {
        it('should create a new game', async () => {
            const mockGame = {
                title: "Test Game",
                competitor1: "Team A",
                competitor2: "Team B",
                startDate: "2024-06-24T10:00:00.000Z",
                endDate: "2024-06-24T12:00:00.000Z",
            };

            Game.create.mockResolvedValue(mockGame);

            const response = await request(app)
                .post('/match-api/games')
                .send(mockGame);

            expect(response.status).toBe(201);
            expect(response.body.message).toEqual("Game created Successfully!");
        });
    });

    describe('PUT /match-api/games/:id/next-status', () => {

        it('should return 404 if game not found', async () => {
            const gameId = 999;

            Game.findByPk.mockResolvedValue(null);

            const response = await request(app)
                .put(`/match-api/games/${gameId}/next-status`);

            expect(response.status).toBe(404);
            expect(response.body.message).toEqual("Game not found");
        });

        it('should handle errors', async () => {
            const gameId = 1;

            Game.findByPk.mockRejectedValue(new Error('Database error'));

            const response = await request(app)
                .put(`/match-api/games/${gameId}/next-status`);

            expect(response.status).toBe(500);
        });
    });

    describe('PUT /match-api/games/:id/kill', () => {

        it('should return 404 if game not found', async () => {
            const gameId = 999;

            Game.findByPk.mockResolvedValue(null);

            const response = await request(app)
                .put(`/match-api/games/${gameId}/kill`)
                .query({ killerSide: "home", killer: "kilouane", killStreak: 2 });

            expect(response.status).toBe(404);
            expect(response.body.message).toEqual("Game not found");
        });

        it('should return 400 if game is not live', async () => {
            const gameId = 1;
            const mockGame = {
                id: gameId,
                title: "Test Game",
                competitor1: "Team A",
                competitor2: "Team B",
                startDate: "2024-06-24T10:00:00.000Z",
                endDate: "2024-06-24T12:00:00.000Z",
                status: "ENDED"
            };

            Game.findByPk.mockResolvedValue(mockGame);

            const response = await request(app)
                .put(`/match-api/games/${gameId}/kill`)
                .query({ killerSide: "home", killer: "kilouane", killStreak: 2 });

            expect(response.status).toBe(400);
            expect(response.body.message).toEqual("Game is not on live");
            expect(response.body.game).toEqual(mockGame);
        });

        it('should handle errors', async () => {
            const gameId = 1;

            Game.findByPk.mockRejectedValue(new Error('Database error'));

            const response = await request(app)
                .put(`/match-api/games/${gameId}/kill`)
                .query({ killerSide: "home", killer: "kilouane", killStreak: 2 });

            expect(response.status).toBe(500);
        });
    });

});
