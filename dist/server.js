"use strict";
const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
const bodyparser = require('body-parser');
const path = require('path');
const { query } = require('express');
const fs = require('fs');
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true,
}));
app.post('/entreprise', (req, res) => {
    function requeteBdd() {
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: 'Crapulo2001*',
            database: "entreprisebourse"
        });
        let requeteSql = "INSERT INTO entreprisebourse.entreprise (nom) VALUES ('Exemple de nom')";
        connection.query(requeteSql, function (results) {
        });
    }
});
app.listen(3000, () => {
    console.clear();
    console.log('server lancé sur 3000!');
});
