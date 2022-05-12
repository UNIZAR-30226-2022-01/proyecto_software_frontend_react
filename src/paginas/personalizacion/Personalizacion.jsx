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
        this.obtenerImagen = this.obtenerImagen.bind(this);
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

    // Obtener la imagen de uno de los cosméticos de la colección del usuario por id
    obtenerImagen(id) {
        for (var i = 0; i < this.state.avatares.length; i++) {
            if (id == this.state.avatares[i].id) {
                return this.state.avatares[i].img;
            }
        }

        for (var i = 0; i < this.state.dados.length; i++) {
            if (id == this.state.dados[i].id) {
                return this.state.dados[i].img;
            }
        }

        return null;
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
                    let dado = {id: response[i]["Id"], nombre: response[i]["Nombre"], descripcion: response[i]["Descripcion"], img: response[i]["Imagen"]}
                    dadosArr.push(dado);
                }
                else {
                    let avatar = {id: response[i]["Id"], nombre: response[i]["Nombre"], descripcion: response[i]["Descripcion"],img: response[i]["Imagen"]};
                    avataresArr.push(avatar);
                }
            }

            dadosArr.forEach((x,i) => console.log(x));
            avataresArr.forEach((x,i) => console.log(x));
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

    equiparCosmetico(e, mensaje) {
        let img = this.obtenerImagen(e.currentTarget.id)
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
            swal.fire({
                title: mensaje,
                icon: 'success',
                html: `<img class="imagenAlerta" src='data:image;base64,${img}'/>`,
                timer: 3000,
                timerProgressBar: true,
            });
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
        let dadosArr = [];
        let avataresArr = [];
        let avatarEquipado = null;
        let dadoEquipado = null;
        // Creamos la lista de dados a mostrar
        for (var i=0; i < this.state.dados.length; i++) {
            dadosArr.push(<div className="dado" key={this.state.dados[i].id}>
                <img className="imagenDado" src={`data:image;base64,${this.state.dados[i].img}`}></img>
                {this.state.dados[i].nombre}, {this.state.dados[i].descripcion}
                {this.state.dadoEquipado == this.state.dados[i].id && <button disabled>Dados equipados</button>}
                {this.state.dadoEquipado != this.state.dados[i].id && 
                    <button id={this.state.dados[i].id } 
                    onClick={(e) => this.equiparCosmetico(e, "Dados equipados")}>Equipar dado</button>}
            </div>)

            if (this.state.dados[i].id == this.state.dadoEquipado) {
                dadoEquipado = <div className="dadoEquipado">
                    <img className="imagenDado" src={`data:image;base64,${this.state.dados[i].img}`}></img>
                    {this.state.dados[i].nombre}, {this.state.dados[i].descripcion}
                    </div>
            }
        }

        // Creamos la lista de avatares a mostrar
        for (var i=0; i < this.state.avatares.length; i++) {
            avataresArr.push(<div className="avatar" key={this.state.avatares[i].id}>
                <img size className="imagenAvatar" src={`data:image;base64,${this.state.avatares[i].img}`}></img>
                {this.state.avatares[i].nombre}, {this.state.avatares[i].descripcion}
                {this.state.avatarEquipado == this.state.avatares[i].id && <button disabled>Avatar equipado</button>}
                {this.state.avatarEquipado != this.state.avatares[i].id && 
                    <button id={this.state.avatares[i].id} onClick={(e) => this.equiparCosmetico(e, "Avatar equipado")}>Equipar avatar</button>}
            </div>)

            if (this.state.avatares[i].id == this.state.avatarEquipado) {
                avatarEquipado = <div className="avatarEquipado">
                    <img size className="imagenAvatar" src={`data:image;base64,${this.state.avatares[i].img}`}></img>
                    {this.state.avatares[i].nombre}, {this.state.avatares[i].descripcion}
                </div>
            }
        }
        

        return (
        <div className="cen">
            <BarraSuperiorGeneral></BarraSuperiorGeneral>
            <h1>Personalizacion</h1>

            <button onClick={() => {this.setState({mostrarAvatares: true, mostrarDados: false})}}>Avatares</button>
            <button onClick={() => {this.setState({mostrarAvatares: false, mostrarDados: true})}}>Dados</button>

            {this.state.mostrarAvatares && 
                <div className="avatares">
                    Avatar Equipado {avatarEquipado}
                    Avatares Disponibles {avataresArr}
                </div>}
            {this.state.mostrarDados && <div className="dados">
                    Dados equipados {dadoEquipado}
                    Dados {dadosArr}
                </div>}
            <BarraInferior></BarraInferior>
        </div>
        );  
    }
}
