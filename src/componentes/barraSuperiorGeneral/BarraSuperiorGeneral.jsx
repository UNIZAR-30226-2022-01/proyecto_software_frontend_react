import React from 'react';
import swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
    
    if (this.state.irPerfil) {
      return <Navigate to={`/perfil`}/>;
    }

		return (
      <div class="topnav">
        <a class="active" href="/inicio">World Domination</a>
				
        <div class="topnav-right">
          <div className="datosPuntuacion">
            <img className="puntuacion" src="https://img.icons8.com/ios/50/000000/coins.png" alt="puntos"/> {this.state.puntos}
          </div>
          <Link to='/amigos'><img class="imagenes" src="https://img.icons8.com/material-rounded/48/000000/add-user-group-man-man.png"/></Link>
        	<Link to='/notificaciones'><img class="imagenes" src="https://img.icons8.com/material-sharp/50/000000/mail.png" /></Link>
        
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
