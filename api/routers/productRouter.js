import express, { json, Router } from 'express'
import Product from '../models/productModel.js'
import CryptoJS from 'crypto-js'
import expressAsyncHandler from 'express-async-handler'

const productRouter = express.Router()

//CREATE

productRouter.post("/",
    // const newProduct = new Product(req.body);

        // const savedProduct = await newProduct.save();
            async (req, res) => {
        const product = new Product({
            title: req.body.title,
            desc: req.body.desc,
            img: req.body.img,
            categories: req.body.categories,
            price: req.body.price,
            download: CryptoJS.AES.encrypt(
                req.body.download,
                process.env.PASS_SEC
            ).toString(),
        })

        try {

            const createdProduct = await product.save()
            res.send({
                _id: createdProduct._id,
                title: createdProduct.title,
                desc: createdProduct.desc,
                img: createdProduct.img,
                categories: createdProduct.categories,
                price: createdProduct.price,
                download: createdProduct.download,
            })
            res.status(200).json(createdProduct)
        } catch (err) {

        }
    })
        // res.status(200).json(savedProduct);


productRouter.get("/", async (req, res) => {
    try {
        let productsx
        productsx = await Product.find()

        const products = productsx.map(x => {
            return x = {
                _id: x._id,
                title: x.title,
                desc: x.desc,
                img: x.img,
                categories: x.categories,
                price: x.price,
            }
        })

        res.status(200).json(products)
    } catch(err){
        res.status(500).json(err)
    }
})


//GET PRODUCT
// productRouter.get("/:id", async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id)
//         if (product) {
//             res.send(product)
//         } else {
//             res.status(404).send({message: 'Product not Found'})
//         }
//     } catch(err) {
//         res.status(500).json(err)
//     }
// })

productRouter.get("/:id", async (req, res) => {
    try {

        const product = await Product.findById(req.params.id)
        if (product){

            // const message = CryptoJS.AES.encrypt('download', process.env.PASS_SEC)
            // const hashedPassword = CryptoJS.AES.decrypt(product.download, process.env.PASS_SEC)
            // const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
            // console.log(OriginalPassword)

            res.send({
                // download: Product.download.toString(crypto.enc.Utf8)
                // product
                _id: product._id,
                title: product.title,
                desc: product.desc,
                img: product.img,
                categories: product.categories,
                price: product.price,
            })
        }
    } catch (err) {}
    })

productRouter.get("/user/:id", async (req, res) => {
    try {
        let productsx
        productsx = await Product.find({'users.body': req.params.id})

        const products = productsx.map(x => {
            return x = {
                _id: x._id,
                title: x.title,
                desc: x.desc,
                img: x.img,
                categories: x.categories,
                price: x.price,
                users: x.users.filter(obj => {return obj.body === req.params.id}),
            }
        })

        res.status(200).json(products)
    } catch (err) {}
    })

productRouter.post('/addusers', expressAsyncHandler(async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate({_id: req.body.productId}, {
            //$push là add tu array nhưng k check exists, $addToSet là add if not exists
                
            //     $addToSet: {
            //         users: {body: req.body.userId}},

            // function(err) {
            //     if(err) {
            //         console.log(err);
            //         return console.log('error'); 
            //     } else {            
            //         console.log('postsuccess');
            //         res.json({response: true});
            //         }}

            // $addToSet: {
                //     users: {body: req.body.userId}},
                
            })

            const x = product.users
            let exists = false
    
            x.forEach(xx =>  {
                if (xx.body === req.body.userId) {
                    return (
                        exists = true
                    )

                }
            })
    
            // if (exists) return res.status(400).json({msg: "This email already exists."})
            if (exists) return res.send(
                res.send({
                _id: product._id,
                title: product.title,
                desc: product.desc,
                img: product.img,
                categories: product.categories,
                price: product.price,
                // download: product.download,
                // users: product.users,
            })
            )
            
        const product2 = await Product.findOneAndUpdate({_id: req.body.productId}, {
            $addToSet: {
                users: {body: req.body.userId}},

            })

            // res.send(product2)

            res.send({
                _id: product2._id,
                title: product2.title,
                desc: product2.desc,
                img: product2.img,
                categories: product2.categories,
                price: product2.price,
                // download: product2.download,
                // users: product2.users,
            })
            return

    } catch (err) {}
}))

productRouter.post('/deleteusers', expressAsyncHandler(async (req, res) => {
    try {
            const product = await Product.findOneAndUpdate({_id: req.body.productIdx}, {
                $pull: {
                    users: {_id: req.body.userIdx}},
            })
            // console.log(product);
                res.send({product})
                // res.render('downloads')
    } catch (err) {res.status(400).json({msg: err.message})}
}))

productRouter.post('/downloads', expressAsyncHandler(async (req, res) => {
    try {
        let product
        product = await Product.findOne({_id: req.body.productId})
        if (product) {
            const user = product.users.map(x => {

                    if (x.body === req.body.userId) {
                    // res.json(x.body)
                    const hashedPassword = CryptoJS.AES.decrypt(product.download, process.env.PASS_SEC)
                    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
                    // console.log(OriginalPassword)

                    res.download(`./downloads/${OriginalPassword}`)
                    }
                    return
                })

            // res.json(product)
            }
        } catch (err) {
            res.status(400).json({msg: err.message})
    }
}))

export default productRouter