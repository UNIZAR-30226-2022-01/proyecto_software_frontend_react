import React from 'react';
import swal from 'sweetalert2';
import { Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Robot from "../../imagenes/robot.png";
import Confetti from "../../imagenes/confetti.png";
import SadFace from "../../imagenes/sad-face.png";
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
      buscarPartida: false,
      mapa: false,
      tienda: false
		};

    this.irBuscarPartida = this.irBuscarPartida.bind(this);
    this.irMapa = this.irMapa.bind(this);
    this.irTienda = this.irTienda.bind(this);
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

  irBuscarPartida() {
    this.setState({buscarPartida: true})
  }

  irMapa() {
    this.setState({mapa: true})
  }

  irTienda() {
    this.setState({tienda: true})
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
    } else if (this.state.mapa) {
      return <Navigate to='/mapa'/>;
    } else if (this.state.tienda) {
      return <Navigate to='/tienda'/>;
    }

    switch (this.state.idNotificacion) {
      case -1:
        // No existen notificaciones para el usuario
        return (
          <div class="contenedorInfoNotificacionVacia">
            <div class="notificacionVacia">
              <text className="infoNotificacionVacia"> 
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
          <div className="card border-info mb-3 notificacionRecibirPuntos">
            <text className="infoNotificacion"> 
            ¡{this.state.jugador} te ha enviado una solicitud de amistad!
            </text>
            <div className="botonNotificacion">
              <button type="button" class="btn btn-outline-success botonNotificacion" id={this.state.jugador} size="lg" onClick={(e) => this.aceptarSolicitudAmistad(e)}>
                  Aceptar
              </button>
              <button type="button" class="btn btn-outline-danger botonNotificacion2" id={this.state.jugador} size="lg" onClick={(e) => this.rechazarSolicitudAmistad(e)}>
                  Cancelar
              </button>
            </div>
          </div>
        );
      case 1:
        // Es el turno del jugador
        return (
          <div className="card border-success mb-3 notificacionRecibirPuntos">
            <text className="infoNotificacion"> 
            {this.state.jugadorPrevio} ya ha realizado su jugada, ¡es tu turno!
            </text>
            <div className="botonNotificacion">
              <button type="button" class="btn btn-outline-primary botonNotificacion" size="lg" onClick={this.irMapa}>
                  Ir a la partida
              </button>
            </div>
          </div>
        );
      case 2:
        // Recibir puntos
        let mensaje;
        if (this.state.partidaGanada) { // Ganar Partida
          mensaje = "¡Enhorabuena! Has recibido " + this.state.puntos + " por ganar.";
          return (
            <div className="card border-primary mb-3 notificacionRecibirPuntos">
              <text className="infoNotificacion"> 
                {mensaje}
              </text>
              <div className="imagenNotificacion">
                <img className="imagenNotificacionesVacia" src={Confetti} alt="confetti" height="30" width="30"/>
              </div>
              <div className="botonNotificacion">
                <button type="button" class="btn btn-outline-primary botonNotificacion" size="lg" onClick={this.irTienda}>
                    Ir a la tienda
                </button>
              </div>
            </div>
          );
        }
        else {  // Perder partida
          mensaje = "¡Has perdido! Has recibido " + this.state.puntos + " por participar.";
          return (
            <div className="card border-primary mb-3 notificacionRecibirPuntos">
              <text className="infoNotificacion"> 
                {mensaje}
              </text>
              <div className="imagenNotificacion">
                <img className="imagenNotificacionesVacia" src={SadFace} alt="sad-face" height="30" width="30"/>
              </div>
              <div className="botonNotificacion">
                <button type="button" class="btn btn-outline-primary botonNotificacion" size="lg" onClick={this.irTienda}>
                    Ir a la tienda
                </button>
              </div>
            </div>
          );
        }
      case 3:
        // Expulsión de una partida
        return (
          <div className="card border-warning mb-3 notificacionExpulsion">
            <text className="infoNotificacion"> 
              Has sido expulsado de la partida por inactividad.
            </text>
          </div>
        );
      default:
        return null;
    }
  }
}