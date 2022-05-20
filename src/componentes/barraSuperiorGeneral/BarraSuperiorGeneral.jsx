import React from 'react';
import swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';
import Moneda from "../../imagenes/Moneda.png";
import Notificaciones from "../../imagenes/Notificaciones.png";
import Amigos from "../../imagenes/Amigos.png";
import Perfil from "../../imagenes/Perfil.png";
import CerrarSesion from "../../imagenes/CerrarSesion.png";
import { Nav, Navbar, Container } from 'react-bootstrap';
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
      irInicio: false,
      irNotificacion: false,
      irAmigos: false,
      irPerfil: false,
		};
      
    this.getNombreUsuario = this.getNombreUsuario.bind(this);
	  this.cerrarSesion = this.cerrarSesion.bind(this);
    this.obtenerPuntos = this.obtenerPuntos.bind(this);
    this.obtenerNumNotificaciones = this.obtenerNumNotificaciones.bind(this);
    this.obtenerNumSolicitudes = this.obtenerNumSolicitudes.bind(this);
	}
 
	componentDidMount() {
    this.obtenerPuntos();
    //this.obtenerNumNotificaciones();
    this.obtenerNumSolicitudes()
	}

  static getDerivedStateFromProps(newProps) {
    // Para poder actualizar el contador de puntos al hacer una compra
    return {puntos: newProps.puntos,};
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
    if (this.state.irInicio) {
      this.setState({irInicio: false});
      return <Navigate to='/inicio'/>;
    } else if (this.state.irNotificacion) {
      this.setState({irNotificacion: false});
      return <Navigate to='/notificaciones'/>;
    } else if (this.state.irAmigos) {
      this.setState({irAmigos: false});
      return <Navigate to='/amigos'/>;
    } else if (this.state.irPerfil) {
      this.setState({irPerfil: false});
      localStorage.setItem('nombre_usuario', this.state.nombre_usuario)
      return <Navigate to='/perfilUsuario'/>;
    } else if (this.state.irIdentificacion) {
      return <Navigate to='/'/>;
    }

		return (
      <div>
         <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand className="tituloBarraSuperior" onClick={() => this.setState({irInicio: true})}>World Domination</Navbar.Brand>
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
              <Navbar.Brand>
              <img
                src={Notificaciones}
                width="40"
                height="41"
                className="imagenBarraSuperior"
                alt="Notificaciones"
                onClick={() => this.setState({irNotificacion: true})}
              />
              <span className="badge badge-danger badge-counter">{this.state.numNotificaciones}</span>
              </Navbar.Brand>
              <Navbar.Brand>
              <img
                src={Amigos}
                width="40"
                height="40"
                className="imagenBarraSuperior"
                alt="Amigos"
                onClick={() => this.setState({irAmigos: true})}
              />
              <span className="badge badge-danger badge-counter">{this.state.numSolicitudes}</span>
              </Navbar.Brand >
              <Navbar.Brand>
              <img
                src={Perfil}
                width="40"
                height="44"
                className="imagenBarraSuperior"
                alt="Perfil"
                onClick={() => this.setState({irPerfil: true})}
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
