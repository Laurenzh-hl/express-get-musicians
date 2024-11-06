// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const {seedMusician} = require("./seedData");
const syncSeed = require("./seed.js");
let musicQuantity;


beforeAll(async () => {
    await syncSeed();
    const musicians = await Musician.findAll();
    musicQuantity = musicians.length;
});


describe ("GET /musicians", () => {
    it("returns 200 status code", async () => {
        const response = await request(app).get("/musicians");
        expect(response.statusCode).toBe(200);
    });

    it("returns an array of musicians", async () => {
        const response = await request(app).get("/musicians");
        const responseData = JSON.parse(response.text);
        let areAllMusicians = responseData.every(function (musician) {
            return  musician.name && musician.instrument;
        });
        expect(areAllMusicians).toBe(true);
    });

    it("returns correct number of musicians", async () => {
        const response = await request(app).get("/musicians");
        expect(response.body.length).toEqual(musicQuantity);
    });

    it("returns correct musician data", async () => {
        const response = await request(app).get("/musicians");
        expect(response.body).toContainEqual(
            expect.objectContaining({
                id: 1,
                name: 'Mick Jagger',
                instrument: 'Voice'
            })
        );
    });
});

describe("GET /musicians/:id", () => {
    it("returns correct data", async () => {
        const response = await request(app).get("/musicians/1");
        expect(response.body).toEqual(
            expect.objectContaining({
                id: 1,
                name: 'Mick Jagger',
                instrument: 'Voice'
            })
        );
    });
});

describe("POST /musicians", () => {
    it("returns a larger musician array", async () => {
        const response = await request(app)
        .post("/musicians")
        .send({ name: "Taylor Swift", instrument: "Voice" });
        expect(response.body.length).toEqual(musicQuantity + 1);
    });
});

describe("PUT /musicians/:id", () => {
    it("should update first item in database", async () => {
        await request(app)
        .put("/musicians/1")
        .send({ name: "Adele", instrument: "Voice" });
        const musician = await Musician.findByPk(1);
        expect(musician.name).toEqual("Adele");
    });
});

describe("DELETE /musicians/:id", () => {
    it("should delete entry by id", async () => {
        await request(app).delete("/musicians/1");
        const musicians = await Musician.findAll();
        expect(musicians.length).toEqual(musicQuantity);
        expect(musicians[0].id).not.toEqual(1);
    });
});

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