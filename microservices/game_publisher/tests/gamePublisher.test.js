const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const gameRoutes = require('../routes/matchRoutes');
const { createGame, updateGameStatus, updateGameScore } = require('../controllers/GameController');
const Game = require('../models/game');
const GameEvent = require('../models/game-event');

jest.mock('../models/game');
jest.mock('../models/game-event');

const app = express();
app.use(bodyParser.json());
app.use('/match-api', gameRoutes);

describe('Game Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /games', () => {
        it('should create a new game', async () => {
            const req = {
                body: {
                    title: 'Test Game',
                    competitor1: 'Team A',
                    competitor2: 'Team B',
                    startDate: new Date(),
                    endDate: new Date(),
                },
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn(),
            };

            Game.create.mockResolvedValueOnce(req.body);

            await createGame(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Game created Successfully!',
                createdGame: req.body,
            });
        });

        it('should handle errors during game creation', async () => {
            const req = {
                body: {
                    title: 'Test Game',
                    competitor1: 'Team A',
                    competitor2: 'Team B',
                    startDate: new Date(),
                    endDate: new Date(),
                },
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn(),
            };

            const errorMessage = 'Database error';
            Game.create.mockRejectedValueOnce(new Error(errorMessage));

            await createGame(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: `Error while creating the game : ${errorMessage}`,
            });
        });
    });
});
