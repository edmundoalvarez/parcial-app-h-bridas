import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db("AH_PARCIAL1")
const GameCollection = db.collection('games');

//Funcines
function filterQueryToMongo(filter){

  const filterMongo = {}

  for (const field in filter) {
    
    if(isNaN(filter[field])){
      filterMongo[field] = filter[field]

    }  else {
      filterMongo[field] = parseInt(filter[field])
    }
    
  }
  
  return filterMongo

}

async function getGames(filter={}){
  await client.connect()

  const filterMongo = filterQueryToMongo(filter)

  return GameCollection.find(filterMongo).sort({totalVotes : -1}).toArray();
}

async function getGameById(id){
  await client.connect()
  return GameCollection.findOne({_id: new ObjectId(id)});
}

async function createGame(game){
  await client.connect()
  
  const newGame = {
    ...game
  }
  
  await GameCollection.insertOne(newGame);

  return newGame;
}

async function updateGame(data, id) { 
  await client.connect()

  return GameCollection.updateOne({_id: new ObjectId(id)}, {$set: data})

}

async function pushVotes(data, id) {
  await client.connect()

  return GameCollection.updateOne({_id: new ObjectId(id)}, { $push: {votes: data}})

}

async function updateTotalVotes(data, id) {
  await client.connect()

  return GameCollection.updateOne({_id: new ObjectId(id)}, { $set: {totalVotes: data}})
}

async function updatePromVotes(jugabilidad, arte, sonido, afinidadALaTematica, id) {
  await client.connect()

  return GameCollection.updateOne({_id: new ObjectId(id)}, { $set: {
    
    promJugabilidad: jugabilidad,
    promArte: arte,
    promSonido: sonido,
    promAfinidadALaTematica: afinidadALaTematica
  
  }})
}


async function deleteGame(id){
  await client.connect()

  return GameCollection.deleteOne({_id: new ObjectId(id)})
}

//? Exportar resto de funciones async
export default {
    getGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame,
    pushVotes,
    updateTotalVotes,
    updatePromVotes
  }

export {
  updateGame,
  getGameById
}

