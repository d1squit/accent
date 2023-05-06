const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const port = 3000;



app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'https://goroh.pp.ua');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});


const db = new sqlite3.Database('db.sqlite');

app.get('/:word', (req, res) => {
	db.serialize(() => {
		db.all(`SELECT words_accent FROM words WHERE words_no_accent LIKE '${req.params.word}'`, (err, rows) => {
			if (rows[0]) res.send(rows[0].words_accent);
			else res.send(null);
		});
	});
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
