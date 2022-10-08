const express = require("express");
const router = express.Router();

var TipConctModel = require("../modelos/TipConctModel");

module.exports = function () {
    router.get("/", function (req, res) {
      TipConctModel.getTipConct(function (error, data) {
        res.status(200).json(data);
      });
    });
    
  router.get("/:id", function (req, res) {
    var id = req.params.id;
  
    //Solo actualizamos si la id es un numero
    if (!isNaN(id)) {
      TipConctModel.getTiposConcts(id, function (error, data) {
        //Si el tipo de documento existe lo mostramos
        //en formato json
        if (typeof data !== "undefined" && data.length > 0) {
          res.status(200).json(data);
        }
        //En otro caso mostramos una respuesta conforme
        //no existe
        else {
          res.json(404, { msg: "Resgistro no Existe" });
        }
      });
    } //Si hay algun error
    else {
      res.status(500).json({ msg: "error" });
    }
  });
 //------------------------------------
 //muestra y captura los datos del metodo CRUL crear, usando el verbo POST
  
 
  router.post("/", function (req, res) {
    var TipoContactoData = {
      Id_Contactos: null,
      Dato_Contacto: req.body.Dato_Contacto,
      Encargado_Contacto: req.body.Encargado_Contacto,
      Tipo_Contacto: req.body.Tipo_Contacto
    };
     //usamos funcion para insertar
     TipConctModel.insertTipoContacto(TipoContactoData  ,function (error, data) {
    
      // se muestran los mensajes correspondientes
      if (data) {
        res.status(200).json(data);
      } else
       {
        res.status(500).send({ error: "boo:(" });
      }
    });
  });
  return router;
  
  }
 