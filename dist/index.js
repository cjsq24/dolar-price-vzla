"use strict";

require("@babel/polyfill");

var _http = _interopRequireDefault(require("http"));

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

require("dotenv/config");

var _routes = _interopRequireDefault(require("./modules/routes"));

var _dbConfig = _interopRequireDefault(require("./dbConfig"));

require("./modules/cronJob/cronJob");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//Para manejar las variables de entorno
var app = (0, _express["default"])();

var server = _http["default"].createServer(app); //middlewares
//Para mostrar en la consola las peticiones


app.use((0, _morgan["default"])('dev'));
app.use((0, _cors["default"])()); //Para que el servidor pueda recibir en formato json

app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use('/api', _routes["default"]);
app.use('/public', _express["default"]["static"](_path["default"].join(__dirname, './images')));
app.get('/', function (req, res) {
  res.send('Backend de dolar-price');
});
server.listen(process.env.PORT || 4000, function () {
  console.log("Server on port ".concat(process.env.PORT || 4000));
  (0, _dbConfig["default"])();
});