class Cliente {
  userSession = '';
  allData = [];
  userData = {};
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
    
    this.userData = this.allData.filter((user) => user.email === this.userSession)[0];
    return this.userData;
  }

  setDataUser = (data) => {
    const newData = this.allData;
    const dataUpdate = newData.map((user) => {
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
}
export { Cliente };
