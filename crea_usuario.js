'use strict';

let MongoClient = require('mongodb').MongoClient,
    passwordHash = require('password-hash');

const url = 'mongodb://localhost/agenda';

MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    console.log('Base de Datos AGENDA iniciada correctamente...');

    const Usuarios = db.collection('usuarios');

    Usuarios.findOne({nomusu: 'admin'}, (err, doc) => {
        if (err) throw err;

        if (doc) {
            console.log('Usuario registrado anteriormente');
        }
        else {
            Usuarios.insertOne({nomusu: 'admin', clave: passwordHash.generate('clave')}, (err, doc) => {
                if (err) throw err;
                console.log('usuario registrado correctamente...', JSON.stringify(doc));
            });
        }
        db.close();
    });
});
