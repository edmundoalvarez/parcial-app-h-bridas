import express from 'express'
import GamesController from '../controllers/games.js'
import GamesVotesRoute from './gamesVotes.js'
import JudgesController from '../controllers/judges.js'
import JudgesVotesRoute from './judgesVotes.js'
import { validateVote } from '../middlewares/vote.js'



const route = express.Router()


//? Crear rutas para el resto de las app.algo
route.get('/games', GamesController.getGames)
route.post('/games', GamesController.createGame)
route.get('/games/:idGame', GamesController.getGameById)
route.patch('/games/:idGame', GamesController.updateGame)
route.delete('/games/:idGame', GamesController.deleteGame)
route.use('/games', GamesVotesRoute)

route.get('/judges', JudgesController.getJudges)
route.get('/judges/:idJudge', JudgesController.getJudgeById)
route.patch('/judges/:idJudge', JudgesController.updateJudge)
route.use('/judges', [validateVote], JudgesVotesRoute)




export default route