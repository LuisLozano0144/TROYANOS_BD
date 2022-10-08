//const { connect } = require("../../app");
const connection = require("../conexion");
var reporte = {};
//Ingresar listo
//------------------------------------------------------------------------------------------
reporte.getReporte = function (dates, callback) {
    if (connection) {
      var sql =
      `SELECT Id_Produccion,
      Fecha_Produccion, 
      b.Nom1_Encargado as Nombre_Empleado,
      c.Nombre_Producto as Nombre_producto,
      num_totalProduccion,
      num_Defectuosos_Produccion
      FROM th_produccion a
      JOIN tb_encargados b ON a.Id_Empleado_Produccion = b.Id_Encargado
      JOIN tb_productos c ON a.Id_Producto_Produccion = c.Id_Producto
      WHERE a.Fecha_Produccion BETWEEN ${connection.escape(dates.fecha_inicial)}
      AND ${connection.escape(dates.fecha_final)};`
  
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
  module.exports = reporte;