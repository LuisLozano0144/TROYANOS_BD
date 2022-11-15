//const { connect } = require("../../app");
const connection = require("../conexion");
var reporte = {};
//Ingresar listo
//------------------------------------------------------------------------------------------
reporte.getReporte = function (id, dates, callback) {
  if (connection) {
    var sql = `SELECT Id_Produccion,
      Fecha_Produccion, 
      b.Nom1_Encargado as Primer_Nombre,
      b.Nom2_Encargado as Segundo_Nombre,
      b.Apell1_Encargado as Primero_Apellido,
      b.Apell2_Encargado as Segundo_Apellido,
      b.Sexo_Encargado as Sexo_Encargado,
      b.FechaNacimiento_Encargado as Fecha_Nacimiento,
      o.Nombre_Catalogo as Tipo_Documento,
      b.num_Doc_Encargado as Número_Documento,
      p.Nombre_Catalogo as Rol_Encargado,
      c.Nombre_Producto as Nombre_producto,
      c.Peso_Producto as Peso_Producto,
      c.Dimensiones_Producto as Dimensiones_producto,
      num_totalProduccion,
      num_Defectuosos_Produccion
      FROM th_produccion a
      JOIN tb_encargados b ON a.Id_Empleado_Produccion = b.Id_Encargado
      JOIN tb_productos c ON a.Id_Producto_Produccion = c.Id_Producto
      JOIN ct_catalogo p ON b.Rol_Encargado = p.Id_Catalogo
      JOIN ct_catalogo o ON b.Tip_Doc_Encargado = o.Id_Catalogo
      WHERE a.Fecha_Produccion BETWEEN ${connection.escape(dates.fecha_inicial)}
      AND ${connection.escape(
        dates.fecha_final
      )} && a.Id_Empleado_Produccion =${connection.escape(id)};`;

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

reporte.getReporteProducto = function (id, dates, callback) {
  if (connection) {
    var sql = `SELECT Id_Produccion,
      Fecha_Produccion, 
      b.Nom1_Encargado as Primer_Nombre,
      b.Nom2_Encargado as Segundo_Nombre,
      b.Apell1_Encargado as Primero_Apellido,
      b.Apell2_Encargado as Segundo_Apellido,
      b.Sexo_Encargado as Sexo_Encargado,
      b.FechaNacimiento_Encargado as Fecha_Nacimiento,
      o.Nombre_Catalogo as Tipo_Documento,
      b.num_Doc_Encargado as Número_Documento,
      p.Nombre_Catalogo as Rol_Encargado,
      c.Nombre_Producto as Nombre_producto,
      c.Peso_Producto as Peso_Producto,
      c.Dimensiones_Producto as Dimensiones_producto,
      num_totalProduccion,
      num_Defectuosos_Produccion
      FROM th_produccion a
      JOIN tb_encargados b ON a.Id_Empleado_Produccion = b.Id_Encargado
      JOIN tb_productos c ON a.Id_Producto_Produccion = c.Id_Producto
      JOIN ct_catalogo p ON b.Rol_Encargado = p.Id_Catalogo
      JOIN ct_catalogo o ON b.Tip_Doc_Encargado = o.Id_Catalogo
      WHERE a.Fecha_Produccion BETWEEN ${connection.escape(dates.fecha_inicial)}
      AND ${connection.escape(
        dates.fecha_final
      )} && a.Id_Producto_Produccion =${connection.escape(id)};`;

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
module.exports = reporte;
