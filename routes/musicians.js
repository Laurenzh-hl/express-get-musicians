const { Router } = require("express");
const Musician = require("../models/Musician");
const router = Router();

router.get("/", async function(req, res) {
    const musicians = await Musician.findAll();
    res.json(musicians);
})

router.get("/:id", async function(req, res) {
    const musician = await Musician.findByPk(req.params.id);
    res.json(musician);
})

router.post("/", async function(req, res) {
    const musician = await Musician.create(req.body);
    const musicians = await Musician.findAll();
    res.json(musicians);
})

router.put("/:id", async function(req, res) {
    const updatedMusic = await Musician.update(req.body, {where: {id: req.params.id}});
    res.json(updatedMusic);
})

router.delete("/:id", async function(req, res) {
    const deletedMusic = await Musician.destroy({where: {id: req.params.id}});
    res.json(deletedMusic);
})

module.exports = router;