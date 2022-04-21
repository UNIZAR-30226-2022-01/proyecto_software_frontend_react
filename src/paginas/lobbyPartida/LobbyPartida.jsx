import React from 'react';
import { Link } from "react-router-dom";
import BarraSuperiorGeneral from "../../componentes/barraSuperiorGeneral/BarraSuperiorGeneral";
import BarraInferior from "../../componentes/barraInferior/BarraInferior";
import InfoJugadorEspera from "../../componentes/infoJugadorEspera/InfoJugadorEspera";
import "./lobbyPartida.css";

export default class LobbyPartida extends React.Component {
  render() {
    document.body.style.backgroundColor = "#FFFFFF";

    var infoLobby = [];
    for (var i = 0; i < 6; i++) {
        infoLobby.push(<InfoJugadorEspera  
        id={i}
        usuario="akiles754"/>);
    }

    return ( 
      <div className="cen">
        
        <BarraSuperiorGeneral></BarraSuperiorGeneral>

        <h1>Dominación Mundial</h1>
        <h2>¡Domina y defiende todos los territorios del mapa!</h2>

        <div className="contenedorJugadoresEspera">
          {infoLobby}
        </div>

        <div className="botonAtrasEspera">
          SALIR DEL LOBBY
        </div>

        <BarraInferior></BarraInferior>
      </div>
    );  
  }
}