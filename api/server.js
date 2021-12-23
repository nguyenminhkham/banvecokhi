import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routers/userRouter.js'
import productRouter from './routers/productRouter.js'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoose.connect("mongodb+srv://minhkham:Kham98765@cluster0.8pjeq.mongodb.net/banvecokhi?retryWrites=true&w=majority")
.then(() => console.log("DBConnection Successfully"))
.catch((err) => {
    console.log(err)
})

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)

app.get('/', (req, res) => {
    res.send('Server is ready')
})

app.use((err, req, res, next) => {
    res.status(500).send({message: err.message})
})

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server at http://localhost${port}`)
})