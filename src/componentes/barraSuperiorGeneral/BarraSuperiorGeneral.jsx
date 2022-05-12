import React from 'react';
import swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Coins from "../../imagenes/coins.png";
import Message from "../../imagenes/message.png";
import Friends from "../../imagenes/friends.png";
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

    static getDerivedStateFromProps(newProps) {
        return {
			puntos: newProps.puntos,
		};
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

	render() {
    console.log("Render topbar")
    if (this.state.irIdentificacion) {
      return <Navigate to='/'/>;
    }
    
    if (this.state.irPerfil) {
      return <Navigate to={`/perfil`}/>;
    }

		return (
      <div class="topnav">
        <a class="active" href="/inicio">World Domination</a>
				
        <div class="topnav-right">
          <div className="datosPuntuacion">
            <img className="puntuacion" src={Coins} alt="puntos"/> {this.state.puntos}
          </div>
          <Link to='/amigos'><img class="imagenes" src={Friends} alt="friends"/></Link>
        	<Link to='/notificaciones'><img class="imagenes" src={Message} alt="notificacion"/></Link>
        
        	<div class="dropdown"> 
            <button class="dropbtn">{this.state.nombre_usuario}</button>
            <div class="dropdown-content">
            <Link to='/perfil' onClick={this.navegarPerfil}>Perfil</Link>
            <a width ={this.state.ancho} onClick={this.cerrarSesion}>Log out</a>
            </div>
        	</div>
        </div>
      </div>
		);
  }
}
