import express from "express";
import JudgesVotesController from '../controllers/judgesVote.js'




const route = express.Router();

route.route('/:idJudge/votes')
    .get(JudgesVotesController.getVotes)
    .post(JudgesVotesController.createVote)
  
export default route;