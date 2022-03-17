import express, { json, Router } from 'express'
import productCtrl from '../controllers/products.js'
import userCtrl from '../controllers/user.js'
import middlewareController from '../middleware/auth.js'
// import authCtrl from '../controllers/authproduct.js'
// import multer from "multer"

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// })
// const upload = multer({storage: storage})

const productRouter = express.Router()

productRouter.post("/", productCtrl.uploadproduct)
productRouter.get("/", productCtrl.getallproducts)
productRouter.get("/:id", productCtrl.getproduct)
productRouter.get("/user/:id", productCtrl.getuserid)
productRouter.post('/addusers', middlewareController.verifyToken, productCtrl.addusers)
productRouter.post('/deleteusers', productCtrl.deleteusers)
productRouter.post('/downloads', productCtrl.downloads)
// productRouter.post('/auth/product', upload.single('file'), authCtrl.uploadfile)

export default productRouter