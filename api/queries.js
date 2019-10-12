/**
Contains queries to database for GameReviews project
made in CRUD fashion.
Author: Kristoffer Granberg
*/

const Pool = require('pg').Pool
// this should probobly be brought from another file
// not coded in.
const pool = new Pool({
    user: 'user1',
    host: 'localhost',
    database: 'game_reviews',
    password: 'password',
    port: 5432,
})

/*
Get all games
*/
const getGames = (request, response) => {
    pool.query('SELECT * FROM Game ORDER BY game_id ASC', (error, results) => {
        if(error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
/*
get all reviews
*/
const getReviews = (request, response) => {
    pool.query('SELECT * FROM Review ORDER BY game_id ASC', (error, results) => {
        if(error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
/*
Gets game info by id.
*/
const getGameById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM Game WHERE game_id = $1', [id], (error, results) => {
        if(error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
/*
Gets all reviews for one game.
*/
const getReviewsByGameId = (request, response) => {
const id = parseInt(request.params.id)

    pool.query('SELECT * FROM Review WHERE game_id = $1',[id], (error, results) => {
        if(error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
/*
TODO: Create post func that sums all game scores and takes average.
then posts it to correct.

QUERY:
*/

const createGame = (request, response)  => {
    const { name, description } = request.body

    pool.query('INSERT INTO Game (name, description) VALUES ($1, $2)', [name, description], (error, results) => {
        if(error) {
            throw error
        }
        response.status(201).send(`Game added with ID: ${results.insertId}`)
    })
}

const updateGame = (request, response) => {
    const id = parseInt(request.params.id)
    const {name, description} = request.body

    pool.query(
        'UPDATE Game SET name = $1, description = $2 WHERE game_id = $3',
        [name, email, id],
        (error, results) => {
            if(error){
                throw error
            }
            response.status(200).send(`Game modified with ID: ${id}`)
        }
    )
}

const deleteGame = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM Game WHERE game_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }

// exports methods
  module.exports = {
      getGames,
      getGameById,
      getReviews,
      getReviewsByGameId,
      createGame,
      updateGame,
      deleteGame,
  }

//get all games in db
/*
const getGameData = (req, res, db) => {
  db.select('*').from('Game').then(items => {
    if(items.length){
      res.json(items)
    } else {
      res.json({dataExists: 'false'})
    }
  }).catch(error => res.status(400).json({dbErorr: 'database error'}))
}

//get all reviews for 1 game in db
const getGameReviewsData = (req, res, db) => {
  const id = parseInt(req.params.id);
  db('Review').where('game_id', id).then(items => {
    if(items.length){
      res.json(items)
    } else {
      res.json({dataExists: 'false'})
    }
  }).catch(error => res.status(400).json({dbErorr: 'database error'}))
}


module.export = {
  getGameData,
  getGameReviewsData
}
*/
