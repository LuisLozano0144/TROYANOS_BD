//const { connect } = require("../../app");
const connection = require("../conexion");

var TipConctModel = {};

TipConctModel.getTiposConct = function (callback) {
  if (connection) {
    var sql =
    `SELECT
    Id_Contactos,
    Dato_Contacto,
    b.Nom1_Encargado as Nombre_Contacto,
    b.Apell1_Encargado as Apellido_Encargado,
    e.Nombre_Catalogo as Tipo_Contacto
  FROM
         am_contactos a
    JOIN ct_catalogo e ON a.tipo_contacto = e.Id_Catalogo
    JOIN tb_encargados b ON a.Encargado_Contacto = b.Id_Encargado;`
  

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
//Obtenemos un tipo doc para su id

TipConctModel.getTipConct = function (id, callback) {
  if (connection) {
    var sql =
      `SELECT
      Id_Contactos,
      Dato_Contacto,
      b.Nombre_Catalogo as tipo_contacto,
      c.Nom1_Encargado as Nombre_Encargado,
      c.Apell1_Encargado as Apellido_Encargado
       FROM
      am_contactos a
       JOIN  ct_catalogo b ON a.Tipo_Contacto = b.Id_Catalogo 
       JOIN  tb_encargados c ON a.Encargado_Contacto = c.Id_Encargado 
       WHERE Id_Contactos = ${  connection.escape(id) };`

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
//Actualizar tipo contacto
TipConctModel.updateTipContacto = function (TipoContactoData, callback) {
  if (connection) {
    var sql = "UPDATE am_contactos SET Dato_Contacto = " 
      + connection.escape(TipoContactoData.Dato_Contacto)
      + ", Encargado_Contacto = " +
      connection.escape(TipoContactoData.Encargado_Contacto)
      + ", Tipo_Contacto = " +
      connection.escape(TipoContactoData.Tipo_Contacto)
      + " WHERE Id_Contactos = " +
      connection.escape(TipoContactoData.Id_Contactos) + ";";

    connection.query(sql, function (error, result) {
      if (error) {
        throw error;
      } else {
        callback(null, { "msg": "Registro Actualizado" });
      }
    });
  }
};

  module.exports = TipConctModel;
