const express = require("express");
const router = express.Router();

var TipEncargadosModel = require("../modelos/tb_encargadosModel");

module.exports = function () {
    router.get("/", function (req, res) {
      TipEncargadosModel.getTiposEncargados(function (error, data) {
        res.status(200).json(data);
      });
    });
    
    router.get("/:id", function (req, res) {
      var id = req.params.id;
    
      //Solo actualizamos si la id es un numero
      if (!isNaN(id)) {
        TipEncargadosModel.getTipEncargados(id, function (error, data) {
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

//-------------------------------------------------------------------------------------------
  //muestra y captura los datos del metodo CRUL crear, usando el verbo POST
  
  router.post("/", function (req, res) {
    var TipoEncargadosData={
      
        id_Encargado: req.body.id_Encargado,
        Nom1_Encargado: req.body.Nom1_Encargado,
        Nom2_Encargado: req.body. Nom2_Encargado,
        Apell1_Encargado: req.body. Apell1_Encargado,
        Apell2_Encargado: req.body. Apell2_Encargado,
        Sexo_Encargado: req.body. Sexo_Encargado,
        FechaNacimiento_Encargado: req.body. FechaNacimiento_Encargado,
        Tip_Doc_Encargado: req.body. Tip_Doc_Encargado,
        num_Doc_Encargado: req.body. num_Doc_Encargado,
        Rol_Encargado: req.body. Rol_Encargado,  
    };
     //usamos funcion para insertar
     TipEncargadosModel.insertTipoEncargados(TipoEncargadosData  ,function (error, data) {
    
      // se muestran los mensajes correspondientes
      if (data) {
        res.status(200).json(data);
      } else
       {
        res.status(500).send({ error: "boo:(" });
      }
    });
  });


//-----------------------------------------------------------------------------------------------
// //Actualizar
router.put("/", function(req, res)
{
var TipoEncargadosData={
  id_Encargado: req.body.id_Encargado,
  Nom1_Encargado: req.body.Nom1_Encargado,
  Nom2_Encargado: req.body. Nom2_Encargado,
  Apell1_Encargado: req.body. Apell1_Encargado,
  Apell2_Encargado: req.body. Apell2_Encargado,
  Sexo_Encargado: req.body. Sexo_Encargado,
  FechaNacimiento_Encargado: req.body. FechaNacimiento_Encargado,
  Tip_Doc_Encargado: req.body. Tip_Doc_Encargado,
  num_Doc_Encargado: req.body. num_Doc_Encargado,
  Rol_Encargado: req.body. Rol_Encargado,  
};

TipEncargadosModel.updateTipEncargados(TipoEncargadosData, function(error, data) {
  if(data && data.msg) {
    res.status(200).json(data);
   } else{
    res.status(500).send({ error: "boo :("});
  }
});

});
return router;
}
