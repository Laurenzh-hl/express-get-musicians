// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const {seedMusician} = require("./seedData");


describe('./musicians endpoint', () => {
    // Write your tests here
    
    test("testing musicians endpoint", async () => {
        const response = await request(app).get("/musicians");
        const responseData = JSON.parse(response.text);
        expect(response.statusCode).toBe(200);
        // expect(responseData).toEqual(expect.arrayContaining(responseData.map(musician => expect.objectContaining({
        //     name: expect.any(String),
        //     instrument: expect.any(String)
        // }))))
        let areAllMusicians = responseData.every(function (musician) {
            return musician.name && musician.instrument;
        })
        expect(areAllMusicians).toBe(true);
    })    
})

describe('./bands endpoint', () => {
    
    test("testing bands endpoint", async () => {
        const response = await request(app).get("/bands");
        const responseData = JSON.parse(response.text);
        expect(response.statusCode).toBe(200);
        let areAllBands = responseData.every(function (band) {
            return band.name && band.genre;
        })
        expect(areAllBands).toBe(true);
    })    
})

describe('./musicians/:id endpoint', () => {
    
    test("correct musician is sent", async () => {
        const response = await request(app).get("/musicians/1");
        const responseData = JSON.parse(response.text);
        expect(response.statusCode).toBe(200);
        expect(responseData.id).toBe(1);
    })    
})
