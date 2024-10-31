// import Cliente from "./Cliente";
// import Cuenta from "./Cuenta";

const saldo = document.getElementById("mi-saldo-actual");

const listUsers = localStorage.getItem("registroUsuarios");
const userSesion = localStorage.getItem("userSession");

// buscar el usuario en el listado de usuarios
const user = JSON.parse(listUsers).filter((user) => user.email === userSesion);
console.log('user', user);

saldo.textContent = "Saldo actual: ";