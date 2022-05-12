import React from 'react';
import swal from 'sweetalert2';
import "./personalizacion.css";
import BarraSuperiorGeneral from "../../componentes/barraSuperiorGeneral/BarraSuperiorGeneral";
import BarraInferior from "../../componentes/barraInferior/BarraInferior";

export default class Personalizacion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrarAvatares: true,
            mostrarDados: false,
            avatares: [],
            dados: [],
            dadoEquipado: -1,
            avatarEquipado: -1,
        };
        this.consultarColeccion = this.consultarColeccion.bind(this);
        this.getNombreUsuario = this.getNombreUsuario.bind(this);
        this.consultarEquipacion = this.consultarEquipacion.bind(this);
        this.equiparCosmetico = this.equiparCosmetico.bind(this);
    }

    componentDidMount() {
        let usuario = this.getNombreUsuario(document.cookie);
        this.consultarEquipacion(usuario);
        this.consultarColeccion(usuario);
    }

    getNombreUsuario(nombre) {
        if (nombre.length > 0) {
            nombre = nombre.split('=')[1];
            nombre = nombre.split('|')[0];
        }
        return nombre;
    }

    // Obtener el dado y el avatar que tiene equipado el usuario
    consultarEquipacion(usuario) {
        fetch(`http://localhost:8090/api/obtenerPerfil/${usuario}`, {
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
            this.setState({dadoEquipado: response['ID_dado']});
            this.setState({avatarEquipado: response['ID_avatar']});
        })
        .catch((e) => {
            swal.fire({
                title: 'Se ha producido un error al consultar los cosméticos del usuario',
                text: e,
                icon: 'error',
            });
        })
    }

    consultarColeccion(usuario) {
        fetch(`http://localhost:8090/api/consultarColeccion/${usuario}`, {
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
            let dadosArr = [];
            let avataresArr = [];
            for (var i=0; i < Object.keys(response).length; i++) {
                if (response[i]["Tipo"] === "dado") {
                    dadosArr.push(<div className="dado" key={response[i]["Id"]}>
                        {response[i]["Nombre"]}, {response[i]["Descripcion"]}
                        {this.state.dadoEquipado == response[i]["Id"] && "Objeto equipado"}
                        {this.state.dadoEquipado != response[i]["Id"] && 
                            <button id={response[i]["Id"]} onClick={(e) => this.equiparCosmetico(e)}>Equipar dado</button>}
                    </div>)
                }
                else {
                    avataresArr.push(<div className="avatar" key={response[i]["Id"]}>
                        {response[i]["Nombre"]}, {response[i]["Descripcion"]}
                        {this.state.avatarEquipado == response[i]["Id"] && "Objeto equipado"}
                        {this.state.avatarEquipado != response[i]["Id"] && 
                            <button id={response[i]["Id"]} onClick={(e) => this.equiparCosmetico(e)}>Equipar avatar</button>}
                    </div>)
                }
            }

            this.setState({dados: dadosArr, avatares:avataresArr});
        })
        .catch((e) => {
            swal.fire({
                title: 'Se ha producido un error al recuperar la colección de cosméticos',
                text: e,
                icon: 'error',
            });
        })
    }

    equiparCosmetico(e) {
        console.log("Equipando el cosmético: "+e.currentTarget.id);
        fetch(`http://localhost:8090/api/modificarAspecto/${e.currentTarget.id}`, {
            method: 'post',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            credentials: 'include'
        })
        .then((response) => {
            console.log('Respuesta recibida de la api');
            if (!response.ok) {
                return response.text().then(text => {throw new Error(text)});
            }
            // Recargamos los cosméticos del jugador
            let usuario = this.getNombreUsuario(document.cookie);
            this.consultarEquipacion(usuario);
            this.consultarColeccion(usuario);
        })
        .catch((e) => {
            swal.fire({
                title: 'Se ha producido un error al equipar el cosmético',
                text: e,
                icon: 'error',
            });
        })
    }

    render() {
        

        return (
        <div className="cen">
            <BarraSuperiorGeneral></BarraSuperiorGeneral>
            <h1>Personalizacion</h1>
            <button onClick={() => {this.setState({mostrarAvatares: true, mostrarDados: false})}}>Avatares</button>
            <button onClick={() => {this.setState({mostrarAvatares: false, mostrarDados: true})}}>Dados</button>

            <div className="equipacionActual">Avatar equipado {this.state.avatarEquipado}, dado {this.state.dadoEquipado}</div>
            {this.state.mostrarAvatares && <div className="avatares">Avatares {this.state.avatares}</div>}
            {this.state.mostrarDados && <div className="dados">Dados {this.state.dados}</div>}
            <BarraInferior></BarraInferior>
        </div>
        );  
    }
}
