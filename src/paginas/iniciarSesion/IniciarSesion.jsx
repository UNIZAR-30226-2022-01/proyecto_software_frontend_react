import React from 'react';
import { Navigate } from 'react-router-dom';
import queryString from 'query-string';
import swal from 'sweetalert2';
import "./iniciarSesion.css";

export default class IniciarSesion extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nombreUsuario: "",
			contrasegna: "",
			irInicio: false,
			mostrarSolicitud: false,
			mostrarFormularioToken: false,
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.mostrarSolicitudToken = this.mostrarSolicitudToken.bind(this);
		this.solicitarToken = this.solicitarToken.bind(this);
		this.cambiarPassword = this.cambiarPassword.bind(this);
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
			if (!response.ok) {
				return response.text().then(text => {throw new Error(text)});
			}
			return response.text();
		})
		.then((response) => {
	  	document.cookie = response;
		})
		.then(() => {
			swal.fire({
				title: 'Inicio de sesión completado con éxito',
				icon: 'success',
				timer: 2000,
				timerProgressBar: true,
			});
			this.setState({irInicio:true});
		})
		.catch((e) => {
			swal.fire({
				title: 'Se ha producido un error al iniciar sesión',
				text: e,
				icon: 'error',
			});
		})
	};

	mostrarSolicitudToken() {
		this.setState({mostrarSolicitud: true})
	}

	solicitarToken() {
		let usuario = document.getElementById("usuarioSolicitante").value;
		console.log("Solicitando token para el cambio de la contraseña del usuario: "+usuario)
		 
		fetch('http://localhost:8090/obtenerTokenResetPassword', {
			method: 'post',
			headers: {'Content-Type':'application/x-www-form-urlencoded'},
			body: queryString.stringify({
				usuario: usuario,
			})
		})
		.then((response) => {
			if (!response.ok) {
				return response.text().then(text => {throw new Error(text)});
			}
		})
		.then(() => {
			swal.fire({
				title: 'Token enviado con éxito, comprueba tu bandeja de entrada',
				icon: 'success',
				timer: 2000,
				timerProgressBar: true,
			});
			this.setState({mostrarFormularioToken: true})
		})
		.catch((e) => {
			swal.fire({
				title: 'Se ha producido un error al solicitar el token, inténtalo de nuevo',
				text: e,
				icon: 'error',
			});
		})
	}

	cambiarPassword() {
		let password = document.getElementById("password").value;
		let token = document.getElementById("token").value;
		console.log("Solicitando cambio de contraseña")
		 
		fetch('http://localhost:8090/resetearPassword', {
			method: 'post',
			headers: {'Content-Type':'application/x-www-form-urlencoded'},
			body: queryString.stringify({
				password: password,
				token: token,
			})
		})
		.then((response) => {
			if (!response.ok) {
				return response.text().then(text => {throw new Error(text)});
			}
		})
		.then(() => {
			swal.fire({
				title: 'Contraseña cambiada con éxito, intenta iniciar sesión',
				icon: 'success',
				timer: 2000,
				timerProgressBar: true,
			});
		})
		.catch((e) => {
			swal.fire({
				title: 'Se ha producido un error al cambiar la contraseña, inténtalo de nuevo',
				text: e,
				icon: 'error',
			});
		})
	}

	render() {
		document.body.style.backgroundColor = "#FFFFFF";
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
						id="userLogin"
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
					<br></br><br></br>
				</form>
				<button onClick={this.mostrarSolicitudToken}>¿Has olvidado tu contraseña?</button>
					<br></br>
					{this.state.mostrarSolicitud &&
					<div className="solicitudToken">
						<h4>Introduce tu nombre de usuario y te enviaremos un token para reestablecer tu contraseña</h4>
							<iframe name="frameAux" id="frameAux" style={{display: 'none'}}></iframe>
							<form onSubmit={this.solicitarToken} target="frameAux">
								<input type="text" id="usuarioSolicitante" placeholder="Nombre de usuario" required></input>
								<button type="submit" id="botonToken">Solicitar Token</button>
							</form>
					</div>}

					<br></br><br></br>
					{this.state.mostrarFormularioToken && 
					<div className="formularioToken">
						<form onSubmit={this.cambiarPassword} target="frameAux">
							<h4>Introduce el token recibido y tu nueva contraseña</h4>
							<input type="text" id="token" placeholder="Token" required></input>
							<br></br><br></br>
							<input type="password" id="password" placeholder="Nueva contraseña" required></input>
							<br></br><br></br>
							<button type="submit">Cambiar Contraseña</button>
						</form>
					</div>}
			</div>
		);  
	}
}
 