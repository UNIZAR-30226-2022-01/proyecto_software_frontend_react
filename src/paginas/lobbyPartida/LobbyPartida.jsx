import React from 'react';
import { Navigate } from "react-router-dom";
import swal from 'sweetalert2';
import BarraSuperiorGeneral from "../../componentes/barraSuperiorGeneral/BarraSuperiorGeneral";
import BarraInferior from "../../componentes/barraInferior/BarraInferior";
import InfoJugadorEspera from "../../componentes/infoJugadorEspera/InfoJugadorEspera";
import { Button } from 'react-bootstrap';
import "./lobbyPartida.css";
import Constantes from '../../constantes';

export default class LobbyPartida extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jugadores: [],
      maxJugadores: 3,
			enCurso: false,
      irBuscarPartida: false,
      colores: ["#f94144", "#f9c74f", "#90be6d", "#0a9396", "#6a4c93", "#f9844a"]
		};

    this.handleLeaveButton = this.handleLeaveButton.bind(this);
    this.comprobarLobby = this.comprobarLobby.bind(this);
  }

  handleLeaveButton(event) {
    event.preventDefault();
    
    clearInterval(this.interval);
		fetch(Constantes.RUTA_API + '/api/abandonarLobby', {
			method: 'post',
			headers: {'Content-Type':'application/x-www-form-urlencoded'},
			credentials: 'include'
		})
		.then((response) => {
			if (!response.ok) {
				return response.text().then(text => {throw new Error(text)});
			}
		})
		.then(() => {
			swal.fire({
				title: 'Lobby abandonado con éxito',
				icon: 'success',
				timer: 2000,
				timerProgressBar: true,
			});
      localStorage.setItem('volver_partida', "false");
			this.setState({irBuscarPartida:true});
		})
		.catch ((e) => {
      swal.fire({
        title: 'Se ha producido un error al abandonar el Lobby',
        text: e,
        icon: 'error',
      });
		})
  };

  comprobarLobby() {
    fetch(Constantes.RUTA_API + '/api/obtenerEstadoLobby', {
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
      this.setState({maxJugadores: response['MaxJugadores']});
      this.setState({jugadores: response['NombresJugadores']});
      this.setState({enCurso: response['EnCurso']});
		})
		.catch((e) => {
      swal.fire({
        title: 'Se ha producido un error al comprobar el estado del Lobby',
        text: e,
        icon: 'error',
      });
    })
  }

  componentDidMount() {
    this.comprobarLobby();
    this.interval = setInterval(() => this.comprobarLobby(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    document.body.style.backgroundColor = "rgb(28,28,30)";
    
    var infoLobby = [];
    for (var i = 0; i < this.state.maxJugadores; i++) {
      infoLobby.push(<InfoJugadorEspera  
        id={i}
        usuario={this.state.jugadores[i]}
        color={this.state.colores[i]}/>);
    } 

    if (this.state.enCurso) {
			return <Navigate to='/mapa'/>;
		}

    if (this.state.irBuscarPartida) {
			return <Navigate to='/buscarPartida'/>;
		}
    
    return ( 
      <div className="cen">
        
        <BarraSuperiorGeneral></BarraSuperiorGeneral>

        <div className="contenedorTituloLobby">
          <h1 className="textoTituloLobby">¡Domina y defiende todos los territorios del mapa!</h1>
        </div>

        <div className="contenedorJugadoresEspera">
          {infoLobby}
        </div>

        <Button variant="secondary" onClick={this.handleLeaveButton}>Abandonar Lobby</Button>

        <BarraInferior></BarraInferior>
      </div>
    );  
  }
}
