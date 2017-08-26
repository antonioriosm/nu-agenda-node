'use strict';

module.exports = function(db) {

    const Eventos = db.collection('eventos');

    this.recibirEventos = (id, callback) => {

        console.log(id);

        Eventos.find({nomusu: id}).toArray((err, docs) => {
            if (err) 
                callback(err);
            else
                callback(null, docs);
        });
    };

    this.agregarEvento = (doc, callback) => {

        Eventos.insert(doc, (err, doc) => {
            console.log('doc=>', doc);
            if (err)
                callback(err);
            else
                callback(null, doc.insertedCount);
        });
    };
};
