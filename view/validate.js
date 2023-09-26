function Validate(arg) {
    ptrn = /^[A-Za-z]+$/
    console.log(arg)
    if (arg == "text") {
        const name = document.getElementsByTagName("input")[0].value
        console.log(name)
        if (name.match(ptrn) && name.length >= 3) {
            document.getElementsByTagName("input")[0].style.border = "2px solid green"
            document.querySelector('#err').innerHTML = ""
        }
        else {
            document.getElementsByTagName('input')[0].style.border = "2px solid red"
            document.getElementById('err').innerHTML = "* Name should be morethan 3 charcters white space and numerics are not allowed"
            return false
        }
    }
    if (arg == "password") {
        const password = document.getElementsByName("password")[0].value
        console.log(password);
        const pattern = /^[A-Za-z\d@$!%*?&]{8,}$/;

        if (pattern.test(password)) {
            document.getElementsByName("password")[0].style.border = "2px solid green"
            document.querySelector('#err').innerHTML = ""
        } else {
            document.getElementsByName('password')[0].style.border = "2px solid red"
            document.getElementById('err').innerHTML = "* Password must be Combination of atleast one lowercase, uppercase, numberic and speacial characters"
            return false
        }
    }
    if (arg == "email") {
        const email = document.getElementsByName("email")[0].value
        console.log(email)
        if (email.indexOf("@") <= 0) {
            document.getElementById('err').innerHTML = "Enter Valid Email";
            document.getElementsByName('email')[0].style.border = "2px solid red";
            return false;
        }
        else if (email.charAt(email.length - 4) != "." && email.charAt(email.length - 3) != ".") {
            document.getElementById('err').innerHTML = "Enter Valid Email";
            document.getElementsByName('email')[0].style.border = "2px solid red";
            return false;
        }
        else {
            document.getElementById('err').innerHTML = "";
            document.getElementsByName('email')[0].style.border = "2px solid green";
        }
    }
    if (arg == "url") {
        const pattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?([a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=-]*)$/;
        const url = document.getElementsByName("url")[0].value
        console.log(url)
        if (pattern.test(url)) {
            document.getElementsByName("url")[0].style.border = "2px solid green"
            document.querySelector('#err').innerHTML = ""
        }
        else {
            document.getElementsByName('url')[0].style.border = "2px solid red"
            document.getElementById('err').innerHTML = "* Enter valid URL"
            return false
        }
    }
    if(arg == "tel"){
        const tel=document.getElementsByName("tel")[0].value
        const cleanedPhoneNumber = tel.replace(/\D/g, "")
        if(cleanedPhoneNumber.length !=10 ){
            document.getElementsByName('tel')[0].style.border = "2px solid red"
            document.getElementById('err').innerHTML = "* Enter valid number"
            return false
        }
        else{
            document.getElementsByName("tel")[0].style.border = "2px solid green"
            document.querySelector('#err').innerHTML = ""
        }
    }

}