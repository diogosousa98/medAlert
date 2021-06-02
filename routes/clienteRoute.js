var express = require("express");
var router = express.Router();
const Cliente = require("../models/clienteModels");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  let clientes = await Cliente.select();
  res.send(clientes);
});

router.get('/login/:cliente', async function (req, res, next) {
  let cliente = req.params.cliente;
  let existe = await Cliente.getByName(cliente);
  if (existe.length != 0) res.send(existe[0]);
  else res.send(false);
});

module.exports = router;