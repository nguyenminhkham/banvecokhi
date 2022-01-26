import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    desc: {type: String, required: true},
    img: { type: Array, required: true },
    categories: {type: String, required: true},
    price: {type: Number, required: true},
    download: {type: String, required: true},
    users: [{ body: String, date: {type: Date, default: Date.now }}]
    // users: { type: Array, required: false }
},
{timestamps: true}
)

const Product = mongoose.model("Product", ProductSchema)
export default Product