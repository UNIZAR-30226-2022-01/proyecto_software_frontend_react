import React from 'react';
import swal from 'sweetalert2';
import BarraSuperiorGeneral from "../../componentes/barraSuperiorGeneral/BarraSuperiorGeneral";
import BarraInferior from "../../componentes/barraInferior/BarraInferior";
import "./amigos.css";
import InfoNotificacion from "../../componentes/infoNotificacion/infoNotificacion.jsx";
import { Link } from "react-router-dom";

import queryString from 'query-string';

export default class Amigos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amigos: []
        };

        this.recuperarAmigos = this.recuperarAmigos.bind(this);
        this.eliminarAmigo = this.eliminarAmigo.bind(this);
        this.buscarUsuarios = this.buscarUsuarios.bind(this);
    }

    componentDidMount() {
        this.recuperarAmigos();
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
                        console.log('Antes del fetch, nombre:'+nombre);
                        // TODO la llamada a API no funciona desde frontend pero si desde backend/tests
                        return fetch(`http://localhost:8090/api/eliminarAmigo/${nombre}`, {
                            method: 'get',
                            headers: {'Content-Type':'application/x-www-form-urlencoded'},
                            credentials: 'include' 
                        })
                        .then((response) => {
                            console.log('Respuesta de la api, eliminar amigo');
                            if (!response.ok) {
                                console.log('Respuesta de la api, error al eliminar amigo');
                                return response.text().then(text => {throw new Error(text)});
                            }
                            console.log('Respuesta de la api, OK eliminar amigo');
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
            if (response.localeCompare("null\n") == 0) {
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
                title: 'Se ha producido un error al recuperar las notificaciones',
                text: e,
                icon: 'error',
            });
        })
    }

    buscarUsuarios(e) {
        console.log("Buscar:" + e.target.value);
        fetch(`http://localhost:8090/api/obtenerUsuariosSimilares/${e.target.value}`, {
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
            if (response.localeCompare("null\n") == 0) {
                console.log("No hay coincidencias")
                this.setState({amigos: <h3>Aún no tienes amigos registrados</h3>})
            }
            else {
                response = JSON.parse(response);
                console.log("Users recuperados: " + response)
            }
        })
        .catch((e) => {
            swal.fire({
                title: 'Se ha producido un error al recuperar los usuarios',
                text: e,
                icon: 'error',
            });
        })
    }

    render() {
        return (
            <div className='cen'>
            <BarraSuperiorGeneral/>
            <h1>Social</h1>
            <h2>Lista de amigos</h2>
            {this.state.amigos}
            <h2>Buscar usuarios</h2>
            <input type="text" id="bio" name="bio" placeholder="Busca un usuario" onChange={(e) => this.buscarUsuarios(e)}></input>
            <BarraInferior/>
            </div>
        );
    }
}