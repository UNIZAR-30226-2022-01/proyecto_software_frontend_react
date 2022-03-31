import React from 'react';
import { Navigate } from 'react-router-dom';
import queryString from 'query-string';
import Cookie from 'universal-cookie';
import swal from 'sweetalert2';
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

		this.setState({irInicio:true});

		fetch('http://localhost:8090/login', {
			method: 'post',
			headers: {'Content-Type':'application/x-www-form-urlencoded'},
			body: queryString.stringify({
				nombre: this.state.nombreUsuario,
				password: this.state.contrasegna,
			 })
		})
		.then((response) => {
			if (response.ok) {
				return response.text();
			}
			throw new Error(response.text());
		})
		.then((response) => {
      document.cookie = response;
			swal.fire({
				title: 'Inicio de sesión completado con éxito',
				icon: 'success',
				timer: 2000,
				timerProgressBar: true,
			});
			this.setState({irInicio:true});
		})
		.catch ((error) => {
			swal.fire({
				title: 'Se ha producido un error al iniciar sesión',
				text: error.message,
				icon: 'error',
				button: 'Ok',
			});
		})
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
 