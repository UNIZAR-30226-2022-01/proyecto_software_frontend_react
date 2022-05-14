import React from 'react';
import Cartas from "../../imagenes/cartas.png";
import Territorios from "../../imagenes/territorios.png";
import Tropas from "../../imagenes/soldier.png";
import swal from 'sweetalert2';
import "./infoJugador.css";

export default class InfoJugador extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  id: props.id,
		  usuario: props.usuario,
			numTropas: props.numTropas,
			numTerritorios: props.numTerritorios,
			numCartas: props.numCartas,
			color: props.color,
      fotoPerfil: null
		};

    this.obtenerFotoPerfil = this.obtenerFotoPerfil.bind(this);
	}

  obtenerFotoPerfil() {
    fetch(`http://localhost:8090/api/obtenerFotoPerfil/${this.state.usuario}`, {
      method: 'get',
      credentials: 'include'
    })
    .then((response) => {
      if (!response.ok) {
        return response.text().then(text => {throw new Error(text)});
      }
      return response.blob();
    })
    .then((blob) => {
      let objectURL = URL.createObjectURL(blob);
      this.setState({fotoPerfil: objectURL});
    })
    .catch ((e) => {
      swal.fire({
        title: 'Se ha producido un error al obtener el avatar del usuario',
        text: e,
        icon: 'error',
      });
    })
  }
	
  static getDerivedStateFromProps(newProps) {
		return {
			id: newProps.id,
			usuario: newProps.usuario,
	  	numTropas: newProps.numTropas,
	  	numTerritorios: newProps.numTerritorios,
	  	numCartas: newProps.numCartas,
			color: newProps.color,
		};
	}

	componentDidUpdate() {
		if (this.state.fotoPerfil === null) {
			this.obtenerFotoPerfil();
		}
		document.getElementById(this.state.id).style.background = this.state.color;
	}

	render() {
		return (
			<div id={this.state.id} className="jugador">
				<div className="datosJugadores">
					{this.state.usuario} &nbsp;&nbsp;
					<img className="avatarUsuario" src={this.state.fotoPerfil} height="25" width="25"/>
				</div>
				<div className="datosJugadores">
					<img src={Tropas} alt="tropas"/> {this.state.numTropas} &nbsp;&nbsp;
					<img src={Territorios} alt="territorios"/> {this.state.numTerritorios} &nbsp;&nbsp;
					<img src={Cartas} alt="cartas"/> {this.state.numCartas}
				</div>
			</div>
		);  
  }
}

