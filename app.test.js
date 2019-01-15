var app = require ('./app');
const request = require('supertest');

describe('GET /', function() {
    it('controllo che vada homepage', async() => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    });
  });

describe('GET /studenti', function() {
    it('controllo che torni la ista di studenti', async() => {
    const response = await request(app).get('/studenti');
    expect(response.statusCode).toBe(200);
    });
  });

describe('GET /studenti/matricola', function() {
    it('controllo che torni un certo studente', async() => {
    const response = await request(app).get('/studenti/matricola?matricola=194112');
    expect(response.body).toBeDefined();
    expect(response.body.matricola).toEqual(194112);
    expect(response.statusCode).toBe(200);
    });
    it ('dovrebbe non tornare niente', async() => {
        const response = await request(app).get('/studenti/matricola?matricola=666');
        expect(response.statusCode).toBe(404);    
    });
  });  

describe('GET /studenti/nome', function() {
    it('controllo che torni un certo studente', async() => {
    const response = await request(app).get('/studenti/nome?nome=Matteo');
    for (let i = 0; i<response.length ; i++)
    {
        expect(response.body).toBeDefined();
        expect(response.body.nome).toBe('Matteo');
        expect(response.statusCode).toBe(200);
    }
    });
    it ('dovrebbe non tornare niente', async() => {
        const response = await request(app).get('/studenti/nome?nome=osama');
        expect(response.statusCode).toBe(404);    
    });
  });

describe('POST /studenti', () => {
    it('controllo che carichi un certo studente', async (done) => {
    request(app)
        .post('/studenti')
        .send({nome: 'Michele',
                cognome: 'Maiutto',
                nascita: '11/07/1997',
                matricola: 187654})
        .set('Accept', 'application/json')
        .expect(200)
        .end(done);
    });
    it('---> should return 400 - Bad Request', async(done) => {
        request(app)
        .post('/studenti')
        .send({
            nome: 'Marco',
            cognome: 666,
            nascita: 11,
            matricola: 111111  })
        .expect(400)
        .end(done);
        });
/*
    it('risponde 400 se Errore nel caricameto', async (done)=> {
        request(app)
        .post('/studenti')
        .send({
            nome: 1,
            cognome: 666,
            nascita: 666,
            matricola: 'qualcosa'})
        .set('Accept', 'application/json')
        .expect(400)
                    .end(function(err, res) {
                if(err) return done(err);
            done();
            });
    });*/
  });


describe('PUT aggiorno uno studente', function() {
    it('---> responds with json and should return 200', async(done) => {
        request(app)
            .put('/studenti/id/?id=194112')
            .send({
                nome: "prova",
                cognome: "prova",
                nascita: "01/01/01" })
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                if(err) return done(err);
            done();
            });
    });
    it('---> responds with json and should return 404', async(done) => {
        request(app)
            .put('/studenti/id/?id=666')
            .send({
                nome: "prova",
                cognome: "prova",
                nascita: "01/01/01" })
            .set('Accept', 'application/json')
            .expect(404)
            .end(function(err, res) {
                if(err) return done(err);
            done();
            });
});
});

describe(' DELETE /studenti/id --> should be 200', () => {
    it(' restituisce 200 se cancella', function(done) {
    request(app)
    .delete('/studenti/id?id=194112')
    .expect(200)
    .end(done)
});
    it(' restituisce 404 se cancella', function(done) {
        request(app)
        .delete('/studenti/id?id=666')
        .expect(404)
        .end(done)
});

});
