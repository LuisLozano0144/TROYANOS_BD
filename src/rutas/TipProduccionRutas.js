const express = require("express");
const router = express.Router();

var TipProduccionModel = require("../modelos/th_produccionModel");

module.exports = function () {
    router.get("/", function (req, res) {
      TipProduccionModel.getTiposProduccion(function (error, data) {
        res.status(200).json(data);
      });
    });
    
    router.get("/:id", function (req, res) {
      var id = req.params.id;
    
      //Solo actualizamos si la id es un numero
      if (!isNaN(id)) {
        TipProduccionModel.getTipProduccion(id, function (error, data) {
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
    var TipoProduccionData={

        Id_Produccion: req.body.Id_Produccion,
        Fecha_Produccion: req.body.Fecha_Produccion,
        Id_Empleado_Produccion: req.body. Id_Empleado_Produccion,
        num_totalProduccion: req.body. num_totalProduccion,
        Id_Producto_Produccion: req.body. Id_Producto_Produccion,
        num_Defectuosos_Produccion: req.body. num_Defectuosos_Produccion,
        
    };
     //usamos funcion para insertar
     TipProduccionModel.insertTipoProduccion(TipoProduccionData  ,function (error, data) {
    
      // se muestran los mensajes correspondientes
      if (data) {
        res.status(200).json(data);
      } else
       {
        res.status(500).send({ error: "boo:(" });
      }
    });
  });


// //-----------------------------------------------------------------------------------------------
// //Actualizar
router.put("/", function(req, res)
{
var TipoProduccionData={
  Id_Produccion: req.body.Id_Produccion,
  Fecha_Produccion: req.body.Fecha_Produccion,
  Id_Empleado_Produccion: req.body. Id_Empleado_Produccion,
  Id_Producto_Produccion: req.body. Id_Producto_Produccion,
  num_totalProduccion: req.body. num_totalProduccion,
  num_Defectuosos_Produccion: req.body. num_Defectuosos_Produccion, 
};

TipProduccionModel.updateTipProduccion(TipoProduccionData, function(error, data) {
  if(data && data.msg) {
    res.status(200).json(data);
   } else{
    res.status(500).send({ error: "boo :("});
  }
});

});
return router;
}
