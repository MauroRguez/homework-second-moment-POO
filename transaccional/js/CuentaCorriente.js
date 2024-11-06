import { Cuenta } from './Cuenta.js'

class CuentaCorriente extends Cuenta {
    userData = {};
    containerData = document.getElementById('accountInfo');

    constructor(nombre, apellido, dirección, númeroDeIdentificacion){
        super(nombre, apellido, dirección, númeroDeIdentificacion);
    }

    realizarSobregiro(){
        const valueGiro = Number(prompt('Ingrese el valor del sobregiro'));

        if (valueGiro > 500000) {
            return "No puedes realizar sobregiro, excedio el limite permitido de $500.000";
        }

        const dataUser = this.getDataUser();
        dataUser.CuentaCorriente.saldo -= valueGiro;
        this.setDataUser(dataUser);
    }
}

export { CuentaCorriente };