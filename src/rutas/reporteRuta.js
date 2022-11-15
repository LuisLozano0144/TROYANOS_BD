const express = require("express");
const router = express.Router();

var reporte = require("../modelos/reporteModel");

module.exports = function () {
  router.get("/personas/:fechaini/:fechafin/:id", function (req, res) {
    var dates = {
      fecha_inicial: req.params.fechaini,
      fecha_final: req.params.fechafin,
    };
    const id = req.params.id;
    reporte.getReporte(id, dates, function (error, data) {
      res.status(200).json(data);
    });
  });

  router.get("/productos/:fechaini/:fechafin/:id", function (req, res) {
    var dates = {
      fecha_inicial: req.params.fechaini,
      fecha_final: req.params.fechafin,
    };
    const id = req.params.id;
    reporte.getReporteProducto(id, dates, function (error, data) {
      res.status(200).json(data);
    });
  });
  return router;
};
