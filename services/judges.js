import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db("AH_PARCIAL1")
const judgeCollection = db.collection('judges');

//Funcines
function filterQueryToMongo(filter){

  const filterMongo = {}

  for (const field in filter) {
    
    if(isNaN(filter[field])){
      filterMongo[field] = filter[field]

    } 

  }

  return filterMongo;
}

async function getJudges(filter={}){
  await client.connect()

  const filterMongo = filterQueryToMongo(filter)

  return judgeCollection.find(filterMongo).toArray();
}

async function getJudgeById(id){
  await client.connect()
  return judgeCollection.findOne({_id: new ObjectId(id)});
}

async function pushVotes(data, id) {
  await client.connect()

  return judgeCollection.updateOne({_id: new ObjectId(id)}, { $push: {votes: data}})

}


//? Exportar resto de funciones async
export default {
    getJudges,
    getJudgeById,
    pushVotes,
    judgeCollection
  }

export {
  getJudgeById
}

