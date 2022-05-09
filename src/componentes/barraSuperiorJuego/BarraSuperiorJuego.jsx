import React from 'react';
import swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';
import "./barraSuperiorJuego.css";

export default class BarraSuperiorJuego extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        salirPartida: false,
    };

    this.abandonarPartida = this.abandonarPartida.bind(this);
}

  abandonarPartida() {
    swal.fire({
      title: '¿Está seguro de que quiere rendirse?',
      text: 'Perdera puntos por abandonar la partida',
      showCancelButton: true,
      confirmButtonText: 'Abandonar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      reverseButtons: true,
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('http://localhost:8090/api/abandonarPartida', {
          method: 'post',
          credentials: 'include'
        })
        .then((response) => {
          if (!response.ok) {
            return response.text().then(text => {throw new Error(text)});
          }
          return response.json();
        })
        .then(() => {
          swal.fire({
            title: 'Partida abandonada con éxito',
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
          });
          this.setState({salirPartida: true});
        })
        .catch ((e) => {
          swal.fire({
            title: 'Se ha producido un error al abandonar la partida',
            text: e,
            icon: 'error',
          });
        })
      } 
    })
  }


	render() {
    if (this.state.salirPartida) {
			return <Navigate to='/inicio'/>;
		}

		return (
			<div className="topnav">
        <a className="active" >World Domination</a>
  
      	<div className="topnav-right">
      	  <a><img className="fotoRendirse" alt="rendicion" onClick={this.abandonarPartida} src="https://img.icons8.com/external-victoruler-linear-colour-victoruler/64/000000/external-white-flag-chess-victoruler-linear-colour-victoruler.png"/></a> 
    		</div>
      </div>
		);  
  }
}
