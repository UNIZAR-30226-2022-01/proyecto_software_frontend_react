import React from 'react';
import swal from 'sweetalert2';
import BarraSuperiorGeneral from "../../componentes/barraSuperiorGeneral/BarraSuperiorGeneral";
import BarraInferior from "../../componentes/barraInferior/BarraInferior";
import { Link } from "react-router-dom";
import { Table } from 'react-bootstrap';
import "./ranking.css";

export default class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        jugadores: [],
        nombresRanking: [],
        partidasGanadasUsuario: 0,
        partidasJugadasUsuario: 0,
        winRateUsuario: 0,
        usuario: null,
        posicion: null,
        // Cambiar para modificar el número de jugadores del ranking mostrados
        // Si hay menos jugadores que los especificados, se adapta el número
        maxNumeroJugadores: 10, 
    };

    this.getNombreUsuario = this.getNombreUsuario.bind(this);
    this.recuperarRanking = this.recuperarRanking.bind(this);
    this.verPerfil = this.verPerfil.bind(this);
    this.calcularWinrate = this.calcularWinrate.bind(this);
  };

  calcularWinrate(partidasGanadas, partidasTotales) {
    if (partidasTotales == 0) {
      return 0;
    } 
    else {
      return partidasGanadas / partidasTotales * 100;
    } 

  }

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
      let nombresArr = [];
      if (Object.keys(response).length < this.state.maxNumeroJugadores) {
        this.setState({maxNumeroJugadores: Object.keys(response).length});
      }

      for (var i=0; i < Object.keys(response).length; i++) {
        nombresArr.push(response[i]["NombreUsuario"]);
        if (i < this.state.maxNumeroJugadores) {
          let winRate = this.calcularWinrate(response[i]["PartidasGanadas"],response[i]["PartidasTotales"]);

          jugadoresArr.push(
            <tr>
              <td>{i+1}</td>
              <td className="celdaUsuario"><Link className="enlaceRanking" to='/perfil' onClick={this.verPerfil} id={response[i]["NombreUsuario"]}>{response[i]["NombreUsuario"]}</Link></td>
              <td>{response[i]["PartidasGanadas"]}</td>
              <td>{+winRate.toFixed(2)}%</td>
            </tr>
          )
        }

        if (response[i]["NombreUsuario"] === this.state.usuario) {
          // Almacenamos la información del usuario
          this.setState({posicion: i+1});
          this.setState({partidasGanadasUsuario: response[i]["PartidasGanadas"]});
          this.setState({partidasJugadasUsuario: response[i]["PartidasTotales"]});
          this.setState({winRateUsuario: this.calcularWinrate(response[i]["PartidasGanadas"],response[i]["PartidasTotales"])});
        }
      }

      this.setState({jugadores: jugadoresArr});
      this.setState({nombresRanking: nombresArr});
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
    document.body.style.backgroundColor = "rgb(28,28,30)";
    let usuarioTop = false;
    if (this.state.jugadores.length > 0) {
        for(var i = 0; i < this.state.maxNumeroJugadores; i++) {
            if (this.state.nombresRanking[i] === this.state.usuario) {
                usuarioTop = true;
                break;
            }
        }
    }

    return (
    <div className="cen, ranking">
      <BarraSuperiorGeneral/>
      <br/>
      <h1>Ranking</h1>
      <br/>
      {!usuarioTop && 
      <Table className='table-fit' responsive variant="dark" striped bordered hover size="sm">
          <thead>
            <th>Posición</th>
            <th>Jugador</th>
            <th>Victorias</th>
            <th>Win Rate</th>
          </thead>
          <tbody >
            {this.state.jugadores}
            <tr>
              <td backgroundColor="#FFFFFF">...<br></br></td>
              <td backgroundColor="#FFFFFF">...<br></br></td>
              <td backgroundColor="#FFFFFF">...<br></br></td>
              <td backgroundColor="#FFFFFF">...<br></br></td>
            </tr>
            <tr>
              <td>{this.state.posicion}</td>
              <td className="celdaUsuario"><Link className="enlaceRanking" to='/perfilUsuario' onClick={this.verPerfil} id={this.state.usuario}>{this.state.usuario}</Link></td>
              <td>{this.state.partidasGanadasUsuario}</td>
              <td>{this.state.winRateUsuario}</td>
            </tr>
          </tbody>
      </Table>}

      {usuarioTop && 
      <Table className='table-fit' responsive variant="dark" striped bordered hover size="sm">
          <thead>
            <th>Posición</th>
            <th>Jugador</th>
            <th>Victorias</th>
            <th>Win Rate</th>
          </thead>
          <tbody >
            {this.state.jugadores}
          </tbody>
      </Table>}
      <BarraInferior/>
    </div>
    );  
  }
}
