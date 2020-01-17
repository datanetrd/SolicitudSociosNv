"use strict";

var _regeneratorRuntime = require("regenerator-runtime");

var _Data_register = _interopRequireDefault(require("../models/Data_register"));

var _Nuevos_socios = _interopRequireDefault(require("../models/Nuevos_socios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const save = async function (req, res) {
  const {
    nombre,
    apellido,
    cedula,
    estadocivil,
    direccionresidencial,
    provincia,
    telefonos,
    celular,
    oficinatrabajo,
    direcciontrabajo,
    telefonotrabajo,
    fax,
    puesto,
    sueldo,
    fechaingresoempresa,
    email,
    ahorromensual,
    certificadoaportacion,
    valorcertificado,
    nombre2,
    apellido2,
    cedula2,
    sucursal
  } = req.body;

  try {
    let dataName = await _Nuevos_socios.default.create({
      nombre,
      apellido,
      cedula,
      sucursal
    });
    let data = await _Data_register.default.create({
      nombre,
      apellido,
      cedula,
      estadocivil,
      direccionresidencial,
      provincia,
      telefonos,
      celular,
      oficinatrabajo,
      direcciontrabajo,
      telefonotrabajo,
      fax,
      puesto,
      sueldo,
      fechaingresoempresa,
      email,
      ahorromensual,
      certificadoaportacion,
      valorcertificado,
      nombre2,
      apellido2,
      cedula2
    });

    if (data) {
      console.log('dataSave');
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Algo ha ido Mal',
      data: {}
    });
    return;
  }

  ;
};

module.exports = {
  save
};