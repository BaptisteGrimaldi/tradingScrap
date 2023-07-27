"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const mysql2_1 = __importDefault(require("mysql2"));
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ limit: '10mb', extended: true }));
app.post('/entreprise', (req, res) => {
    const data = req.body;
    console.log(data.entreprise.length);
    console.log(data.nombreEntreprise);
    console.log(typeof data.entreprise.length);
    console.log(typeof data.nombreEntreprise);
    if (data.entreprise.length !== parseInt(data.nombreEntreprise)) {
        res.end("Pas le meme nombre d'entreprise récupéré");
    }
    else {
        const connection = mysql2_1.default.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Crapulo2001*',
            database: 'entreprisebourse',
        });
        const insertQuery = 'INSERT INTO entreprisebourse.entreprise (nom) VALUES (?)';
        data.entreprise.forEach((entreprise) => {
            connection.query(insertQuery, [entreprise], (err, result) => {
                if (err) {
                    console.error("Erreur lors de l'insertion:", err);
                }
            });
        });
        connection.end();
        res.end('ok');
    }
});
app.listen(3000, () => {
    console.clear();
    console.log('server lancé sur 3000!');
});
