document
    .getElementById("registroForm")
    .addEventListener("submit", function(event) {
        event.preventDefault();
  
        // Obtener valores de los campos del formulario
        const nombre = document.getElementById("nombre").value;
        const apellidos = document.getElementById("apellidos").value;
        const direccion = document.getElementById("direccion").value;
        const genero = document.getElementById("genero").value;
        const tipoDocumento = document.getElementById("tipoDocumento").value;
        const numeroDocumento = document.getElementById("numeroDocumento").value;
        const telefono = document.getElementById("telefono").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const passwordValid= document.getElementById("passwordValid").value;
        //comparar contraseñas
        if (password !== passwordValid) {
            alert("Las contraseñas no coinciden");
            return;
        }

        // Almacenar datos en localStorage
        const userData = {
            nombre,
            apellidos,
            direccion,
            genero,
            tipoDocumento,
            numeroDocumento,
            telefono,
            email,
            password, // Nota: No es seguro almacenar contraseñas en localStorage en aplicaciones reales
            cuentaCorriente: {
                saldo: 0,
                transacciones: [],
                accountNumber: Math.floor(Math.random() * 1000000000)
            },
            cuentaAhorros: {
                saldo: 0,
                transacciones: [],
                accountNumber: Math.floor(Math.random() * 1000000000)
            },
        };
        
        const listUsers = JSON.parse(localStorage.getItem("registroUsuarios")) || [];
        // validar si la cedula ya existe
        const userExists = listUsers.find(user => user.numeroDocumento === numeroDocumento);
        if (userExists) {
            alert("El usuario ya se encuentra registrado");
            return;
        }
        // validar si el correo ya existe
        const emailExists = listUsers.find(user => user.email === email);
        if (emailExists) {
            alert("El correo ya se encuentra registrado");
            return;
        }
        listUsers.push(userData);
        localStorage.setItem("registroUsuarios", JSON.stringify(listUsers));

        // Redireccionar a la página de inicio de sesión que es ingreso/index.html
        window.location.href = "../ingreso/index.html";

        // alert("Registro exitoso!");
        // document.getElementById("registroForm").reset();
  });

  document.addEventListener("DOMContentLoaded", () => {
    const listUsers = JSON.parse(localStorage.getItem("registroUsuarios")) || [];
    console.log(listUsers);
  });