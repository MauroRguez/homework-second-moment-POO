// import { OptionActions } from "./optionsActions.js";
import { CuentaAhorro } from "./CuentaAhorro.js";
import { CuentaCorriente } from "./CuentaCorriente.js";

// contenedores de inputs
const containerTipoCuenta = document.getElementById('containerTipoCuenta');
const containerCuentaDestino = document.getElementById('cuentaDestino');
const containerValor = document.getElementById('valor');
// inputs y selects
const tipoTransaccion = document.getElementById('tipoTransaccion');
const tipoCuenta = document.getElementById('tipoCuenta');
const cuentaDestino = document.getElementById('numeroCuentaDestino');
const valor = document.getElementById('valorMovimiento');
// botones
const buttonSend = document.getElementById('submitBtn');
// ocultar los campos desde el inicio
document.addEventListener('DOMContentLoaded', () => {
    resetPreview();
});

function resetPreview(){
    containerTipoCuenta.classList.add('d-none');
    containerCuentaDestino.classList.add('d-none');
    containerValor.classList.add('d-none');
    buttonSend.classList.add('d-none');
};

function handleBalance(){
    resetPreview();
    containerTipoCuenta.classList.remove('d-none');
    buttonSend.classList.remove('d-none');
    buttonSend.textContent = 'Consultar saldo';
};

function handleDeposit(){
    resetPreview();
    containerTipoCuenta.classList.remove('d-none');
    containerValor.classList.remove('d-none');
    buttonSend.classList.remove('d-none');
    buttonSend.textContent = 'Depositar';
};

function handleWithdraw(){
    resetPreview();
    containerTipoCuenta.classList.remove('d-none');
    containerValor.classList.remove('d-none');
    buttonSend.classList.remove('d-none');
    buttonSend.textContent = 'Retirar';
};

function handleTransfer(){
    resetPreview();
    containerTipoCuenta.classList.remove('d-none');
    containerCuentaDestino.classList.remove('d-none');
    containerValor.classList.remove('d-none');
    buttonSend.classList.remove('d-none');
    buttonSend.textContent = 'Transferir';
};

const optionsToSelect = {
    '': resetPreview,
    'saldo': handleBalance,
    'deposito': handleDeposit,
    'retiro': handleWithdraw,
    'transferencia': handleTransfer
};
tipoTransaccion.addEventListener('change', (e) => {
    const tipoTransaccionValue = e.target.value; // saldo - deposito - retiro - transferencia

    const selectedOption = optionsToSelect[tipoTransaccionValue];
    selectedOption();
    return;

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



// const opcionesMovimiento = new OptionActions();

const optionsAhorros = new CuentaAhorro();
const optionsCorriente = new CuentaCorriente();

const optionsActions = {
    'saldo': {
        'ahorro': () => {
            console.log('Consultar saldo ahorro');
            optionsAhorros.consultaSaldo('ahorro')
        },
        'corriente': () => optionsCorriente.consultaSaldo('corriente')
    },
    'deposito': {
        'ahorro': optionsAhorros.realizarDeposito,
        'corriente': optionsAhorros.realizarDeposito
    },
    'retiro': {
        'ahorro': optionsAhorros.realizarRetiro,
        'corriente': optionsCorriente.realizarRetiro
    },
    'transferencia': {
        'ahorro': optionsAhorros.realizarTransferencia,
        'corriente': optionsCorriente.realizarTransferencia
    }
};

buttonSend.addEventListener('click', () => {
    const tipoTransaccionValue = tipoTransaccion.value;
    const tipoCuentaValue = tipoCuenta.value;

    if(tipoTransaccionValue === '' || tipoCuentaValue === ''){
        alert('Por favor selecciona una opción válida');
        return;
    }

    const selectedOption = optionsActions[tipoTransaccionValue][tipoCuentaValue];
    selectedOption();
    return;
})







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