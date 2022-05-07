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
        partidasGanadas: [],
        partidasJugadas: [],
        usuario: null,
        posicion: null
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
      for (var i=0; i < Object.keys(response).length; i++) {
        jugadoresArr.push(<div className='infoJugador' key={i}>
          <h3>{response[i]["NombreUsuario"]}</h3>
          <h4>Partidas ganadas: {response[i]["PartidasGanadas"]}, partidas jugadas: {response[i]["PartidasTotales"]}</h4>
          <Link to='/perfil' onClick={this.verPerfil} id={response[i]}><button>Ver Perfil</button></Link>
          </div>);
      }

      this.setState({jugadores: jugadoresArr});
    })
    .catch((e) => {
        swal.fire({
            title: 'Se ha producido un error al recuperar la lista de amigos',
            text: e,
            icon: 'error',
        });
    })
  }

  render() {
    return (
    <div className="cen">
      <BarraSuperiorGeneral/>
      <h1>Ranking</h1>
      {this.state.jugadores}
      <BarraInferior/>
    </div>
    );  
  }
}
