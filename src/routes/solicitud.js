import { async } from 'regenerator-runtime';
import {Router} from 'express';
const router = Router();
import nuevoSocios from '../models/Nuevos_socios';
import DataRegister from '../models/Data_register'; 
import jwt from 'jsonwebtoken';
import passport from 'passport';

// router.get('/', async (req, res) => 
//   await nuevoSocios.findAll()
//     .then(nuevos_socios => res.render('solicitud', {
//       nuevos_socios
//       }))
//     .catch(err => console.log(err)));



    
  router.put('/edit/:cedula', async (req,res) =>{
  const {acept} = req.body;
  const {cedula} = req.params;
  var values = { estado_solicitud: acept };
  var selector = { 
    where: {cedula}  
  };
  await nuevoSocios.update(values, selector)
  .then(function() {
    req.flash('success_msg', 'Solicitud Aceptada Correctamente.');
    res.redirect('/buscador');
  })
  .catch(error => {
  // error handling
  })

  });


  router.delete('/delete/:cedula',async (req,res) =>{
    const {cedula} = req.params;
    // console.log(id);
   await nuevoSocios.destroy({where: {cedula:cedula}})
   await DataRegister.destroy({where: {cedula:cedula}})
    .then(function() {
      req.flash('success_msg', 'Solicitud rechazada correctamente.');
      res.redirect('/buscador');
  })
  .catch(error => {
  console.log(error);
  })
  })


// Search for solicitudes
router.get('/search',async (req, res) => {
  let { cedula } = req.query;
  var token = req.cookies['SystemAuth'];
  if (req.cookies['SystemAuth']) {
      var admin = ''
      jwt.verify(token,process.env.SECRET_OR_KEY, function (error,decoded){
        if (decoded.role === 'admin') {
             admin = decoded.role
        }  
      })
  }
 await nuevoSocios.findAll({ where: {cedula: `${cedula}`} })
    .then(nuevos_socios => res.render('solicitud', { nuevos_socios,token,admin }))
    .catch(err => console.log(err));
});


module.exports  = router;

  // router.post('/solicitud', (req,res,next) => {
  // const {cedula} = req.body;
  // DataRegister.findOne(({ where: {cedula: `${cedula}`} }),  (err, result) => {
  //     if(err) {
  //         res.render('solicitud.ejs', {products: null});
  //     }
  //     res.render('solicitud.ejs', {cedula: result});
  //     next();
  // });
  // });