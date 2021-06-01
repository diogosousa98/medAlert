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

router.post("/", async function (req, res, next) {
  try {
    let clientes = await Cliente.create(req.body);
    res.send(clientes);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/:id", async function (req, res, next) {
  console.log(req.body);
  let cliente = await Cliente.update(req.params.id, req.body);
  res.send(cliente);
});

router.delete("/:id", async function (req, res, next) {
  let cliente = await Cliente.delete(req.params.id);
  res.send({ rowsAffected: cliente });
});

module.exports = router;