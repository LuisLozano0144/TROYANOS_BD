//const { connect } = require("../../app");
const connection = require("../conexion");

var TipDocModel = {};

TipDocModel.getTiposDocs = function (callback) {
  if (connection) {
    var sql =
      "SELECT `id_tip_doc`," +
      "`tipo_documento`," +
      "`iniciales_tip_doc`" +
      " FROM `ct_tipos_documentos`" +
      "ORDER BY`tipo_documento`";

    connection.query(sql, function (error, rows) {
      if (error) {
        throw error;
      } else {
        //devuelve las fulas como un Json
        callback(null, rows);
        //convierte las filas Json a una cadena de texto para Angular
        //callback(null, JSON.stringify(rows));
      }
    });
  }
};

module.exports = TipDocModel;

//--------------------------------------------------
//Obtenemos un tipo doc para su id

TipDocModel.getTipDoc = function (id, callback) {
  if (connection) {
    var sql =
      "SELECT id_tip_doc," +
      "tipo_documento," +
      "iniciales_tip_doc" +
      " FROM ct_tipos_documentos" +
      " WHERE id_tip_doc = " +
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
//-----------------------------------------------------------
//insertar datos 
TipDocModel.insertTipDoc = function(TipDocData, callback){
  if(connection){
    var sql = " INSERT INTO ct_tipos_documentos SET ?";
    
    connection.query(sql, TipDocData, function (error, result){
      if(error){
        throw error;

      }else{
        callback(null, {"msg": "Registro insertado"});
      }
    });
  }
};
//------------------------------------------------------------------------------
//Actualizar tipo documento
TipDocModel.updateTipDoc = function (TipDocData, callback) {
  if (connection) {
    var sql = "UPDATE ct_tipos_documentos SET tipo_documento = " 
      + connection.escape(TipDocData.tipo_documento)
      + ", iniciales_tip_doc = " +
      connection.escape(TipDocData.iniciales_tip_doc)
      + " WHERE id_tip_doc = " +
      connection.escape(TipDocData.id_tip_doc) + ";";

    connection.query(sql, function (error, result) {
      if (error) {
        throw error;
      } else {
        callback(null, { "msg": "Registro Actualizado" });
      }
    });
  }
};
