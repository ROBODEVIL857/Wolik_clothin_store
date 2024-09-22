const express = require('express');
require('dotenv').config();
const cors = require('cors');

const dbconnect = require('./Database/dbConnect');
const productRoute = require('./routes/product.route');
const brandRoute = require('./routes/brand.route');
const categoryRoute = require('./routes/category.route');
const orderRoute = require('./routes/shipping.route');
const userRoute = require('./routes/user.route');
const blogRoute = require('./routes/blog.route');
const port = process.env.PORT || 8080;
const reviewRoute = require('./routes/review.route');
const paymentRoute = require('./routes/payment.route');

const app = express();
app.use(express.json());
app.use(cors());
// app.use(express.urlencoded({ extended: true }));

dbconnect();

app.get('/', (req, res) => {
    res.send("Wolik Одяг...");
})


app.use('/image', express.static('image'))
app.use('/products', productRoute)
app.use('/brands', brandRoute)
app.use('/blogs', blogRoute)
app.use('/categories', categoryRoute)
app.use('/orders', orderRoute)
app.use('/users', userRoute)
app.use('/reviews', reviewRoute)
app.use('/payment', paymentRoute)

app.listen(port, () => {
    console.log(`App is running on port http://localhost:${port} front - http://localhost:3000`.white.bold);
})