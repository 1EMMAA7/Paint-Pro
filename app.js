//1.-Invocamos el modulo express
const express = require('express');
const app = express();

//2.-Seteamos urlencoded para capturar los datos de un formulario
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//3.-Invocamos el modulo dotenv para cargar las variables de entorno
const dovenv = require('dotenv');
dovenv.config({path:'./.env'});

//4.-Seteamos el direcorio publico
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

//5.-Motor de plantillas
app.set('view engine', 'ejs');

//6.-Invocar el modulo para hashear contraseñas
const bcryptjs = require('bcryptjs');
const session = require('express-session');

//7.-Configuramos las variables de sesion
require('express-session');
app.use(session({
    secret: '1234',
    resave: true,
    saveUninitialized: true
}));

//8.-Invocamos el modulo de conexion a la base de datos
const conn = require('./config/db');


//9.-Invocamos el modulo de rutas
app.get('/', (req, res) =>{
    res.render('index');
})

app.get('/login', (req, res) =>{
    res.render('login');
})

app.get('/register', (req, res) =>{
    res.render('register');
})

app.get('/pinturageneral', (req, res) =>{
    res.render('pinturageneral');
})

app.get('/solicitudServicio',(req, res) =>{
    res.render('solicitudServicio');
})

app.get('/rotulos',(req, res) =>{
    res.render('rotulos');
})

app.get('/impermeabilizacion', (req, res) =>{
    res.render('impermeabilizacion');
})

app.get('/metales', (req, res) =>{
    res.render('metales');
})

app.get('/resanesParedes', (req, res) => {
    res.render('resanesParedes');
})

app.get('/indexAdmin', (req, res) =>{
    res.render('indexAdmin')
})


//10.-Registrar un usuario
app.post('/register', async (req, res) =>{
    const nombre =  req.body.nombre;
    const telefono = req.body.telefono;
    const correo = req.body.correo;
    const direccion = req.body.direccion;
    const pass =  req.body.pass;
    let passwordHash = await bcryptjs.hash(pass, 8);
    conn.query('INSERT INTO clientes SET ?', {nombre:nombre, telefono:telefono ,correo:correo,
        direccion:direccion, pass:passwordHash}, async(error, results) =>{
            if(error){
                console.log(error);
            }else{  
                res.render('register',{
                    alert: true,
                    alertTitle: "Registro Exitoso",
                    alertMessage: "Usuario Registrado",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: ''
                })
            }
        })
})

//11. Auntentificacion de usuario
app.post('/auth', async(req, res) =>{
    const correo = req.body.correo;
    const pass = req.body.pass;
    let passwordHash = await bcryptjs.hash(pass, 8);
    if(correo && pass){
        conn.query('SELECT * FROM clientes WHERE correo = ?', [correo], async(error, results) =>{
            if(results.length == 0|| !(await bcryptjs.compare(pass, results[0].pass))){
                res.render('login',{
                    alert: true,
                    alertTitle: "Login Fallido",
                    alertMessage: "Verfifique su correo o contraseña",
                    alertIcon: "error",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: 'login'
                })
            }else{
                res.render('login',{
                    alert: true,
                    alertTitle: "Login Exitoso",
                    alertMessage: "Bienvenido",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: ''
                })
            }
        } )
    }

});

//12.- API para login
const authRoutes = require('./routes/authRoutes');
app.use(express.json());
app.use('/api/auth', authRoutes);


app.listen(3000, (req, res) => {
    console.log('Servidor corriendo en el puerto http://localhost:3000');

})