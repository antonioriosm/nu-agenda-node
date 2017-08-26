'use strict';

var ObjectId = require('mongodb').ObjectID;

const usuario = require('../models/usuario');
const evento = require('../models/evento');

module.exports = (app, db) => {

    const Usuario = new usuario(db);
    const Evento = new evento(db);

    app.get('/', (req, res) => {
        res.sendFile('index.html');
    });

    app.post('/login', (req, res) => {

        Usuario.verificaUsuario(req.body, (error, respuesta) => {
            if (error)
                throw error;
            else if (respuesta) {
                app.locals.id = respuesta._id;
                console.log('id=>', app.locals.id);
                res.send('Validado');
            }
            else
                res.send('Error');
        });
    });

    app.get('/events/all', (req, res) => {
        console.log(typeof app.locals.id);
        if(typeof(app.locals.id) === 'undefined') {
            res.send('0');
        }
        else {
            Evento.recibirEventos(ObjectId(app.locals.id), (error, respuesta) => {
                if (error)
                    throw error;
                else
                    res.json(respuesta);
            });
        }
    });
    
    app.post('/events/new', (req, res) => {
        req.body.nomusu = ObjectId(app.locals.id);
        if (req.body.end == "") delete req.body.end;

        console.log(req.body);
        Evento.agregarEvento(req.body, (error, respuesta) => {
            if (error)
                throw error;
            else
                res.json({total: respuesta});
        });
    });
};