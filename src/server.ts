import express from 'express';
const app = express();

import cors from 'cors';
import mysql from 'mysql2';
import bodyparser from 'body-parser';
import path from 'path';
// Importing 'query' from express is not common, so you can remove this line.
// import { query } from 'express';
import fs from 'fs';

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);

type EntrepriseData = {
  entreprise: string[],
  nombreEntreprise : string;
}

app.post('/entreprise', (req: any, res: any) => {
  const data: EntrepriseData = req.body;
  console.log(data);
  console.log(data.entreprise.length)
  console.log(data.nombreEntreprise)

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Crapulo2001*',
    database: 'entreprisebourse',
  });

  const insertQuery = 'INSERT INTO entreprisebourse.entreprise (nom) VALUES (?)';

  data.entreprise.forEach(entreprise => {
    connection.query(insertQuery, [entreprise], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'insertion:', err);
      }
    });
  });

  connection.end();

  res.end();
});


app.listen(3000, () => {
  console.clear();
  console.log('server lancé sur 3000!');
});
