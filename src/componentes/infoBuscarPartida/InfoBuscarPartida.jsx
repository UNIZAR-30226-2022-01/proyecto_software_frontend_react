import React from 'react';
import swal from 'sweetalert2';
import { Navigate } from "react-router-dom";
import queryString from 'query-string';
import Candado from "../../imagenes/candado.png";
import "./infoBuscarPartida.css";
import Constantes from '../../constantes';

export default class InfoBuscarPartida extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			idPartida: props.idPartida,
			esPublica: props.esPublica,
			numJugadores: props.numJugadores,
			maxJugadores: props.maxJugadores,
			amigosPresentes: props.amigosPresentes,
			numAmigosPresentes: props.numAmigosPresentes,
			tipo: props.tipo,
			irLobby: false
		};

	this.entrarPartida = this.entrarPartida.bind(this);
	}

	static getDerivedStateFromProps(newProps) {
		return {
			idPartida: newProps.idPartida,
			esPublica: newProps.esPublica,
			numJugadores: newProps.numJugadores,
			maxJugadores: newProps.maxJugadores,
			amigosPresentes: newProps.amigosPresentes,
			numAmigosPresentes: newProps.numAmigosPresentes,
			tipo: newProps.tipo
		};
	}

	entrarPartida(e) {
		e.preventDefault();

		if (this.state.esPublica === true) {
      swal.fire({
      title: '¿Seguro que quieres unirte a esta partida?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      showLoaderOnConfirm: true,
			preConfirm: () => {
				return fetch(Constantes.RUTA_API + '/api/unirseAPartida', {
					method: 'post',
					headers: {'Content-Type':'application/x-www-form-urlencoded'},
					body: queryString.stringify({
						idPartida: this.state.idPartida
					}),
					credentials: 'include' 
				})
				.then((response) => {
					if (!response.ok) {
						return response.text().then(text => {throw new Error(text)});
					}
					return response.text();
				})
				.then(() => {
					swal.fire({
						title: 'Bienvenido al Lobby',
						text: 'Espera a que el resto de jugadores se una a la partida',
						icon: 'success',
						timer: 3000,
						timerProgressBar: true,
					});
		      this.setState({ irLobby: true });
					})
				.catch(error => {
					swal.showValidationMessage(`${error}`)
				})
			},
			allowOutsideClick: () => !swal.isLoading()
			})
		}
		else {
			swal.fire({
			title: 'Introduzca la contraseña de la partida',
			input: 'password',
			inputAttributes: {
				min: 1,
				autocapitalize: 'off',
						autocorrect: 'off'
			},
			showCancelButton: true,
			confirmButtonText: 'Aceptar',
			confirmButtonColor: '#3085d6',
			cancelButtonText: 'Cancelar',
			reverseButtons: true,
			showLoaderOnConfirm: true,
			inputValidator: (password) => {
				if (!password) {
				return 'La contraseña no puede estar vacía'
				}
			},
			preConfirm: (password) => {
				return fetch(Constantes.RUTA_API + '/api/unirseAPartida', {
					method: 'post',
					headers: {'Content-Type':'application/x-www-form-urlencoded'},
					body: queryString.stringify({
						idPartida: this.state.idPartida,
						password: password,
					}),
					credentials: 'include' 
				})
				.then((response) => {
					if (!response.ok) {
						return response.text().then(text => {throw new Error(text)});
					}
					return response.text();
				})
				.then(() => {
					swal.fire({
						title: 'Bienvenido al Lobby',
						text: 'Espera a que el resto de jugadores se una a la partida',
						icon: 'success',
						timer: 3000,
						timerProgressBar: true,
					});
					this.setState({ irLobby: true });
						})
				.catch(error => {
						swal.showValidationMessage(`${error}`)
					})
				},
				allowOutsideClick: () => !swal.isLoading()
			})
		}
	}

	render() {
		if (this.state.irLobby === true) {
		return <Navigate to='/lobbyPartida'/>;
		}

		var tipoPartida = "Partida privada";
		if (this.state.esPublica === true) {
			tipoPartida = "Partida pública";
		}

    if (this.state.tipo === 0 && this.state.esPublica) {
			return ( 
        <div className="contenedorInfoBuscarPartida">
          <div id={this.state.idPartida} className="partidaBuscada btn btn-primary" onClick={this.entrarPartida}>
            <div className="datosPartidaBuscada"> 
              {tipoPartida}  ({this.state.numJugadores}/{this.state.maxJugadores})         
            </div>
            <div className="datosPartidaBuscada">Amigos ({this.state.numAmigosPresentes}): {this.state.amigosPresentes} </div>
          </div> 
        </div>
        
		  );
		} else if (this.state.tipo === 0 && !this.state.esPublica){
			return ( 
        <div className="contenedorInfoBuscarPartida">
          <div id={this.state.idPartida} className="partidaBuscada btn btn-primary" onClick={this.entrarPartida}>
            <div className="datosPartidaBuscada"> 
              {tipoPartida} ({this.state.numJugadores}/{this.state.maxJugadores}) 
              <div className="containerImagenBuscar">
                <img className="candadoImagenI" src={Candado} alt="candadoUsuario" height="30" width="30"/>
              </div>    
            </div>
            <div className="datosPartidaBuscada">Amigos ({this.state.numAmigosPresentes}): {this.state.amigosPresentes} </div>
          </div>
        </div>
		  );
		} else if (this.state.tipo === 1 && this.state.esPublica){
			return ( 
        <div className="contenedorInfoBuscarPartida">
          <div id={this.state.idPartida} className="partidaBuscada btn btn-light" onClick={this.entrarPartida}>
            <div className="datosPartidaBuscada2"> 
              {tipoPartida} ({this.state.numJugadores}/{this.state.maxJugadores}) 
            </div>
            <div className="datosPartidaBuscada2">Amigos ({this.state.numAmigosPresentes}): {this.state.amigosPresentes} </div>
          </div>
        </div>
		  );
		} else if (this.state.tipo === 1 && !this.state.esPublica){
			return ( 
        <div className="contenedorInfoBuscarPartida">
          <div id={this.state.idPartida} className="partidaBuscada btn btn-light" onClick={this.entrarPartida}>
            <div className="datosPartidaBuscada2"> 
              {tipoPartida} ({this.state.numJugadores}/{this.state.maxJugadores}) 
              <div className="containerImagenBuscar">
                <img className="candadoImagen" src={Candado} alt="candadoUsuario" height="30" width="30"/>
              </div>    
            </div>
            <div className="datosPartidaBuscada2">Amigos ({this.state.numAmigosPresentes}): {this.state.amigosPresentes} </div>
          </div>
        </div>
		  );
		}
	}
}
