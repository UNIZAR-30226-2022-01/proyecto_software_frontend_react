import React from 'react';
import swal from 'sweetalert2';
import BarraSuperiorGeneral from "../../componentes/barraSuperiorGeneral/BarraSuperiorGeneral";
import BarraInferior from "../../componentes/barraInferior/BarraInferior";
import "./perfil.css";
import queryString from 'query-string';



export default class Perfil extends React.Component {
    constructor(props) {
        const usuario = localStorage.getItem('nombre_usuario');
        console.log('Construyo un nuevo componente perfil');
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
        this.enviarSolicitudAmistad = this.enviarSolicitudAmistad.bind(this);
        this.modificarBiografia = this.modificarBiografia.bind(this);
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
        // Es necesario borrarlo?, se puede cambiar cuando sea necesario y ya
        //localStorage.removeItem('nombre_usuario');
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

    enviarSolicitudAmistad() {
        fetch(`http://localhost:8090/api/enviarSolicitudAmistad/${this.state.nombre_usuario}`, {
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
            swal.fire({
                title: `Has enviado una solicitud de amistad a ${this.state.nombre_usuario}`,
                icon: 'success',
                timer: 3000,
                timerProgressBar: true,
            });
        })
        .catch((e) => {
            swal.fire({
                title: 'Se ha producido un error al recuperar el perfil',
                text: e,
                icon: 'error',
            });
        })
    }
        
    modificarBiografia() {
        fetch(`http://localhost:8090/api/modificarBiografia`, {
            method: 'post',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({
                biografia: document.getElementById("bio").value,
             }),
            credentials: 'include'
        })
        .then((response) => {
            console.log('Respuesta recibida de la api');
            if (!response.ok) {
                return response.text().then(text => {throw new Error(text)});
            }
        })
        .then(() => {
            swal.fire({
                title: `Biografía actualizada con éxito`,
                icon: 'success',
                timer: 3000,
                timerProgressBar: true,
            });
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
        let modBio = null;
       
        if (!this.state.es_usuario && !this.state.es_amigo) {
            // Si no es amigo aparece un botón para solicitar amistad
            solicitudAmistad = <button onClick={this.enviarSolicitudAmistad}>Enviar solicitud de amistad</button>;
        }

        if (this.state.es_usuario) {
            // Si es el usuario aparece un botón para cambiar la biografía
            modBio = <button onClick={this.modificarBiografia}>Modificar biografía</button>
            document.getElementById("bio").disabled = false;
        }
        console.log('Nuevo render');
        return (
            <div className="cen">

            <BarraSuperiorGeneral></BarraSuperiorGeneral>

            <h2>Perfil de {this.state.nombre_usuario}</h2>
            <h2>Biografía: <input type="text" id="bio" name="bio" value={this.state.biografia} 
                onChange={(e) => {this.setState({biografia: e.target.value})}} disabled></input></h2>
            {modBio}
            <h3>Puntos del jugador: {this.state.puntos}</h3>
            <h3>Partidas ganadas: {this.state.partidas_ganadas}</h3>
            <h3>Partidas totales: {this.state.partidas_totales}</h3>
            {solicitudAmistad}
            

            <BarraInferior></BarraInferior>
            </div>
        );
    }
}
