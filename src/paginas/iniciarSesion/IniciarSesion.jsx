import React from 'react';
import { Navigate } from 'react-router';
import "./iniciarSesion.css";

export default class IniciarSesion extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nombreUsuario: "",
			contrasegna: "",
			irInicio: false,
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
	}

	handleSubmit(event) {
		event.preventDefault();

		console.log(this.state.nombreUsuario);
		console.log(this.state.contrasegna);

		console.info('Valid Form');
		// Conectar API
		//window.location.assign("/inicio");
		this.setState({irInicio:true});
	};

	render() {
		if (this.state.irInicio) {
			return <Navigate to='/inicio'/>;
		}

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
						required
					/> 
	
					<h2>Contraseña</h2>
					<input
						name="contrasegna"
						type="password"
						placeholder="Introduzca su contraseña..."
						value={this.state.contrasegna}
						onChange={this.handleInputChange}
						required
					/> 
	
					<br></br><br></br>
					<button type="submit">Iniciar sesión</button>
					
				</form>
			</div>
		);  
	}
}
 