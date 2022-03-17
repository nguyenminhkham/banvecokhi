import User from "../models/userModel.js"
import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import data from '../data.js'
import { generateToken } from '../utils.js'
import sendMail from '../controllers/sendMail.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import {google} from 'googleapis'
dotenv.config()

const {CLIENT_URL} = process.env
const {OAuth2} = google.auth
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

let refreshTokens = []

const userCtrl = {
    getallusers: expressAsyncHandler(async (req, res) => {
        const createdUsers = await User.find(req.body)
        res.send({createdUsers})
        // res.send(data.users)
    }),

    signin: async (req, res) => {
        const user = await User.findOne({email: req.body.email})
        if(user){
            if(bcrypt.compareSync(req.body.password, user.password)){

                const refreshToken = createRefreshToken({id: user._id, email: user.email, isAdmin: user.isAdmin, isAuth: user.isAuth, money: user.money, products: user.products})

                    res.cookie('refreshToken', refreshToken, {
                        httpOnly: true,
                        secure:false,
                        path: '/',
                        sameSite: 'strict'
                        // maxAge: 7*24*60*60*1000
                    })
                    const accessToken = createAccessToken({id: user._id, email: user.email, isAdmin: user.isAdmin, isAuth: user.isAuth, money: user.money, products: user.products})
                refreshTokens.push(refreshToken)
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    isAuth: user.isAuth,
                    accessToken: accessToken,
                    money: user.money,
                    products: user.products,
                })
                // return res.status(200).json({accessToken})
            }
        }
        // return res.status(401).send({message: 'Invalid email or password'})
    },

    signin_google: async (req, res) => {
        try {
            const {tokenId} = req.body
    
            const verify = await client.verifyIdToken({idToken: tokenId, audience: process.env.MAILING_SERVICE_CLIENT_ID})
    
            const {email_verified, email, name, picture} = verify.payload
    
            const password = email + process.env.GOOGLE_SECRET
    
            const passwordHash = await bcrypt.hash(password, 12)
    
            if(!email_verified) return res.status(400).json({msg: "Email varification failed."})
    
            // if (email_verified) {
                const user = await User.findOne({email})
    
                if(user) {
                    const isMatch = await bcrypt.compare(password, user.password)
                    if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})
    
                        
                    const refreshToken = createRefreshToken({id: user._id, email: user.email, isAdmin: user.isAdmin, isAuth: user.isAuth, money: user.money, products: user.products})

                    res.cookie('refreshToken', refreshToken, {
                        httpOnly: true,
                        secure:false,
                        path: '/',
                        // maxAge: 7*24*60*60*1000
                    })
                    const accessToken = createAccessToken({id: user._id, email: user.email, isAdmin: user.isAdmin, isAuth: user.isAuth, money: user.money, products: user.products})
                    res.send({
                        // _id: user._id,
                        name: user.name,
                        // email: user.email,
                        // isAdmin: user.isAdmin,
                        // isAuth: user.isAuth,
                        // token: generateToken(user),
                        // money: user.money,
                        // products: user.products,
                        accessToken: accessToken
                    })
                    return res.json({msg: "Login success!"})
                // }
            } else {
                const user = new User ({
                    name, email, password: passwordHash, money: 1000000
                })
    
                const createdUser = await user.save()
            res.send({
                _id: createdUser._id,
                name: createdUser.name,
                email: createdUser.email,
                isAdmin: createdUser.isAdmin,
                token: generateToken(createdUser),
                money: createdUser.money,
            })
            
            const refresh_token = createAccessToken({id: user._id, email: user.email, isAdmin: user.isAdmin, isAuth: user.isAuth, money: user.money, products: user.products})
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    secure:true,
                    path: '/api/users/refresh_token',
                    maxAge: 7*24*60*60*1000
                })
                res.json({msg: "Login success!"})
    
            }
    
        } catch (err) {
            // return res.status(500).json({msg: err.message})
        }
    },

    register: expressAsyncHandler(async (req, res) => {
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
    ),

    activation: expressAsyncHandler(async (req, res) => {
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
    ),

    requestRefreshToken: async(req, res) => {
        const refreshToken = req.cookies.refreshToken
        // console.log(refreshToken)
        if (!refreshToken) return res.status(401).json('You\'re not authenticated')
        // if(!refreshTokens.includes(refreshToken)){
        //     return res.status(403).json('Refresh token is not valid')
        // }
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if(err){
                console.log(err)
            }
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
            const newAccessToken = createAccessToken({id: user.id, email: user.email, isAdmin: user.isAdmin, isAuth: user.isAuth, money: user.money, products: user.products})
            const newRefreshToken = createRefreshToken({id: user.id, email: user.email, isAdmin: user.isAdmin, isAuth: user.isAuth, money: user.money, products: user.products})
            refreshTokens.push(newRefreshToken)
            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict'
            })
            res.status(200).json({accessToken: newAccessToken})
        })
    },
}

const validateEmail = (email) => {
    return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
)}

const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '5m'})
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1m'})
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

export default userCtrl