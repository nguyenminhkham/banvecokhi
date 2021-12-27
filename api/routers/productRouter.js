import express, { Router } from 'express'
import Product from '../models/productModel.js'

const productRouter = express.Router()

//CREATE

productRouter.post("/", async (req, res) => {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err)
    }
})

productRouter.get("/", async (req, res) => {
    try {
        let products
        products = await Product.find()
        res.status(200).json(products)
    } catch(err){
        res.status(500).json(err)
    }
})
export default productRouter

//GET PRODUCT
productRouter.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            res.send(product)
        } else {
            res.status(404).send({message: 'Product not Found'})
        }
    } catch(err) {
        res.status(500).json(err)
    }
})
