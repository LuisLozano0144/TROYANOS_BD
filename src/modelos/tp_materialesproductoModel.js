//const { connect } = require("../../app");
const connection = require("../conexion");

var TipMaterialesProductoModel= {};
//Ingresar listo
//------------------------------------------------------------------------------------------
TipMaterialesProductoModel.getTipmaterialesproductos = function (callback) {
  if (connection) {
    var sql =
      "SELECT Id_MaterialProducto,"+
      " IProducto_MaterialProducto," +
      " IMaterial_MaterialProducto," +
      " cantidad_MaterialProducto"+
      " FROM tp_materiales_productos";
      //" ORDER BY Tipo_materialesproductos";

    connection.query(sql, function (error, rows) {
      if (error) {
        throw error;
      } else {
        //devuelve las filas como un Json
        callback(null, rows)
      }
    });
  }
};

//---------------------------------------------------------------------------------------------------
//Obtenemos un tipo doc para su ID
TipMaterialesProductoModel.getTipoMaterialesProducto = function (id, callback) {
  if (connection) {
    var sql =
    "SELECT Id_MaterialProducto,"+
      " IProducto_MaterialProducto," +
      " IMaterial_MaterialProducto," +
      " cantidad_MaterialProducto"+
      " FROM tp_materiales_productos"+
      " WHERE Id_MaterialProducto = "+
      connection.escape(id) +
      ";";

    //console.log("Estamos aca de 14 " + id);

    connection.query(sql, function (error, rows) {
      //Se muestra el mensaje correspondiente
      if (error) {
        throw error;
      } else {
        callback(null, rows);
      }
    })
  }
};
// //---------------------------------------------------------------------------------------------------------
// //insertar datos listo
TipMaterialesProductoModel.insertTipomaterialesproductos= function(TipomaterialesproductosData, callback){
  if(connection){
    var sql = "INSERT INTO tp_materiales_productos SET ?";
    
    connection.query(sql, TipomaterialesproductosData, function (error, result){
      if(error){
        throw error;

      }else{
        callback(null, {"msg": "Registro insertado"});
      }
    });
  }
};
//----------------------------------------------------------------------------------------------------------
//Actualizar tipo documento
TipMaterialesProductoModel.updateTipomaterialesproductos = function (TipomaterialesproductosData, callback) {
  if (connection) {
    var sql = 
      "UPDATE tp_materiales_productos SET IProducto_MaterialProducto = " 
      + connection.escape(TipomaterialesproductosData.IProducto_MaterialProducto)
      + ", IMaterial_MaterialProducto = " +
      connection.escape(TipomaterialesproductosData.IMaterial_MaterialProducto)
      + ",cantidad_MaterialProducto = "+
      connection.escape(TipomaterialesproductosData.cantidad_MaterialProducto)
      + " WHERE Id_MaterialProducto	 = " +
      connection.escape(TipomaterialesproductosData.Id_MaterialProducto	) + ";";

    connection.query(sql, function (error, result) {
      if (error) {
        throw error;
      } else {
        callback(null, { "msg": "Registro Actualizado" });
      }
    });
  }
};
module.exports = TipMaterialesProductoModel;