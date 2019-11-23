var express = require('express')
var app = express()            
var bodyParser = require('body-parser');
var hash = require('hash.js')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000; 

//e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
var accounts = express.Router();
var api = express.Router();


// accounts.get('/new', (req, res) => {
//     let token = req.body.alias;
//     token = hash.sha256().update(token).digest('hex');
//     res.send({message:token+""});
//     //Add to DB
// });

app.use('/account', accounts);

api.get('/', (req, res) => {
    res.send({error:"Please use a valid access token"})
});

api.post('/task', (req, res) => {
    res.send(req.body.name);
});

api.get('/task/:id', (req, res) => {
    res.send(req.body.name);
});

app.use('/api', api);

app.listen(port);