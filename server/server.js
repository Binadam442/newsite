import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/Mongodb.js'
import { ClerkWebhooks, stripeWebhooks } from './controllers/Webhooks.js'
import { clerkMiddleware } from '@clerk/express'
import connectCloudinary from './configs/cloudinary.js'
import userRouter from './routes/userRoute.js'
import Stripe from 'stripe'

// initiate Express
const app = express()

//connect to database
await connectDB()
await connectCloudinary()

//Middlewares
app.use(cors())
app.use(clerkMiddleware())

//Routes
app.get('/', (req, res)=> res.send("API Working"))
app.post('/clerk', express.json(), ClerkWebhooks)
app.use('/api/educator', express.json(), educatorRouter)
app.use('/api/course', express.json(), courseRouter)
app.use('/api/user', express.json(), userRouter)
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks)

//Port
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server is Runing at port ${PORT}`)
})