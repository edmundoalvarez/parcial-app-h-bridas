import GamesVoteService from '../services/gameVotes.js';

async function getVotes(req, res){

    const { idGame } = req.params;

    GamesVoteService.findVote(idGame)
    .then(function (votes) {
        res.status(200).json(votes)
    })
    .catch(function(err){
        req.status(500).json({ msg: err.msg })
    })

}

export default {
    getVotes
}