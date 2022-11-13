//const { connect } = require("../../app");
const connection = require("../conexion");

var TipProductosModel = {};

TipProductosModel.getTiposProductos = function (callback) {
  if (connection) {
    var sql =
      " SELECT Id_Producto, Nombre_Producto, Peso_Producto, Dimensiones_Producto ,e.Nombre_Catalogo as Nombre_Catalogo, t.Nombre_Catalogo as Tipo_Catalogo FROM tb_productos a JOIN ct_catalogo e ON a.Tipo_Producto = e.Id_Catalogo JOIN ct_catalogo t ON t.Id_Catalogo = a.Estilo_Producto ";
    connection.query(sql, function (error, rows) {
      if (error) {
        throw error;
      } else {
        //devuelve las filas como un Json
        callback(null, rows);
      }
    });
  }
};
//Obtenemos un tipo producto para su id

TipProductosModel.getTipProducto = function (id, callback) {
  if (connection) {
    //var sql =" SELECT * from tb_productos where Id_Producto = "+
    var sql =
      " SELECT Id_Producto, Nombre_Producto, Peso_Producto, Dimensiones_Producto ,e.Nombre_Catalogo as Nombre_Catalogo, t.Nombre_Catalogo as Tipo_Catalogo FROM tb_productos a JOIN ct_catalogo e ON a.Tipo_Producto = e.Id_Catalogo JOIN ct_catalogo t ON t.Id_Catalogo = a.Estilo_Producto  WHERE Id_Producto = " +
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
    });
  }
};
//insertar datos
TipProductosModel.insertTipoProducto = function (TipoProductoData, callback) {
  if (connection) {
    var sql = " INSERT INTO tb_productos SET ?";

    connection.query(sql, TipoProductoData, function (error, result) {
      if (error) {
        throw error;
      } else {
        callback(null, { msg: "Registro insertado" });
      }
    });
  }
};
//Actualizar producto
TipProductosModel.updateTipProducto = function (TipoProductoData, callback) {
  if (connection) {
    var sql =
      "UPDATE tb_productos SET Nombre_Producto = " +
      connection.escape(TipoProductoData.Nombre_Producto) +
      ", Tipo_producto = " +
      +connection.escape(TipoProductoData.Tipo_producto) +
      ", Peso_Producto = " +
      +connection.escape(TipoProductoData.Peso_Producto) +
      ", Dimensiones_Producto = " +
      +connection.escape(TipoProductoData.Dimensiones_Producto) +
      ", Estilo_Producto = " +
      connection.escape(TipoProductoData.Estilo_Producto) +
      " WHERE Id_Producto = " +
      connection.escape(TipoProductoData.Id_Producto) +
      ";";

    connection.query(sql, function (error, result) {
      if (error) {
        throw error;
      } else {
        callback(null, { msg: "Registro Actualizado" });
      }
    });
  }
};
module.exports = TipProductosModel;
