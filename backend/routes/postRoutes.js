const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const jwt=require("jsonwebtoken");
const nodemailer = require('nodemailer');
const jwtSecret="wewr32vsdfgswfwr2343ert";
//dbconnection 
const db = "mongodb://localhost:27017/pizza";
const connectDB = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true });
        console.log("MongoDB connected")
    }
    catch (err) {
        console.log(err.message);
    }
}
connectDB();
//end
const displaymodel = require('../db/displaySchema')
const ordersmodel = require('../db/OrdersSchema')
const registermodel= require('../db/RegisterSchema')

function autenticateToken(req,res,next){
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];
    console.log(token)
    if(token==null){
        res.json({"err":1,"msg":"Token not match"})
    }
    else {
        jwt.verify(token,jwtSecret,(err,data)=>{
            if(err){
                res.json({"err":1,"msg":"Token incorrect"})
            }
            else {
                console.log("Match")
                next();
            }
        })
    }
}

router.post("/adduser",(req,res)=>{
    let ins = new registermodel({ name: req.body.name, mobile: req.body.mobile,email:req.body.email,password:req.body.password });
    ins.save((err) => {
        if (err) {
            console.log(err)
            res.send("Already Added")
        }
        else {
            res.send("ok")
        }
    })
    
})

router.post("/login",(req,res)=>{
    let name = req.body.name;
    let email=req.body.email;
    let password=req.body.password;
    registermodel.findOne({name:name,email:email,password:password},(err,data)=>{
        if(err){
            res.json({"err":1,"msg":"Email or password is not correct"})
        }
        else if(data==null)
        {
            res.json({"err":1,"msg":"Email or password is not correct"})
        }
        else {
            let payload={
                uid:name
            }
            const token=jwt.sign(payload,jwtSecret,{expiresIn:360000})
            res.json({"err":0,"msg":"Login Success","token":token})
        }
    })
})

router.get("/fetchpost",autenticateToken,(req, res) => {
    displaymodel.find({}, (err, data) => {
        if (err) throw err;
        res.json({ "err":0,'data': data })
    })
})

router.get("/fetchorders",autenticateToken,(req, res) => {
    ordersmodel.find({}, (err, data) => {
        if (err) throw err;
        res.json({ "err":0,'data': data })
    })

})
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "panikeraparna@gmail.com",
        pass: 'suryaponnu'
    }
});

router.post("/addorder",(req, res) => {
    
    console.log(req.body.cart)
    let name = [];
    let price=0;
    for (let i = 0; i < req.body.cart.length; i++) 
    {
             price=price+req.body.cart[i].price;
        if (i != (req.body.cart.length - 1)) {
            name.push(req.body.cart[i].name + ",")           
        }
        else if (i = (req.body.cart.length - 1)) {
            name.push(req.body.cart[i].name)
        }
    }
    let ins = new ordersmodel({ name: name, card: req.body.card,price:price,user:req.body.user });
    ins.save((err) => {
        if (err) {
            console.log(err)
            res.send("Already Added")
        }
        else {
            res.send("ok")
        }
    })
    
    let mailDetails = {
        from: 'panikeraparna@gmail.com',
        to: 'ashwathyraghunath@gmail.com',
        subject: 'Pizza Order Placed!',
        text:'Your Order Placed Successfully. Visit again:)',
        html: `<!DOCTYPE html>
<html>
<head>
<style>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;

}
</style>
</head>
<body>
<img src="https://img.pikbest.com/templates/20210702/bg/afef52061728b8e025a03da8b940ccbe_42575.png!bw340"/>
<h1 className="text-success">Your Order Placed Successfully. Please Visit again:)</h1>

<table style="width:60%">
<tr>
<th>Ordered Items</th>
<th>Total Price</th>
</tr>
  <tr>
  <td>${name}</td>
  <td>Rs. ${price}</td>
</tr>
  
</table>
</body>
</html> `
    };

    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
        }
    });

})

module.exports = router;