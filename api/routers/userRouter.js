import express, { response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import data from '../data.js'
import User from '../models/userModel.js'
import { generateToken } from '../utils.js'
import sendMail from '../controllers/sendMail.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const {CLIENT_URL} = process.env
const userRouter = express.Router()

userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    const createdUsers = await User.find(req.body)
    res.send({createdUsers})
}))

userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({email: req.body.email})
    if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user),
                money: user.money,
            })
            return
        }
    }
    res.status(401).send({message: 'Invalid email or password'})
}))

userRouter.post(
    '/register',
    // expressAsyncHandler(async (req, res) => {
    //     const user = new User({
    //         name: req.body.name,
    //         email: req.body.email,
    //         money: 1000000,
    //         password: bcrypt.hashSync(req.body.password, 8),
    //     })
    //     const createdUser = await user.save()
    //     res.send({
    //         _id: createdUser._id,
    //         name: createdUser.name,
    //         email: createdUser.email,
    //         isAdmin: createdUser.isAdmin,
    //         token: generateToken(createdUser),
    //         money: createdUser.money,
    //     })
    // })

    expressAsyncHandler(async (req, res) => {
        try {
            const {name, email, password, confirmpassword} = req.body

            if(!name || !email || !password || !confirmpassword)
                return res.status(400).json({msg: "Vui lòng điền đầy đủ thông tin!"})

            if(password !== confirmpassword)
                return res.status(400).json({msg: "Mật khẩu không trùng khớp!"})

            if(!validateEmail(email))
                return res.status(400).json({msg: "Email không hợp lệ"})

            const user = await User.findOne({email})
            if(user){
                return res.status(400).json({msg: "Email đã tồn tại"})
            }

            if(password.length < 6)
                return res.status(400).json({msg: "Mật khẩu phải từ 6 ký tự trở lên"})

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = {
                name, email, password: passwordHash
            }

            const activation_token = createActivationToken(newUser)

            const url = `${CLIENT_URL}/user/activate/${activation_token}`

            sendMail(email, url, "Xác nhận email của bạn")

            res.json({msg: "Đăng ký thành công! Vui lòng xác nhận địa chỉ email để hoàn tất."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
))

userRouter.post(
    '/activation',
    expressAsyncHandler(async (req, res) => {
        try {
            const {activation_token} = req.body
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

            const {name, email, password, money = 1000000} = user

            const check = await User.findOne({email})
            if(check) return res.status(400).json({msg: "Email đã tồn tại!"})

            const newUser = new User({
                name, email, password, money
            })

            await newUser.save()

            res.json({msg: "Đăng ký tài khoản thành công!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
))

const validateEmail = (email) => {
    return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
)}

const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '10m'})
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

export default userRouter

