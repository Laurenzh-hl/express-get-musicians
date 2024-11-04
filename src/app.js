const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { Band } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 

app.get("/musicians", async function(req, res) {
    const musicians = await Musician.findAll();
    res.json(musicians);
})

app.get("/musicians/1", async function(req, res) {
    const music1 = await Musician.findByPk(1);
    res.json(music1)
})

app.get("/musicians/2", async function(req, res) {
    const music1 = await Musician.findByPk(2);
    res.json(music1)
})

app.get("/musicians/3", async function(req, res) {
    const music1 = await Musician.findByPk(3);
    res.json(music1)
})

app.get("/bands", async function(req, res) {
    const bands = await Band.findAll();
    res.json(bands);
})


module.exports = app;