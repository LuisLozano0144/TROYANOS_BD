const express = require("express");
const router = express.Router();

var reporte = require("../modelos/reporteModel");

module.exports = function () {
    router.get("/", function (req, res) {
        var dates ={
            fecha_inicial: req.body.fecha_inicial,
            fecha_final: req.body.fecha_final,
        }
      reporte.getReporte(dates, function (error, data) {
        res.status(200).json(data);
      });
    });
    return router;
}