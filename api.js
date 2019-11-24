require('dotenv').config()
var express = require('express')
var app = express()            
var bodyParser = require('body-parser');
var hash = require('hash.js')
const MongoClient = require('mongodb').MongoClient;

const client = new MongoClient(process.env.CONNECTION, { useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000; 

var accounts = express.Router();
var api = express.Router();

accounts.post('/new', (req, res) => {
    let name = req.body.alias;
    token = hash.sha256().update(name).digest('hex');
    res.send({"NEW ACCOUNT":token+""});
    client.connect(  async (err, client) => {
        const db = client.db("OAP-Taskr");
        if(err) {
             console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
        }
        else{
            console.log('Connected...');
            const collection = client.db("OAP-Taskr").collection("accounts");
            db.collection.insert({"usrname":name,"token":token});
            client.close();
        }
     });
});

api.post('/task', (req, res) => {
    res.send(req.body.name);
});

api.get('/task', (req, res) => {
    console.log("Working? ");
    client.connect((err) => {
        console.log("Connected to db");
        console.log("Errors? ", err);
        const db = client.db("OAP-Taskr");
        const collection = db.collection('tasks');
        collection.find({}).toArray((err,data) => {
            res.send(data);
        });
     });
});

api.post('/points/:id', (req, res) => {
    //Add/remove points
});

api.get('/points/:id', (req, res) => {
    //Get current points value
});

app.use('/api', api);
app.use('/account', accounts);

app.listen(PORT, () => console.log("Listening on port " + PORT));
