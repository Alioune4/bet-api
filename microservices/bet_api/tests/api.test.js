const request = require('supertest');
const express = require('express');
const betRoutes = require('../src/routes/betRoutes');

// Mock the Game model
jest.mock('../src/models/game', () => {
    const { Model } = require('sequelize');
    class MockGame extends Model {}
    MockGame.findAll = jest.fn();
    return MockGame;
});

const Game = require('../src/models/game');

const app = express();
app.use(express.json());
app.use('/bet-api', betRoutes);

describe('GET /bet-api/open-games', () => {
    beforeEach(() => {
        Game.findAll.mockClear();
    });

    it('should return all open games', async () => {
        const mockGames = [
            {
                homeScore: 0,
                awayScore: 0,
                status: "PRE-MATCH",
                id: 2,
                title: "Mpl Finals 2026",
                competitor1: "Evos",
                competitor2: "Tsp",
                startDate: "2025-05-10T18:00:00.000Z",
                endDate: "2025-05-10T20:00:00.000Z",
                updatedAt: "2024-06-23T19:27:45.983Z",
                createdAt: "2024-06-23T19:27:45.983Z"
            }
        ];

        Game.findAll.mockResolvedValue(mockGames);

        const response = await request(app).get('/bet-api/open-games');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockGames);
    });

    it('should handle errors', async () => {
        const errorMessage = 'Database error';
        Game.findAll.mockRejectedValue(new Error(errorMessage));

        const response = await request(app).get('/bet-api/open-games');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: `Error retrieving open games :${errorMessage}` });
    });
});
