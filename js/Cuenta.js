class Cuenta extends Cliente{
constructor(numCuenta,saldo){
this.numCuenta=numCuenta
this.saldo=saldo
}
//metodo
consultarSaldo(){
    console.log(`Su saldo es ${this.saldo}`)
}
realizarDeposito(){}
realizarRetiro(){}

}
export default Cuenta