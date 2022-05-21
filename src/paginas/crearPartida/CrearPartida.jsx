import React from 'react';
import { Navigate } from 'react-router-dom';
import queryString from 'query-string';
import swal from 'sweetalert2';
import { Button, Form } from 'react-bootstrap';
import BarraSuperiorGeneral from "../../componentes/barraSuperiorGeneral/BarraSuperiorGeneral";
import BarraInferior from "../../componentes/barraInferior/BarraInferior";
import "./crearPartida.css";
import Constantes from '../../constantes';

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
    console.log("hola")
		const target = event.target;
		this.setState({
			[target.name]: target.value,
		});
  }

  handleSubmit(event) {    
    event.preventDefault();

    fetch(Constantes.RUTA_API + '/api/crearPartida', {
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
				return response.text().then(text => {throw new Error(text)});
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
		.catch((e) => {
      swal.fire({
        title: 'Se ha producido un error al crear la partida',
        text: e,
        icon: 'error',
      });
    })
  }
  
  render() {
    document.body.style.backgroundColor = "rgb(28,28,30)";

    if (this.state.irPartida) {
      return <Navigate to='/lobbyPartida'/>;
    }

    return (
      <div className="cen">
      <BarraSuperiorGeneral></BarraSuperiorGeneral>

      <div className="contenedorTituloCrearPartida">
        <text className="textoH1CrearPartida">Crear partida</text>
      </div>

      <br></br>
        
      <div className="contenedorCrearPartida">
        <form onSubmit={this.handleSubmit}>
          <br></br>
          <h2 className="textoCrearPartida">Número de Jugadores</h2>
          <select name="maxJugadores" className="btn btn-outline-primary" onChange={this.handleInputChange}> 
            <option value="3" selected>3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>

          <br/><br/>

          <h2 className="textoCrearPartida">Tipo de partida</h2>
          <select name="tipoPartida" className="btn btn-outline-primary" onChange={this.handleInputChange}>
            <option value="Publica" selected>Pública</option>
            <option value="Privada">Privada</option>
          </select>

          <br/><br/>

          {this.state.tipoPartida === "Privada" && 
          <div>
            <h2 className="textoCrearPartida">Contraseña</h2>
            <Form.Control
							name="contrasegna"
							type="password"
							placeholder="Introduzca la contraseña..."
							value={this.state.contrasegna}
							onChange={this.handleInputChange}
							required
							className="mb-3 form-floating boxIniciarSesion"/>
          </div>
          }

          <br/>
          <Button variant="primary" type="submit" size="lg">
          Crear Partida
          </Button>
          <br/><br/>
        </form>  
      </div>

    <BarraInferior></BarraInferior>
  </div>
  );  
  }
}
