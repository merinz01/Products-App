const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// var ObjectId = mongoose.Types.ObjectId();

const jwt = require ('jsonwebtoken');

const User = require('../models/user'); 
const ProductData = require('../models/Productdata');


const db = 'mongodb+srv://user_products:pro@mycluster.o8bqc.mongodb.net/productsDB?retryWrites=true&w=majority';

mongoose.connect(db,function(err){
    if (err){
        console.log('CONNECTION ERROR' + err)
    } else {
        console.log('Connected to productsDB database in mongodb')
    }
});


function verifyToken(req ,res, next){
    if (!res.headers.authorization){
        return res.status(401).send('Unauthorized access')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null'){
        alert('user not available')
        return res.status(401).send('Unauthorised Access')  
    }
        let payload = jwt.verify(token,'secretKey')
        if (!payload){
        return res.status(401).send('Unauthorised Access')
        }
        req.userId = payload.subject
        next()
        
    }



router.get('/',(req,res)=>{
    res.send("Hello from Api")
});

router.get('/products',(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE,OPTIONS");

    ProductData.find()
     .then((products)=>{
            res.send(products);
        });

});

router.post('/add',(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods:GET,POST,PUT,PATCH,DELETE,OPTIONS");
    console.log(req.body);

    var product = {
        productId:req.body.product.productId,
        productName:req.body.product.productName,
        productCode:req.body.product.productCode,
        releaseDate:req.body.product.releaseDate,
        description:req.body.product.description,
        price:req.body.product.price,
        starRating:req.body.product.starRating,
        imageUrl:req.body.product.imageUrl,
    }
    
    var product = new ProductData(product);
    product.save()

});



router.get('/edit/:id',function(req,res){

   ProductData.findById(req.params.id,(err,data)=>{
       if (!err) {return res.send(data)}
       else { console.log('Error in retireiving product details for updation')}
   });



router.post('/update/:id',function(req,res){
    ProductData.findByIdAndUpdate(req.params.id,
        { $set: req.body },
                (err,data)=>{
                    if (!err) { res.status(200).send(data);
                                console.log('Product update successfull')}
                    else { console.log('Error in product update' + err)}
                })
   })
   })

router.delete('/delete/:id',(req,res)=>{
     
  ProductData.findByIdAndDelete(req.params.id,(err,doc)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
        res.send(doc);
        console.log('deleted product');
    }
            })
})

router.post('/register',(req,res)=>{
    let userData = req.body;
    let user = new User(userData);
    user.save((err,registeredUser)=>
    {
        if (err){
            console.log(err)
        }else
            {
                let payload = {subject:registeredUser._id}
                let token = jwt.sign(payload,'secretKey')
                res.status(200).send({token})
            }
        
        
    })
})

router.post('/login', (req,res)=>
{
    let userData = req.body
    User.findOne({email:userData.email},(err,user)=>
    {
        if (err){
            
            console.log(err);
        }else
            {
                if(!user)
                {
                   res.status(401).send('Invalid Email')
                } 
                else if(user.password !== userData.password)
                {
                    // alert('Invalid Password')
                    res.status(401).send('Invalid password')
                } else {
                    let payload = {subject: user._id}
                    let token = jwt.sign(payload,'secretKey')
                    res.status(200).send({token})
                    // res.status(200).send(user)
                }
        }
    })
})

module.exports = router;

