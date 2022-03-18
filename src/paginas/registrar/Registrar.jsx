import React from 'react';
import "./registrar.css";

const emailValidoRegex = RegExp(
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/i
);

const validarFormato = errores => {
  let valido = true;
  Object.values(errores).forEach(val => val.length > 0 && (valido = false));
  return valido;
};

export default class Registrar extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      nombreUsuario: "",
      email: "",
      contrasegna: "",
			reContrasegna: "",
			errores: {
        nombreUsuario: "",
      	email: "",
      	contrasegna: "",
				reContrasegna: "",
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
			
      case "email": 
				err = emailValidoRegex.test(target.value)
            ? ""
            : "Email no tiene un formato válido";
				this.setState({errores: {...this.state.errores, email: err}});
      break;
			
      case "contrasegna": 
				err = target.value.length < 8
            ? "La contraseña debe contener mínimo 8 caracteres"
            : "";
        this.setState({errores: {...this.state.errores, contrasegna: err}});
      break;

      case "reContrasegna": 
				err = target.value !== this.state.contrasegna
            ? "Las contraseñas deben coincidir"
            : "";
				this.setState({errores: {...this.state.errores, reContrasegna: err}});
      break;
			
      default:
      break;
    }
  }

  handleSubmit(event) {
    event.preventDefault();

		console.log(this.state.nombreUsuario);
    console.log(this.state.email);
    console.log(this.state.contrasegna);
    console.log(this.state.reContrasegna);

		if (validarFormato(this.state.errores)) {
      console.info('Valid Form')
			// Conectar API
    } 
  };

  render() {
	return (
		<div className="cen">
		  <h1>Crear cuenta en World Domination</h1>
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

  	    <h2>Correo electrónico</h2>
  	    <input
  	      name="email"
  	      type="text"
  	      placeholder="Introduzca su correo electrónico..."
  	      value={this.state.email}
  	      onChange={this.handleInputChange}
  	    /> 
				<br></br>
				{(this.state.email.length > 0) && 
        	<span className='error'>{this.state.errores.email}</span>}

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

  	    <h2>Repetir contraseña</h2>
  	    <input
  	      name="reContrasegna"
  	      type="password"
  	      placeholder="Repita su contraseña..."
  	      value={this.state.reContrasegna}
  	      onChange={this.handleInputChange}
  	    /> 
				<br></br>
				{(this.state.reContrasegna.length > 0) && 
        	<span className='error'>{this.state.errores.reContrasegna}</span>}

				<br></br><br></br>
  	    <button type="submit">Registrarse</button>
        
  	  </form>
		</div>
	);  
  }
}
 