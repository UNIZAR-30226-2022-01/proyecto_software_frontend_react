import React from 'react';
import swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';
import Moneda from "../../imagenes/Moneda.png";
import Notificaciones from "../../imagenes/Notificaciones.png";
import Amigos from "../../imagenes/Amigos.png";
import Perfil from "../../imagenes/Perfil.png";
import CerrarSesion from "../../imagenes/CerrarSesion.png";
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import "../../../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "./barraSuperior.css";

export default class BarraSuperiorGeneral extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			nombre_usuario: this.getNombreUsuario(document.cookie),
      puntos: null,
      numNotificaciones: null,
      numSolicitudes: null,
			irIdentificacion: false,
		};
      
    this.getNombreUsuario = this.getNombreUsuario.bind(this);
	  this.cerrarSesion = this.cerrarSesion.bind(this);
    this.navegarPerfil = this.navegarPerfil.bind(this);
    this.obtenerPuntos = this.obtenerPuntos.bind(this);
    this.obtenerNumNotificaciones = this.obtenerNumNotificaciones.bind(this);
    this.obtenerNumSolicitudes = this.obtenerNumSolicitudes.bind(this);
	}
 
	componentDidMount() {
		this.setState({ nombre_usuario: this.getNombreUsuario(document.cookie) });
    this.setState({ ancho: this.state.nombre_usuario.length > 100 ? this.state.nombre_usuario.length: 100 });
    this.obtenerPuntos();
    this.obtenerNumNotificaciones();
    this.obtenerNumSolicitudes()
	}

  getNombreUsuario(nombre) {
		if (nombre.length > 0) {
    	nombre = nombre.split('=')[1];
    	nombre = nombre.split('|')[0];
		}
    return nombre;
  }

  cerrarSesion() {
    document.cookie = "cookie_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		this.setState({ irIdentificacion: true });
  }

  navegarPerfil() {
    localStorage.setItem('nombre_usuario', this.state.nombre_usuario)
  }

  obtenerPuntos() {
    fetch(`http://localhost:8090/api/obtenerPerfil/${this.state.nombre_usuario}`, {
      method: 'get',
      credentials: 'include'
    })
    .then((response) => {
      if (!response.ok) {
        return response.text().then(text => {throw new Error(text)});
      }
      return response.json();
    })
    .then((response) => {
      this.setState({puntos: response.Puntos});
    })
    .catch ((e) => {
      swal.fire({
        title: 'Se ha producido un error al obtener los puntos del jugador',
        text: e,
        icon: 'error',
      });
    })
  }

  obtenerNumNotificaciones() {
    fetch(`http://localhost:8090/api/obtenerNumeroNotificaciones`, {
      method: 'get',
      credentials: 'include'
    })
    .then((response) => {
      if (!response.ok) {
        return response.text().then(text => {throw new Error(text)});
      }
      return response.json();
    })
    .then((response) => {
      this.setState({numNotificaciones: response});
    })
    .catch ((e) => {
      swal.fire({
        title: 'Se ha producido un error al obtener las notificaciones del jugador',
        text: e,
        icon: 'error',
      });
    })
  }

  obtenerNumSolicitudes() {
    fetch(`http://localhost:8090/api/obtenerSolicitudesPendientes`, {
      method: 'get',
      credentials: 'include'
    })
    .then((response) => {
      if (!response.ok) {
        return response.text().then(text => {throw new Error(text)});
      }
      return response.json();
    })
    .then((response) => {
      if (response !== null) {
        this.setState({numSolicitudes: Object.keys(response).length});
      } else {
        this.setState({numSolicitudes: 0});
      }
    })
    .catch ((e) => {
      swal.fire({
        title: 'Se ha producido un error al obtener las notificaciones del jugador',
        text: e,
        icon: 'error',
      });
    })
  }

	render() {
    if (this.state.irIdentificacion) {
      return <Navigate to='/'/>;
    }

		return (
      <div>
         <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand className="tituloBarraSuperior" href="/inicio">World Domination</Navbar.Brand>
            <Nav className="justify-content-end">
              <Navbar.Brand className="informacionBarraSuperior">{this.state.puntos}</Navbar.Brand>
              <Navbar.Brand>
              <img
                src={Moneda}
                width="42"
                height="42"
                className="imagenBarraSuperior"
                alt="Moneda"
              />
              </Navbar.Brand>
              &nbsp;&nbsp;
              <Navbar.Brand href="/notificaciones">
              <img
                src={Notificaciones}
                width="40"
                height="41"
                className="imagenBarraSuperior"
                alt="Notificaciones"
              />
              <span className="badge badge-danger badge-counter">{this.state.numNotificaciones}</span>
              </Navbar.Brand>
              <Navbar.Brand href="/amigos">
              <img
                src={Amigos}
                width="40"
                height="40"
                className="imagenBarraSuperior"
                alt="Amigos"
              />
              <span className="badge badge-danger badge-counter">{this.state.numSolicitudes}</span>
              </Navbar.Brand >
              <Navbar.Brand href="/perfil">
              <img
                src={Perfil}
                width="40"
                height="44"
                className="imagenBarraSuperior"
                alt="Perfil"
              />
              </Navbar.Brand>
              &nbsp;
              <Navbar.Brand>
              <img
                src={CerrarSesion}
                width="40"
                height="43"
                className="imagenBarraSuperior"
                alt="Cerrar sesión"
                onClick={this.cerrarSesion}
              />
              </Navbar.Brand>
              &nbsp;&nbsp;
              <Navbar.Brand className="informacionBarraSuperior"> {this.state.nombre_usuario} </Navbar.Brand >
            </Nav>
          </Container>
        </Navbar>
      </div>
		);
  }
}
