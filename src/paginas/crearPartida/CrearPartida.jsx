import React from 'react';
import { Link } from "react-router-dom";
import "./crearPartida.css";

export default class CrearPartida extends React.Component {
  render() {
    return (
    <div className="cen">
      <h1>Crear partida</h1>

      <button>
        <Link to="/mapa">Mapa</Link>
      </button>

    </div>
    );  
  }
}