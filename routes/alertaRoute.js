var express = require("express");
var router = express.Router();
const Alerta = require("../models/alertaModels");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  let alertas = await Alerta.select();
  res.send(alertas);
});




router.post("/", async function (req, res, next) {
  try {
    let alertas = await Alerta.create(req.body);
    res.send(alertas);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/:id", async function (req, res, next) {
  console.log(req.body);
  let alerta = await Alerta.update(req.params.id, req.body);
  res.send(alerta);
});

router.delete("/:id", async function (req, res, next) {
  let alerta = await Alerta.delete(req.params.id);
  res.send({ rowsAffected: alerta });
});

module.exports = router;
