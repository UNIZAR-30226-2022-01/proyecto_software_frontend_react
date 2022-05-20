import React from 'react';
import swal from 'sweetalert2';
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
		};
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
    switch (this.state.idNotificacion) {
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