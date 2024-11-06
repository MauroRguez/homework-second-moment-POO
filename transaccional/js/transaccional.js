import { CuentaAhorro } from "./CuentaAhorro.js";
import { CuentaCorriente } from "./CuentaCorriente.js";

// boton cerrar sesion
const closeSession = document.getElementById('closeSession');
// contenedores de inputs
const containerTipoCuenta = document.getElementById('containerTipoCuenta');
const containerTipoCuentaDestino = document.getElementById('containerTipoCuentaDestino');
const containerCuentaDestino = document.getElementById('cuentaDestino');
const containerValor = document.getElementById('valor');
// inputs y selects
const tipoTransaccion = document.getElementById('tipoTransaccion');
const tipoCuenta = document.getElementById('tipoCuenta');
const tipoCuentaDestino = document.getElementById('tipoCuentaDestino');
const cuentaDestino = document.getElementById('numeroCuentaDestino');
const valor = document.getElementById('valorMovimiento');
// botones
const buttonSend = document.getElementById('submitBtn');
// ocultar los campos desde el inicio
document.addEventListener('DOMContentLoaded', () => {
    resetPreview();
    // ! falta validar si el usuario esta logueado
});

// limpiar el userSession del localStorage y navegar a login.html
closeSession.addEventListener('click', () => {
    localStorage.removeItem('userSession');
    window.location.href = '../../ingreso/index.html';
});

// cada que cambie el tipoCuenta y en tipo transaccion sea transferencia
tipoCuentaDestino.addEventListener('change', (e) => {
    if (tipoTransaccion.value === "transferencia") {
        const tipoCuentaSend = e.target.value;
        const clientsBank = JSON.parse(localStorage.getItem('registroUsuarios'));
        const userSession = JSON.parse(localStorage.getItem('userSession'));

        // eliminamos el cliente actual de la lista de clientes
        const clients = clientsBank.filter((client) => client.email !== userSession);
        containerCuentaDestino.classList.remove('d-none');
        cuentaDestino.innerHTML = '';

        const optionVoid = document.createElement('option');
        optionVoid.textContent = 'Selecciona una cuenta';
        optionVoid.value = '';
        cuentaDestino.append(optionVoid);
        clients.forEach(client => {
            // insertarlo en el select
            const option = document.createElement('option');
            if (tipoCuentaSend === 'ahorro') {
                option.textContent = client.cuentaAhorros.accountNumber;
                option.value = client.cuentaAhorros.accountNumber;
            } else {
                option.textContent = client.cuentaCorriente.accountNumber;
                option.value = client.cuentaCorriente.accountNumber;
            }
            cuentaDestino.appendChild(option);
        });
    }
});


function resetPreview(){
    containerTipoCuenta.classList.add('d-none');
    containerCuentaDestino.classList.add('d-none');
    containerValor.classList.add('d-none');
    buttonSend.classList.add('d-none');
    containerTipoCuentaDestino.classList.add('d-none');
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
    containerValor.classList.remove('d-none');
    containerTipoCuentaDestino.classList.remove('d-none');
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
});


const optionsAhorros = new CuentaAhorro();
const optionsCorriente = new CuentaCorriente();

const optionsActions = {
    'saldo': {
        'ahorro': () => optionsAhorros.consultaSaldo('ahorros'),
        'corriente': () => optionsCorriente.consultaSaldo('corriente')
    },
    'deposito': {
        'ahorro': () => optionsAhorros.realizarDeposito('ahorros', valor.value),
        'corriente': () => optionsAhorros.realizarDeposito('corriente', valor.value)
    },
    'retiro': {
        'ahorro': () => optionsAhorros.realizarRetiro('ahorros', valor.value),
        'corriente': () => optionsCorriente.realizarRetiro('corriente', valor.value)
    },
    'transferencia': {
        'ahorro': () => {
            optionsAhorros.realizarTransferencia(
                valor.value, tipoCuenta.value,
                tipoCuentaDestino.value, cuentaDestino.value
            )
        },
        'corriente': () => optionsCorriente.realizarTransferencia(
            valor.value, tipoCuenta.value,
            tipoCuentaDestino.value, cuentaDestino.value
        )
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