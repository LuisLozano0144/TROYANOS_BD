var express = require("express"); //guarda express que nosotros intalamos

var bodyParser = require("body-parser"),
  port = 3000; //rmanejo de cuerpo de la "pagina" y puerto

var http = require("http"); //protocolo de intercambio de archivos

var path = require("path"); //direccion

//var conectado = require('./src/conexion/index');

var tipdoc = require("./src/rutas/TipDocRutas"); //ruta Documento
var TipConct = require("./src/rutas/TipoContcRutas"); //ruta Tipo contacto 
var TipCatalogo = require("./src/rutas/TipCatalogoRutas"); //ruta Tipo Catalogo 
var TipEncargados = require("./src/rutas/TipEncargadosRutas");//ruta Tipo Encargado
var TipProduccion = require("./src/rutas/TipProduccionRutas");//ruta Tipo Produccion
var TipProducto = require("./src/rutas/TipProducRutas");//ruta Tipo Producto
var Tipmaterialesproductos = require("./src/rutas/TipMaterialesProductoRuta");//ruta Tipo materialesproducto
var TipMateriales = require ("./src/rutas/TipMaterialesRutas");
var reporte = require("./src/rutas/reporteRuta");


var app = express(); //recibe un constructor

// todos los entornos

app.set("port", process.env.PORT || port); //metodo para recibir puerto y proceso

app.use(bodyParser.json({ type: "application/json", limit: "10mb" })); //recibe un cuerpo y un objeto json

app.use(bodyParser.urlencoded({ extended: false })); //recibe url codificada

app.use(express.static(path.join(__dirname, "public"))); //recibe direccion

//================================================================

app.use(function (req, res, next) {
  // Stio web al que desea permitir que se conecte

  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");

  // A que métodos que desea dar permisos

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // A que encabezados se les va a dar permiso

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  //Establezca en verdadero si necesita que el sitio web incluya cookies en las solicitudes enviadas

  //a la API (por ejemplo, en caso de que use sesiones)

  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pase a la siguiente capa de middleware

  next();
});

//============================================================

app.use("/tipdoc", tipdoc()); //ruta para el servicio
app.use("/TipConct", TipConct()); //ruta para el servicio
app.use("/TipCatalogo", TipCatalogo()); //ruta para el servicio
app.use("/TipEncargados",TipEncargados());//ruta para el servicio
app.use("/TipProduccion",TipProduccion());//ruta para el servicio
app.use("/TipProducto",TipProducto());//ruta para el servicio
app.use("/Tipmaterialesproductos",Tipmaterialesproductos());//ruta para el servicio
app.use("/TipMateriales", TipMateriales());
app.use("/reporte", reporte());



http.createServer(app).listen(app.get("port"), function () {
  console.log("Servidor Express escuchando por el puerto " + app.get("port"));
});

module.exports = app;
