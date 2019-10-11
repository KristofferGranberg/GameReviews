/**
Contains queries to database for GameReviews project
made in CRUD fashion.
Author: Kristoffer Granberg
*/

//get all games in db
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
