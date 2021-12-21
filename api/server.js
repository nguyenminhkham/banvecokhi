import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routers/userRouter.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoose.connect("mongodb+srv://minhkham:Kham98765@cluster0.8pjeq.mongodb.net/banvecokhi?retryWrites=true&w=majority")
.then(() => console.log("DBConnection Successfully"))
.catch((err) => {
    console.log(err)
})

app.use('/api/users', userRouter)

app.get('/', (req, res) => {
    res.send('Server is ready')
})

app.use((err, req, res, next) => {
    res.status(500).send({message: err.message})
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server at http://localhost${port}`)
})