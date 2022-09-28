//const { connect } = require("../../app");
const connection = require("../conexion");

var TipConctModel = {};

TipConctModel.getTipConct = function (callback) {
  if (connection) {
    var sql =
      " SELECT `id_contactos`,"+
      "`dato_contacto`,"+
      "`encargado_contacto`,"+
      "`tipo_contacto`"+
      " FROM `am_contactos`"+
      " ORDER BY `tipo_contacto`";

    connection.query(sql, function (error, rows) {
      if (error) {
        throw error;
      } else {
        //devuelve las filas como un Json
        callback(null, rows);
        //convierte las filas Json a una cadena de texto para Angular
        //callback(null, JSON.stringify(rows));
      }
    });
  }
};
//insertar datos 
TipConctModel.insertTipoContacto = function(TipoContactoData, callback){
  if(connection){
    var sql = " INSERT INTO am_contactos SET ?";
    
    connection.query(sql, TipoContactoData, function (error, result){
      if(error){
        throw error;

      }else{
        callback(null, {"msg": "Registro insertado"});
      }
    });
  }
};


  module.exports = TipConctModel;
