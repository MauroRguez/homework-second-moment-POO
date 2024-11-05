class CuentaAhorro extends Cuenta{
    constructor(tasaInteres){
        this.tasaInteres
    }
    calcularInteres(){
        return this.saldo*this.tasaInteres
    }
}