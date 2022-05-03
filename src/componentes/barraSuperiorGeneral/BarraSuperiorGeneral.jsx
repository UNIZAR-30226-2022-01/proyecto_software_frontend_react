import React from 'react';
import { Navigate } from 'react-router-dom';
import "./barraSuperior.css";

export default class BarraSuperiorGeneral extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			nombre_usuario: this.getNombreUsuario(document.cookie),
      ancho: 0,
			irIdentificacion: false,
      irPerfil: false,
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
    this.setState({ irPerfil: true});
    //IrPerfil(this.state.nombre_usuario);
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
        <a class="active">World Domination</a>
				
        <div class="topnav-right">
        	<a><img class="imagenes" src="https://img.icons8.com/material-rounded/48/000000/add-user-group-man-man.png"/></a>
        	<a><img class="imagenes" src="https://img.icons8.com/material-sharp/50/000000/mail.png" /></a>
        
        	<div class="dropdown"> 
            <button class="dropbtn">{this.state.nombre_usuario}</button>
            <div class="dropdown-content">
            <a width ={this.state.ancho} onClick={this.navegarPerfil}>Perfil</a>
            <a width ={this.state.ancho} onClick={this.cerrarSesion}>Log out</a>
            </div>
        	</div>
        </div>
      </div>
		);
  }
}
