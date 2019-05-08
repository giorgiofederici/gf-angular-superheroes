const express = require('express');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const cors = require('cors');

// Create server
const app = express()
app.use(cors());
app.use(bodyParser.json());

// configure CORS
const corsOptions = {
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: 'http://localhost:4200',
    preflightContinue: false
};

// Create database instance and start server
const adapter = new FileAsync('./server/db.json');
low(adapter)
    .then(db => {
        // Routes


        // GET /api/superheroes
        app.get('/api/superheroes', (req, res) => {
            console.log('GET /superheroes')
            const superheroes = db.get('superheroes').value();
            res.send(superheroes);
        })

        // GET /api/superheroes/:id
        app.get('/api/superheroes/:id', (req, res) => {
            console.log('GET /superheroes/' + req.params.id);
            const superhero = db.get('superheroes').find({ id: parseInt(req.params.id) }).value();
            res.send(superhero);
        });

        // PUT /api/superheroes/:id
        app.put('/api/superheroes/:id', (req, res) => {
            console.log('PUT /superheroes/' + req.params.id);
            const superhero = db.get('superheroes')
            .find({ id: parseInt(req.params.id) })
            .assign(req.body)
            .write();
            res.send(superhero);
        });

        // DELETE /api/superheroes/:id
        app.delete('/api/superheroes/:id', (req, res) => {
            console.log('DELETE /superheroes/' + req.params.id);
            const superhero = db.get('superheroes').remove({ id: parseInt(req.params.id) }).write();
            res.send(superhero);
        });

    })
    .then(() => {
        app.listen(3000, () => console.log('listening on port 3000'))
    })