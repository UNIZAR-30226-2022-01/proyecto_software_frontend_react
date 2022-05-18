import React from 'react';
import swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Coins from "../../imagenes/coins.png";
import Message from "../../imagenes/message.png";
import Friends from "../../imagenes/friends.png";
import { Nav, Navbar, Container } from 'react-bootstrap';
import "./barraSuperior.css";

export default class BarraSuperiorGeneral extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			nombre_usuario: this.getNombreUsuario(document.cookie),
      ancho: 0,
      puntos: 0,
			irIdentificacion: false,
		};
      
    this.getNombreUsuario = this.getNombreUsuario.bind(this);
	this.cerrarSesion = this.cerrarSesion.bind(this);
    this.navegarPerfil = this.navegarPerfil.bind(this);
    this.obtenerPuntos = this.obtenerPuntos.bind(this);
	}
 
	componentDidMount() {
		this.setState({ nombre_usuario: this.getNombreUsuario(document.cookie) });
    this.setState({ ancho: this.state.nombre_usuario.length > 100 ? this.state.nombre_usuario.length: 100 });
    this.obtenerPuntos();
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
      console.log(response.Puntos)
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

	render() {
    if (this.state.irIdentificacion) {
      return <Navigate to='/'/>;
    }

		return (
      <div>
         <Navbar bg="primary" variant="dark">
          <Container>
          <Navbar.Brand href="/inicio">World Domination</Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link href="https://github.com/fran1017">Fran Crespo</Nav.Link>
            <Nav.Link href="https://github.com/Guilleuz">Guillermo Enguita</Nav.Link>
          </Nav>
          </Container>
        </Navbar>
      </div>
		);
  }
}
