import React from 'react';
//import "./infoNotificacion.css";

export default class InfoNotificacion extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			idNotificacion: 0,
			jugador: null,
			jugadorPrevio: null,
			puntos: 0,
			partidaGanada: false,
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

    render() {
        switch (this.state.idNotificacion) {
            case 0:
                // Recibida solicitud de amistad
                return (
                    <div class="notificacion">
                        <h3>Solicitud de amistad de {this.state.jugador} recibida.</h3>
                        <button>Aceptar</button>
                        <button>Rechazar</button>
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