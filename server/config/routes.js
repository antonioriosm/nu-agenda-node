'use strict';

const usuario = require('../models/usuario');

module.exports = (app, db) => {

    const Usuario = new usuario(db);
    
    app.get('/', (req, res) => {
        res.sendFile('index.html');
    });

    app.post('/login', (req, res) => {

        Usuario.verificaUsuario(req.body, (error, respuesta) => {
            console.log('respuesta', respuesta);
            if (error)
                throw error;
            else if(respuesta) 
                res.send('Validado');
            else
                res.send('Error');
        });
    });
};