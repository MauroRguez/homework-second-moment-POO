class Cuenta extends Cliente{
constructor(numCuenta,saldo=0){
this.numCuenta=numCuenta
this.saldo=saldo
}
//metodo
consultarSaldo(){
   return console.log(`Su saldo es ${this.saldo}`)
}
realizarDeposito(){
    this.saldo+=this.deposito
    return console.log(`Su nuevo saldo es ${this.saldo}`)
}
realizarRetiro(){
    return this.saldo < this.retiro ? console.log(`Fondos insuficientes`) : (this.saldo -= this.retiro, console.log(`Su nuevo saldo es ${this.saldo}`));

}

}
export default Cuenta