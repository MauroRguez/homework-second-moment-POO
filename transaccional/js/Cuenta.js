class Cuenta extends Cliente{
constructor(numCuenta,saldo=0){
this.numCuenta=numCuenta
this.saldo=saldo
}
//metodo consultar saldo
consultaSaldo() { 
    return this.saldo;
  }
  //metodo realizar deposito
  realizarDeposito(cantidad) {
    this.saldo += cantidad
    return this.saldo

  }
  //metodo realizar retiro
  realizarRetiro(cantidad) {
    if (cantidad > this.saldo) {
      return "Saldo insuficiente"
    } else {
      this.saldo -= cantidad
      return this.saldo
    }
   }

}
export default Cuenta