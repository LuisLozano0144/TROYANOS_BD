const express = require("express");
const router = express.Router();

var TipProductosModel = require("../modelos/tb_productosModel");

module.exports = function () {
    router.get("/", function (req, res) {
        TipProductosModel.getTiposProductos(function (error, data) {
        res.status(200).json(data);
      });
    });
    //consultar por un id 
    router.get("/:id", function (req, res) {
      var id = req.params.id;
    if (!isNaN(id)) {
      TipProductosModel.getTipProducto(id, function (error, data) {
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
    var TipoProductoData = {
      Id_Producto: req.body.Id_Producto,
      Nombre_Producto: req.body.Nombre_Producto,
      Peso_Producto: req.body.Peso_Producto,
      Dimensiones_Producto: req.body.Dimensiones_Producto,
      Tipo_producto: req.body.Tipo_producto,
      Estilo_Producto: req.body.Estilo_Producto
    };

    
     //usamos funcion para insertar
     TipProductosModel.insertTipoProducto(TipoProductoData  ,function (error, data) {
    
      // se muestran los mensajes correspondientes
      if (data) {
        res.status(200).json(data);
      } else
       {
        res.status(500).send({ error: "boo:(" });
      }
    });
  });
  
  //actualizar producto 

router.put("/", function(req, res)
{
  var TipoProductoData = {
    Id_Producto: req.body.Id_Producto,
    Nombre_Producto: req.body.Nombre_Producto,
    Peso_Producto: req.body.Peso_Producto,
    Dimensiones_Producto: req.body.Dimensiones_Producto,
    Tipo_producto: req.body.Tipo_producto,
    Estilo_Producto: req.body.Estilo_Producto
  };

  TipProductosModel.updateTipProducto(TipoProductoData, function(error, data) {
    if(data && data.msg) {
      res.status(200).json(data);
     } else{
      res.status(500).send({ error: "boo :("});
    }
  });
  
});


    return router;
}
