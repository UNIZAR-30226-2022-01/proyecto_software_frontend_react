import React from 'react';
import { Link } from "react-router-dom";
import BarraSuperiorGeneral from "../../componentes/barraSuperiorGeneral/BarraSuperiorGeneral";
import BarraInferior from "../../componentes/barraInferior/BarraInferior";
import "./buscarPartida.css";

export default class BuscarPartida extends React.Component {
  render() {
    return (
    <div className="cen">
      <BarraSuperiorGeneral></BarraSuperiorGeneral>

      <h1>Buscar partida</h1>

      <button>
        <Link to="/lobbyPartida">Lobby</Link>
      </button>

      <BarraInferior></BarraInferior>
    </div>
    );  
  }
}
