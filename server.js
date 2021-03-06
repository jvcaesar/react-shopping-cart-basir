const express = require('express')
const mongoose = require('mongoose')
const shortid = require('shortid')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
app.use(bodyParser.json())

console.log('before db:', process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, () => { console.log('connected to mongoDB1')})

const Product = mongoose.model(
    'products',
    new mongoose.Schema({
        _id:            { type: String, default: shortid.generate },
        image:          String,
        title:          String,
        description:    String,
        availableSizes: [String],
        price:          Number
    })
)

app.get('/api/products', async (req, res) => {
    const products = await Product.find({})
    res.send(products)
})

app.post('/api/products', async (req, res) => {
    const newProduct = new Product(req.body)
    const savedProduct = await newProduct.save()
    res.send(savedProduct)
})

app.delete('/api/products/:id', async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)
    res.send(deletedProduct)
})

// Order model
const Order = mongoose.model(
    'order',
    new mongoose.Schema({
        _id:        { type: String, default: shortid.generate },
        email:      String,
        name:       String,
        address:    String,
        total:      Number,
        cartItems: [{
            _id:    String,
            title:  String,
            price:  Number,
            count:  Number
        }]
    },
    {
        timestamps:  true
    })
)

// order creation API
app.post('/api/orders', async (req, res) => {
    console.log('post request: ', req.body)
    if (
        !req.body.email ||
        !req.body.name ||
        !req.body.address ||
        !req.body.total ||
        !req.body.cartItems
    ) {
        return res.send({ message: 'Data is required.'})
    }
    const order = await Order(req.body).save()
    res.send(order)
})

app.get("/api/orders", async (req, res) => {
    const orders = await Order.find({})
    res.send(orders);
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`server started at http://localhost:${port}`))
