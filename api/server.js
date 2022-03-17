import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routers/userRouter.js'
import productRouter from './routers/productRouter.js'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import authRouter from './routers/authRouter.js'
import mysql from 'mysql'
import cookieParser from 'cookie-parser'
dotenv.config()


const app = express()

app.use(morgan('combined'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

mongoose.connect(process.env.MONGO_url)
.then(() => console.log("DBConnection Successfully"))
.catch((err) => {
    console.log(err)
})

export const connection = mysql.createConnection({
    host: 'localhost',
    user: 'kham',
    password: '*5kc77z25v',
    database: 'banvecokhi'
})

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/auth', authRouter)

app.get('/', (req, res) => {
    res.send('Server is ready')
})

app.use((err, req, res, next) => {
    res.status(500).send({message: err.message})
})

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server at https://banvecokhi.com:${port}`)
})