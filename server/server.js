import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/Mongodb.js'
import { ClerkWebhooks } from './controllers/Webhooks.js'

// initiate Express
const app = express()

//connect to database
await connectDB()

//Middlewares
app.use(cors())

//Routes
app.get('/', (req, res)=> res.send("API Working"))
app.post('/clerk', express.json(), ClerkWebhooks)

//Port
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server is Runing at port ${PORT}`)
})