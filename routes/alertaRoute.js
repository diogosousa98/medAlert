var express = require("express");
var router = express.Router();
const Alerta = require("../models/alertaModels");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  let alertas = await Alerta.select();
  res.send(alertas);
});

router.get("/getById/:alertas", async function (req, res, next) {
  let alertas = await Alerta.getById(req.params.alertas);
  res.send(alertas);
});
router.get("/getByIdMenu/:alertasMenu", async function (req, res, next) {
  let alertas = await Alerta.getByIdMenu(req.params.alertasMenu);
  res.send(alertas);
});

router.post("/", async function (req, res, next) {
  try {
    console.log(req.body.dataA)
    let alertas = await Alerta.create(req.body);
    res.send(alertas);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/alterarEstado/:id", async function (req, res, next) {
  try {
    let result = await Alerta.alterarEstado(req.params.id);
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;