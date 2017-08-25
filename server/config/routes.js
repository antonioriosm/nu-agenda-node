'use strict';

module.exports = (app, db) => {
    
    app.get('/', (req, res) => {
        res.sendFile('index.html');
    });
};