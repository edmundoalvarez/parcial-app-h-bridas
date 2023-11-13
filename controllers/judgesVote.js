import JudgesVoteService from '../services/judgeVotes.js';

async function getVotes(req, res){

    const { idJudge } = req.params;

    JudgesVoteService.findVote(idJudge)
    .then(function (votes) {
        res.status(200).json(votes)
    })
    .catch(function(err){
        req.status(500).json({ msg: err.msg })
    })

}

async function createVote(req, res){

    const { idJudge } = req.params;

    JudgesVoteService.createVote(idJudge, req.body)
    .then(function (votes) {
        res.status(200).json(votes)
    })
    .catch(function(err){
        req.status(500).json({ msg: err.msg })
    })

}

export default {
    getVotes,
    createVote
}