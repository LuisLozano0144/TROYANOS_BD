//const { connect } = require("../../app");
const connection = require("../conexion");

var TipCatalogoModel = {};

TipCatalogoModel.getTiposCatalogo = function (callback) {
  if (connection) {
    var sql =
      "SELECT Id_Catalogo,"+
      " Nombre_Catalogo," +
      " Tipo_Catalogo" +
      " FROM ct_catalogo;";
      //" ORDER BY Tipo_Catalogo;";

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

//Obtenemos un tipo doc para su id

TipCatalogoModel.getTipCatalogo = function (id, callback) {
  if (connection) {
    var sql =
      " SELECT Id_Catalogo,"+
      " Nombre_Catalogo," +
      " Tipo_Catalogo" +
      " FROM ct_catalogo"+
      " WHERE Id_Catalogo = "+
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
//insertar datos 
TipCatalogoModel.insertTipoCatalogo = function(TipoCatalogoData, callback){
  if(connection){
    var sql = " INSERT INTO ct_catalogo SET ?";
    
    connection.query(sql, TipoCatalogoData, function (error, result){
      if(error){
        throw error;

      }else{
        callback(null, {"msg": "Registro insertado"});
      }
    });
  }
};
//Actualizar tipo documento
TipCatalogoModel.updateTipCatalogo = function (TipoCatalogoData, callback) {
  if (connection) {
    var sql = "UPDATE ct_catalogo SET Nombre_Catalogo = " 
      + connection.escape(TipoCatalogoData.Nombre_Catalogo)
      + ", Tipo_Catalogo = " +
      connection.escape(TipoCatalogoData.Tipo_Catalogo)
      + " WHERE Id_Catalogo = " +
      connection.escape(TipoCatalogoData.Id_Catalogo) + ";";

    connection.query(sql, function (error, result) {
      if (error) {
        throw error;
      } else {
        callback(null, { "msg": "Registro Actualizado" });
      }
    });
  }
};

//consultar catalogos 

TipCatalogoModel.getCatalogoSolo =function (tipo, callback){
  if (connection) {
    var sql = `SELECT Id_Catalogo,
    Nombre_Catalogo,
    FROM ct_catalogo
    WHERE Tipo_Catalogo=${connection.escape(tipo)};`

    connection.query(sql, function (error, rows) {
      if(error) {
        throw error;
      } else {
        callback(rows);
      }
    })
  }
};

  module.exports = TipCatalogoModel;
