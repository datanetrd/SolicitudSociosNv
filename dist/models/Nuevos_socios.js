"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireWildcard(require("sequelize"));

var _dbconfig = require("../config/dbconfig");

var _moment = _interopRequireDefault(require("moment"));

var _Data_register = _interopRequireDefault(require("./Data_register"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const nuevoSocios = _dbconfig.sequelize.define('nuevos_socios', {
  id: {
    type: _sequelize.default.INTEGER,
    primaryKey: true
  },
  nombre: {
    type: _sequelize.default.TEXT
  },
  apellido: {
    type: _sequelize.default.TEXT
  },
  cedula: {
    type: _sequelize.default.TEXT
  },
  fecha_solicitud: {
    type: _sequelize.DataTypes.DATE,

    //note here this is the guy that you are looking for                   
    get() {
      return (0, _moment.default)(this.getDataValue('fecha_solicitud')).format('DD/MM/YYYY h:mm: A');
    }

  },
  estado_solicitud: {
    type: _sequelize.default.TEXT
  },
  sucursal: {
    type: _sequelize.default.TEXT
  }
}, {
  timestamps: false,
  createdAt: false
});

nuevoSocios.hasMany(_Data_register.default, {
  foreingKey: 'socio_ID',
  sourceKey: 'id'
});

_Data_register.default.belongsTo(nuevoSocios, {
  foreingKey: 'socio_ID',
  sourceKey: 'id'
});

nuevoSocios.removeAttribute('nuevosSocioId');
var _default = nuevoSocios;
exports.default = _default;