/*
An express back-end for GameReviews project
Author: Kristoffer Granberg
*/
const express = require('express')

require('dotenv').config

//express middleware
const helmet = require('helmet') //creates headers that protect from attacks
const bodyParser = require('body-Parser')
const cors = require('cors')
const morgan = require('morgan')

const port = 3000
var db = require('knex')({
  client: 'pg',
  connection : {
    host: '127.0.0.1',
    user: 'user1',
    password: 'password',
    database: 'GameReviews' // check correct db name
  }
});

//fetch api queries
const query = require('./api/queries');

const app = express();

//app middleware
const whitelist = ['http://localhost:3001']
const corsOptions = {
  origin: function (origin, callback) {
    if(whitelist.indexOf(origin)!== -1 || !origin){
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(helmet())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(morgan('combined')) //use tiny or combined

/*
// routes
app.get('/', (req, res) => res.send('hello world'))
app.get('/crud', (req, res) => main.getTableData(req, res, db))
app.post('/crud', (req, res) => main.postTableData(req, res, db))
app.put('/crud', (req, res) => main.putTableData(req, res, db))
app.delete('/crud', (req, res) => main.deleteTableData(req, res, db))
*/

//server connection
app.listen(process.enc.PORT || port, () => {
  console.log(`GameReviews back-end is running on ${process.enc.PORT || port}`);
})
