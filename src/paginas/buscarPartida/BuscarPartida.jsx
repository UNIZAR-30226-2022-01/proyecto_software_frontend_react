import React from 'react';
import swal from 'sweetalert2';
import { Navigate } from "react-router-dom";
import BarraSuperiorGeneral from "../../componentes/barraSuperiorGeneral/BarraSuperiorGeneral";
import BarraInferior from "../../componentes/barraInferior/BarraInferior";
import InfoBuscarPartida from "../../componentes/infoBuscarPartida/InfoBuscarPartida";
import "./buscarPartida.css";

export default class BuscarPartida extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idPartida: [],
      esPublica: [],
      numJugadores: [],
      maxJugadores: [],
      amigosPresentes: [],
      numAmigosPresentes: [],
      numPartidas: 0,
      irLobby: false
		};

    this.comprobarPartidas = this.comprobarPartidas.bind(this);
  }

  comprobarPartidas() {
    fetch('http://localhost:8090/api/obtenerPartidas', {
			method: 'get',
      credentials: 'include'
		})
		.then((response) => {
			if (!response.ok) {
				return response.text().then(text => {throw new Error(text)});
			}
      return response.json();
		})
		.then((response) => {
      if (response != null) {
        var idPartidaArr = [];
        var esPublicaArr = [];
        var numJugadoresArr = [];
        var maxJugadoresArr = [];
        var amigosPresentesArr = [];
        var numAmigosPresentesArr = [];
        
        this.setState({numPartidas: Object.keys(response).length});
        for (var i = 0; i < Object.keys(response).length; i++) {
          idPartidaArr.push(response[i]['IdPartida']);
          esPublicaArr.push(response[i]['EsPublica']);
          numJugadoresArr.push(response[i]['NumeroJugadores']);
          maxJugadoresArr.push(response[i]['MaxNumeroJugadores']);
          amigosPresentesArr.push(response[i]['AmigosPresentes']);
          numAmigosPresentesArr.push(response[i]['NumAmigosPresentes']);
        }
        this.setState({idPartida: idPartidaArr});
        this.setState({esPublica: esPublicaArr});
        this.setState({numJugadores: numJugadoresArr});
        this.setState({maxJugadores: maxJugadoresArr});
        if (amigosPresentesArr.length > 0) {
          this.setState({amigosPresentes: amigosPresentesArr});
        }
        this.setState({numAmigosPresentes: numAmigosPresentesArr});
      }
		})
		.catch((e) => {
      swal.fire({
        title: 'Se ha producido un error al obtener las partidas actuales',
        text: e,
        icon: 'error',
      });
    })
  }

  componentDidMount() {
    this.comprobarPartidas();
    this.interval = setInterval(() => this.comprobarPartidas(), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    document.body.style.backgroundColor = "#FFFFFF";

    var infoPartidas = [];
    for (var i = 0; i < this.state.numPartidas; i++) {
      infoPartidas.push(<InfoBuscarPartida  
        idPartida={this.state.idPartida[i]}
        esPublica={this.state.esPublica[i]}
        numJugadores={this.state.numJugadores[i]}
        maxJugadores={this.state.maxJugadores[i]}
        amigosPresentes={this.state.amigosPresentes[i]}
        numAmigosPresentes={this.state.numAmigosPresentes[i]}/>);
    } 

    if (this.state.irLobby) {
			return <Navigate to='/lobbyPartida'/>;
		}

    return (
    <div className="cen">
      <BarraSuperiorGeneral></BarraSuperiorGeneral>

      <h1>Buscar partida</h1>

      <div className="contenedorPartidas">
          {infoPartidas}
      </div>

      <BarraInferior></BarraInferior>
    </div>
    );  
  }
}
