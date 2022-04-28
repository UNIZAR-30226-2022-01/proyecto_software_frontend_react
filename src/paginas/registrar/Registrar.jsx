import React from 'react';
import { Navigate } from 'react-router-dom';
import queryString from 'query-string';
import swal from 'sweetalert2';
import "./registrar.css";

const emailValidoRegex = RegExp(
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const usuarioValidoRegex = RegExp(
	/^[a-z0-9\-_]+$/i
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
			},
			irIniciarSesion: false,
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
				let errLogitud = target.value.length < 5;
				let errorChars = !usuarioValidoRegex.test(target.value);
				err = "";

				if (errLogitud && errorChars) {
					err = "El usuario debe contener mínimo 5 caracteres y valores alfanuméricos, '-' o '_'";
				} else if (errLogitud) {
					err = "El usuario debe contener mínimo 5 caracteres";
				} else if (errorChars) {
					err = "El usuario debe contener valores alfanuméricos, '-' o '_'";
				}

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

		if (validarFormato(this.state.errores)) {
			fetch('http://localhost:8090/registro', {
			  method: 'post',
			  headers: {'Content-Type':'application/x-www-form-urlencoded'},
			  body: queryString.stringify({
					nombre: this.state.nombreUsuario,
					email: this.state.email,
					password: this.state.contrasegna,
			   })
			})
			.then((response) => {
				if (!response.ok) {
					return response.text().then(text => {throw new Error(text)});
				}
				return response.text();
			})
			.then(() => {	
				swal.fire({
					title: 'Registro completado con éxito',
					text: "Inicia sesión en tu cuenta para acceder a World Domination",
					icon: 'success',
				});
				this.setState({ irIniciarSesion: true });
			})
			.catch((e) => {
				swal.fire({
					title: 'Se ha producido un error al registrarse',
					text: e,
					icon: 'error',
				});
			})
		} 
	};

	render() {
		document.body.style.backgroundColor = "#FFFFFF";
		if (this.state.irIniciarSesion) {
			return <Navigate to='/iniciarSesion'/>;
		}

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
						required/> 
					<br></br>
					{(this.state.nombreUsuario.length > 0) && 
						<span className='errorRegistrar'>{this.state.errores.nombreUsuario}</span>}
	
					<h2>Correo electrónico</h2>
					<input
						name="email"
						type="text"
						placeholder="Introduzca su correo electrónico..."
						value={this.state.email}
						onChange={this.handleInputChange}
						required
					/> 
					<br></br>
					{(this.state.email.length > 0) && 
						<span className='errorRegistrar'>{this.state.errores.email}</span>}
	
					<h2>Contraseña</h2>
					<input
						name="contrasegna"
						type="password"
						placeholder="Introduzca su contraseña..."
						value={this.state.contrasegna}
						onChange={this.handleInputChange}
						required
					/> 
					<br></br>
					{(this.state.contrasegna.length > 0) && 
						<span className='errorRegistrar'>{this.state.errores.contrasegna}</span>}
	
					<h2>Repetir contraseña</h2>
					<input
						name="reContrasegna"
						type="password"
						placeholder="Repita su contraseña..."
						value={this.state.reContrasegna}
						onChange={this.handleInputChange}
						required
					/> 
					<br></br>
					{(this.state.reContrasegna.length > 0) && 
						<span className='errorRegistrar'>{this.state.errores.reContrasegna}</span>}
	
					<br></br><br></br>
					<button type="submit">Registrarse</button>
					
				</form>
			</div>
		);  
	}
}
 
