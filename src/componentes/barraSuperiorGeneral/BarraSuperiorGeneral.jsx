import React from 'react';
import { Navigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import "./barraSuperior.css";

export default class BarraSuperiorGeneral extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			nombre_usuario: this.getNombreUsuario(document.cookie),
      ancho: 0,
			irIdentificacion: false,
		};
      
    this.getNombreUsuario = this.getNombreUsuario.bind(this);
		this.cerrarSesion = this.cerrarSesion.bind(this);
    this.navegarPerfil = this.navegarPerfil.bind(this);
	}
 
	componentDidMount() {
		//this.setState({ nombre_usuario: this.getNombreUsuario(document.cookie) });
    //this.setState({ ancho: this.state.nombre_usuario.length > 100 ? this.state.nombre_usuario.length: 100 });
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

	render() {
    if (this.state.irIdentificacion) {
      return <Navigate to='/'/>;
    }
    
    if (this.state.irPerfil) {
      return <Navigate to={`/perfil`}/>;
    }

    // TODO no cambia al perfil del usuario si estamos viendo el perfil de otro jugador
		return (
      <div class="topnav">
        <a class="active">World Domination</a>
				
        <div class="topnav-right">
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
