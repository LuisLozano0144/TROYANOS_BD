const express = require("express");
const router = express.Router();

var TipDocModel = require("../modelos/TipDocModel");

module.exports = function () {
  router.get("/", function (req, res) {
    TipDocModel.getTiposDocs(function (error, data) {
      res.status(200).json(data);
    });
  });

  router.get("/:id", function (req, res) {
    var id = req.params.id;
  
    //Solo actualizamos si la id es un numero
    if (!isNaN(id)) {
      TipDocModel.getTipDoc(id, function (error, data) {
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
    var TipDocData = {
      id_tip_doc: null,
      tipo_documento: req.body.tipo_documento,
      iniciales_tip_doc: req.body.iniciales_tip_doc
    };
  
    //usamos funcion para insertar
    TipDocModel.insertTipDoc(TipDocData, function (error, data) {
      console.log(
        " 44 tipo doc " +
          TipDocData.tipo_documento +
          " ini " +
          TipDocData.iniciales_tip_doc
      );
      // se muestran los mensajes correspondientes
      if (data) {
        res.status(200).json(data);
      } else
       {
        res.status(500).send({ error: "boo:(" });
      }
    });
  });
  //-----------------------------
//actualizar documento 

router.put("/", function(req, res)
{
  var TipDocData={
    id_tip_doc: req.body.id_tip_doc,
    tipo_documento: req.body.tipo_documento,
    iniciales_tip_doc: req.body.iniciales_tip_doc,
  };

  TipDocModel.updateTipDoc(TipDocData, function(error, data) {
    if(data && data.msg) {
      res.status(200).json(data);
     } else{
      res.status(500).send({ error: "boo :("});
    }
  });
  
});

  return router;
};
//----------------------------------------------------------------------


