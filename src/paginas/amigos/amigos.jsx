import React from 'react';
import swal from 'sweetalert2';
import BarraSuperiorGeneral from "../../componentes/barraSuperiorGeneral/BarraSuperiorGeneral";
import BarraInferior from "../../componentes/barraInferior/BarraInferior";
import "./amigos.css";
import { Link } from "react-router-dom";

export default class Amigos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amigos: [],
            usuarios: []
        };

        this.recuperarAmigos = this.recuperarAmigos.bind(this);
        this.eliminarAmigo = this.eliminarAmigo.bind(this);
        this.buscarUsuarios = this.buscarUsuarios.bind(this);
        this.actualizarBoton = this.actualizarBoton.bind(this);
        this.enviarSolicitudAmistad = this.enviarSolicitudAmistad.bind(this);
        this.getNombreUsuario = this.getNombreUsuario.bind(this);
        this.aceptarSolicitud = this.aceptarSolicitud.bind(this);
    }

    getNombreUsuario(nombre) {
		if (nombre.length > 0) {
    	nombre = nombre.split('=')[1];
    	nombre = nombre.split('|')[0];
		}
        return nombre;
    }

    componentDidMount() {
        if (document.getElementById("busqueda").value === "") {
            document.getElementById("botonBuscar").disabled = true;
        }
        this.recuperarAmigos();
        this.interval = setInterval(() => this.recuperarAmigos(), 10000);
    }
  
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    verPerfil(e) {
        localStorage.setItem('nombre_usuario', e.currentTarget.id);
    }

    eliminarAmigo(e) {
      e.preventDefault();
      let nombre = e.currentTarget.id;
      swal.fire({
        title: `¿Seguro que quieres dejar de ser amigo de ${nombre}?`,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
        backdrop: true,
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return fetch(`http://localhost:8090/api/eliminarAmigo/${nombre}`, {
            method: 'get',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            credentials: 'include' 
          })
          .then((response) => {
            if (!response.ok) {
              return response.text().then(text => {throw new Error(text)});
            }
            return response.text();
          })
          .then(() => {
            swal.fire({
            title: `Has dejado de ser amigo de ${nombre}`,
            icon: 'success',
            timer: 3000,
            timerProgressBar: true,
            });
            // Actualizamos la lista de amigos
            this.recuperarAmigos();
          })
          .catch(error => {
            swal.showValidationMessage(`${error}`)
          })
        },
        allowOutsideClick: () => !swal.isLoading()
      })
    }

    recuperarAmigos() {
        fetch(`http://localhost:8090/api/listarAmigos`, {
            method: 'get',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            credentials: 'include'
        })
        .then((response) => {
            console.log('Respuesta recibida de la api');
            if (!response.ok) {
                return response.text().then(text => {throw new Error(text)});
            }
            return response.text();
        })
        .then((response) => {
            var amigosArr = []
            if (response.localeCompare("null\n") === 0) {
                this.setState({amigos: <h3>Aún no tienes amigos registrados</h3>})
            }
            else {
                response = JSON.parse(response);
                for (var i=0; i < Object.keys(response).length; i++) {
                    amigosArr.push(<div className='infoAmigo' key={i}>
                        <h3>{response[i]}</h3> 
                        <button onClick={this.eliminarAmigo} id={response[i]}>Eliminar Amigo</button>
                        <Link to='/perfil' onClick={this.verPerfil} id={response[i]}><button>Ver Perfil</button></Link>
                        </div>);
                }

                this.setState({amigos: amigosArr});
            }
        })
        .catch((e) => {
            swal.fire({
                title: 'Se ha producido un error al recuperar la lista de amigos',
                text: e,
                icon: 'error',
            });
        })
    }

    enviarSolicitudAmistad(e) {
        let nombre = e.currentTarget.name;
        let boton = e;
        console.log("Enviando solicitud de amistad a:" + nombre)
        fetch(`http://localhost:8090/api/enviarSolicitudAmistad/${nombre}`, {
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
                title: `Has enviado una solicitud de amistad a ${nombre}`,
                icon: 'success',
                timer: 3000,
                timerProgressBar: true,
            });
            // Actualizamos la búsqueda
            this.buscarUsuarios();
        })
        .catch((e) => {
            swal.fire({
                title: 'Se ha producido un error al recuperar el perfil',
                text: e,
                icon: 'error',
            });
        })
    }

    aceptarSolicitud(e) {
        let usuario = e.currentTarget.name;
        console.log("Aceptando la solicitud de amistad de:" + usuario)
        fetch(`http://localhost:8090/api/aceptarSolicitudAmistad/${usuario}`, {
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
                title: `Eres amigo de ${usuario}`,
                icon: 'success',
                timer: 3000,
                timerProgressBar: true,
            });
            this.setState({es_amigo: true})
            this.setState({solicitudRecibida: false})
            // Actualizamos la lista de amigos
            this.recuperarAmigos();
            // Actualizamos la búsqueda
            this.buscarUsuarios();
        })
        .catch((e) => {
            swal.fire({
                title: 'Se ha producido un error al aceptar la solicitud de amistad',
                text: e,
                icon: 'error',
            });
        })
    }

    buscarUsuarios() {
        console.log("Inicio buscar usuarios")
        let patron = document.getElementById("busqueda").value;
        console.log("Buscar:" + patron);
        fetch(`http://localhost:8090/api/obtenerUsuariosSimilares/${patron}`, {
            method: 'get',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            credentials: 'include'
        })
        .then((response) => {
            console.log('Respuesta recibida de la api');
            if (!response.ok) {
                return response.text().then(text => {throw new Error(text)});
            }
            return response.text();
        })
        .then((response) => {
            if (response.localeCompare("null\n") === 0) {
                console.log("No hay coincidencias");
                this.setState({usuarios: <h3>No se ha encontrado ningún usuario</h3>});
            }
            else {
                let usuariosArr = [];
                let nombreUsuario = this.getNombreUsuario(document.cookie);
                response = JSON.parse(response);
                for (var i=0; i < response.length; i++) {
                    // TODO limpiar un poco esto
                    let id = "boton:" + response[i]["Nombre"];
                    console.log("Sol recibida: "+response[i]["SolicitudRecibida"]+ ", solicitud pendiente: "+response[i]["SolicitudPendiente"])
                    if (response[i]["SolicitudRecibida"]) {
                        usuariosArr.push(<div className='infoUsuario' key={i}>
                            <h3>{response[i]["Nombre"]}</h3> 
                            <Link to='/perfil' onClick={this.verPerfil} id={response[i].Nombre}><button>Ver Perfil</button></Link>
                            <button id={id} name={response[i]["Nombre"]} onClick={(e) =>this.aceptarSolicitud(e)}>Solicitud Recibida</button>
                            </div>);
                    }
                    else if (response[i]["SolicitudPendiente"]) {
                        usuariosArr.push(<div className='infoUsuario' key={i}>
                            <h3>{response[i]["Nombre"]}</h3> 
                            <Link to='/perfil' onClick={this.verPerfil} id={response[i].Nombre}><button>Ver Perfil</button></Link>
                            <button disabled>Solicitud Pendiente</button>
                            </div>);
                    }
                    else if (!response[i]["EsAmigo"] && nombreUsuario !== response[i]["Nombre"]){
                        usuariosArr.push(<div className='infoUsuario' key={i}>
                            <h3>{response[i]["Nombre"]}</h3> 
                            <Link to='/perfil' onClick={this.verPerfil} id={response[i].Nombre}><button>Ver Perfil</button></Link>
                            <button id={id} name={response[i]["Nombre"]} onClick={(e) =>this.enviarSolicitudAmistad(e)}>Enviar solicitud de amistad</button>
                            </div>);
                    }
                    else {
                        usuariosArr.push(<div className='infoUsuario' key={i}>
                            <h3>{response[i]["Nombre"]}</h3> 
                            <Link to='/perfil' onClick={this.verPerfil} id={response[i].Nombre}><button>Ver Perfil</button></Link>
                            </div>);
                    }
                }

                this.setState({usuarios: usuariosArr});
            }
        })
        .catch((e) => {
            swal.fire({
                title: 'Se ha producido un error al buscar usuarios',
                text: e,
                icon: 'error',
            });
        })
    }

    actualizarBoton() {
        if (document.getElementById("busqueda").value === "") {
            document.getElementById("botonBuscar").disabled = true;
        } else {
            document.getElementById("botonBuscar").disabled = false;
        }
    }

    render() {
        return (
            <div className='cen'>
            <BarraSuperiorGeneral/>
            <h1>Social</h1>
            <h2>Lista de amigos</h2>
            {this.state.amigos}
            <h2>Buscar usuarios</h2>
            
            <iframe title="iframeAux" name="frameAuxiliar" id="frameAux" style={{display: 'none'}}></iframe>
            <form onSubmit={this.buscarUsuarios} target="frameAux">
                <input type="text" id="busqueda" name="busqueda" placeholder="Busca un usuario" onChange={this.actualizarBoton}></input>
                <button type="submit" id="botonBuscar" onClick={this.buscarUsuarios}>Buscar</button>
            </form>
            {this.state.usuarios}
            <BarraInferior/>
            </div>
        );
    }
}