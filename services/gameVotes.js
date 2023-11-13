import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db("AH_PARCIAL1")
const gameVotesCollection = db.collection('judges_votes');

async function findVote(idGame){
    await client.connect()

    return gameVotesCollection.find({game_id: new ObjectId(idGame)}).toArray()
}

export default {
    findVote
}