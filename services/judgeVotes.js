import { MongoClient, ObjectId } from 'mongodb';
import GamesService from './games.js'
import JudgesService from './judges.js'


const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db("AH_PARCIAL1")
const judgeVotesCollection = db.collection('votes');

async function findVote(idJudge){
    await client.connect()

    return judgeVotesCollection.find({judge_id: new ObjectId(idJudge)}).toArray()
}

async function createVote(idJudge, vote){
    await client.connect()

    if(vote.game_id){
        vote.game_id = new ObjectId(vote.game_id)
        
    }

    const game = await GamesService.getGameById(vote.game_id)

    const judge = await JudgesService.getJudgeById(idJudge)


    const newVote = {
        ...vote,
        judge_id: new ObjectId(idJudge),
        judge_name: judge.name,
        game_name: game.name,

    }


    if(game.totalVotes) {
        game.totalVotes += vote.jugabilidad
        game.totalVotes += vote.arte
        game.totalVotes += vote.sonido
        game.totalVotes += vote.afinidadALaTematica
    
        GamesService.updateTotalVotes(game.totalVotes, vote.game_id)
    
    } else {
        game.totalVotes = 0
        game.totalVotes += vote.jugabilidad
        game.totalVotes += vote.arte
        game.totalVotes += vote.sonido
        game.totalVotes += vote.afinidadALaTematica

        GamesService.updateTotalVotes(game.totalVotes, vote.game_id)

    }

    if(game.promJugabilidad){

        let voteJugabilidad = vote.jugabilidad;
        let voteArte = vote.arte;
        let voteSonido = vote.sonido;
        let voteAfinidadALaTematica = vote.afinidadALaTematica;

        for (const v of game.votes) {

            voteJugabilidad += v.jugabilidad
            voteArte += v.arte
            voteSonido += v.sonido
            voteAfinidadALaTematica += v.afinidadALaTematica

        }

        game.promJugabilidad = voteJugabilidad / (game.votes.length + 1)
        game.promArte = voteArte / (game.votes.length + 1)
        game.promSonido = voteSonido / (game.votes.length + 1)
        game.promAfinidadALaTematica = voteAfinidadALaTematica / (game.votes.length + 1)

        GamesService.updatePromVotes(game.promJugabilidad, game.promArte, game.promSonido, game.promAfinidadALaTematica, vote.game_id)

    } else {

        game.promJugabilidad = vote.jugabilidad
        game.promArte = vote.arte
        game.promSonido = vote.sonido
        game.promAfinidadALaTematica = vote.afinidadALaTematica

        GamesService.updatePromVotes(game.promJugabilidad, game.promArte, game.promSonido, game.promAfinidadALaTematica, vote.game_id)


    }


    await judgeVotesCollection.insertOne(newVote)

    GamesService.pushVotes(newVote, vote.game_id)
    JudgesService.pushVotes(newVote, idJudge)

    return newVote
}

export default {
    findVote,
    createVote
}