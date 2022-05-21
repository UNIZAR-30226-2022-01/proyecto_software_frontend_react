import React from 'react';
import { Navigate } from 'react-router-dom';
import queryString from 'query-string';
import swal from 'sweetalert2';
import { Button, Form, Navbar, Container } from 'react-bootstrap';
import "./registrar.css";
import Constantes from '../../constantes';

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
					err = "El usuario puede contener valores alfanuméricos, '-' o '_'";
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
			fetch(Constantes.RUTA_API + '/registro', {
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
		document.body.style.backgroundColor = "rgb(28,28,30)";

		if (this.state.irIniciarSesion) {
			return <Navigate to='/iniciarSesion'/>;
		}

		return (
			<div className="cen">
				<Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Collapse className="justify-content-center">
              <Navbar.Brand className="textoPrincipalRegistrar">Crear cuenta en World Domination</Navbar.Brand>
            </Navbar.Collapse>
          </Container>
        </Navbar>
				
				<div className="contenedorRegistrar">
					<form onSubmit={this.handleSubmit}>
				
						<h2 className="textoRegistar">Nombre de usuario</h2>
						<Form.Control
							name="nombreUsuario"
							type="text"
							placeholder="Introduzca su nombre de usuario..."
							value={this.state.nombreUsuario}
							onChange={this.handleInputChange}
							required
							className="mb-3 form-floating boxRegistrar"/> 
						<br/>
						{(this.state.nombreUsuario.length > 0) && 
							<span className='errorRegistrar'>{this.state.errores.nombreUsuario}</span>}
		
						<h2 className="textoRegistar">Correo electrónico</h2>
						<Form.Control
							name="email"
							type="text"
							placeholder="Introduzca su correo electrónico..."
							value={this.state.email}
							onChange={this.handleInputChange}
							required
							className="mb-3 form-floating boxRegistrar"
						/> 
						<br/>
						{(this.state.email.length > 0) && 
							<span className='errorRegistrar'>{this.state.errores.email}</span>}
		
						<h2 className="textoRegistar">Contraseña</h2>
						<Form.Control
							name="contrasegna"
							type="password"
							placeholder="Introduzca su contraseña..."
							value={this.state.contrasegna}
							onChange={this.handleInputChange}
							required
							className="mb-3 form-floating boxRegistrar"
						/> 
						<br/>
						{(this.state.contrasegna.length > 0) && 
							<span className='errorRegistrar'>{this.state.errores.contrasegna}</span>}
		
						<h2 className="textoRegistar">Repetir contraseña</h2>
						<Form.Control
							name="reContrasegna"
							type="password"
							placeholder="Repita su contraseña..."
							value={this.state.reContrasegna}
							onChange={this.handleInputChange}
							required
							className="mb-3 form-floating boxRegistrar"
						/> 
						<br/>
						{(this.state.reContrasegna.length > 0) && 
							<span className='errorRegistrar'>{this.state.errores.reContrasegna}</span>}
		
						<br/><br/>

						<Button variant="primary" type="submit" size="lg">
							Crear cuenta
						</Button><br/><br/>
						
					</form>
				</div>
			</div>
		);  
	}
}
 
