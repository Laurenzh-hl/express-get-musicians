const express = require("express");
const app = express();
const { Musician } = require("../models/index");
const { Band } = require("../models/index");
const { db } = require("../db/connection");
const router = require("../routes/musicians.js");

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use("/musicians", router);

// app.get("/musicians", async function(req, res) {
//     const musicians = await Musician.findAll();
//     res.json(musicians);
// })

// // app.get("/musicians/1", async function(req, res) {
// //     const music1 = await Musician.findByPk(1);
// //     res.json(music1)
// // })

// // app.get("/musicians/2", async function(req, res) {
// //     const music1 = await Musician.findByPk(2);
// //     res.json(music1)
// // })

// // app.get("/musicians/3", async function(req, res) {
// //     const music1 = await Musician.findByPk(3);
// //     res.json(music1)
// // })

// app.get("/musicians/:id", async function(req, res) {
//     const musician = await Musician.findByPk(req.params.id);
//     res.json(musician);
// })

// app.post("/musicians", async function(req, res) {
//     const musician = await Musician.create(req.body);
//     res.json(musician);
// })

// app.put("/musicians/:id", async function(req, res) {
//     const updatedMusic = await Musician.update(req.body, {where: {id: req.params.id}});
//     res.json(updatedMusic);
// })

// app.delete("/musicians/:id", async function(req, res) {
//     const deletedMusic = await Musician.destroy({where: {id: req.params.id}});
//     res.json(deletedMusic);
// })

app.get("/bands", async function(req, res) {
    const bands = await Band.findAll();
    res.json(bands);
})


module.exports = app;