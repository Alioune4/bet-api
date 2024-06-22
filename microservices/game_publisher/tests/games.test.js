const {expect} = require('chai')
const request = require('supertest');
const {app} = require('../src/index')
const {response} = require("express");

describe('POST /games', () => {
    it('should create a new game', async () => {
        const res = await request(app)
            .post('/games')
            .send({
                title: 'MPL Finals',
                competitor1: 'AP BREN',
                competitor2: 'ECHO',
                startDate: '2024-05-10T12:00:00Z',
                endDate: '2024-05-10T14:00:00Z'
            });

        console.log(res);
        expect(res.status).to.equal(200);
        expect(res.body?.game?.status).to.equal('PRE-MATCH');
    })
})