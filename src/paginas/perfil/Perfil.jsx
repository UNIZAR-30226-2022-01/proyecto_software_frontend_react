import React from 'react';
import { Navigate } from "react-router-dom";
import swal from 'sweetalert2';
import BarraSuperiorGeneral from "../../componentes/barraSuperiorGeneral/BarraSuperiorGeneral";
import BarraInferior from "../../componentes/barraInferior/BarraInferior";
import "./perfil.css";



export default class Perfil extends React.Component {
    constructor(props) {
        const usuario = localStorage.getItem('nombre_usuario');
        super(props);
        this.state = {
            email: 'x',
            nombre_usuario: usuario,
            biografia: 'x',
            puntos: -1,
            partidas_ganadas: -1,
            partidas_totales: -1,
            es_amigo: false,
            es_usuario: false,
            recibido: false,
        };

        this.recuperarPerfil = this.recuperarPerfil.bind(this);
    }

    componentDidMount() {
        let nombre_login = document.cookie;
        if (nombre_login.length > 0) {
            nombre_login  = nombre_login.split('=')[1];
            nombre_login  = nombre_login.split('|')[0];
        }

        this.setState({es_usuario: nombre_login === this.state.nombre_usuario});

        this.recuperarPerfil();
    }

    componentWillUnmount() {
        console.log('Borrando el nombre del local storage')
        localStorage.removeItem('nombre_usuario');
    }
    
    recuperarPerfil() {
        fetch(`http://localhost:8090/api/obtenerPerfil/${this.state.nombre_usuario}`, {
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
            this.setState({email: response['Email']});
            this.setState({biografia: response['Biografia']});
            this.setState({partidas_ganadas: response['PartidasGanadas']});
            this.setState({partidas_totales: response['PartidasTotales']});
            this.setState({puntos: response['Puntos']});
            this.setState({es_amigo: response['EsAmigo']});
            this.setState({recibido: true});
        })
        .catch((e) => {
            swal.fire({
                title: 'Se ha producido un error al recuperar el perfil',
                text: e,
                icon: 'error',
            });
        })
    }
        
    
    render() {
        let solicitudAmistad = null;
        if (!this.state.es_usuario && !this.state.es_amigo) {
            solicitudAmistad = <h1> Enviar solicitud de amistad</h1>;
        }
        return (
            <div className="cen">

            <BarraSuperiorGeneral></BarraSuperiorGeneral>

            <h1>Dominación Mundial</h1>
            <h2>Pantalla de perfil y tal</h2>
            <h2>{this.state.nombre_usuario}</h2>
            <h2>Biografía: {this.state.biografia}</h2>
            <h3>Puntos del jugador: {this.state.puntos}</h3>
            <h3>Partidas ganadas: {this.state.partidas_ganadas}</h3>
            <h3>Partidas totales: {this.state.partidas_totales}</h3>
            {solicitudAmistad}
            

            <BarraInferior></BarraInferior>
            </div>
        );
    }
}
