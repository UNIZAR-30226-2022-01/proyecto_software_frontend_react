import React from 'react';
import swal from 'sweetalert2';
import BarraSuperiorGeneral from "../../componentes/barraSuperiorGeneral/BarraSuperiorGeneral";
import BarraInferior from "../../componentes/barraInferior/BarraInferior";
import "./notificaciones.css";
import InfoNotificacion from "../../componentes/infoNotificacion/infoNotificacion.jsx";
import Constantes from '../../constantes';

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
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
    
  recuperarNotificaciones() {
    fetch(Constantes.RUTA_API + `/api/obtenerNotificaciones`, {
      method: 'get',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      credentials: 'include'
    })
    .then((response) => {
      if (!response.ok) {
          return response.text().then(text => {throw new Error(text)});
      }
      return response.json();
    })
    .then((response) => {
      if (response == null) {
        this.setState({hayNotificaciones: false});
      }
      else {
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
      /*this.setState({idNotificaciones: [0,1,2,3]});
      this.setState({jugadores: ["emii", "", "", ""]});
      this.setState({jugadoresPrevios: ["", "zineb helali", "", ""]});
      this.setState({puntos: [0,0,20,40]});
      this.setState({partidasSonGanadas: [false,false,true,false]});
      this.setState({hayNotificaciones: true});
      this.setState({numNotificaciones: 4});*/

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
