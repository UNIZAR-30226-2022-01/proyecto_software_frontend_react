import React from 'react';
import Cartas from "../../imagenes/cartas.png";
import Territorios from "../../imagenes/territorios.png";
import Tropas from "../../imagenes/soldier.png";
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
		};
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
		document.getElementById(this.state.id).style.background = this.state.color;
	}

	render() {
		return (
			<div id={this.state.id} className="jugador">
				<div className="datosJugadores">{this.state.usuario}</div>
				<div className="datosJugadores">
					<img src={Tropas} alt="tropas"/> {this.state.numTropas} &nbsp;&nbsp;
					<img src={Territorios} alt="territorios"/> {this.state.numTerritorios} &nbsp;&nbsp;
					<img src={Cartas} alt="cartas"/> {this.state.numCartas}
				</div>
			</div>
		);  
  }
}

