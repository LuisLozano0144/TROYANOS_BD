const express = require("express");
const router = express.Router();

var TipMaterialesProductoModel = require("../modelos/tp_materialesproductoModel");

module.exports = function () {
    router.get("/", function (req, res) {
      TipMaterialesProductoModel.getTipmaterialesproductos(function (error, data) {
        res.status(200).json(data);
      });
    });
    
    router.get("/:id", function (req, res) {
      var id = req.params.id;
    
      //Solo actualizamos si la id es un numero
      if (!isNaN(id)) {
        TipMaterialesProductoModel.getTipoMaterialesProducto(id, function (error, data) {
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
    var TipomaterialesproductosData={
        IProducto_MaterialProducto: req.body.IProducto_MaterialProducto,
        IMaterial_MaterialProducto: req.body.IMaterial_MaterialProducto,
        cantidad_MaterialProducto: req.body.cantidad_MaterialProducto,
        
    };
     //usamos funcion para insertar
     TipMaterialesProductoModel.insertTipomaterialesproductos(TipomaterialesproductosData  ,function (error, data) {
    
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
var TipomaterialesproductosData={
  Id_MaterialProducto: req.body.Id_MaterialProducto,
  IProducto_MaterialProducto: req.body.IProducto_MaterialProducto,
  IMaterial_MaterialProducto: req.body. IMaterial_MaterialProducto,
  cantidad_MaterialProducto: req.body. cantidad_MaterialProducto,
  
};

TipMaterialesProductoModel.updateTipomaterialesproductos(TipomaterialesproductosData, function(error, data) {
  if(data && data.msg) {
    res.status(200).json(data);
   } else{
    res.status(500).send({ error: "boo :("});
  }
});

});
    return router;
}
