import express from "express";
import GamesVotesController from '../controllers/gamesVote.js'


const route = express.Router();

route.route('/:idGame/votes')
    .get(GamesVotesController.getVotes)
  
export default route;