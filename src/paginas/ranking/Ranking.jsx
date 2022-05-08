import React from 'react';
import swal from 'sweetalert2';
import BarraSuperiorGeneral from "../../componentes/barraSuperiorGeneral/BarraSuperiorGeneral";
import BarraInferior from "../../componentes/barraInferior/BarraInferior";
import { Link } from "react-router-dom";
import "./ranking.css";

export default class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        jugadores: [],
        partidasGanadasUsuario: 0,
        partidasJugadasUsuario: 0,
        usuario: null,
        posicion: null,
        // Cambiar para modificar el número de jugadores del ranking mostrados
        // Si hay menos jugadores que los especificados, se adapta el número
        maxNumeroJugadores: 10, 
    };

    this.getNombreUsuario = this.getNombreUsuario.bind(this);
    this.recuperarRanking = this.recuperarRanking.bind(this);
    this.verPerfil = this.verPerfil.bind(this);
  };


  componentDidMount() {
    this.setState({usuario: this.getNombreUsuario(document.cookie)});
    this.recuperarRanking();
  }

  getNombreUsuario(nombre) {
    if (nombre.length > 0) {
      nombre = nombre.split('=')[1];
      nombre = nombre.split('|')[0];
    }
    return nombre;
  }

  verPerfil(e) {
    localStorage.setItem('nombre_usuario', e.currentTarget.id);
  }

  recuperarRanking() {
    fetch(`http://localhost:8090/api/ranking`, {
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
      let jugadoresArr = [];
      if (Object.keys(response).length < this.state.maxNumeroJugadores) {
        this.setState({maxNumeroJugadores: Object.keys(response).length});
      }

      for (var i=0; i < Object.keys(response).length; i++) {
        if (i < this.state.maxNumeroJugadores) {
          jugadoresArr.push(<div className='infoJugador' key={i}>
            <h3>Puesto {i+1}: {response[i]["NombreUsuario"]}</h3>
            <h4>Partidas ganadas: {response[i]["PartidasGanadas"]}, partidas jugadas: {response[i]["PartidasTotales"]}</h4>
            <Link to='/perfil' onClick={this.verPerfil} id={response[i]["NombreUsuario"]}><button>Ver Perfil</button></Link>
            </div>);
        }

        if (response[i]["NombreUsuario"] == this.state.usuario) {
          // Almacenamos la información del usuario
          this.setState({posicion: i+1});
          this.setState({partidasGanadasUsuario: response[i]["PartidasGanadas"]});
          this.setState({partidasJugadasUsuario: response[i]["PartidasTotales"]});
        }
      }

      this.setState({jugadores: jugadoresArr});
    })
    .catch((e) => {
        swal.fire({
            title: 'Se ha producido un error al recuperar el ranking',
            text: e,
            icon: 'error',
        });
    })
  }

  // TODO, arreglar el scroll para que la bottom bar no se superponga a los jugadores de la parte baja del ranking
  render() {
    return (
    <div className="cen">
      <BarraSuperiorGeneral/>
      <h1>Ranking</h1>
      <h3>Eres el jugador número {this.state.posicion} del Ranking, 
        con {this.state.partidasGanadasUsuario} partidas ganadas de 
        un total de {this.state.partidasJugadasUsuario} partidas.
      </h3>
      <h2>Top {this.state.maxNumeroJugadores} del ranking</h2>
      {this.state.jugadores}
      <BarraInferior/>
    </div>
    );  
  }
}
