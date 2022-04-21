import React from 'react';
import "./infoJugadorEspera.css";

export default class InfoJugadorEspera extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  id: props.id,
		  usuario: props.usuario,
		};
	}
	
	render() {
		return (
			<div id={this.state.id} className="participante">
				<div className="datosParticipante">{this.state.usuario}</div>
			</div>
		);  
  }
}

