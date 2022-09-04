function requiredFieldEmail() {
    document.getElementById("email").classList.add("is-invalid");
}
function requiredFieldPass() {
    document.getElementById("password").classList.add("is-invalid");
}
function resetEmailField(){
    document.getElementById("email").classList.remove("is-invalid");
}
function resetPasswordField(){
    document.getElementById("password").classList.remove("is-invalid");
}


function login(){

    let email=document.getElementById("email").value;
    let password=document.getElementById("password").value;

    if (email == ""){
        requiredFieldEmail();
    }else{
        resetEmailField()
    }
    if (password == ""){
        requiredFieldPass();
    }else{
        resetPasswordField()
    }
    if (email != "" && password != ""){
        window.localStorage.setItem("user",email)
        location.href = "inicio.html" 
     }
    
}

document.addEventListener('DOMContentLoaded' , function () {
    document.getElementById('regBtn').addEventListener ('click', function () {
            login();
        });
    })

