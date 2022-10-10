//const { connect } = require("../../app");
const connection = require("../conexion");

var TipEncargadosModel = {};
//Ingresar listo
//------------------------------------------------------------------------------------------
TipEncargadosModel.getTiposEncargados = function (callback) {
  if (connection) {
    var sql =
      // "SELECT id_Encargado,"+
      // " Nom1_Encargado," +
      // " Nom2_Encargado," +
      // " Apell1_Encargado,"+
      // " Apell2_Encargado,"+
      // " Sexo_Encargado," +
      // " FechaNacimiento_Encargado,"+
      // " Tip_Doc_Encargado,"+
      // " num_Doc_Encargado,"+
      // " Rol_Encargado "+
      // " FROM tb_encargados";
      //" ORDER BY Tipo_Encargados";

      `SELECT
         Id_Encargado,
         Nom1_Encargado,
         Nom2_Encargado,
         Apell1_Encargado,
         Apell2_Encargado,
         Sexo_Encargado,
         FechaNacimiento_Encargado,
         b.Nombre_Catalogo as Documento_encargado,
         num_Doc_Encargado,
         c.Nombre_Catalogo as Rol_Encargado 
         FROM tb_encargados a
         JOIN ct_catalogo b ON a.Tip_Doc_Encargado = b.id_catalogo
         JOIN ct_catalogo c ON a.Rol_Encargado = c.id_catalogo;`

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
TipEncargadosModel.getTipEncargados = function (id, callback) {
  if (connection) {
    var sql =
    // "SELECT id_Encargado,"+
    // " Nom1_Encargado," +
    // " Nom2_Encargado," +
    // " Apell1_Encargado,"+
    // " Apell2_Encargado,"+
    // " Sexo_Encargado," +
    // " FechaNacimiento_Encargado,"+
    // " Tip_Doc_Encargado,"+
    // " num_Doc_Encargado,"+
    // " Rol_Encargado "+
    // " FROM tb_encargados"+
    // " WHERE id_Encargado = "+
    //   connection.escape(id) +
    //   ";";
    `SELECT
         Id_Encargado,
         Nom1_Encargado,
         Nom2_Encargado,
         Apell1_Encargado,
         Apell2_Encargado,
         Sexo_Encargado,
         FechaNacimiento_Encargado,
         b.Nombre_Catalogo as Documento_encargado,
         num_Doc_Encargado,
         c.Nombre_Catalogo as Rol_Encargado 
         FROM tb_encargados a
         JOIN ct_catalogo b ON a.Tip_Doc_Encargado = b.id_catalogo
         JOIN ct_catalogo c ON a.Rol_Encargado = c.id_catalogo
         WHERE Id_Encargado = ${ connection.escape(id)};`

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
//---------------------------------------------------------------------------------------------------------
//insertar datos listo
TipEncargadosModel.insertTipoEncargados= function(TipoEncargadosData, callback){
    if(connection){
      var sql = " INSERT INTO tb_encargados SET ?";
      
      connection.query(sql, TipoEncargadosData, function (error, result){
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
  TipEncargadosModel.updateTipEncargados = function (TipoEncargadosData, callback) {
    if (connection) {
      var sql = 
        "UPDATE tb_encargados SET Nom1_Encargado = " 
        + connection.escape(TipoEncargadosData.Nom1_Encargado)
        + ", Nom2_Encargado = " +
        connection.escape(TipoEncargadosData.Nom2_Encargado)
        + ",Apell1_Encargado = "+
        connection.escape(TipoEncargadosData.Apell1_Encargado)
        + ",Apell2_Encargado = "+
        connection.escape(TipoEncargadosData.Apell2_Encargado)
        + ",Sexo_Encargado = "+
        connection.escape(TipoEncargadosData.Sexo_Encargado)
        + ",FechaNacimiento_Encargado = "+
        connection.escape(TipoEncargadosData.FechaNacimiento_Encargado)
        + ",Tip_Doc_Encargado = "+
        connection.escape(TipoEncargadosData.Tip_Doc_Encargado)
        + ",num_Doc_Encargado = "+
        connection.escape(TipoEncargadosData.num_Doc_Encargado)
        + ",Rol_Encargado = "+
        connection.escape(TipoEncargadosData.Rol_Encargado)
        + " WHERE id_Encargado = " +
        connection.escape(TipoEncargadosData.id_Encargado) + ";";
  
      connection.query(sql, function (error, result) {
        if (error) {
          throw error;
        } else {
          callback(null, { "msg": "Registro Actualizado" });
        }
      });
    }
  };
module.exports = TipEncargadosModel;