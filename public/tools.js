let options=document.querySelector(".options-cont ")      //!acesses the option cont
let img=document.querySelector(".options-cont img")//!acesses the image incide option cont will toogle the image on click on option 
let toolsCont=document.querySelector(".tools-cont")
let pencilTool=document.querySelector(".pencil-tool")//!acesses the pencil tool will have pencil width and color divisions will open on clicl of pencil
let eraseTool=document.querySelector(".erase-tool")//!acesses the erase tool will have pencil width and color divisions will open on clicl of erase
let pencil=document.querySelector(".pencil")//!acesses clicking the division will open pencil tool
let erase=document.querySelector(".erase")//!acesses clicking the division will open erase tool
let sticky=document.querySelector(".sticky")
let undo=document.querySelector(".undo")
let redo=document.querySelector(".redo")
let upload=document.querySelector(".upload")




let stickyflag=false;//! sticky is not shown in beganing 


options.addEventListener("click",(e)=>{
    let image=img.getAttribute("src")
    toogle(image)//! toogles the image 
})

pencil.addEventListener("click",(e)=>{
    blockUnblock(pencilTool)//! toogle pencil tools options 
})
erase.addEventListener("click",(e)=>{
    blockUnblock(eraseTool)
})


function toogle(image){
    if(image==="./menu.svg"){
        img.setAttribute("src","./tools/cancel.png")//* changes the image to cancel on click
        openTools()
    }
    else{
        img.setAttribute("src","./menu.svg")//* changes image back to menu
        closeTools()
        
    }

}

function blockUnblock(tool){
    if(tool.style.display==="none"){
        tool.style.display="block"
    }
    else{
        tool.style.display="none"
    }
}

function openTools(){
    toolsCont.style.display="flex"
}
function closeTools(){
    toolsCont.style.display="none"
    penciltool.style.display="none"
    erasetool.style.display="none"
    
}
upload.addEventListener("click",(event)=>{
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();
    input.addEventListener("change", (e) => {
        let file = input.files[0];
        let url = URL.createObjectURL(file);
        //let imgSticky=document.createElement("div")
        let stickyTemplate = `
        <div class="sticky-headr-cont">
            <div class="minimise"></div>
            <div class="remove"></div>
        </div>
        <div class="note-cont">
            <img src="${url}"/ width="100%" height="80%">
        </div>
        `;
        let stickyCont=document.createElement("div")
    stickyCont.setAttribute("class","sticky-cont")
    stickyCont.innerHTML = stickyTemplate;
    
        stickyCont.style.display="block"
        document.body.appendChild(stickyCont)
        // stickyCont.addEventListener("mousedown",(event)=>{
            
        //     dragAndDrop(stickyCont,event)
        // })           
        
        
        
        // stickyCont.ondragstart = function () {
        //     return false;
        // };
        let minimise=stickyCont.querySelector(".minimise")
        let remove=stickyCont.querySelector(".remove")

        remove.addEventListener("click",(e)=>{
            // stickyCont.onmousedown=false  //! maybe this line has to be stopped 
            // e.stopPropagation()
            console.log("deleting sticky notes")
            stickyCont.remove()
        })
        minimise.addEventListener("click",(e)=>{
            console.log("should minimise")
            let noteCont=stickyCont.querySelector(".note-cont")
            let display=getComputedStyle(noteCont).getPropertyValue("display")
            if(display === "none"){
                noteCont.style.display="block"
                //noteCont.setAttribute("display","block")
    
            }
            else{
                noteCont.style.display="none"
            }
        })

    })
    
})

sticky.addEventListener("click",(e)=>{
    let stickyTemplate=`
    <div class="sticky-headr-cont">
        <div class="minimise"></div>
        <div class="remove"></div>
        </div>
        <div class="note-cont">
        <textarea name="" id="" cols="30" rows="10" class="sticky-text-area"></textarea>
        </div>`
        createSticky(stickyTemplate)
})

    function createSticky(stickyTemplate){
    let stickyCont=document.createElement("div")
    stickyCont.setAttribute("class","sticky-cont")
    stickyCont.innerHTML = stickyTemplate;
    
        stickyCont.style.display="block"
        document.body.appendChild(stickyCont)
        
        // let noteCont=document.querySelector(".note-cont")
        // let headCont=document.querySelector(".sticky-headr-cont")
        let minimise=stickyCont.querySelector(".minimise")
        let remove=stickyCont.querySelector(".remove")
        
        
        
        // stickyCont.onmousedown=function(event){
            
        //     dragAndDrop(stickyCont,event)
            
        // }
        
        // stickyCont.addEventListener("mousedown",(e)=>{
        //     dragAndDrop(stickyCont,e)
        // })
        // stickyCont.ondragstart = function () {
        //     return false;
        // };
        remove.addEventListener("click",(e)=>{
            // stickyCont.onmousedown=false  //! maybe this line has to be stopped 
            // e.stopPropagation()
            console.log("deleting sticky notes")
            stickyCont.remove()
        })
        minimise.addEventListener("click",(e)=>{
            console.log("should minimise")
            let noteCont=stickyCont.querySelector(".note-cont")
            let display=getComputedStyle(noteCont).getPropertyValue("display")
            if(display === "none"){
                noteCont.style.display="block"
                //noteCont.setAttribute("display","block")
    
            }
            else{
                noteCont.style.display="none"
            }
        })

    }
        
        
        
        
    

// function noteActions(minimise,remove,stickyCont){
//     remove.addEventListener("click",(e)=>{
//         // stickyCont.onmousedown=false  //! maybe this line has to be stopped 
//         // e.stopPropagation()
//         console.log("deleting sticky notes")
//         stickyCont.remove()
//     })
//     // minimise.addEventListener("click",(e)=>{
//     //     let noteCont=stickyCont.querySelector(".note-cont")
//     //     let display=getComputedStyle(noteCont).getPropertyValue("display")
//     //     if(display==="none"){
//     //         noteCont.style.display="block"

//     //     }
//     //     else{
//     //         noteCont.style.display="none"
//     //     }
//     // })

// }

function dragAndDrop(element, event) {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);

    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
        // element.style.left = pageX - element.offsetWidth / 2 + 'px';
        // element.style.top = pageY - element.offsetHeight / 2 + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the ball, remove unneeded handlers
    element.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };
    element.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };
    document.onmouseup=function(){
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    }

    
}

