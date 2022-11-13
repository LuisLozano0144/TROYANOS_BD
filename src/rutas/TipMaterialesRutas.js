const express = require("express");
const router = express.Router();

var TipMaterialModel = require("../modelos/TipMaterialesModel");

module.exports = function () {
    router.get("/", function (req, res) {
        TipMaterialModel.getTiposMateriales(function (error, data) {
        res.status(200).json(data);
      });
    });
    //buscamos solo un id
    router.get("/:id", function (req, res) {
      var id = req.params.id;
    
      //Solo actualizamos si la id es un numero
      if (!isNaN(id)) {
        TipMaterialModel.getTipMaterial(id, function (error, data) {
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
    var TipoMaterialData = {
      Nombre_Material: req.body.Nombre_Material,
      Proveedor_Material: req.body.Proveedor_Material,
      tel_Proveedor_Material: req.body.tel_Proveedor_Material,
      Uso_Material: req.body.Uso_Material,
      Tipo_Material: req.body.Tipo_Material
    };
     //usamos funcion para insertar
     TipMaterialModel.insertTipoMaterial(TipoMaterialData  ,function (error, data) {
    
      // se muestran los mensajes correspondientes
      if (data) {
        res.status(200).json(data);
      } else
       {
        res.status(500).send({ error: "boo:(" });
      }
    });
  });
//actualizar material 

router.put("/", function(req, res)
{
  var TipoMaterialData={
    Id_Material: req.body.Id_Material,
    Nombre_Material: req.body.Nombre_Material,
    Proveedor_Material: req.body.Proveedor_Material,  
    tel_Proveedor_Material: req.body.tel_Proveedor_Material,
    Uso_Material: req.body.Uso_Material,
    Tipo_Material: req.body.Tipo_Material,
  };

  TipMaterialModel.updateTipMaterial(TipoMaterialData, function(error, data) {
    if(data && data.msg) {
      res.status(200).json(data);
     } else{
      res.status(500).send({ error: "boo :("});
    }
  });
  
});
    return router;
}
