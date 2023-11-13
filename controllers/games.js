import GamesService from "../services/games.js"

function getGames(req, res) {

    GamesService.getGames(req.query)
    .then(function (games) {
      res.status(200).json(games)
    })
}

function getGameById(req, res) {

  const { idGame } = req.params

  GamesService.getGameById(idGame)
    .then(function (game) {
      return res.status(200).json(game)
    })
    .catch(function (err) {
      if (err?.code) {
        res.status(err.code).json({ msg: err.msg })
      }
      else {
        res.status(500).json({ msg: "No se pudo guardar en el archivo" })
      }
    })
}

async function createGame(req,res){

  // res.send("OK")
  return GamesService.createGame(req.body)
  .then(function(game){
    res.status(200).json(game)
  })
  .catch(function (err){
    res.status(500).json({ msg:err.msg })
  })
}

async function updateGame(req, res) {

  const { idGame } = req.params

  return GamesService.updateGame(req.body, idGame)
  .then(function (game) {
    return res.status(200).json(game)
  })
  .catch(function (err) {
    if (err?.code) {
      res.status(err.code).json({ msg: err.msg })
    }
    else {
      res.status(500).json({ msg: "No se pudo guardar en el archivo" })
    }
  })

}


async function deleteGame(req,res){

  const { idGame } = req.params

  return GamesService.deleteGame(idGame)
  .then(function(game){
    res.status(200).json(game)
  })
  .catch(function (err){
    res.status(500).json({ msg:err.msg })
  })
}

//? Exportar resto de funciones
export {
  getGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame
}

export default {
    getGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame
}