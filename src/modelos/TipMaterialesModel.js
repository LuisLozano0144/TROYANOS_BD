//const { connect } = require("../../app");
const connection = require("../conexion");

var TipMaterialModel = {};

TipMaterialModel.getTiposMateriales = function (callback) {
  if (connection) {
    var sql =
    `SELECT
    id_material,
    nombre_material,
    proveedor_material,
    tel_proveedor_material,
    a.Nombre_Catalogo as Tipo_Material,
    c.Tipo_Catalogo as Uso_Material
    FROM
         tb_materiales b
    JOIN ct_catalogo a ON b.uso_material = a.id_catalogo
    JOIN ct_catalogo c ON b.Tipo_Material = c.id_catalogo;`

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

//Obtenemos un material para su id

TipMaterialModel.getTipMaterial = function (id, callback) {
  if (connection) {
    var sql =
    `SELECT
    id_material,
    nombre_material,
    proveedor_material,
    tel_proveedor_material,
    a.Nombre_Catalogo as Tipo_Material,
    c.Tipo_Catalogo as Uso_Material
    FROM
         tb_materiales b
    JOIN ct_catalogo a ON b.uso_material = a.id_catalogo
    JOIN ct_catalogo c ON b.Tipo_Material = c.id_catalogo
    WHERE id_material = ${ connection.escape(id)}`

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
TipMaterialModel.insertTipoMaterial = function(TipoMaterialData, callback){
  if(connection){
    var sql = " INSERT INTO tb_materiales SET ?";
    
    connection.query(sql, TipoMaterialData, function (error, result){
      if(error){
        throw error;

      }else{
        callback(null, {"msg": "Registro insertado"});
      }
    });
  }
};
//Actualizar tipo material
TipMaterialModel.updateTipMaterial = function (TipoMaterialData, callback) {
  if (connection) {
    var sql = "UPDATE tb_materiales SET Nombre_Material = " 
      + connection.escape(TipoMaterialData.Nombre_Material)
      + ", Proveedor_Material = " +
      connection.escape(TipoMaterialData.Proveedor_Material)
      + ", tel_Proveedor_Material = " +
      + connection.escape(TipoMaterialData.tel_Proveedor_Material)
      + ", Uso_Material = " +
      + connection.escape(TipoMaterialData.Uso_Material)
      + ", Tipo_Material = " +
      + connection.escape(TipoMaterialData.Tipo_Material)
      + " WHERE Id_Material = " +
      connection.escape(TipoMaterialData.Id_Material) + ";";

    connection.query(sql, function (error, result) {
      if (error) {
        throw error;
      } else {
        callback(null, { "msg": "Registro Actualizado" });
      }
    });
  }
};
module.exports = TipMaterialModel;