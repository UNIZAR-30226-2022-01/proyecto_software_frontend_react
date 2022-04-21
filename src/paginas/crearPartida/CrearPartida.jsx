import React from 'react';
import { Navigate } from 'react-router-dom';
import queryString from 'query-string';
import swal from 'sweetalert2';
import BarraSuperiorGeneral from "../../componentes/barraSuperiorGeneral/BarraSuperiorGeneral";
import BarraInferior from "../../componentes/barraInferior/BarraInferior";
import "./crearPartida.css";

export default class CrearPartida extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			maxJugadores: 3,
			tipoPartida: "Publica",
			contrasegna: "",
      irPartida: false,
		};

    this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

  handleInputChange(event) {
		event.preventDefault();
		const target = event.target;
		this.setState({
			[target.name]: target.value,
		});
  }

  handleSubmit(event) {    
    event.preventDefault();

    //this.setState({ irPartida: true });

    fetch('http://localhost:8090/api/crearPartida', {
			method: 'post',
			headers: {'Content-Type':'application/x-www-form-urlencoded'},
			body: queryString.stringify({
				maxJugadores: this.state.maxJugadores,
        tipo: this.state.tipoPartida,
				password: this.state.contrasegna,
			}),
      credentials: 'include'
		})
		.then((response) => {
			if (!response.ok) {
				throw response.text();
			}
		})
		.then(() => {	
			swal.fire({
				title: 'Partida creada con éxito',
				text: "Espera a que el resto de jugadores se unan a la partida",
				icon: 'success',
			});
			this.setState({ irPartida: true });
		})
		.catch((error) => {
      error.then((e) => {
        swal.fire({
          title: 'Se ha producido un error al crear la partida',
          text: e,
          icon: 'error',
        });
      })
    })
  }
  
  render() {
    document.body.style.backgroundColor = "#FFFFFF";

    if (this.state.irPartida) {
      return <Navigate to='/lobbyPartida'/>;
    }

    return (
    <div className="cen">
       <BarraSuperiorGeneral></BarraSuperiorGeneral>

      <form onSubmit={this.handleSubmit}>
        <h1>Crear partida</h1>

        <h2>Número de Jugadores</h2>
        <select name="maxJugadores" onChange={this.handleInputChange}> 
          <option value="3" selected>3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>

        <br></br><br></br>

        <h2>Tipo de partida</h2>
        <select name="tipoPartida" onChange={this.handleInputChange}>
          <option value="Publica" selected>Pública</option>
          <option value="Privada">Privada</option>
        </select>

        <br></br><br></br>

        {this.state.tipoPartida === "Privada" && 
        <div>
          <h2>Contraseña</h2>
          <input
              name="contrasegna"
              type="password"
              placeholder="Introduzca su contraseña..."
              value={this.state.contrasegna}
              onChange={this.handleInputChange}
              required
            /> 
        </div>
        }

        <br></br><br></br>
        <button type="submit">Crear Partida</button>
      </form>  
      <BarraInferior></BarraInferior>
    </div>
    );  
  }
}