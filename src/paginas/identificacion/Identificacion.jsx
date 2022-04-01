import React from 'react';
import { Link } from "react-router-dom";
import "./identificacion.css";

export default class Identificacion extends React.Component {
  render() {
    document.body.style.backgroundColor = "#FFFFFF";
    return (
    <div className="cen">
      <h1>World domination</h1>

      <button>
        <Link to="/iniciarSesion">Iniciar Sesión</Link>
      </button>

      <button>
        <Link to="/registrarUsuario">Registrar Usuario</Link>
      </button>

    </div>
    );  
  }
}
