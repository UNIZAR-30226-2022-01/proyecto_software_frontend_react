import React from 'react';
import "./cartas.css";

export default class Cartas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartas: []
		};

    this.obtenerCartas = this.obtenerCartas.bind(this);
  }

  obtenerCartas() {
    
  }

  render() {
    return (
    <div className="cen">
        <div class="barraC topnavC">
          <a class="text-white">Tarjetas</a>   
        </div>
            
        <div class="contenedorCartas1">


        </div>

        <button class="botonCentro">No hay tarjetas coincidentes</button>

        <div class="cartasJugador">

        </div>  

        <div class="containerBonus">
          <div class="bonus">
            <div class="datosBonus">
              BONUS
              <hr/>
                <table >
                  <tr>
                    <th>4&nbsp;&nbsp;&nbsp;</th>
                    <th>Infanteria</th>
                  </tr>
                  <tr>
                    <th>6&nbsp;&nbsp;&nbsp;</th>
                    <th>Caballeria</th>
                  </tr>
                  <tr>
                    <th>8&nbsp;&nbsp;&nbsp;</th>
                    <th>Artilleria</th>
                  </tr>
                  <tr>
                    <th>10&nbsp;&nbsp;&nbsp;</th>
                    <th>Los tres</th>
                  </tr>
                </table>              
            </div>
          </div>
        </div>

        <div class="barraC downnavC"> </div>
    </div>
    );  
  }
}
