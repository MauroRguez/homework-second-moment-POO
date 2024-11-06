class Cliente {
  userSession = '';
  allUsers = [];
  userData = {};
  userToPay = {};
  containerData = document.getElementById('accountInfo');

  constructor(
    nombreCliente,
    apellidoCliente,
    direccionCliente,
    idCliente
  ) {
    this.nombreCliente = nombreCliente;
    this.apellidoCliente = apellidoCliente;
    this.direccionCliente = direccionCliente;
    this.idCliente = idCliente;
  }

  getDataUser = () => {
    this.userSession = JSON.parse(localStorage.getItem('userSession'));
    this.allUsers = JSON.parse(localStorage.getItem('registroUsuarios'));
    
    this.userData = this.allUsers.filter((user) => user.email === this.userSession)[0];
    return this.userData;
  }

  setDataUser = (data) => {
    const dataUpdate = this.allUsers.map((user) => {
      if(user.email === this.userSession){
        return {
          ...user,
          ...data
        }
      }
      return user;
    });

    localStorage.setItem('registroUsuarios', JSON.stringify(dataUpdate));
  }

  getUserToPay = (numberAccount) => {
    this.allUsers = JSON.parse(localStorage.getItem('registroUsuarios'));

    const userToPay = this.allUsers.find(user => {
      return user.cuentaCorriente.accountNumber === Number(numberAccount) ||
      user.cuentaAhorros.accountNumber === Number(numberAccount);
    });
    return userToPay;
  }

  setUserToPay = (data) => {
    // volver a guardar la lista de todos los usuarios con el cambio que tenga la data que seria el nuevo usuario
    const dataUpdate = this.allUsers.map((user) => {
      if(user.email === data.email){
        return {
          ...user,
          ...data
        }
      }
      return user;
    });

    localStorage.setItem('registroUsuarios', JSON.stringify(dataUpdate));
  }
}
export { Cliente };
