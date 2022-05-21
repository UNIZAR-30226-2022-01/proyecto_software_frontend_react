import React from 'react';
import { Navigate } from 'react-router-dom';
import queryString from 'query-string';
import swal from 'sweetalert2';
import { Button, Form, Navbar, Container } from 'react-bootstrap';
import "./iniciarSesion.css";
import Constantes from '../../constantes';

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

		//this.setState({irInicio:true});

		fetch(Constantes.RUTA_API + '/login', {
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
		swal.fire({
			title: 'Introduce tu nombre de usuario',
			text: 'Te enviaremos un token para reestablecer tu contraseña.',
			input: 'text',
			inputAttributes: {
				autocapitalize: 'off',
			},
			confirmButtonColor: '#007bff',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Aceptar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
			showLoaderOnConfirm: true,
			preConfirm: (usuario) => {
				this.solicitarToken(usuario);
			},
			allowOutsideClick: () => !swal.isLoading()
		})
	}

	solicitarToken(usuario) {		 
		fetch(Constantes.RUTA_API + '/obtenerTokenResetPassword', {
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
				timer: 4000,
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
		 
		fetch(Constantes.RUTA_API + '/resetearPassword', {
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
				timer: 4000,
				timerProgressBar: true,
			});
			this.setState({mostrarFormularioToken: false})
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
		document.body.style.backgroundColor = "rgb(28,28,30)";
		if (this.state.irInicio) {
			return <Navigate to='/inicio'/>;
		}

		return (
			<div className="cen">
				<Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Collapse className="justify-content-center">
              <Navbar.Brand className="textoPrincipalIniciarSesion">Iniciar sesión en World Domination</Navbar.Brand>
            </Navbar.Collapse>
          </Container>
        </Navbar>

				<div className="contenedorIniciarSesion">
					<form onSubmit={this.handleSubmit}>
						
						<h2 className="textoIniciarSesion">Nombre de usuario</h2>
						<Form.Control
							name="nombreUsuario"
							type="text"
							placeholder="Introduzca su nombre de usuario..."
							id="userLogin"
							value={this.state.nombreUsuario}
							onChange={this.handleInputChange}
							required
							className="mb-3 form-floating boxIniciarSesion"/> 
						<br/> 
		
						<h2 className="textoIniciarSesion">Contraseña</h2>
						<Form.Control
							name="contrasegna"
							type="password"
							placeholder="Introduzca su contraseña..."
							value={this.state.contrasegna}
							onChange={this.handleInputChange}
							required
							className="mb-3 form-floating boxIniciarSesion"/> 
						<br/> 
		
						<br/><br/>
						<Button variant="primary" type="submit" size="lg">
							Iniciar sesión
						</Button>
						<br/><br/>
					</form>
				
					<Button variant="dark" type="submit"onClick={this.mostrarSolicitudToken}>
						¿Has olvidado tu contraseña?
					</Button> <br/><br/>
					
					{this.state.mostrarFormularioToken && 
					<div className="contenedorIniciarSesion">
						<form>
							<h2 className="textoIniciarSesion">Token</h2>
							<Form.Control type="text" id="token" placeholder="Introduzca el token..." required/>

							<h2 className="textoIniciarSesion">Nueva contraseña</h2>
							<Form.Control type="password" id="password" placeholder="Introduzca la nueva contraseña..." required/>
							<br/><br/>

							<Button variant="primary" size="lg" onClick={this.cambiarPassword}>
								Cambiar contraseña
							</Button>
						</form>
					</div>}
				</div>
			</div>
		);  
	}
}
 