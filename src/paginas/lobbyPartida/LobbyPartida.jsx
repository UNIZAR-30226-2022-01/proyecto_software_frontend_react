import React from 'react';
import { Link } from "react-router-dom";
import BarraSuperiorGeneral from "../../componentes/barraSuperiorGeneral/BarraSuperiorGeneral";
import BarraInferior from "../../componentes/barraInferior/BarraInferior";
import "./lobbyPartida.css";

export default class LobbyPartida extends React.Component {
  render() {
    document.body.style.backgroundColor = "#FFFFFF";
    return ( 
    <div className="cen">
      
      <BarraSuperiorGeneral></BarraSuperiorGeneral>

      <h1>Lobby Partida</h1>

      <button>
        <Link to="/mapa">Mapa</Link>
      </button>

      <BarraInferior></BarraInferior>
    </div>
    );  
  }
}