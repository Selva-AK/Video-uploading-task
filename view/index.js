//  ptrn = /^[A-Za-z]+$/
//  function fnameValidate() {
//     const fname = document.querySelector('#firstname').value
//     // console.log(fname+lname+email)
   

//     if (fname.match(ptrn) && fname.length>=3) {
//         document.getElementById('firstname').style.border = "2px solid green"
//         document.querySelector('#errfname').innerHTML = ""
//     }
//     else {
//         document.querySelector('#firstname').style.border = "2px solid red"
//         document.querySelector('#errfname').innerHTML = "* Firstname should be morethan 3 charcters white space and numerics are not allowed"
//         return false
//     }
// }
// function lnameValidate() {
//     const lname = document.querySelector('#lastname').value
//     if (lname.match(ptrn)&& lname.length>=3) {
//         document.getElementById('lastname').style.border = "2px solid green"
//         document.querySelector('#errlname').innerHTML = ""
//     }
//     else {
//         document.querySelector('#lastname').style.border = "2px solid red"
//         document.querySelector('#errlname').innerHTML = "*lastname should be morethan 3 charcters white space and numerics are not allowed"
//         return false
//     }
// }
// function emailValidate(){
//     const email = document.querySelector('#email').value
//     if (email.indexOf("@") <= 0) {
//         document.getElementById('erremail').innerHTML="Enter Valid Email";
//         document.getElementById('email').style.border="2px solid red";
//         return false;
//     }
//     else if (email.charAt(email.length - 4) != "." && email.charAt(email.length - 3) != ".") {
//         document.getElementById('erremail').innerHTML="Enter Valid Email";
//         document.getElementById('email').style.border="2px solid red";
//         return false;
//     }
//     else {
//         document.getElementById('erremail').innerHTML="";
//         document.getElementById('email').style.border="2px solid green";
//     }
// }
// function addValidate(){
//     const add=document.querySelector("#address").value
//     console.log(add)
//     if(add.length<20){
//         document.getElementById('erradd').innerHTML="Address should morethan 20 characters";
//         document.getElementById('address').style.border="2px solid red";
//         return false
//     }
//     else{
//         document.getElementById('erradd').innerHTML="";
//         document.getElementById('address').style.border="2px solid green";
//     }
// }

document.addEventListener("DOMContentLoaded", () => {
    const dragDropArea = document.getElementById("drag-drop-area");
    const videoInput = document.getElementById("video");
    console.log(dragDropArea)

    dragDropArea.addEventListener('dragover', (event) => {
        event.preventDefault();
        document.getElementById("msg").innerHTML = "DROP TO UPLOAD VIDEO"
        dragDropArea.classList.add("onhover")
        dragDropArea.classList.remove("onover")
    });

    dragDropArea.addEventListener('dragleave', () => {
        document.getElementById("msg").innerHTML = "DRAG AND DROP VIDEO HERE TO UPLOAD"
        dragDropArea.classList.add("onover")
        dragDropArea.classList.remove("onhover")
    });

    dragDropArea.addEventListener('drop', (event) => {
        event.preventDefault();
        // dragDropArea.classList.add('drag-drop-container');
        dragDropArea.classList.remove("onover")
        dragDropArea.classList.remove("onhover")
        const file = event.dataTransfer.files[0];

        if(file.type.startsWith('video/')){
        document.getElementById("msg").innerHTML = `<p>${file.name}</p>`
        const newFileList = new DataTransfer();
        newFileList.items.add(file);
        videoInput.files = newFileList.files;
    }
    else {
        document.getElementById("msg").innerHTML="Invalid file type."
        return false
    }

    });
})