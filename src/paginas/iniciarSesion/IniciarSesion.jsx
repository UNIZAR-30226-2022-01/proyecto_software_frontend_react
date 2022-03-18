import React from 'react';
import "./iniciarSesion.css";

const validarFormato = errores => {
  let valido = true;
  Object.values(errores).forEach(val => val.length > 0 && (valido = false));
  return valido;
};

export default class IniciarSesion extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      nombreUsuario: "",
      contrasegna: "",
			errores: {
        nombreUsuario: "",
      	contrasegna: "",
      }
    };

		this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    event.preventDefault();
    const target = event.target;
    this.setState({
      [target.name]: target.value,
    });

		let err;
		switch (target.name) {
      case "nombreUsuario": 
				err = target.value.length < 5
            ? "El nombre de usuario debe contener mínimo 5 caracteres"
            : "";
				this.setState({errores: {...this.state.errores, nombreUsuario: err}});
      break;
			
      case "contrasegna": 
				err = target.value.length < 8
            ? "La contraseña debe contener mínimo 8 caracteres"
            : "";
        this.setState({errores: {...this.state.errores, contrasegna: err}});
      break;
			
      default:
      break;
    }
  }

  handleSubmit(event) {
    event.preventDefault();

		console.log(this.state.nombreUsuario);
    console.log(this.state.contrasegna);

		if (validarFormato(this.state.errores)) {
      console.info('Valid Form')
			// Conectar API
    } 
  };

  render() {
	return (
		<div className="cen">
		  <h1>Iniciar sesión en World Domination</h1>
			<form onSubmit={this.handleSubmit}>
        
  	    <h2>Nombre de usuario</h2>
  	    <input
  	      name="nombreUsuario"
  	      type="text"
  	      placeholder="Introduzca su nombre de usuario..."
  	      value={this.state.nombreUsuario}
  	      onChange={this.handleInputChange}
  	    /> 
				<br></br>
				{(this.state.nombreUsuario.length > 0) && 
        	<span className='error'>{this.state.errores.nombreUsuario}</span>}

  	    <h2>Contraseña</h2>
  	    <input
  	      name="contrasegna"
  	      type="password"
  	      placeholder="Introduzca su contraseña..."
  	      value={this.state.contrasegna}
  	      onChange={this.handleInputChange}
  	    /> 
        <br></br>
        {(this.state.contrasegna.length > 0) && 
        	<span className='error'>{this.state.errores.contrasegna}</span>}

				<br></br><br></br>
  	    <button type="submit">Iniciar sesión</button>
        
  	  </form>
		</div>
	);  
  }
}
 