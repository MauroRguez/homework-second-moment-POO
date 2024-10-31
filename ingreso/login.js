document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const listUsers = JSON.parse(localStorage.getItem("registroUsuarios")) || [];
    const userExists = listUsers.find(user => user.email === email && user.password === password);
    if (userExists) {
        alert("Inicio de sesión exitoso!");
        localStorage.setItem("userSession", JSON.stringify(email));
        window.location.href = "../transaccional/index.html";
    } else {
        alert("Usuario o contraseña incorrectos");
    }
})