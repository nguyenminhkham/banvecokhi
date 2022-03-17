import express, { response } from 'express'
import userCtrl from '../controllers/user.js'

const userRouter = express.Router()

userRouter.get('/seed', userCtrl.getallusers)
userRouter.post('/signin', userCtrl.signin)
userRouter.post('/signin_google', userCtrl.signin_google)
userRouter.post('/register', userCtrl.register)
userRouter.post('/activation', userCtrl.activation)
userRouter.post('/refresh_token', userCtrl.requestRefreshToken)

export default userRouter

