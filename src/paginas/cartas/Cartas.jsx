import React from 'react';
import Carta from "../../componentes/carta/Carta";
import { Navigate } from 'react-router-dom';
import swal from 'sweetalert2';
import { Button, Navbar, Container } from 'react-bootstrap';
import "./cartas.css";

export default class Cartas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartas: [],
      carta1: null,
      carta2: null,
      carta3: null,
      volverMapa: false
		};

    this.obtenerCartas = this.obtenerCartas.bind(this);
    this.cambiarCartas = this.cambiarCartas.bind(this);
    this.seleccionarCarta = this.seleccionarCarta.bind(this);
    this.cerrarCartas = this.cerrarCartas.bind(this);
  }

  seleccionarCarta(iCarta) {
    if (document.getElementById(iCarta).style.backgroundColor === "rgb(250, 250, 250)") {
      if (this.state.carta1 === null) {
        this.setState({carta1: this.state.cartas[iCarta]});
        document.getElementById(iCarta).style.backgroundColor = '#CCCCCC';
      } else if (this.state.carta2 === null) {
        this.setState({carta2: this.state.cartas[iCarta]});
        document.getElementById(iCarta).style.backgroundColor = '#CCCCCC';
      } else if (this.state.carta3 === null) {
        this.setState({carta3: this.state.cartas[iCarta]});
        document.getElementById(iCarta).style.backgroundColor = '#CCCCCC';
      }
    } else {
      if (this.state.carta3 !== null) {
        if (this.state.cartas.indexOf(this.state.carta2) === iCarta) {
          this.setState({carta2: this.state.carta3});
        } else if (this.state.cartas.indexOf(this.state.carta1) === iCarta) {
          this.setState({carta1: this.state.carta2});
          this.setState({carta2: this.state.carta3});
        }
        this.setState({carta3: null});
        document.getElementById(iCarta).style.backgroundColor = '#fafafa';
      } else if (this.state.carta2 !== null) {
        if (this.state.cartas.indexOf(this.state.carta1) === iCarta) {
          this.setState({carta1: this.state.carta2});
        }
        this.setState({carta2: null});
        document.getElementById(iCarta).style.backgroundColor = '#fafafa';
      } else if (this.state.carta1 !== null) {
        this.setState({carta1: null});
        document.getElementById(iCarta).style.backgroundColor = '#fafafa';
      }
    } 
  }

  cerrarCartas() {
    this.setState({volverMapa: true});
  }

  obtenerCartas() {
    fetch(`http://localhost:8090/api/consultarCartas`, {
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
      this.setState({cartas: response});
    })
    .catch ((e) => {
      swal.fire({
        title: 'Se ha producido un error al obtener las cartas del jugador',
        text: e,
        icon: 'error',
      });
    })
  }

  cambiarCartas() {
    if (this.state.carta1 !== null && this.state.carta2 !== null && this.state.carta3 !== null) {    
      fetch(`http://localhost:8090/api/cambiarCartas/${this.state.carta1.IdCarta}/${this.state.carta2.IdCarta}/${this.state.carta3.IdCarta}`, {
      method: 'post',
      credentials: 'include'
      })
      .then((response) => {
        if (!response.ok) {
          return response.text().then(text => {throw new Error(text)});
        }
      })
      .then(() => {
        this.setState({carta1: null});
        this.setState({carta2: null});
        this.setState({carta3: null});
       
        this.obtenerCartas();
      })
      .catch ((e) => {
        swal.fire({
          title: 'Se ha producido un error al cambiar las cartas seleccionadas',
          text: e,
          icon: 'error',
        });
      })
    } else {
      swal.fire({
        title: 'Debes seleccionar un total de 3 cartas para intercambiar',
        icon: 'error',
      });
    }
  }

  componentDidMount() {
    this.obtenerCartas();
  }

  render() {
    document.body.style.backgroundColor = "rgb(50,173,230)";

    if (this.state.volverMapa) {
      localStorage.setItem('volver_partida', "true");
			return <Navigate to='/mapa'/>;
		}

    var cartasJugador = [];
    for (let i = 0; i < Object.keys(this.state.cartas).length; i++) {
      cartasJugador.push(<Carta
        id={i}
        tipo={this.state.cartas[i].Tipo}
        region={this.state.cartas[i].Region}
        comodin={this.state.cartas[i].EsComodin}
        onClick={(iCarta) => this.seleccionarCarta(iCarta)}/>);
    }

    return (
    <div className="cen">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Collapse className="justify-content-center">
                <Navbar.Brand>Cartas</Navbar.Brand>
              </Navbar.Collapse>
            </Container>
          </Navbar>
            
        <div className="contenedorCartas1">
          {this.state.carta1 !== null &&
          <Carta
            id={-1}
            tipo={this.state.carta1.Tipo}
            region={this.state.carta1.Region}
            comodin={this.state.carta1.EsComodin}/>}
          
          {this.state.carta1 === null &&
          <div className="cartaNoSeleccionada"/>}

          {this.state.carta2 !== null &&
          <Carta
           id={-1}
            tipo={this.state.carta2.Tipo}
            region={this.state.carta2.Region}
            comodin={this.state.carta2.EsComodin}/>}
          {this.state.carta2 === null &&
          <div className="cartaNoSeleccionada"/>}

          {this.state.carta3 !== null &&
          <Carta
            id={-1}
            tipo={this.state.carta3.Tipo}
            region={this.state.carta3.Region}
            comodin={this.state.carta3.EsComodin}/>}
          {this.state.carta3 === null &&
          <div className="cartaNoSeleccionada"/>}
        </div>

        <div className="contenedorBoton">
          <Button variant="dark" size="lg"  onClick={this.cerrarCartas}>Volver</Button> &nbsp; &nbsp;
          <Button variant="success" size="lg" onClick={this.cambiarCartas}>Intercambiar cartas</Button>
        </div>

        <div className="contenedorCartas1">
          {cartasJugador}
        </div>  
    </div>
    );  
  }
}
