import React from 'react';
import { Link } from "react-router-dom";
import videoID from "../../imagenes/videoInicio2.mp4";
import "./identificacion.css";

export default class Identificacion extends React.Component {
  render() {
    document.body.style.backgroundColor = "#FFFFFF";
    return (
    <div className="cen">

    <div className="containerVideoInicio">
      <video className="videoInicioInicio" loop autoPlay muted id="myVideo">
        <source src={videoID} type="video/mp4"/>
      </video>
    </div>

      <div className="contenedorTituloInicio">
        <h1 className="textoTituloInicio">World Domination</h1>
      </div>

      <div className="contenedorBotonInicio">
        <div className="d-grid gap-2">
            <Link className="btn btn-primary btn-lg textoBotonInicio" to="/iniciarSesion">Iniciar sesión</Link>
        </div>
      </div> <br/>

      <div className="contenedorBotonInicio">
        <div className="d-grid gap-2">
            <Link className="btn btn-primary btn-lg textoBotonInicio" to="/registrarUsuario">Crear cuenta</Link>
        </div>
      </div>

    </div>
    );  
  }
}
