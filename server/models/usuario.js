'use strict';

const bcrypt = require('bcrypt-nodejs');

module.exports = function(db) {

    const Usuarios = db.collection('usuarios');

    this.verificaUsuario = (reg, callback) => {
        let where = {nomusu: reg.user};

        Usuarios.findOne(where, (err, doc) => {
            console.error('error', err);
            console.log('doc', doc);

            if (err) 
                callback(err);
            else if (bcrypt.compareSync(reg.pass, doc.clave))
                callback(null, true);
            else
                callback(null, false);
        });
    };
};
