

const express =require("express");
const morgan =require("morgan");
const mongoose = require("mongoose");
const User = require("./models/user");
const bodyParser= require("body-parser");
const userRoutes = require("./routes/userRoutes")

const app =express();
mongoose.connect("mongodb://localhost:27017/nodeApi");

var db = mongoose.connection;

db.on('error', console.error.bind(console, "connection error"));

db.on('open', function(){
    console.log("connected");
})

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.all((req, res, next)=>{
    res.header("Acces-Control-Allow_Origin", "*");
    res.header("Acces-Control-Allow_Headers","*");
    if(req.method === "OPTION"){
        res.header("Acces-Control-Allow-Methods", "PUT", "POST", "DELETE");
    }
    next();
})


app.use("/user", userRoutes);

app.use((req, res, next)=>{
    const error =new Error ("Not Found");
    error.status=404;
    next(error);

})

app.use((error, req, res, next)=>{
    res.status (error.status||500);
    res.json({
        error:{
            message: error.message
        }
    });
});

app.use("/",(req, res)=>{
    res.status(200).json({
        "message":"Default response on main route"
    })
})


module.exports= app;