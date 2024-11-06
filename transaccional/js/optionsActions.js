

class OptionActions {
    userData = {};
    containerData = document.getElementById('accountInfo');

    constructor(){
        this.userSession = JSON.parse(localStorage.getItem('userSession'));
        this.dataAccounts = JSON.parse(localStorage.getItem('registroUsuarios'));

        this.userData = this.dataAccounts.filter((user) => user.email === this.userSession)[0];
        console.log('this.userData: ', this.userData);
    }

    consultarSaldoCorriente = () => {
        this.containerData.innerHTML = `
            <p>Nombre: ${this.userData.nombre}</p>
            <p>Apellido: ${this.userData.apellidos}</p>
            <p>Numero de cuenta: ${this.userData.cuentaCorriente.accountNumber}</p>
            <p>Saldo corriente: $${this.userData.cuentaCorriente.saldo}</p>`;
    }

    consultarSaldoAhorros = () => {
        this.containerData.innerHTML = `
            <p>Nombre: ${this.userData.nombre}</p>
            <p>Apellido: ${this.userData.apellidos}</p>
            <p>Numero de cuenta: ${this.userData.cuentaAhorros.accountNumber}</p>
            <p>Saldo ahorros: $${this.userData.cuentaAhorros.saldo}</p>`;
    }

    depositarCorriente = () => {
        console.log('Depositar corriente');
    }
    depositarAhorros = () => {
        console.log('Depositar ahorros');
    }

    retirarCorriente = () => {
        console.log('Retirar corriente');
    }
    retirarAhorros = () => {
        console.log('Retirar ahorros');
    }

    transferirCorriente = () => {
        console.log('Transferir corriente');
    }
    transferirAhorros = () => {
        console.log('Transferir ahorros');
    }
}

export { OptionActions };