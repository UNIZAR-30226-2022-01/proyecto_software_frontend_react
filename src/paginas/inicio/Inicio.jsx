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
      jugadorEnLobby: false,
      jugadorEnPartida: false
    }
    this.jugadorEnPartida = this.jugadorEnPartida.bind(this);
    this.jugadorEnLobby = this.jugadorEnLobby.bind(this);
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

  jugadorEnLobby() {
    fetch('http://localhost:8090/api/obtenerEstadoLobby', {
			method: 'get',
      credentials: 'include'
		})
		.then((response) => {
			if (!response.ok) {
				return response.text().then(text => {throw new Error(text)});
			}
      return response.json();
		})
		.then((response) => {	
      if (!response['EnCurso']) {
        this.setState({jugadorEnLobby: true});
      }
		})
		.catch((e) => {
    })
  }

  componentDidMount() {
    this.jugadorEnLobby();
    this.jugadorEnPartida();
  }

  render() {
    document.body.style.backgroundColor = "rgb(28,28,30)";

    if (this.state.jugadorEnLobby) {
      return <Navigate to='/lobbyPartida'/>;
    } else if (this.state.jugadorEnPartida) {
      localStorage.setItem('volver_partida', "true");
      return <Navigate to='/mapa'/>;
    }

    return (
    <div className="cen">

      <BarraSuperiorGeneral></BarraSuperiorGeneral>

      <div className="contenedorTituloPrincipalInicio">
        <h1 className="textoTituloPrincipalInicio">World Domination</h1>
      </div>

      <div className="contenedorBotonPrincipalInicio">
        <div className="d-grid gap-2">
            <Link className="btn btn-primary btn-lg textoBotonPrincipalInicio" to="/buscarPartida">Buscar partida</Link>
        </div>
      </div> <br/>

      <div className="contenedorBotonPrincipalInicio">
        <div className="d-grid gap-2">
            <Link className="btn btn-primary btn-lg textoBotonPrincipalInicio" to="/crearPartida">Crear partida</Link>
        </div>
      </div> <br/>

      <div className="contenedorBotonPrincipalInicio">
        <div className="d-grid gap-2">
            <Link className="btn btn-primary btn-lg textoBotonPrincipalInicio" to="/ranking">Ranking</Link>
        </div>
      </div> <br/>

      <div className="contenedorBotonPrincipalInicio">
        <div className="d-grid gap-2">
            <Link className="btn btn-primary btn-lg textoBotonPrincipalInicio" to="/tienda">Tienda</Link>
        </div>
      </div> <br/>

      <div className="contenedorBotonPrincipalInicio">
        <div className="d-grid gap-2">
            <Link className="btn btn-primary btn-lg textoBotonPrincipalInicio" to="/personalizacion">Personalización</Link>
        </div>
      </div> <br/>

      <BarraInferior></BarraInferior>
    </div>
    );  
  }
}
