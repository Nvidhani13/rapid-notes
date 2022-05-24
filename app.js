const express =require("express")
const socket=require("socket.io")//realtime dataflow 


const app=express()//Intialise app and server ready 
 app.use(express.static("public"))
let port =3000
let server=app.listen(port,()=>{
    console.log("listening to port "+port)
})



 let io=socket(server)


io.on("connection",(socket)=>{
    console.log("made socket connection  ")
    socket.on("beginPath",(data)=>{
        //transfer to all connected nodes
        io.sockets.emit("beginPath",data)
    })
    socket.on("drawStroke",(data)=>{
        //transfer to all connected nodes
        io.sockets.emit("drawStroke",data)
    })
    socket.on("eraserflag",(eraserFlag)=>{
        //transfer to all connected nodes
        io.sockets.emit("eraserflag",eraserFlag)
    })
    socket.on("redoUndo",(trackObject)=>{
        console.log("data recieved by frontend ")
        io.sockets.emit("redoUndo",data)
    })
    

})
app.get('/', function(req, res, next) {
    app.use(express.static("public"))
    console.log("hello world")
    res.sendfile("public/canvas.html")
});
