function login(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    let username = form.username;
    let password = form.password;
    if(username == "Admin" && password == "Admin"){
        window.location = "admin.html";
    }
    else{
        alert("Usuario o contraseña incorrectos");
    }
}