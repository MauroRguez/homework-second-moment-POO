
//js ventana 


document.getElementById('tipoTransaccion').addEventListener('change', function() {
    const tipoTransaccion = this.value;
    const transaccionOpciones = document.getElementById('transaccionOpciones');
    const submitBtn = document.getElementById('submitBtn');
    const accountInfo = document.getElementById('accountInfo');

    if (tipoTransaccion === 'saldo') {
        // Ocultar las demás opciones del formulario
        transaccionOpciones.style.display = 'none';

        // Mostrar saldo al hacer clic en el botón Enviar
        submitBtn.addEventListener('click', function(event) {
            event.preventDefault();
            mostrarSaldo();
        });
    } else if (tipoTransaccion === 'deposito') {
        // Mostrar las demás opciones del formulario
        transaccionOpciones.style.display = 'block';
        // Ocultar el campo "Número de cuenta destino"
        cuentaDestino.style.display = 'none';

        // Remover el evento click del botón Enviar para evitar múltiples bindings
        const newSubmitBtn = submitBtn.cloneNode(true);
        submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);
    }else if (tipoTransaccion === 'retiro') {
        // Mostrar las demás opciones del formulario
        transaccionOpciones.style.display = 'block';
        // Ocultar el campo "Número de cuenta destino"
        cuentaDestino.style.display = 'none';

        // Remover el evento click del botón Enviar para evitar múltiples bindings
        const newSubmitBtn = submitBtn.cloneNode(true);
        submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);
    }
    
    else if (tipoTransaccion === 'transferencia') {
        // Mostrar las demás opciones del formulario
        transaccionOpciones.style.display = 'block';

        // Remover el evento click del botón Enviar para evitar múltiples bindings
        const newSubmitBtn = submitBtn.cloneNode(true);
        submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);
    }
});

function mostrarSaldo() {
    // Supongamos que obtienes los datos del cliente desde el localStorage
    const userData = JSON.parse(localStorage.getItem('registroUsuarios'));

    console.log('Datos del cliente obtenidos del localStorage:', userData);

    if (userData) {
        const cliente = new Cliente(
            userData.nombre,
            userData.apellido,
            userData.direccion,
            userData.idCliente,
            userData.saldo // Si tienes un saldo almacenado
        );

        console.log('Cliente creado:', cliente);

        // Mostrar saldo
        const accountInfo = document.getElementById('accountInfo');
        accountInfo.innerHTML = `<p>Tu saldo actual es: ${cliente.consultaSaldo()}</p>`;
    } else {
        alert('No se encontraron datos del cliente.');
    }
}