import React from 'react';
import swal from 'sweetalert2';
import BarraSuperiorGeneral from "../../componentes/barraSuperiorGeneral/BarraSuperiorGeneral";
import BarraInferior from "../../componentes/barraInferior/BarraInferior";
import "./notificaciones.css";
import InfoNotificacion from "../../componentes/infoNotificacion/infoNotificacion.jsx";

export default class Notificaciones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hayNotificaciones: false,
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
    //this.interval = setInterval(() => this.recuperarNotificaciones(), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
    
  recuperarNotificaciones() {
    fetch(`http://localhost:8090/api/obtenerNotificaciones`, {
      method: 'get',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      credentials: 'include'
    })
    .then((response) => {
      if (!response.ok) {
          return response.text().then(text => {throw new Error(text)});
      }
      return response.text();
    })
    .then((response) => {
      if (response.localeCompare("null\n") === 0) {
        this.setState({hayNotificaciones: false});
      } 
      else {
        response = JSON.parse(response);
        var idsArr = [];
        var jugadoresArr = [];
        var jugadoresPreviosArr = [];
        var puntosArr = [];
        var ganadaArr = [];

        this.setState({numNotificaciones: Object.keys(response).length});
        for (var i = 0; i < Object.keys(response).length; i++) {
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
        this.setState({hayNotificaciones: true});
      }
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
    document.body.style.backgroundColor = "rgb(28,28,30)";

    var notificaciones = [];

    if (this.state.hayNotificaciones) {
      for (var i = 0; i < this.state.numNotificaciones; i++) {
        notificaciones.push(<InfoNotificacion
          idNotificacion = {this.state.idNotificaciones[i]}
          jugador = {this.state.jugadores[i]}
          jugadorPrevio = {this.state.jugadoresPrevios[i]}
          puntos = {this.state.puntos[i]}
          partidaGanada = {this.state.partidasSonGanadas[i]}/>)
      }
    }
    else {
      notificaciones.push(<InfoNotificacion
        idNotificacion = {-1}
        jugador = {"null"}
        jugadorPrevio = {"null"}
        puntos = {0}
        partidaGanada = {false}/>)
    }
        
    return (
      <div className="cen">

        <BarraSuperiorGeneral></BarraSuperiorGeneral>

        <div className="contenedorTituloNotificaciones">
          <text className="textoH1Notificaciones">Notificaciones</text>
        </div>

        <div className="contenedorNotificaciones">
          {notificaciones}
        </div>
        
        <BarraInferior></BarraInferior>
      </div>
    );
  }
}
