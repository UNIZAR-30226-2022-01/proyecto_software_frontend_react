import React from 'react';
import swal from 'sweetalert2';
import { Navigate } from "react-router-dom";
import queryString from 'query-string';
import "./infoBuscarPartida.css";

export default class InfoBuscarPartida extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			idPartida: 0,
			esPublica: false,
			numJugadores: 0,
			maxJugadores: 0,
			amigosPresentes: [],
			numAmigosPresentes: 0,
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
				return fetch('http://localhost:8090/api/unirseAPartida', {
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
				return fetch('http://localhost:8090/api/unirseAPartida', {
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

		return ( // Poner las partidas de cada tipo de un color distinto (pub vs priv)
			<div id={this.state.idPartida} className="partidaBuscada" onClick={this.entrarPartida}>
				<div className="datosPartidaBuscada"> {tipoPartida} ({this.state.numJugadores}/{this.state.maxJugadores}) </div>
				<div className="datosPartidaBuscada">Amigos ({this.state.numAmigosPresentes}): {this.state.amigosPresentes} </div>
			</div>
		);
	}
}
