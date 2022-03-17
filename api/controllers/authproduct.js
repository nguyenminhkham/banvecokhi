import Product from "../models/productModel.js"
import { connection } from "../server.js"
import utf8 from 'utf8'


const authCtrl = {
    uploadfile: (req, res ) => {
        const x = Object.assign(req.file, req.body)
        console.log(x)
        return res.status(200).json(x)
    },
    description: async (req, res) => {
        const x = req.body
        // const xx = x.replace(/\\n/g, "")
        utf8.encode(x)
        // const xx = x.slice(0, -1)
        // const xxx = xx.substring(1)

        console.log(x)
        // connection.connect()
        // connection.query('UPDATE products SET productscol = ? WHERE ID = ?', [x, id], function(error, result, fields){
        //     if (error) throw error
        // })
        const product = new Product({
            title: 'title1',
            desc: x,
            img: 'img',
            categories: 'catrgories',
            price: 10,
            download: 'ds'
        })
        const createProduct = await product.save()
        res.status(200)
    }
}

export default authCtrl