import React from 'react';
import InfoJugador from "../../componentes/infoJugador/InfoJugador";
import MapaPartida from "../../componentes/mapaPartida/MapaPartida";
import BarraSuperiorJuego from '../../componentes/barraSuperiorJuego/BarraSuperiorJuego'
import "./mapa.css";

export default class Mapa extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enableButton: false,
    };

    this.handleChartButton = this.handleChartButton.bind(this);
    this.handleWorldButton = this.handleWorldButton.bind(this);
    this.handleUserButton = this.handleUserButton.bind(this);
  }

  /* En caso de pulsar el botón "bar_char_but y !enableButton se mostrarán el resto de botones". 
     Por otro lado, en caso de pulsar el botón "bar_char_but y !enableButton desapareceran 
     el resto de botones. */
  handleChartButton(event) {
		event.preventDefault();

    if (event.target.id === 'bar_char_but') {
      if (this.state.enableButton) {
        document.getElementById('hidden_buttons').style.visibility = 'hidden';
        document.getElementById(event.target.id).src = "https://img.icons8.com/material-rounded/48/000000/bar-chart.png";
        this.setState({enableButton:false});
      }
      else {
        document.getElementById('hidden_buttons').style.visibility = 'visible';
        document.getElementById(event.target.id).src = "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-cross-100-most-used-icons-flaticons-lineal-color-flat-icons.png";
        this.setState({enableButton:true});
      }
    }
	};

  /* Muestra el mapa de la partida normal, indicando el número de tropas de cada casilla
     y mostrando el dueño de cada territorio */
  handleWorldButton(event) {
    event.preventDefault();

    console.log('World Button');
  };

  /* Muestra el mapa con la información de las regiones del mapa, indicando el número de 
     tropas extras recibidas por controlar al completo una región */
  handleUserButton(event) {
    event.preventDefault();

    console.log('User Button');
  };

  prueba(e) {
    document.getElementById(e.target.id).style.fill = 'red';
    document.getElementById("0").style.background = 'red';
  }

  render() {
    document.body.style.backgroundColor = "#45AFCB";

    var jugadores = [];
    for (var i = 0; i < 6; i++) {
        jugadores.push(<InfoJugador  
          id={i}
          usuario="akiles754"
          numTropas={25}
          numTerritorios={10}
          numCartas={11}/>);
    }

    return (
      <div className='cen'>
        <BarraSuperiorJuego></BarraSuperiorJuego>

        <MapaPartida></MapaPartida>
      
        {/* Información de las tropas, territorios y cartas de los jugadores */}
        <div className="containerJugadores">
          {jugadores}
        </div>

        <div className='containerBotones'>
          {/* Botones desplegables: botón info regiones y botón mapa usuario */}
          <div className="botonClick" id="hidden_buttons">
            <div className="boton">
              <input type="image" id="user_but" onClick={this.handleUserButton} src="https://img.icons8.com/ios/50/000000/user--v1.png" alt='user' height="60" width="60" />
            </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="boton">
             <input type="image" id="world_but" onClick={this.handleWorldButton} src="https://img.icons8.com/external-kmg-design-detailed-outline-kmg-design/64/000000/external-world-business-strategy-kmg-design-detailed-outline-kmg-design.png" alt='world' height="60" width="60"/>
            </div>
          </div>

          {/* Botones principales: botón desplegable mapas y botón cartas usuario */}
          <div className="botonesPrincipales">          
            <div className="boton">
              <input type="image" id="bar_char_but" onClick={this.handleChartButton} src="https://img.icons8.com/material-rounded/48/000000/bar-chart.png" alt='bar-chart' height="60" width="60" />
            </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="boton">
              <input type="image" id="cards_but" src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/60/000000/external-cards-children-toys-vitaliy-gorbachev-lineal-vitaly-gorbachev.png" alt='cards' height="60" width="60"/>
            </div>
          </div>
        </div>
      </div>
    );  
  }
}
