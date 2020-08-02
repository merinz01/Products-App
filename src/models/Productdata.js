const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var NewProductSchema = new Schema({
    productId:Number,
    productName:String,
    productCode:String,
    releaseDate:String,
    description:String,
    price:Number,
    starRating:Number,
    imageUrl:String
});

var Productdata = mongoose.model('products', NewProductSchema);

module.exports = Productdata;