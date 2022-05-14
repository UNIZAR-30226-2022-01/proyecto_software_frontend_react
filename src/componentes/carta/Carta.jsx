import React from 'react';
import "./carta.css";
import Tropa from "../../imagenes/soldier.png";

const tipoCarta = ["https://img.icons8.com/ios-filled/64/000000/soldier.png", 
                   "https://img.icons8.com/ios-filled/64/000000/horseback-riding.png", 
									 "https://img.icons8.com/ios-filled/64/000000/cannon.png"]

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
						<img className="fotoCartaMini" src={tipoCarta[0]} height="65" width="65"/> <br></br> 
						<img className="fotoCartaMini" src={tipoCarta[1]} height="65" width="65"/> <br></br> 
      	    <img className="fotoCartaMini" src={tipoCarta[2]} height="65" width="65"/> <br></br>
				</div>
      );
		} else {
			return (
				<div className="cartaSeleccionada" id={this.state.id} onClick={this.handleClick}>
					<img className="fotoCarta" src={tipoCarta[this.state.tipo]} height="75" width="75"/> <br></br>
					{territorios[this.state.region]}
				</div>
			); 
		}
  }
}

