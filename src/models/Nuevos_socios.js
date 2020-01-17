import Sequelize, { DataTypes } from 'sequelize';
import {sequelize} from '../config/dbconfig';
import moment from 'moment';

import DataRegister from './Data_register'; 

const nuevoSocios = sequelize.define('nuevos_socios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.TEXT
    },
    apellido: {
        type: Sequelize.TEXT
    },
    cedula: {
        type: Sequelize.TEXT
    },
    fecha_solicitud: {
        type: DataTypes.DATE,
        //note here this is the guy that you are looking for                   
                     get() {
                           return moment(this.getDataValue('fecha_solicitud')).format('DD/MM/YYYY h:mm: A');
                       }
                   },
    estado_solicitud: {
        type: Sequelize.TEXT
    },
    sucursal: {
        type: Sequelize.TEXT
    }
},  {
    timestamps: false,
    createdAt: false
});

nuevoSocios.hasMany(DataRegister, {foreingKey: 'socio_ID', sourceKey: 'id'});
DataRegister.belongsTo(nuevoSocios, {foreingKey: 'socio_ID', sourceKey: 'id'});
nuevoSocios.removeAttribute('nuevosSocioId');

export default nuevoSocios;