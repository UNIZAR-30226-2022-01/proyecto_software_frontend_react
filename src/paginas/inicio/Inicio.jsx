import React from 'react';
import swal from 'sweetalert2';
import { Link, Navigate } from "react-router-dom";
import BarraSuperiorGeneral from "../../componentes/barraSuperiorGeneral/BarraSuperiorGeneral";
import BarraInferior from "../../componentes/barraInferior/BarraInferior";
import "./inicio.css";

export default class Inicio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jugadorEnPartida: false
    }
    this.jugadorEnPartida = this.jugadorEnPartida.bind(this);
  }

  jugadorEnPartida() {
    fetch('http://localhost:8090/api/jugandoEnPartida', {
      method: 'get',
      credentials: 'include'
    })
    .then((response) => {
      if (!response.ok) {
        return response.text().then(text => {throw new Error(text)});
      }
      return response.json();
    })
    .then((enPartida) => {
      if (enPartida) {
        this.setState({jugadorEnPartida: true});
      }
    })
    .catch ((e) => {
      swal.fire({
        title: 'Se ha producido un error al obtener el estado del jugador',
        text: e,
        icon: 'error',
      });
    })
  }

  componentDidMount() {
    this.jugadorEnPartida();
  }

  render() {
    document.body.style.backgroundColor = "#FFFFFF";

    if (this.state.jugadorEnPartida) {
      localStorage.setItem('volver_partida', "true");
      return <Navigate to='/mapa'/>;
    }

    return (
    <div className="cen">

      <BarraSuperiorGeneral></BarraSuperiorGeneral>

      <h1>World domination</h1>

      <button>
        <Link to="/buscarPartida">Buscar partida</Link>
      </button>
      <br></br><br></br>

      <button>
        <Link to="/crearPartida">Crear partida</Link>
      </button>
      <br></br><br></br>

      <button>
        <Link to="/ranking">Ranking</Link>
      </button>
      <br></br><br></br>

      <button>
        <Link to="/tienda">Tienda</Link>
      </button>
      <br></br><br></br>

      <button>
        <Link to="/personalizacion">Personalizacion</Link>
      </button>
      <br></br><br></br>

      <button>
        <Link to="/mapa">Mapa</Link>
      </button>
      <br></br><br></br>

      <button>
        <Link to="/cartas">Cartas</Link>
      </button>
      <br></br><br></br>

      <BarraInferior></BarraInferior>
    </div>
    );  
  }
}
