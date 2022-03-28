import React from 'react';
import "./inforJugador.css";

export default class InfoJugador extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  id: props.id,
		  usuario: props.usuario,
			numTropas: props.numTropas,
			numTerritorios: props.numTerritorios,
			numCartas: props.numCartas,
		};
	}
	
	render() {
		return (
			<div id={this.state.id} className="jugador">
				<div className="datosJugadores">{this.state.usuario}</div>
				<div className="datosJugadores">
					<img src="https://img.icons8.com/ios-filled/20/000000/soldier.png"/> {this.state.numTropas} &nbsp;&nbsp;
					<img src="https://img.icons8.com/ios-filled/20/000000/singapore-territory.png"/> {this.state.numTerritorios} &nbsp;&nbsp;
					<img src="https://img.icons8.com/external-others-zufarizal-robiyanto/23/000000/external-cards-mutuline-ui-essential-others-zufarizal-robiyanto.png"/> {this.state.numCartas}
				</div>
			</div>
		);  
  }
}
