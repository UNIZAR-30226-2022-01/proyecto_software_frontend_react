import React from 'react';
import { Link } from "react-router-dom";
import "./inicio.css";

export default class Inicio extends React.Component {
  render() {
    document.body.style.backgroundColor = "#FFFFFF";
    return (
    <div className="cen">
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

    </div>
    );  
  }
}
