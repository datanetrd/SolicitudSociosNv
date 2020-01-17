import dotenv from 'dotenv';dotenv.config();
import path from 'path';
import fs from 'fs-extra';
import nodemailer from 'nodemailer';
import oficinas from '../models/Oficinas';
import {mail} from './config';
import {
    async
} from 'regenerator-runtime';

const transporter = nodemailer.createTransport(
    mail
);

const SolicitudSucursal = async function (req, res) {
    const {
        nombre,
        apellido,
        cedula,
        sucursal
    } = req.body;
    //envio de email
    const DestinoSucursal = await oficinas.findOne({
        where: {
            oficina: sucursal
        }
    });
    
    
    //Opciones envio email
        const mailOptions = {
            from: process.env.MAIL_USER,
            //Destino del correo
            to: `${DestinoSucursal.Email_Oficina}`,
            subject: `Nueva solicitud para socio ${nombre} ${cedula}`,
            text: `Nueva solicitud de parte de ${nombre} ${apellido}`,
            attachments: [{
                filename: `${cedula}.pdf`,
                path: path.join(__dirname, `../../${nombre}.pdf`),
                contentType: 'application/pdf'
            }],
        };

         //Envio del mail
    transporter.sendMail(mailOptions, function (error, info) {
        //validar que haya habido un error
        if (error) {
            
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        const filePath = path.join(__dirname, `../../${nombre}.pdf`);
        fs.unlink(filePath);
    })

    };

module.exports = {
    SolicitudSucursal
};