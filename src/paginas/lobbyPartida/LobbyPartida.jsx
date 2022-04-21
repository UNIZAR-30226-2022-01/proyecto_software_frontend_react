import React from 'react';
import { Navigate } from "react-router-dom";
import queryString from 'query-string';
import swal from 'sweetalert2';
import BarraSuperiorGeneral from "../../componentes/barraSuperiorGeneral/BarraSuperiorGeneral";
import BarraInferior from "../../componentes/barraInferior/BarraInferior";
import InfoJugadorEspera from "../../componentes/infoJugadorEspera/InfoJugadorEspera";
import "./lobbyPartida.css";

export default class LobbyPartida extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jugadores: ["none","none","none","none","none","none"],
      maxJugadores: 3,
			irBuscarPartida: false,
		};

    this.handleLeaveButton = this.handleLeaveButton.bind(this);
    this.comprobarLobby = this.comprobarLobby.bind(this);
  }

  handleLeaveButton(event) {
    event.preventDefault();

		fetch('http://localhost:8090/api/abandonarLobby', {
			method: 'post',
			headers: {'Content-Type':'application/x-www-form-urlencoded'},
			credentials: 'include'
		})
		.then((response) => {
			if (!response.ok) {
				throw response.text();
			}
		})
		.then(() => {
			swal.fire({
				title: 'Lobby abandonado con éxito',
				icon: 'success',
				timer: 2000,
				timerProgressBar: true,
			});
			this.setState({irBuscarPartida:true});
		})
		.catch ((error) => {
			error.then((e) => {
				swal.fire({
					title: 'Se ha producido un error al abandonar el Lobby',
					text: e,
					icon: 'error',
				});
			})
		})
  };

  comprobarLobby() {
    fetch('http://localhost:8090/api/obtenerEstadoLobby', {
			method: 'get',
      credentials: 'include'
		})
		.then((response) => {
			if (response.ok) {
				return response.json();
			}
      else {
        throw response.text();
      }
		})
		.then((response) => {	
      console.log(JSON.stringify(response['MaxJugadores']));
      this.setState({maxJugadores: response['MaxJugadores']});

		})
		.catch((error) => {
      error.then((e) => {
        swal.fire({
          title: 'Se ha producido un error al comprobar el estado del Lobby',
          text: e,
          icon: 'error',
        });
      })
    })
  }

  componentDidMount() {
    //this.interval = setInterval(() => this.comprobarLobby(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    document.body.style.backgroundColor = "#FFFFFF";

    var infoLobby = [];
    for (var i = 0; i < this.state.maxJugadores; i++) {
        infoLobby.push(<InfoJugadorEspera  
        id={i}
        usuario={this.state.jugadores[i]}/>);
    }

    if (this.state.irBuscarPartida) {
			return <Navigate to='/buscarPartida'/>;
		}
    
    return ( 
      <div className="cen">
        
        <BarraSuperiorGeneral></BarraSuperiorGeneral>

        <h1>Dominación Mundial</h1>
        <h2>¡Domina y defiende todos los territorios del mapa!</h2>

        <div className="contenedorJugadoresEspera">
          {infoLobby}
        </div>

        <button className="botonAtrasEspera" onClick={this.handleLeaveButton}>
          Abandonar Lobby
        </button>

        <BarraInferior></BarraInferior>
      </div>
    );  
  }
}