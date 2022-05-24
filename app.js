const express =require("express")
const socket=require("socket.io")


const app=express()//Intialise app and server ready 
app.use(express.static("public"))
let port =5000
let server=app.listen(port,()=>{
    console.log("listening to port "+port)
})



let io=socket(server)


io.on("connection",(socket)=>{
    console.log("made connection with  ")
    console.log(socket)
})
app.get('/', function(req, res, next) {
    // // app.use(express.static("public"))
    // console.log("hello world")
    res.sendfile("public/canvas.html")
});

