const express = require('express');
const dotevn = require("dotenv");
dotevn.config()
const cookie_paser = require("cookie-parser");
const body_parser = require("body-parser")
const cors = require("cors")
const morgan = require("morgan");
const App = express();
const http=require('http');
const {Server} = require("socket.io");
const server = http.createServer(App);
console.log(process.env.URLCLIENT)

const io= new Server(server,{})
dotevn.config();
App.use(cors({
    origin: process.env.URLCLIENT,
    credentials: true,
}))

App.use(cookie_paser());
App.use(morgan("common"));
App.use(express.json());
App.use(express.urlencoded({extended: false}));
App.use(body_parser.json({
    limit: "50mb"
}));

io.on("connection",(socket)=>{
    console.log(`co nguoi vua ket noi voi soker: ${socket}`);
})

App.get("/",(req,res)=>{
    res.send("welcome in websoket ");
})

App.listen(process.env.PORT,(req,res)=>{
       
       console.log(`APP is listening in port ${process.env.PORT}`)
})