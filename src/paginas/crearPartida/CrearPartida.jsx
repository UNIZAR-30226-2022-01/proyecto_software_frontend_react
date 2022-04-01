import React from 'react';
import { Link } from "react-router-dom";
import "./crearPartida.css";

export default class CrearPartida extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			maxJugadores: 0,
			tipoPartida: "",
			contrasegna: "",
			errores: {
				contrasegna: "",
			},
		};
	}

  render() {
    document.body.style.backgroundColor = "#FFFFFF";
    return (
    <div className="cen">
      <h1>Crear partida</h1>

      <select id="maxJugadores">
        <option value="3" selected>3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>

      <select id="tipoPartida">
        <option value="3" selected>3</option>
        <option value="" >4</option>
      </select>

      <br></br><br></br>
      <button>
        <Link to="/mapa">Mapa</Link>
      </button>

    </div>
    );  
  }
}