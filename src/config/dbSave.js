import { async } from "regenerator-runtime";
import DataRegister from '../models/Data_register';
import nuevoSocios from '../models/Nuevos_socios';
const save = async function(req,res) {
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
        let dataName = await nuevoSocios.create({
  
          nombre,
          apellido,
          cedula,
          sucursal
        });
  
        let data = await DataRegister.create({
  
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
        return
      };
}

    module.exports = {save};