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

const port = 3009
const db = require('./api/queries')

const app = express();

//app middleware
const whitelist = ['http://localhost:3000']
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

// routes
app.get('/', (req, res) => res.send('This is the back-end of GameReviews'))
app.get('/games', db.getGames)
app.get ('/games/:id', db.getGameById)
app.get('/reviews',db.getReviews)
app.get('/reviews/:id', db.getReviewsByGameId)
app.post('/games', db.createGame)
app.put('/games/:id', db.updateGame)
app.delete('/games/:id', db.deleteGame)

/*
app.get('/', (req, res) => res.send('This is the back-end of GameReviews'))
app.get('/games', (req, res) => query.getGameData(req, res, db))
// not sure about id here
app.get('/reviews/:id', (req, res) => query.getGameReviewsData(req, res, db))
*/

//server connection
app.listen(process.env.PORT || port, () => {
  console.log(`GameReviews back-end is running on ${process.env.PORT || port}`);
})
