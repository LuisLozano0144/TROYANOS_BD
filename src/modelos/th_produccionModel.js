//const { connect } = require("../../app");
const connection = require("../conexion");

var TipProduccionModel = {};
//Ingresar listo
//------------------------------------------------------------------------------------------
TipProduccionModel.getTiposProduccion = function (callback) {
  if (connection) {
    var sql =
      // "SELECT Id_Produccion,"+
      // " Fecha_Produccion," +
      // " Id_Empleado_Produccion," +
      // " Id_Producto_Produccion,"+
      // " num_totalProduccion,"+
      // " num_Defectuosos_Produccion"+
      // " FROM th_produccion";
      //" ORDER BY Tipo_produccion";

      `SELECT Id_Produccion,
      Fecha_Produccion, 
      b.Nom1_Encargado as Nombre_Empleado,
      c.Nombre_Producto as Nombre_producto,
      num_totalProduccion,
      num_Defectuosos_Produccion
      FROM th_produccion a
      JOIN tb_encargados b ON a.Id_Empleado_Produccion = b.Id_Encargado
      JOIN tb_productos c ON a.Id_Producto_Produccion = c.Id_Producto;`;

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
//---------------------------------------------------------------------------------------------------
//Obtenemos un tipo doc para su ID
TipProduccionModel.getTipProduccion = function (id, callback) {
  if (connection) {
    var sql = `SELECT Id_Produccion,
      Fecha_Produccion, 
      b.Nom1_Encargado as Nombre_Empleado,
      c.Nombre_Producto as Nombre_producto,
      num_totalProduccion,
      num_Defectuosos_Produccion
      FROM th_produccion a
      JOIN tb_encargados b ON a.Id_Empleado_Produccion = b.Id_Encargado
      JOIN tb_productos c ON a.Id_Producto_Produccion = c.Id_Producto
      WHERE Id_Produccion =${connection.escape(id)};`;

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
// //---------------------------------------------------------------------------------------------------------
// //insertar datos listo
TipProduccionModel.insertTipoProduccion = function (
  TipoProduccionData,
  callback
) {
  if (connection) {
    var sql = " INSERT INTO th_produccion SET ?";

    connection.query(sql, TipoProduccionData, function (error, result) {
      if (error) {
        throw error;
      } else {
        callback(null, { msg: "Registro insertado" });
      }
    });
  }
};
//----------------------------------------------------------------------------------------------------------
//Actualizar tipo documento
TipProduccionModel.updateTipProduccion = function (
  TipoProduccionData,
  callback
) {
  if (connection) {
    var sql =
      "UPDATE th_produccion SET Fecha_Produccion = " +
      connection.escape(TipoProduccionData.Fecha_Produccion) +
      ", Id_Empleado_Produccion = " +
      connection.escape(TipoProduccionData.Id_Empleado_Produccion) +
      ",Id_Producto_Produccion = " +
      connection.escape(TipoProduccionData.Id_Producto_Produccion) +
      ",num_totalProduccion = " +
      connection.escape(TipoProduccionData.num_totalProduccion) +
      ",num_Defectuosos_Produccion = " +
      connection.escape(TipoProduccionData.num_Defectuosos_Produccion) +
      " WHERE Id_Produccion = " +
      connection.escape(TipoProduccionData.Id_Produccion) +
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
module.exports = TipProduccionModel;
