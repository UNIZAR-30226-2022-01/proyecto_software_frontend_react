import React from 'react';
import swal from 'sweetalert2';
import { Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Robot from "../../imagenes/robot.png";
import "./infoNotificacion.css";

export default class InfoNotificacion extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			idNotificacion: props.idNotificacion,
			jugador: props.jugador,
			jugadorPrevio: props.jugadorPrevio,
			puntos: props.puntos,
			partidaGanada: props.partidaGanada,
      buscarPartida: false
		};

    this.irBuscarPartida = this.irBuscarPartida.bind(this);
	}

	static getDerivedStateFromProps(newProps) {
		return {
			idNotificacion: newProps.idNotificacion,
			jugador: newProps.jugador,
			jugadorPrevio: newProps.jugadorPrevio,
    	puntos: newProps.puntos,
			partidaGanada: newProps.partidaGanada,
		};
	}

  irBuscarPartida(){
    this.setState({buscarPartida: true})
  }

  aceptarSolicitudAmistad(e) {
    let nombre = e.currentTarget.id;
    fetch(`http://localhost:8090/api/aceptarSolicitudAmistad/${nombre}`, {
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
        title: `Eres amigo de ${nombre}`,
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
      });
    })
    .catch((e) => {
      swal.fire({
          title: 'Se ha producido un error al aceptar la solicitud de amistad',
          text: e,
          icon: 'error',
      });
    })
  }

  rechazarSolicitudAmistad(e) {
    let nombre = e.currentTarget.id;
    fetch(`http://localhost:8090/api/rechazarSolicitudAmistad/${nombre}`, {
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
        title: `Has rechazado la solicitud de amistad de ${nombre}`,
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
      });
    })
    .catch((e) => {
      swal.fire({
        title: 'Se ha producido un error al rechazar la solicitud de amistad',
        text: e,
        icon: 'error',
      });
    })
  }

  render() {
    if (this.state.buscarPartida) {
      return <Navigate to='/buscarPartida'/>;
    }

    switch (this.state.idNotificacion) {
      case -1:
        // No existen notificaciones para el usuario
        return (
          <div class="contenedorInfoNotificacionVacia">
            <div class="notificacionVacia">
              <text className="infoVacia"> 
                No tienes notificaciones todavía... 
                <br></br><br></br>
                <img className="imagenNotificacionesVacia" src={Robot} alt="notificacionesVacias" height="50" width="50"/>
                <br></br><br></br>
                ¡Únete a una partida para continuar disfrutando de la experiencia de juego!
                <br></br><br></br>
                <Button variant="primary" type="submit" size="lg" onClick={this.irBuscarPartida}>
                  Buscar partida
                </Button>
              </text>
            </div>
          </div>
        );
      case 0:
        // Recibida solicitud de amistad
        return (
          <div class="notificacion">
            <h3>Solicitud de amistad de {this.state.jugador} recibida.</h3>
            <button id={this.state.jugador} onClick={(e) => this.aceptarSolicitudAmistad(e)}>Aceptar</button>
            <button id={this.state.jugador} onClick={(e) => this.rechazarSolicitudAmistad(e)}>Rechazar</button>
          </div>
        );
      case 1:
        // Es el turno del jugador
        return (
          <div class="notificacion">
            <h3>{this.state.jugadorPrevio} ya ha realizado su jugada, ¡es tu turno!</h3>
            <button>Ir a la partida</button>
          </div>
        );
      case 2:
        // Recibir puntos
        let mensaje = "Has recibido " + this.state.puntos + " puntos ";
        if (this.state.partidaGanada) {
          mensaje += "por ganar la partida.";
        }
        else {
          mensaje += "por participar en una partida.";
        }

        return (
          <div class="notificacion">
            <h3>{mensaje}</h3>
          </div>
        );
      case 3:
        // Expulsión de una partida
        return (
          <div class="notificacion">
            <h3>Has sido expulsado de la partida por inactividad.</h3>
          </div>
        );
      default:
        return null;
    }
  }
}