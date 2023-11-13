import express from 'express';
import GamesRoute from './routes/router.js'

const app = express()
app.use(express.json())

app.use(GamesRoute)

app.listen(2023, function (){
    console.log("El servidor está levantado! http://localhost:2023")
  })