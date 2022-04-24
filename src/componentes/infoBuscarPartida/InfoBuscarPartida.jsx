import React from 'react';
import "./infoBuscarPartida.css";

export default class InfoBuscarPartida extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			idPartida: 0,
			esPublica: false,
			numJugadores: 0,
			maxJugadores: 0,
			amigosPresentes: [],
			numAmigosPresentes: 0,
		};
	}

	static getDerivedStateFromProps(newProps) {
		return {
			idPartida: newProps.idPartida,
			esPublica: newProps.esPublica,
			numJugadores: newProps.numJugadores,
    	maxJugadores: newProps.maxJugadores,
			amigosPresentes: newProps.amigosPresentes,
			numAmigosPresentes: newProps.numAmigosPresentes,
		};
	}

	render() {
		var tipoPartida = "Partida privada";
		if (this.state.esPublica == true) {
			tipoPartida = "Partida pública";
		}

		return (
			<div id={this.state.idPartida} className="partidaBuscada">
					<div className="datosPartidaBuscada"> {tipoPartida} ({this.state.numJugadores}/{this.state.maxJugadores}) </div>
					<div className="datosPartidaBuscada">Amigos ({this.state.numAmigosPresentes}): {this.state.amigosPresentes} </div>
				</div>
		);  
  }
}
