import { Cliente } from "./Cliente.js";

class Cuenta extends Cliente {
  constructor(nombre, apellido, dirección, númeroDeIdentificacion, numCuenta, saldo = 0) {
    super(nombre, apellido, dirección, númeroDeIdentificacion);
    this.numCuenta = numCuenta;
    this.saldo = saldo;
  }
  //metodo consultar saldo
  consultaSaldo = (tipoCuenta) => {
    const dataUser = this.getDataUser();
    if (tipoCuenta == 'corriente') {
      return dataUser.CuentaCorriente.saldo;
    } else if (tipoCuenta == 'ahorros') {
      const saldo = dataUser.CuentaAhorro.saldo;
      console.log('saldo: ', saldo);
      this.containerData.innerHTML = `
        <p>Saldo: ${saldo}</p>
      `;
    }
  }
  //metodo realizar deposito
  realizarDeposito = (cantidad, tipoCuenta) => {
    const dataUser = this.getDataUser();
    if (tipoCuenta == 'corriente') {
        dataUser.CuentaCorriente.saldo += cantidad;
        dataUser.CuentaCorriente.transacciones.push({ fecha: new Date(), descripcion: 'Deposito', cantidad });
        this.setDataUser(dataUser);
    } else if (tipoCuenta == 'ahorros') {
        dataUser.CuentaAhorro.saldo += cantidad;
        dataUser.CuentaAhorro.transacciones.push({ fecha: new Date(), descripcion: 'Deposito', cantidad });
        this.setDataUser(dataUser);
    }
  }

  //metodo realizar retiro
  realizarRetiro = (cantidad, tipoCuenta) => {
    const dataUser = this.getDataUser();
    if (tipoCuenta == 'corriente' && dataUser.CuentaCorriente.saldo <= 0) {
        alert('Disculpa los inconvenientes, tenemos problemas con el sistema, nuestra app sigue en desarrollo');
        // this.realizarSobregiro(); //! falta solucionar este detalle
        return;
    }
    if (tipoCuenta == 'ahorros' && dataUser.CuentaAhorro.saldo <= 0) {
        alert('No puedes realizar retiro, saldo insuficiente');
        return;
    }

    if (tipoCuenta == 'corriente') {
        if (dataUser.CuentaCorriente.saldo < cantidad) {
            alert('No puedes realizar retiro, saldo insuficiente');
            return;
        }
        dataUser.CuentaCorriente.saldo -= cantidad;
        dataUser.CuentaCorriente.transacciones.push({ fecha: new Date(), descripcion: 'Retiro', cantidad });
        this.setDataUser(dataUser);
    } else if (tipoCuenta == 'ahorros' && dataUser.CuentaAhorro.saldo > 0) {
        if (dataUser.CuentaAhorro.saldo < cantidad) {
            alert('No puedes realizar retiro, saldo insuficiente');
            return;
        }
        dataUser.CuentaAhorro.saldo -= cantidad;
        dataUser.CuentaAhorro.transacciones.push({ fecha: new Date(), descripcion: 'Retiro', cantidad });
        this.setDataUser(dataUser);
    }
  }

  realizarTransferencia = (cantidad, tipoCuenta, numeroCuenta, tipoCuentaDestino, cuentaDestino) => {
    alert('Disculpa los inconvenientes, tenemos problemas con el sistema, nuestra app sigue en desarrollo');
    // const dataUser = this.getDataUser();
    // if (tipoCuenta == 'corriente') {
    //     if (dataUser.CuentaCorriente.saldo < cantidad) {
    //         alert('No puedes realizar transferencia, saldo insuficiente');
    //         return;
    //     }
    //     dataUser.CuentaCorriente.saldo -= cantidad;
    //     dataUser.CuentaCorriente.transacciones.push({ fecha: new Date(), descripcion: 'Transferencia', cantidad });
    //     this.setDataUser(dataUser);
        
    // }
  }
}
export { Cuenta };
