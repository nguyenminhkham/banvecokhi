import express, { json, Router } from 'express'
import authCtrl from '../controllers/authproduct.js'
import multer from "multer"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // console.log(req.body.uuid)
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({storage: storage})

const authRouter = express.Router()

authRouter.post('/product', upload.single('file'), authCtrl.uploadfile)
authRouter.post('/description', authCtrl.description)

export default authRouter