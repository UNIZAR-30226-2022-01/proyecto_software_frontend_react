import React from 'react';
import { Navigate } from "react-router-dom";
import { useParams} from 'react-router-dom';
import swal from 'sweetalert2';
import BarraSuperiorGeneral from "../../componentes/barraSuperiorGeneral/BarraSuperiorGeneral";
import BarraInferior from "../../componentes/barraInferior/BarraInferior";
import "./perfil.css";

function Perfil() {
    const { usuario } = useParams();
    let email = 'x';
    let nombre_usuario= usuario;
    let biografia= 'x';
    let puntos= 0;
    let partidas_ganadas= 0;
    let partidas_totales= 0;
    let es_amigo= false;

    let nombre_login = document.cookie;
    if (nombre_login .length > 0) {
    	nombre_login  = nombre_login.split('=')[1];
    	nombre_login  = nombre_login.split('|')[0];
	}

    let es_usuario = nombre_login === nombre_usuario;
    let recibido = false;
    
    await fetch(`http://localhost:8090/api/obtenerPerfil/${nombre_usuario}`, {
        method: 'get',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        credentials: 'include'
    })
    .then((response) => {
        console.log('Respuesta recibida de la api');
        if (!response.ok) {
            return response.text().then(text => {throw new Error(text)});
        }
        return response.json();
    })
    .then((response) => {
        email = response['Email'];
        biografia = response['Biografia'];
        partidas_ganadas  = response['PartidasGanadas'];
        partidas_totales  = response['PartidasTotales'];
        puntos  = response['Puntos'];
        es_amigo  = response['EsAmigo'];
        recibido = true;
    })
    .catch((e) => {
        swal.fire({
            title: 'Se ha producido un error al recuperar el perfil',
            text: e,
            icon: 'error',
        });
    })
        
    

    let solicitudAmistad = null;
    if (!es_usuario && !es_amigo) {
        solicitudAmistad = <h1> Enviar solicitud de amistad</h1>;
    }
            
    console.log('Return');
    return (
        <div className="cen">

        <BarraSuperiorGeneral></BarraSuperiorGeneral>

        <h1>Dominación Mundial</h1>
        <h2>Pantalla de perfil y tal</h2>
        <h2>{nombre_usuario}</h2>
        <h2>{biografia}</h2>
        <h1>Puntos del jugador: {puntos}</h1>
        <h1>Partidas ganadas: {partidas_ganadas}</h1>
        <h1>Partidas totales: {partidas_totales}</h1>
        {solicitudAmistad}
        

        <BarraInferior></BarraInferior>
        </div>
    );
}

export default Perfil;