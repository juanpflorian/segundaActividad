var express = require('express');
var router = express.Router();
const { conexion } = require('../database/conexion')
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
 
//Enrutamiento para agregar un medico a la base de datos
router.post('/agregar-medico', (req, res) => {
  const nombres = req.body.nombres
  const apellidos = req.body.apellidos
  const cedula = req.body.cedula
  const consultorio = req.body.consultorio
  const telefono = req.body.telefono
  const correo = req.body.correo
  const especialidad = req.body.especialidad
 
  conexion.query(`INSERT INTO medicos (cedula, nombres, apellidos, especialidad, consultorio, correo, telefono) VALUES (${cedula}, '${nombres}', '${apellidos}', '${especialidad}', '${consultorio}', '${correo}', '${telefono}')`, (error, resultado) => {
    if (error) {
      console.log('Ocurrio un error en la ejecución', error)
      res.status(500).send('Error en la ejecución')
    } else {
      res.status(200).redirect('/listado-medicos')
    }
  })
})
 

// enrutamiento visualizar 
router.get('/listado-medicos', (req, res) => {
  conexion.query('SELECT * FROM medicos;', (error, resultado) => {
    if (error) {
      console.log('Error en la ejecución', error);
      return res.status(500).send('Error en la ejecución');
    }

    res.status(200).render('medicos', { resultado });
  });
});

router.post('/agregar-paciente', (req, res) => {
  const nombres = req.body.nombres;
  const apellidos = req.body.apellidos;
  const cedula = req.body.cedula;
  const fecha_nacimiento = req.body.fecha_nacimiento;
  const telefono = req.body.telefono;

  conexion.query(`INSERT INTO pacientes (cedula, nombres, apellidos, fecha_nacimiento, telefono) VALUES (${cedula}, '${nombres}', '${apellidos}', '${fecha_nacimiento}', '${telefono}')`, (error, resultado) => {
    if (error) {
      console.log(error);
      res.status(500).send('Ocurrió un error en la consulta');
    } else {
      res.status(200).redirect('/listado-pacientes');
    }
  });
});

router.get ('/listado-pacientes', (req, res)=> {
  conexion.query('SELECT * FROM pacientes;', (error, resultado) =>{
    if (error) {
      console.log(error);
      res.status(500).send('Ocurrió un error en la consulta');
    } else {
      res.status(200).render('pacientes', { resultado })
    }
    
  })
})

router.post('/consultas-citas', (req, res) => {
  const especialidad = req.body.especialidad;

  conexion.query('SELECT * FROM medicos WHERE especialidad = ?', [especialidad], (error, resultado) => {
    if (error) {
      console.log(error);
      res.status(500).send('Ocurrió un error en la consulta');
    } else {
      res.status(200).render('agendar-citas', {resultado});
    }
  });
});

//Enrutamiento para guardar una cita en la base de datos
router.post('/agregar-cita', (req, res) => {
  const cedula_paciente = req.body.cedula
  const fecha_cita = req.body.fecha_cita
  const cedula_medico = req.body.medico
  conexion.query(`INSERT INTO cita_medica (cedula_medico, cedula_paciente, fecha_cita) VALUES (${cedula_medico}, ${cedula_paciente}, '${fecha_cita}')`, (error, resultado) => {
    if (error) {
      console.log(error)
      res.status(500).send('Ocurrio un error en la consulta')
    } else {
      res.status(200).redirect('/listado-citas')
    }
  })
})





module.exports = router;

