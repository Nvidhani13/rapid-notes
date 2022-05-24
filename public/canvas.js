

let canvas=document.querySelector(".canvas")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pencilColor=document.querySelectorAll(".pencil-color")//!  returns node list
let pencilWidth=document.querySelector(".pencil-width")
let eraserWidth=document.querySelector(".erase-width-cont input")
let download=document.querySelector(".download")
// let redo=document.querySelector(".redo")
// let undo=document.querySelector(".undo")
let undoRedoTracker=[]//implements undo redo 
let track=0//represent which action 
let mouseDown=false
let eraserFlag=false
let penColor="red"
let penWidth=pencilWidth.value
let eraWidth=eraserWidth.value
console.log("this is consoling erser width")
console.log(eraserWidth)
let tool=canvas.getContext("2d")
tool.strokeStyle=penColor
tool.lineWidth=penWidth




canvas.addEventListener("mousedown",(event)=>{
    mouseDown=true
    // beginPath({
    //     x:event.clientX,
    //     y:event.clientY
    // })
    let data={
        x:event.clientX,
        y:event.clientY

    }
    socket.emit("beginPath",data)
})


canvas.addEventListener("mousemove",(event)=>{
    if(mouseDown){
        // drawStroke({
        //     x:event.clientX,
        //     y:event.clientY
        // })
        let data={
            x:event.clientX,
            y:event.clientY
        }
        
    socket.emit("drawStroke",data)

    }
    
})
canvas.addEventListener("mouseup",(event)=>{
    mouseDown=false
    let url =canvas.toDataURL()
    undoRedoTracker.push(url)
    track=undoRedoTracker.length-1
    // console.log(undoRedoTracker)
})


function beginPath(strokeObj){
    tool.beginPath()
    tool.moveTo(strokeObj.x,strokeObj.y)
}

function drawStroke(strokeObj){
    tool.lineTo(strokeObj.x,strokeObj.y)
    tool.stroke()
}

pencilColor.forEach(colorEle => {
    colorEle.addEventListener("click",event=>{
        let color=colorEle.classList[0]
        penColor=color
        tool.strokeStyle=penColor
    })
});

pencilWidth,addEventListener("change",(event)=>{
    
    penWidth=pencilWidth.value
    
    tool.lineWidth=penWidth
})

eraserWidth.addEventListener("change",(event)=>{
     console.log("event triggered kkkkk")
    eraWidth=eraserWidth.value
    tool.lineWidth=eraWidth
    console.log(tool.lineWidth)
    


})
erase.addEventListener("click",(event)=>{
    socket.emit("eraserflag",eraserFlag)
    
})




download.addEventListener("click",(event)=>{
    let url=canvas.toDataURL()
    let a=document.createElement("a")
    a.href=url
    a.download="board.jpeg"
    a.click()
})

undo.addEventListener("click",(event)=>{
    if(track>0) track--
    let data = {
        trackValue: track,
        undoRedoTracker
    }
    socket.emit("redoUndo", data);
})




redo.addEventListener("click",(event)=>{
    if(track<undoRedoTracker.length-1) track++
    let data = {
        trackValue: track,
        undoRedoTracker
    }
    socket.emit("redoUndo", data);
})



function undoRedoCanvas(trackObject){
    console.log("undo redo function invoked ")
    track=trackObject.trackValue
    undoRedoTracker=trackObject.undoRedoTracker
    let url=undoRedoTracker[track]
    let img =new Image() //new image reference element 
    img.src=url
    img.onload=(event)=>{
        tool.drawImage(img,0,0,canvas.width,canvas.height)
    }
}


socket.on("beginPath",(data)=>{
    //data from server
    beginPath(data)//draw
})
socket.on("drawStroke",(data)=>{
    //data from server
    console.log("data recieved ")
    drawStroke(data)//draw
})
socket.on("eraserflag",(eraserFlag)=>{
    if(!eraserFlag){
        eraserFlag=true
        console.log("eraser activated ")
        tool.strokeStyle="white"
        eraseTool.style.display="block"}
        else{
            eraserFlag=false
            tool.strokeStyle=penColor
        }
})
socket.on("redoUndo",(data)=>{
    console.log("data given to frontend ")
    undoRedoCanvas(data)
})