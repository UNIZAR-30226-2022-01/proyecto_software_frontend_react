import React from 'react';
import swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import WhiteFlag from "../../imagenes/white-flag.png";
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
      title: '¿Estás seguro de que quieres rendirte?',
      text: 'Perderás puntos por abandonar la partida',
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
			<div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>World Domination</Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
            <img
              src={WhiteFlag}
              width="40"
              height="40"
              className="d-inline-block align-top cursorpointer"
              alt="Rendición"
              onClick={this.abandonarPartida}
            />
            </Navbar.Collapse>
          </Container>
        </Navbar>
  
      	<div className="topnav-right">
      	  
    		</div>
      </div>
		);  
  }
}
