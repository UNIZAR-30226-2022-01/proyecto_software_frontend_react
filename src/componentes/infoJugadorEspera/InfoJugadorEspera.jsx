import React from 'react';
import "./infoJugadorEspera.css";

export default class InfoJugadorEspera extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  id: props.id,
		  usuario: props.usuario,
		  color: props.color,
		};
	}

	static getDerivedStateFromProps(newProps) {
		return {
			id: newProps.id,
			usuario: newProps.usuario,
			color: newProps.color,
		};
	}

	componentDidUpdate() {
		document.getElementById(this.state.id).style.background = this.state.color;
	}
	
	render() {
		if (this.state.usuario === undefined) {
			return (
				<div id={this.state.id} className="participante">
					<div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
				</div>
			);  	
		}

		return (
			<div id={this.state.id} className="participante">
				<div className="datosParticipante">{this.state.usuario}</div>
			</div>
		);  
  }
}
