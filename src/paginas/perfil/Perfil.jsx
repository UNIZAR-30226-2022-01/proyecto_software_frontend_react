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
            email: null,
            nombre_usuario: usuario,
            biografia: '',
            puntos: null,
            partidas_ganadas: null,
            partidas_totales: null,
            es_amigo: false,
            es_usuario: false,
            recibido: false,
            imagen: null,
            solicitudPendiente: 0,
            solicitudRecibida: 0,
        };

        this.recuperarPerfil = this.recuperarPerfil.bind(this);
        this.enviarSolicitudAmistad = this.enviarSolicitudAmistad.bind(this);
        this.modificarBiografia = this.modificarBiografia.bind(this);
        this.obtenerAvatar = this.obtenerAvatar.bind(this);
        this.aceptarSolicitud = this.aceptarSolicitud.bind(this);
    }

    componentDidMount() {
        let nombre_login = document.cookie;
        if (nombre_login.length > 0) {
            nombre_login  = nombre_login.split('=')[1];
            nombre_login  = nombre_login.split('|')[0];
        }

        this.setState({es_usuario: nombre_login === this.state.nombre_usuario});
        this.obtenerAvatar();
        this.recuperarPerfil();
    }

    componentWillUnmount() {
    }

    obtenerAvatar() {
        fetch(`http://localhost:8090/api/obtenerFotoPerfil/${this.state.nombre_usuario}`, {
            method: 'get',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            credentials: 'include'
        })
        .then((response) => {
            console.log('Respuesta recibida de la api');
            if (!response.ok) {
                return response.text().then(text => {throw new Error(text)});
            }
            response.blob().then((blob) => {
                this.setState({imagen: URL.createObjectURL(blob)});
            })
        })
        .catch((e) => {
            swal.fire({
                title: 'Se ha producido un error al recuperar el avatar',
                text: e,
                icon: 'error',
            });
        })
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
            this.setState({solicitudPendiente: response['SolicitudPendiente']})
            this.setState({solicitudRecibida: response['SolicitudRecibida']})
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
            method: 'post',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
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
                title: `Has enviado una solicitud de amistad a ${this.state.nombre_usuario}`,
                icon: 'success',
                timer: 3000,
                timerProgressBar: true,
            });
            this.setState({solicitudPendiente: true});
        })
        .catch((e) => {
            swal.fire({
                title: 'Se ha producido un error al enviar la solicitud',
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

    aceptarSolicitud() {
        console.log("Aceptando la solicitud de amistad de:" + this.state.nombre_usuario)
        fetch(`http://localhost:8090/api/aceptarSolicitudAmistad/${this.state.nombre_usuario}`, {
            method: 'post',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
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
                title: `Eres amigo de ${this.state.nombre_usuario}`,
                icon: 'success',
                timer: 3000,
                timerProgressBar: true,
            });
            this.setState({es_amigo: true})
            this.setState({solicitudRecibida: false})
        })
        .catch((e) => {
            swal.fire({
                title: 'Se ha producido un error al aceptar la solicitud de amistad',
                text: e,
                icon: 'error',
            });
        })
    }

    render() {
        let solicitudAmistad = null;
        let modBio = null;
        console.log('Sol enviada:'+this.state.solicitudPendiente+' , sol recibida:'+this.state.solicitudRecibida)
        if (!this.state.es_usuario && !this.state.es_amigo && !this.state.solicitudPendiente && !this.state.solicitudRecibida) {
            // Si no es amigo aparece un botón para solicitar amistad
            // Ni hay solicitudes pendientes
            solicitudAmistad = <button onClick={this.enviarSolicitudAmistad}>Enviar solicitud de amistad</button>;
        }

        // Si hay una solicitud de amistad enviada pendiente, muestra el boton desactivado
        if (this.state.solicitudPendiente) {
            solicitudAmistad = <button disabled>Solicitud pendiente</button>;
        }

        // Si hay una solicitud de amistad recibida pendiente, muestra el boton para aceptarla
        if (this.state.solicitudRecibida) {
            solicitudAmistad = <button onClick={this.aceptarSolicitud}>Solicitud de amistad recibida</button>;
        }

        if (this.state.es_usuario) {
            // Si es el usuario aparece un botón para cambiar la biografía y para resetear la contraseña
            modBio = <button onClick={this.modificarBiografia}>Modificar biografía</button>
            document.getElementById("bio").disabled = false;
        }
        console.log('Nuevo render');
        return (
            <div className="cen">

            <BarraSuperiorGeneral></BarraSuperiorGeneral>

            <h2>Perfil de {this.state.nombre_usuario}</h2>
            <img className="avatarPerfil" src={this.state.imagen} alt="avatar"></img>
            <h2>Biografía: <input type="text" id="bio" name="bio" value={this.state.biografia} 
                onChange={(e) => {this.setState({biografia: e.target.value})}} disabled></input></h2>
            {modBio}
            <h3>Puntos del jugador: {this.state.puntos}</h3>
            <h3>Partidas ganadas: {this.state.partidas_ganadas}</h3>
            <h3>Partidas totales: {this.state.partidas_totales}</h3>
            {solicitudAmistad}
            {this.state.es_amigo && <div className="mensajeEresAmigo">Eres amigo de {this.state.nombre_usuario}</div>}
            <BarraInferior></BarraInferior>
            </div>
        );
    }
}
