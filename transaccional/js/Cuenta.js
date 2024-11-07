import { Cliente } from "./Cliente.js";

class Cuenta extends Cliente {
  constructor(nombre, apellido, dirección, númeroDeIdentificacion, numCuenta, saldo = 0) {
    super(nombre, apellido, dirección, númeroDeIdentificacion);
    this.numCuenta = numCuenta;
    this.saldo = saldo;
  }
  

  consultaSaldo = (tipoCuenta) => {
    const dataUser = this.getDataUser();
    let saldo;

    if (tipoCuenta == 'corriente') {
      saldo = dataUser.cuentaCorriente.saldo;
    } else if (tipoCuenta == 'ahorros') {
      saldo = dataUser.cuentaAhorros.saldo;
    } else {
      alert('Tipo de cuenta no valido');
      return;
    }

    this.containerData.innerHTML = `
      <p>Saldo: ${saldo}</p>
    `;
  }

  realizarDeposito = (tipoCuenta, cantidad ) => {
    console.log('cantidad: ', cantidad);
    console.log('tipoCuenta: ', tipoCuenta);
    const dataUser = this.getDataUser();

    if (tipoCuenta == 'corriente') {
      let saldo = Number(dataUser.cuentaCorriente.saldo);
      dataUser.cuentaCorriente.saldo = saldo + Number(cantidad);
      dataUser.cuentaCorriente.transacciones.push({ fecha: new Date(), descripcion: 'Deposito', cantidad });
      console.log('dataUser: ', dataUser);
      this.setDataUser(dataUser);
      alert('Deposito realizado con exito');
    } else if (tipoCuenta == 'ahorros') {
      let saldo = Number(dataUser.cuentaAhorros.saldo);
      dataUser.cuentaAhorros.saldo = saldo + Number(cantidad);
      dataUser.cuentaAhorros.transacciones.push({ fecha: new Date(), descripcion: 'Deposito', cantidad });
      console.log('dataUser: ', dataUser);
      this.setDataUser(dataUser);
      alert('Deposito realizado con exito');
    }
  }

  realizarRetiro = (tipoCuenta, cantidad) => {
    const dataUser = this.getDataUser();

    if (tipoCuenta == 'corriente' && dataUser.cuentaCorriente.saldo <= 0) {
        alert('Disculpa los inconvenientes, tenemos problemas con el sistema, nuestra app sigue en desarrollo');
        // this.realizarSobregiro(); //! falta solucionar este detalle
        return;
    }
    if (tipoCuenta == 'ahorros' && dataUser.cuentaAhorros.saldo <= 0) {
        alert('No puedes realizar retiro, saldo insuficiente');
        return;
    }

    if (tipoCuenta == 'corriente') {
        if (dataUser.cuentaCorriente.saldo < cantidad) {
            alert('No puedes realizar retiro, saldo insuficiente');
            return;
        }
        let saldo = Number(dataUser.cuentaCorriente.saldo);
        dataUser.cuentaCorriente.saldo = saldo - Number(cantidad);
        dataUser.cuentaCorriente.transacciones.push({ fecha: new Date(), descripcion: 'Retiro', cantidad });
        this.setDataUser(dataUser);
        alert('Retiro realizado con exito');
    } else if (tipoCuenta == 'ahorros' && dataUser.cuentaAhorros.saldo > 0) {
        if (dataUser.cuentaAhorros.saldo < cantidad) {
            alert('No puedes realizar retiro, saldo insuficiente');
            return;
        }
        let saldo = Number(dataUser.cuentaAhorros.saldo);
        dataUser.cuentaAhorros.saldo = saldo - Number(cantidad);
        dataUser.cuentaAhorros.transacciones.push({ fecha: new Date(), descripcion: 'Retiro', cantidad });
        this.setDataUser(dataUser);
        alert('Retiro realizado con exito');
    }
  }

  realizarTransferencia = (cantidad, tipoCuenta, tipoCuentaDestino, cuentaDestino) => {
    console.log('tipoCuenta: ', tipoCuenta);
    // alert('Disculpa los inconvenientes, tenemos problemas con el sistema, nuestra app sigue en desarrollo');
    const dataUser = this.getDataUser();
    // 1- descontar saldo de la cuenta origen
    if (tipoCuenta == 'corriente') {
      if (dataUser.cuentaCorriente.saldo < cantidad) {
        alert('No puedes realizar retiro, saldo insuficiente');
        return;
      }
      let saldo = Number(dataUser.cuentaCorriente.saldo);
      dataUser.cuentaCorriente.saldo = saldo - Number(cantidad);
      dataUser.cuentaCorriente.transacciones.push({ fecha: new Date(), descripcion: 'Retiro', cantidad });
      this.setDataUser(dataUser);

      // transferir saldo a la cuenta destino
      const userToPay = this.getUserToPay(cuentaDestino);
      if (tipoCuentaDestino == 'corriente') {
        let saldoToPay = Number(userToPay.cuentaCorriente.saldo);
        userToPay.cuentaCorriente.saldo = saldoToPay + Number(cantidad);
        userToPay.cuentaCorriente.transacciones.push({ fecha: new Date(), descripcion: 'Deposito', cantidad });
      } else if (tipoCuentaDestino == 'ahorro') {
        let saldoToPay = Number(userToPay.cuentaAhorros.saldo);
        userToPay.cuentaAhorros.saldo = saldoToPay + Number(cantidad);
        userToPay.cuentaAhorros.transacciones.push({ fecha: new Date(), descripcion: 'Deposito', cantidad });
      }
      this.setUserToPay(userToPay);
      alert('Transferencia realizada con exito');
    } else if (tipoCuenta == 'ahorro') {
      if (dataUser.cuentaAhorros.saldo < cantidad) {
        alert('No puedes realizar retiro, saldo insuficiente');
        return;
      }
      let saldo = Number(dataUser.cuentaAhorros.saldo);
      dataUser.cuentaAhorros.saldo = saldo - Number(cantidad);
      dataUser.cuentaAhorros.transacciones.push({ fecha: new Date(), descripcion: 'Retiro', cantidad });
      this.setDataUser(dataUser);

      const userToPay = this.getUserToPay(cuentaDestino);
      if (tipoCuentaDestino == 'corriente') {
        let saldoToPay = Number(userToPay.cuentaCorriente.saldo);
        userToPay.cuentaCorriente.saldo = saldoToPay + Number(cantidad);
        userToPay.cuentaCorriente.transacciones.push({ fecha: new Date(), descripcion: 'Deposito', cantidad });
      } else if (tipoCuentaDestino == 'ahorro') {
        let saldoToPay = Number(userToPay.cuentaAhorros.saldo);
        userToPay.cuentaAhorros.saldo = saldoToPay + Number(cantidad);
        userToPay.cuentaAhorros.transacciones.push({ fecha: new Date(), descripcion: 'Deposito', cantidad });
      }
      this.setUserToPay(userToPay);
      alert('Transferencia realizada con exito');
    } else {
      alert('Tipo de cuenta no valido');
      return;
    }
    // 2- agregar saldo a la cuenta destino

  }

  transacciones = () => {
    const dataUser = this.getDataUser();

    this.containerData.innerHTML = `
    <div class="row">
    <!-- Columna Cuenta Corriente -->
    <div class="col-md-6">
      <div class="card mb-4 shadow-sm">
        <div class="card-header text-white bg-primary">
          <h5 class="mb-0"><i class="bi bi-wallet2"></i> Cuenta Corriente</h5>
        </div>
        <ul class="list-group list-group-flush">
          ${dataUser.cuentaCorriente.transacciones.map((movimiento) => `
            <li class="list-group-item">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <p class="mb-1"><strong>Fecha:</strong> ${new Date(movimiento.fecha).toISOString().slice(0, 19).replace("T", " ")}</p>
                  <p class="mb-1"><strong>Descripción:</strong> ${movimiento.descripcion}</p>
                </div>
                <div>
                  <p class="mb-1 text-success"><i class="bi bi-currency-dollar"></i> ${movimiento.cantidad}</p>
                </div>
              </div>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>

    <!-- Columna Cuenta Ahorros -->
    <div class="col-md-6">
      <div class="card mb-4 shadow-sm">
        <div class="card-header text-white bg-success">
          <h5 class="mb-0"><i class="bi bi-piggy-bank"></i> Cuenta Ahorros</h5>
        </div>
        <ul class="list-group list-group-flush">
          ${dataUser.cuentaAhorros.transacciones.map((movimiento) => `
            <li class="list-group-item">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <p class="mb-1"><strong>Fecha:</strong> ${new Date(movimiento.fecha).toISOString().slice(0, 19).replace("T", " ")}</p>
                  <p class="mb-1"><strong>Descripción:</strong> ${movimiento.descripcion}</p>
                </div>
                <div>
                  <p class="mb-1 text-primary"><i class="bi bi-currency-dollar"></i> ${movimiento.cantidad}</p>
                </div>
              </div>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  </div>
`;


  }
}
export { Cuenta };
