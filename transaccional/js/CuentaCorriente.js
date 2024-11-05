class CuentaCorriente extends Cuenta{
    

    //metodo
    realizarTranferencia( ){
        
        if (cantidad > this.saldo) {
            return "Saldo insuficiente"
        } else {
            this.saldo -= cantidad
            return this.saldo
        }
    }
}