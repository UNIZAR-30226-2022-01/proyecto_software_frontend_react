import React from 'react';
import swal from 'sweetalert2';
import BarraSuperiorGeneral from "../../componentes/barraSuperiorGeneral/BarraSuperiorGeneral";
import BarraInferior from "../../componentes/barraInferior/BarraInferior";
import { Button } from 'react-bootstrap';
import "./perfil.css";
import queryString from 'query-string';
import Constantes from '../../constantes';

const emailValidoRegex = RegExp(
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export default class Perfil extends React.Component {
    constructor(props) {
        const usuario = localStorage.getItem('nombre_usuario');
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
        this.mostrarFormularioEmail = this.mostrarFormularioEmail.bind(this);
        this.mostrarFormularioContraseĆ±a = this.mostrarFormularioContraseĆ±a.bind(this);
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
        fetch(Constantes.RUTA_API + `/api/obtenerFotoPerfil/${this.state.nombre_usuario}`, {
            method: 'get',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            credentials: 'include'
        })
        .then((response) => {
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
        fetch(Constantes.RUTA_API + `/api/obtenerPerfil/${this.state.nombre_usuario}`, {
            method: 'get',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            credentials: 'include'
        })
        .then((response) => {
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
            if (response['PartidasTotales'] !== 0) {
                winRate = response['PartidasGanadas'] / response['PartidasTotales'] * 100;
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
        fetch(Constantes.RUTA_API + `/api/enviarSolicitudAmistad/${this.state.nombre_usuario}`, {
            method: 'post',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            credentials: 'include'
        })
        .then((response) => {
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
        fetch(Constantes.RUTA_API + `/api/modificarBiografia`, {
            method: 'post',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({
                biografia: document.getElementById("bio").value,
             }),
            credentials: 'include'
        })
        .then((response) => {
            if (!response.ok) {
                return response.text().then(text => {throw new Error(text)});
            }
        })
        .then(() => {
            swal.fire({
                title: `BiografĆ­a actualizada con Ć©xito`,
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
        fetch(Constantes.RUTA_API + `/api/aceptarSolicitudAmistad/${this.state.nombre_usuario}`, {
            method: 'post',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            credentials: 'include'
        })
        .then((response) => {
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

    cambiarEmail(email) {
        fetch(Constantes.RUTA_API + '/api/modificarEmail', {
            method: 'post',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: queryString.stringify({
                email: email,
            }),
            credentials: 'include'
        })
        .then((response) => {
            if (!response.ok) {
                return response.text().then(text => {throw new Error(text)});
            }
        })
        .then(() => {
            swal.fire({
                title: `Se ha actualizado tu correo electrĆ³nico`,
                icon: 'success',
                timer: 3000,
                timerProgressBar: true,
            });
            this.setState({email: email})
        })
        .catch((e) => {
            swal.fire({
                title: 'Se ha producido un error al modificar el correo electrĆ³nico',
                text: e,
                icon: 'error',
            });
        })

    }

    cambiarPassword(oldPassword, newPassword) {
        if (this.state.errorPassword === "" && this.state.errorPasswordRepetida === "") {
            fetch(Constantes.RUTA_API + '/api/resetearPasswordEnLogin', {
                method: 'post',
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                body: queryString.stringify({
                    passwordActual: oldPassword,
                    passwordNueva: newPassword,
                }),
                credentials: 'include'
            })
            .then((response) => {
                if (!response.ok) {
                    return response.text().then(text => {throw new Error(text)});
                }
            })
            .then(() => {
                swal.fire({
                    title: `Se ha actualizado tu contraseĆ±a`,
                    icon: 'success',
                    timer: 3000,
                    timerProgressBar: true,
                });
            })
            .catch((e) => {
                swal.fire({
                    title: 'Se ha producido un error al actualizar la contraseĆ±a',
                    text: e,
                    icon: 'error',
                });
            })
        }
    }

    mostrarFormularioEmail() {
        swal.fire({
            title: 'Modificar correo electrĆ³nico',
            html: `<input type="text" id="email" class="swal2-input" placeholder="Introduzca su nuevo correo">`,
            confirmButtonText: 'Confirmar',
            focusConfirm: false,
            preConfirm: () => {
                const email = swal.getPopup().querySelector('#email').value
                if(!emailValidoRegex.test(email)) {
                    swal.showValidationMessage(`El formato del correo electrĆ³nico no es vĆ”lido`)
                }

                return {email: email}
            }
          }).then((result) => {
            this.cambiarEmail(result.value.email);
          })
    }

    mostrarFormularioContraseĆ±a() {
        swal.fire({
            title: 'Cambio de contraseĆ±a',
            html: `
            <h4>ContraseĆ±a actual</h4>
            <input type="password" id="oldPassword" class="swal2-input" placeholder="Introduzca su contraseĆ±a"><br/><br/>
            <h4>Nueva contraseĆ±a</h4>
            <input type="password" id="newPassword" class="swal2-input" placeholder="Nueva contraseĆ±a"><br/><br/>
            <h4>Repetir contraseĆ±a</h4>
            <input type="password" id="repeatPassword" class="swal2-input" placeholder="Repita la nueva contraseĆ±a">`,
            confirmButtonText: 'Cambiar contraseĆ±a',
            focusConfirm: false,
            preConfirm: () => {
                const pw0 = swal.getPopup().querySelector('#oldPassword').value
                const pw1 = swal.getPopup().querySelector('#newPassword').value
                const pw2 = swal.getPopup().querySelector('#repeatPassword').value
                if (!pw0 || !pw1 || !pw2) {
                    swal.showValidationMessage(`Por favor, rellene todos los campos`)
                }

                if (pw1.length < 8) {
                    swal.showValidationMessage(`La contraseĆ±a debe tener al menos 8 caracteres`)
                }

                if (pw1 !== pw2) {
                    swal.showValidationMessage(`La nueva contraseĆ±a y la contraseĆ±a repetida deben coincidir`)
                }
                return { oldPassword: pw0, newPassword: pw1 }
            }
        }).then((result) => {
            this.cambiarPassword(result.value.oldPassword, result.value.newPassword);
        })          
    }

    render() {
        document.body.style.backgroundColor = "rgb(28,28,30)";
        let solicitudAmistad = null;
        let modBio = null;
        let nRows = 5; // NĆŗmero de filas del textarea para la biografĆ­a

        if (!this.state.es_usuario && !this.state.es_amigo && !this.state.solicitudPendiente && !this.state.solicitudRecibida) {
            // Si no es amigo aparece un botĆ³n para solicitar amistad
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
            // Si es el usuario aparece un botĆ³n para cambiar la biografĆ­a y para resetear la contraseĆ±a
            modBio = <Button variant="primary" type="submit" className="botonModificarBiografia" onClick={this.modificarBiografia}>Modificar biografĆ­a</Button>
            document.getElementById("bio").disabled = false;

            // Reducimos nĆŗmero de filas para que quepa bien el botĆ³n de modificar biografĆ­a
            nRows = 3;
        }
        return (
            <div className="cen perfil">

            <BarraSuperiorGeneral></BarraSuperiorGeneral>
            <iframe title="iframeAux" name="frameAux" id="frameAux" style={{display: 'none'}}></iframe>
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
                            {this.state.es_usuario && <h3>Tu correo electrĆ³nico es {this.state.email}</h3>}
                        </div>
                    </div>
                    {this.state.es_usuario && 
                        <div>
                            <br/><br/>
                            <a href="#" onClick={this.mostrarFormularioContraseĆ±a}>
                                ĀæQuieres cambiar tu contraseĆ±a?</a>
                            <br/>
                            <a href="#" onClick={this.mostrarFormularioEmail}>
                                ĀæQuieres cambiar tu correo electrĆ³nico?</a>
                        </div>
                    }  
                </div>
            <BarraInferior></BarraInferior>
            </div>
        );
    }
}
