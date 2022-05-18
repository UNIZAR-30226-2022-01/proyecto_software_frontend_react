import React from 'react';
import "./carta.css";
import Tropa from "../../imagenes/soldado.png";
import Caballo from "../../imagenes/caballo.png";
import Canion from "../../imagenes/canion.png";

const tipoCarta = [Tropa, Caballo, Canion]

const territorios = ["Australia Oriental", "Indonesia", "Nueva Guinea", "Alaska", "Ontario", "Territorio del Noroeste", "Venezuela", 
				   "Madagascar", "Africa del Norte", "Groenlandia", "Islandia", "Reino Unido", "Escandinavia", "Japon", "Yakutsk", "Kamchatka", 
				   "Siberia", "Ural", "Afganistan", "Oriente Medio", "India", "Siam", "China", "Mongolia", "Irkutsk", "Ucrania", "Europa del Sur", 
				   "Europa Occidental", "Europa del Norte", "Egipto", "Africa Oriental", "Congo", "Sudafrica", "Brasil", "Argentina", 
				   "Este de los Estados Unidos", "Estados Unidos Occidental", "Quebec", "America Central", "Peru", "Australia Occidental", "Alberta"];

export default class Carta extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.id,
		  tipo: props.tipo,
	  region: props.region,
	  comodin: props.comodin
		};
	this.handleClick = this.handleClick.bind(this);
	}
	
  static getDerivedStateFromProps(newProps) {
		return {
			id: newProps.id,
		  tipo: newProps.tipo,
	  region: newProps.region,
	  comodin: newProps.comodin
		};
	}

	handleClick(event) {
		event.preventDefault();
		this.props.onClick(this.state.id);
	}

	componentDidMount() {
		if (this.props.id !== null) {
			document.getElementById(this.state.id).style.backgroundColor = '#fafafa';
		}
	}

	render() {
		if (this.state.comodin) {
			return (
				<div className="cartaSeleccionada" id={this.state.id} onClick={this.handleClick}>
					<img className="fotoCartaMini" src={tipoCarta[0]} height="65" width="60" alt="imagenComodin1"/> <br></br> 
					<img className="fotoCartaMini" src={tipoCarta[1]} height="65" width="60" alt="imagenComodin2"/> <br></br> 
	  		  <img className="fotoCartaMini" src={tipoCarta[2]} height="65" width="60" alt="imagenComodin3"/> <br></br>
				</div>
	  );
		} else {
			return (
				<div className="cartaSeleccionada" id={this.state.id} onClick={this.handleClick}>
					<img className="fotoCarta" src={tipoCarta[this.state.tipo]} height="110" width="70" alt="imagenCartaNormal"/> <br></br>
					{territorios[this.state.region]}
				</div>
			); 
		}
  }
}

