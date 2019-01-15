const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true}));

let studenti = [
    {"nome": "Matteo" ,"cognome": "Frare", "nascita": "17/09/1997", "matricola": 194112},
    {"nome": "Matteo" ,"cognome": "Frare", "nascita": "17/09/1997", "matricola": 1941},
    {"nome": "Michele" ,"cognome": "Tran", "nascita": "11/02/1998", "matricola": 192762}
];

app.get('/', (req, res) => res.send('Hello World! that is the faching homepage').status(200));

app.get('/studenti', (req, res) => {
    res.json(studenti).status(200);
});

/*app.get('/studenti/id', (req, res) => {
    let val = req.query.id;
    if(studenti[val] != null)
        res.json(studenti[val]).status(200);
    else
        res.status(404).json({message: 'non trovato'});

});*/
app.get('/studenti/matricola', (req, res) => {
    const studente = studenti.find(c => c.matricola === parseInt(req.query.matricola)); //per i numeri va usato parseInt
    if(studente != null)
        res.json(studente).status(200);
    else
        res.status(404).json({msg: 'Errore - studente non trovato'});
});

app.get('/studenti/nome', (req, res) => {
    let persone = studenti.filter ( c => c.nome === (req.query.nome) );
    if(persone[0] != null)
        res.json(persone).status(200);
    else
        res.status(404).json({message: 'non trovato'});

});

app.post('/studenti', (req, res) => {
    const studente = {
        nome: req.body.nome,
        cognome: req.body.cognome,
        nascita: req.body.nascita,
        matricola: req.body.matricola
    }
    if ( typeof (req.body.nome) == "string" && 
        typeof (req.body.cognome) == "string" &&
        typeof (req.body.nascita) == "string" && 
        typeof(req.body.matricola) == "number" )
    {
        studenti.push(studente);
        res.json(studente).status(200);
    }
    else
    {
        res.status(400).json({message: 'dati non conformi'});
    }
});

app.put('/studenti/id', (req, res) => {

    //const reqId = req.body.matricola;
    //const reqId = req.query.id;
    //console.log(reqId);
    let studente = studenti.find ( c => c.matricola == (req.query.id) );
        /*return stud.matricola === reqId;
    })//[0]; //cambi solo il primo che trovi*/

    //Se il studente è diverso da null allora modifico gli attributi
    if(studente != null)
    {
        const index = studenti.indexOf(studente);
        const keys =  Object.keys(req.body);

        keys.forEach(key => {
            studente[key] = req.body[key];
        });

        studenti[index] = studente;
        res.status(200).json(studente);
    }
    else
    {
        res.status(404).json({message: 'studente non trovato'})
    }
});

app.delete('/studenti/id', (req, res) => {

    let studente = studenti.find(c => c.matricola == parseInt(req.query.id));
    if(studente != null) {
       const indice = studenti.indexOf(studenti);
       studenti.splice(indice, 1);
       res.status(200).json({msg: 'Il corso è stato eliminato'});
    }
    else {
       res.status(404).json({msg: 'Corso non trovato'});
    } 
  });

module.exports = app;