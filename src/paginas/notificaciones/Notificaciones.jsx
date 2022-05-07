import React from 'react';
import swal from 'sweetalert2';
import BarraSuperiorGeneral from "../../componentes/barraSuperiorGeneral/BarraSuperiorGeneral";
import BarraInferior from "../../componentes/barraInferior/BarraInferior";
import "./notificaciones.css";
import InfoNotificacion from "../../componentes/infoNotificacion/infoNotificacion.jsx";

// TODO poder hacer scroll en las notificaciones si ocupan más pantalla de la disponible
export default class Notificaciones extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notificacionesPrueba: '[{"IDNotificacion": 0, "Jugador": "mapachin"},{"IDNotificacion": 1, "JugadorPrevio": "mapachon"},'+
            '{"IDNotificacion": 2, "Puntos": 20, "PartidaGanada": true}, {"IDNotificacion": 2, "Puntos": 5, "PartidaGanada": false}, {"IDNotificacion": 3}]',
            numNotificaciones: 0,
            idNotificaciones: [],
            jugadores: [],
            jugadoresPrevios: [],
            puntos: [],
            partidasSonGanadas: [],
        };

        this.recuperarNotificaciones = this.recuperarNotificaciones.bind(this);
    }

    componentDidMount() {
        this.recuperarNotificaciones();
    }
    
    recuperarNotificaciones() {
        fetch(`http://localhost:8090/api/obtenerNotificaciones`, {
            method: 'get',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            credentials: 'include'
        })
        .then((response) => {
            console.log('Respuesta recibida de la api');
            if (!response.ok) {
                return response.text().then(text => {throw new Error(text)});
            }
            return response.json();
        })
        .then((response) => {
            // Notificaciones de prueba
            response = JSON.parse(this.state.notificacionesPrueba);

            var idsArr = [];
            var jugadoresArr = [];
            var jugadoresPreviosArr = [];
            var puntosArr = [];
            var ganadaArr = [];

            this.setState({numNotificaciones: Object.keys(response).length});
            for (var i = 0; i < Object.keys(response).length; i++) {
                console.log(response[i]);
                idsArr.push(response[i]['IDNotificacion']);
                jugadoresArr.push(response[i]['Jugador']);
                jugadoresPreviosArr.push(response[i]['JugadorPrevio']);
                puntosArr.push(response[i]['Puntos']);
                ganadaArr.push(response[i]['PartidaGanada']);
            }

            this.setState({idNotificaciones: idsArr});
            this.setState({jugadores: jugadoresArr});
            this.setState({jugadoresPrevios: jugadoresPreviosArr});
            this.setState({puntos: puntosArr});
            this.setState({partidasSonGanadas: ganadaArr});
        })
        .catch((e) => {
            swal.fire({
                title: 'Se ha producido un error al recuperar las notificaciones',
                text: e,
                icon: 'error',
            });
        })
    }
        
    
    render() {
        // TODO mensaje de no tienes notificaciones si está vacío
        var notificaciones = [];
        for (var i = 0; i < this.state.numNotificaciones; i++) {
            notificaciones.push(<InfoNotificacion
                idNotificacion = {this.state.idNotificaciones[i]}
                jugador = {this.state.jugadores[i]}
                jugadorPrevio = {this.state.jugadoresPrevios[i]}
                puntos = {this.state.puntos[i]}
                partidaGanada= {this.state.partidasSonGanadas[i]}/>)
        }

        return (
            <div className="cen">

            <BarraSuperiorGeneral></BarraSuperiorGeneral>
            <h1>Notificaciones</h1>
            {notificaciones}
            <BarraInferior></BarraInferior>
            </div>
        );
    }
}
