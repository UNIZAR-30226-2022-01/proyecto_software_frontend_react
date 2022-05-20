import React from 'react';
import swal from 'sweetalert2';
import BarraSuperiorGeneral from "../../componentes/barraSuperiorGeneral/BarraSuperiorGeneral";
import BarraInferior from "../../componentes/barraInferior/BarraInferior";
import {Button, ButtonGroup, Form} from 'react-bootstrap';
import "./amigos.css";
import { Link, Navigate } from "react-router-dom";

export default class Amigos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amigos: [],
            usuarios: [],
            irPerfil: false
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
        console.log("navigando")
        localStorage.setItem('nombre_usuario', e.currentTarget.id);
        this.setState({irPerfil: true});
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
                        <ButtonGroup size="md" className="mb-2 elementoListaAmigos">
                            <Button className="botonIrPerfil" onClick={(e) => {this.verPerfil(e)}} id={response[i]}>
                                <div className="textoListaAmigos">{response[i]}</div></Button>
                            <Button variant="danger" className="botonEliminarAmigo" 
                                onClick={this.eliminarAmigo} id={response[i]}>Eliminar Amigo</Button>
                        </ButtonGroup>
                        <br/><br/>
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
        fetch(`http://localhost:8090/api/enviarSolicitudAmistad/${nombre}`, {
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
        fetch(`http://localhost:8090/api/aceptarSolicitudAmistad/${usuario}`, {
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
        let patron = document.getElementById("busqueda").value;
        fetch(`http://localhost:8090/api/obtenerUsuariosSimilares/${patron}`, {
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
        .then((response) => {
            if (response.localeCompare("null\n") === 0) {
                this.setState({usuarios: <h3>No se ha encontrado ningún usuario</h3>});
            }
            else {
                let usuariosArr = [];
                let nombreUsuario = this.getNombreUsuario(document.cookie);
                response = JSON.parse(response);
                for (var i=0; i < response.length; i++) {
                    let id = "boton:" + response[i]["Nombre"];
                    let botonAmistad = null;

                    if (response[i]["SolicitudRecibida"]) {
                        botonAmistad = <Button variant="success" id={id} className="botonAmigo" 
                            name={response[i]["Nombre"]} onClick={(e) =>this.aceptarSolicitud(e)}>Solicitud Recibida</Button>
                    }
                    else if (response[i]["SolicitudPendiente"]) {
                        botonAmistad = <Button variant="success" className="botonAmigo"disabled>Solicitud Pendiente</Button>
                    }
                    else if (!response[i]["EsAmigo"] && nombreUsuario !== response[i]["Nombre"]){
                        botonAmistad = <Button variant="success" className="botonAmigo" id={id} 
                            name={response[i]["Nombre"]} onClick={(e) =>this.enviarSolicitudAmistad(e)}>Solicitud de amistad</Button>
                    }
                    else if (response[i]["EsAmigo"]) {
                        botonAmistad = <Button variant="danger" className="botonAmigo" 
                            onClick={this.eliminarAmigo} id={response[i]}>Eliminar Amigo</Button>
                    }

                    let usuario = <div key={i}>
                        <ButtonGroup size="md" className="mb-2 elementoListaBusqueda">
                            <Button className="botonIrPerfil" onClick={(e) => this.verPerfil(e)} id={response[i]["Nombre"]}>
                                <div className="textoListaBusqueda">{response[i]["Nombre"]}</div></Button>
                            {botonAmistad}
                        </ButtonGroup>
                        <br/><br/>
                    </div>
                    usuariosArr.push(usuario);
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
        document.body.style.backgroundColor = "rgb(28,28,30)";
        if (this.state.irPerfil) {
            return <Navigate to='/perfil'/>;
        }

        return (
            <div className='cen social'>
            <BarraSuperiorGeneral/>
            <div className="contenedorTituloSocial">
                <text className="tituloSocial">Social</text>
            </div>
            <br/>
            
            <div className="container">
                <div className="row align-items-start">
                    <div className="col">
                    <div className="contenedorSocial">
                        <h2>Lista de amigos</h2>
                        <br/>
                        {this.state.amigos}
                    </div>
                    </div>
                    <div className="col">
                    <div className="contenedorSocial">
                        <h2>Buscar usuarios</h2>
                        <br/>
                        <iframe title="frameAux" name="frameAux" id="frameAux" style={{display: 'none'}}></iframe>
                        <form onSubmit={this.buscarUsuarios} target="frameAux">
                            <div className="input-group">
                                <Form.Control 
                                    className="campoBusqueda"
                                    type="text" 
                                    id="busqueda" 
                                    name="busqueda" 
                                    placeholder="Busca un usuario" 
                                    onChange={this.actualizarBoton}
                                />
                                <Button type="submit" id="botonBuscar" onClick={this.buscarUsuarios}>Buscar</Button>
                            </div>
                        </form>
                        <br/>
                        {this.state.usuarios}
                    </div>
                    </div>
                </div>
            </div>
            <BarraInferior/>
            </div>
        );
    }
}