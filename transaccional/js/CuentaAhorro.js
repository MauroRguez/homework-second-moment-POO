import { Cuenta } from './Cuenta.js';

class CuentaAhorro extends Cuenta {
    userData = {};
    
    constructor(nombre, apellido, dirección, númeroDeIdentificacion){
        super(nombre, apellido, dirección, númeroDeIdentificacion);

        this.userSession = JSON.parse(localStorage.getItem('userSession'));
        this.dataAccounts = JSON.parse(localStorage.getItem('registroUsuarios'));

        this.userData = this.dataAccounts.filter((user) => user.email === this.userSession)[0];
    }
    
    consultarMovimientos = () => {
        this.containerData.innerHTML = `
            ${this.userData.movimientos.map((movimiento) => `
                <p>Fecha: ${movimiento.fecha}</p>
                <p>Descripción: ${movimiento.descripcion}</p>
                <p>Cantidad: $${movimiento.cantidad}</p>`).join('')}
        `;
    };
}

export { CuentaAhorro };