const express = require("express");
const router = express.Router();

var TipCatalogoModel = require("../modelos/ct_catalogoModel");

module.exports = function () {
    router.get("/", function (req, res) {
      TipCatalogoModel.getTiposCatalogo(function (error, data) {
        res.status(200).json(data);
      });
    });
    
    router.get("/:id", function (req, res) {
      var id = req.params.id;
    
      //Solo actualizamos si la id es un numero
      if (!isNaN(id)) {
        TipCatalogoModel.getTipCatalogo(id, function (error, data) {
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
    var TipoCatalogoData = {
      Id_Catalogo: req.body.Id_Catalogo,
      Nombre_Catalogo: req.body.Nombre_Catalogo,
      Tipo_Catalogo: req.body.Tipo_Catalogo
    };
     //usamos funcion para insertar
     TipCatalogoModel.insertTipoCatalogo(TipoCatalogoData  ,function (error, data) {
    
      // se muestran los mensajes correspondientes
      if (data) {
        res.status(200).json(data);
      } else
       {
        res.status(500).send({ error: "boo:(" });
      }
    });
  });

  //actualizar documento 

router.put("/", function(req, res)
{
  var TipoCatalogoData={
    id_catalogo: req.body.id_catalogo,
    Tipo_Contacto: req.body.Tipo_Catalogo,
    Nombre_Catalogo: req.body.Nombre_Catalogo,
  };

  TipCatalogoModel.updateTipCatalogo(TipoCatalogoData, function(error, data) {
    if(data && data.msg) {
      res.status(200).json(data);
     } else{
      res.status(500).send({ error: "boo :("});
    }
  });
  
});

  return router;
  
  }
 