import React from 'react';
import swal from 'sweetalert2';
import BarraSuperiorGeneral from "../../componentes/barraSuperiorGeneral/BarraSuperiorGeneral";
import BarraInferior from "../../componentes/barraInferior/BarraInferior";
import { Button, Form} from 'react-bootstrap';
import "./perfil.css";
import queryString from 'query-string';

const emailValidoRegex = RegExp(
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

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
            winRate: 0,
            es_amigo: false,
            es_usuario: false,
            recibido: false,
            imagen: null,
            solicitudPendiente: 0,
            solicitudRecibida: 0,
            mostrarCambioEmail: false,
            mostrarCambioPassword: false,
            errorEmail: "",
            errorPassword: "",
            errorPasswordRepetida: "",
        };

        this.recuperarPerfil = this.recuperarPerfil.bind(this);
        this.enviarSolicitudAmistad = this.enviarSolicitudAmistad.bind(this);
        this.modificarBiografia = this.modificarBiografia.bind(this);
        this.obtenerAvatar = this.obtenerAvatar.bind(this);
        this.aceptarSolicitud = this.aceptarSolicitud.bind(this);
        this.cambiarEmail = this.cambiarEmail.bind(this);
        this.cambiarPassword = this.cambiarPassword.bind(this);
        this.comprobarEmail = this.comprobarEmail.bind(this);
        this.comprobarPasswordsIguales = this.comprobarPasswordsIguales.bind(this);
        this.comprobarPasswordCorrecta = this.comprobarPasswordCorrecta.bind(this);
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
            this.setState({solicitudPendiente: response['SolicitudPendiente']});
            this.setState({solicitudRecibida: response['SolicitudRecibida']});
            let winRate = 0;
            if (response['PartidasTotales'] != 0) {
                winRate = response['PartidasGanadas'] / response['PartidasTotales'];
            }
            this.setState({winRate: winRate});
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

    cambiarEmail() {
        if (this.state.errorEmail == "") {
            let email = document.getElementById("nuevoEmail").value;
            console.log("Nuevo email del usuario:" + email)
            fetch('http://localhost:8090/api/modificarEmail', {
                method: 'post',
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                body: queryString.stringify({
                    email: email,
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
                    title: `Se ha actualizado tu correo electrónico`,
                    icon: 'success',
                    timer: 3000,
                    timerProgressBar: true,
                });
                this.setState({email: email})
                this.setState({mostrarCambioEmail: false});
            })
            .catch((e) => {
                swal.fire({
                    title: 'Se ha producido un error al modificar el correo electrónico',
                    text: e,
                    icon: 'error',
                });
            })
        }
    }

    cambiarPassword() {
        if (this.state.errorPassword == "" && this.state.errorPasswordRepetida == "") {
            console.log("Cambiando la contraseña del usuario")
            fetch('http://localhost:8090/api/resetearPasswordEnLogin', {
                method: 'post',
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                body: queryString.stringify({
                    passwordActual: document.getElementById("oldPassword").value,
                    passwordNueva: document.getElementById("newPassword").value,
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
                    title: `Se ha actualizado tu contraseña`,
                    icon: 'success',
                    timer: 3000,
                    timerProgressBar: true,
                });
                this.setState({mostrarCambioPassword: false});
            })
            .catch((e) => {
                swal.fire({
                    title: 'Se ha producido un error al actualizar la contraseña',
                    text: e,
                    icon: 'error',
                });
            })
        }
    }

    comprobarEmail() {
        let email = document.getElementById("nuevoEmail").value;
        let err = emailValidoRegex.test(email)
						? ""
						: "El correo electrónico no tiene un formato válido";
        this.setState({errorEmail: err});
    }

    comprobarPasswordsIguales() {
        let pw1 = document.getElementById("newPassword").value;
        let pw2 = document.getElementById("repetirPassword").value;
        if (pw2 == "") {
            this.setState({errorPasswordRepetida: ""});
        }
        else {
            let err = pw1 !== pw2
                ? "Las contraseñas deben coincidir"
                : "";
            this.setState({errorPasswordRepetida: err});
        }
    }

    comprobarPasswordCorrecta() {
        let pw = document.getElementById("newPassword").value;
        let err = pw.length < 8
            ? "La contraseña debe contener mínimo 8 caracteres"
            : "";
        this.setState({errorPassword: err});
    }

    render() {
        document.body.style.backgroundColor = "rgb(28,28,30)";
        let solicitudAmistad = null;
        let modBio = null;
        let nRows = 5; // Número de filas del textarea para la biografía
        console.log('Sol enviada:'+this.state.solicitudPendiente+' , sol recibida:'+this.state.solicitudRecibida)
        if (!this.state.es_usuario && !this.state.es_amigo && !this.state.solicitudPendiente && !this.state.solicitudRecibida) {
            // Si no es amigo aparece un botón para solicitar amistad
            // Ni hay solicitudes pendientes
            solicitudAmistad = <Button className="botonAmistadPerfil" variant="primary" onClick={this.enviarSolicitudAmistad}>Enviar solicitud de amistad</Button>;
        }

        // Si hay una solicitud de amistad enviada pendiente, muestra el boton desactivado
        if (this.state.solicitudPendiente) {
            solicitudAmistad = <Button className="botonAmistadPerfil" variant="primary" disabled>Solicitud de amistad pendiente</Button>;
        }

        // Si hay una solicitud de amistad recibida pendiente, muestra el boton para aceptarla
        if (this.state.solicitudRecibida) {
            solicitudAmistad = <Button className="botonAmistadPerfil" variant="primary" onClick={this.aceptarSolicitud}>Solicitud de amistad recibida</Button>;
        }

        if (this.state.es_usuario) {
            // Si es el usuario aparece un botón para cambiar la biografía y para resetear la contraseña
            modBio = <Button variant="primary" type="submit" className="botonModificarBiografia" onClick={this.modificarBiografia}>Modificar biografía</Button>
            document.getElementById("bio").disabled = false;

            // Reducimos número de filas para que quepa bien el botón de modificar biografía
            nRows = 3;
        }

        return (
            <div className="cen perfil">

            <BarraSuperiorGeneral></BarraSuperiorGeneral>
            <iframe name="frameAux" id="frameAux" style={{display: 'none'}}></iframe>
            <div className="contenedorTituloPerfil">
                <text className="tituloPerfil">Perfil de {this.state.nombre_usuario}</text>
            </div>
            <br/>
            <div className="contenedorPerfil">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img className="avatarPerfil" src={this.state.imagen} alt="avatar"></img>
                    </div>
                    <div className="col-md-8">
                    <form target="frameAux">
                        <h2>{this.state.nombre_usuario}</h2>
                        <textarea rows={nRows} wrap="soft" id="bio" name="bio" className="biografiaPerfil" value={this.state.biografia} 
                            onChange={(e) => {this.setState({biografia: e.target.value})}} disabled></textarea>
                        {modBio}
                        </form>
                    </div>
                </div>
                <div className="row g-0">
                    <div className="informacionPerfil">
                        <h3>Puntos: {this.state.puntos}</h3>
                        <h3>Partidas ganadas: {this.state.partidas_ganadas}</h3>
                        <h3>Win Rate: {+this.state.winRate.toFixed(2)}%</h3>
                        {solicitudAmistad}
                        {this.state.es_amigo && <Button className="botonAmistadPerfil" variant="success" disabled>Eres amigo de {this.state.nombre_usuario}</Button>}
                        {this.state.es_usuario && <h3>Tu correo electrónico es {this.state.email}</h3>}
                    </div>
                </div>
                {this.state.es_usuario && 
                    <div>
                       
                        <a href="#" onClick={(e)=> {e.preventDefault(); this.setState({mostrarCambioEmail: false, mostrarCambioPassword: true})}}>
                            ¿Quieres cambiar tu contraseña?</a>
                        <br/>
                        <a href="#" onClick={(e)=> {e.preventDefault(); this.setState({mostrarCambioEmail: true, mostrarCambioPassword: false})}}>
                            ¿Quieres cambiar tu correo electrónico?</a>
                    </div>
                }  
            </div>

            {this.state.mostrarCambioEmail && 
                <div className="contenedorFormulario">
                    <form onSubmit={this.cambiarEmail} target="frameAux">
                        <Form.Control
                            id="nuevoEmail" 
                            type="text"
                            placeholder="Nuevo email"
                            required
                            onChange={this.comprobarEmail}
                        />
                        <div className="mensajeErrorPerfil">{this.state.errorEmail}</div>
                        <Button variant="primary" type="submit">Cambiar correo electrónico</Button>
                    </form>
                </div>
            }

            {this.state.mostrarCambioPassword &&
                <div className="contenedorFormulario">
                <form onSubmit={this.cambiarPassword} target="frameAux">
                    <Form.Control
                        id="oldPassword" 
                        type="password"
                        placeholder="Contraseña actual"
                        required
                    /> 
                    <Form.Control
                        id="newPassword" 
                        type="password"
                        placeholder="Escribe tu nueva contraseña"
                        required
                        onChange={() => {this.comprobarPasswordCorrecta(); this.comprobarPasswordsIguales()}}
                    />   
                    <div className="mensajeErrorPerfil">{this.state.errorPassword}</div>
                    <Form.Control
                        id="repetirPassword" 
                        type="password"
                        placeholder="Repite la nueva contraseña"
                        required
                        onChange={this.comprobarPasswordsIguales}
                    />   
                    <div className="mensajeErrorPerfil">{this.state.errorPasswordRepetida}</div>
                    <Button variant="primary" type="submit">Cambiar contraseña</Button>
                </form>
                </div>
            }

            <BarraInferior></BarraInferior>
            </div>
        );
    }
}
