'use strict';

const bcrypt = require('bcrypt-nodejs');

module.exports = function(db) {

    const Usuarios = db.collection('usuarios');

    this.verificaUsuario = (reg, callback) => {
        //let where = {nomusu: reg.user, clave: passwordHash.generate(reg.pass)};
        //let where = {clave: passwordHash.generate(reg.pass)};

        let where = {nomusu: reg.user};
        console.log('reg', reg, where);
        Usuarios.findOne(where, (err, doc) => {
            console.error('error', err);
            console.log('doc', doc);

            if (err) 
                callback(err);
            else if (bcrypt.compareSync(reg.pass, doc.clave))
            //else if (passwordHash.verify(doc.clave, password))
                callback(null, true);
            else
                callback(null, false);
        });
    };
};
