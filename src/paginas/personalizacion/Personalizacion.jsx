import React from 'react';
import swal from 'sweetalert2';
import BarraSuperiorGeneral from "../../componentes/barraSuperiorGeneral/BarraSuperiorGeneral";
import BarraInferior from "../../componentes/barraInferior/BarraInferior";
import { Button, ButtonGroup} from 'react-bootstrap';
import "./personalizacion.css";

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
            if (id === this.state.avatares[i].id) {
                return this.state.avatares[i].img;
            }
        }

        for (var j = 0; j < this.state.dados.length; j++) {
            if (id === this.state.dados[j].id) {
                return this.state.dados[j].img;
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
        fetch(`http://localhost:8090/api/modificarAspecto/${e.currentTarget.id}`, {
            method: 'post',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            credentials: 'include'
        })
        .then((response) => {
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
        document.body.style.backgroundColor = "rgb(28,28,30)";
        let dadosArr = [];
        let avataresArr = [];

        // Carta vacía para alinear bien las columnas cuando el número de objetos es impar
        let cardVacio = <div className="cardTienda cardVacio"></div>

        // Creamos la lista de dados a mostrar
        for (var i=0; i < this.state.dados.length; i++) {
            let equipado = this.state.dados[i].id === this.state.dadoEquipado;
            let dado = (<div className="card mb-3 cardPersonalizacion">
                <div className="row g-0 imagenDadoPersonalizacion">
                    <div className="col-md-4">
                    <img className="imagenDadoTienda" src={`data:image;base64,${this.state.dados[i].img}`}
                    alt={this.state.dados[i].descripcion}></img>
                    </div>
                
                    <div className="col-md-8">
                        <div className="card-body" >
                            <h5 className="card-title">{this.state.dados[i].nombre}</h5>
                            <p className="card-text">{this.state.dados[i].descripcion}</p>
                            
                        </div>
                    </div>
                </div>
                {!equipado && <div className="card-footer">
                    <Button variant="primary" id={this.state.dados[i].id} onClick={(e) => this.equiparCosmetico(e, "Dados equipados")}>Equipar dados</Button>
                </div>}
                {equipado && <div className="card-footer">
                    <Button variant="success">Dados equipados</Button>
                </div>}
            </div>
            )
            dadosArr.push(dado)
        }

        // Creamos la lista de avatares a mostrar
        for (var j=0; j < this.state.avatares.length; j++) {
            let equipado = this.state.avatares[j].id === this.state.avatarEquipado;
            let avatar = <div className="card mb-3 cardPersonalizacion">
                <div className="row g-0 imagenAvatarTienda">
                    <div className="col-md-4">
                    <img className="imagenAvatarTienda" src={`data:image;base64,${this.state.avatares[j].img}`}
                    alt={this.state.avatares[j].descripcion}></img>
                    </div>
                
                    <div className="col-md-8">
                        <div className="card-body" >
                            <h5 className="card-title">{this.state.avatares[j].nombre}</h5>
                            <p className="card-text">{this.state.avatares[j].descripcion}</p>
                            
                        </div>
                    </div>
                </div>
                {!equipado && <div className="card-footer">
                    <Button variant="primary" id={this.state.avatares[j].id} onClick={(e) => this.equiparCosmetico(e, "Avatar equipado")}>Equipar avatar</Button>
                </div>}
                {equipado && <div className="card-footer">
                    <Button variant="success" disabled>Avatar equipado</Button>
                </div>}
            </div>
            avataresArr.push(avatar);
        }
        

        return (
        <div className="cen personalizacion">
            <BarraSuperiorGeneral></BarraSuperiorGeneral>
            <div className="contenedorTituloPersonalizacion">
                <text className="tituloPersonalizacion">Personalizacion</text>
            </div>
            <br/>
            <ButtonGroup>
                <Button variant="primary" onClick={() => {this.setState({mostrarAvatares: true, mostrarDados: false})}}>
                    Avatares
                </Button>
                <Button variant="primary" onClick={() => {this.setState({mostrarAvatares: false, mostrarDados: true})}}>
                    Dados
                </Button>
            </ButtonGroup>
            <br/><br/>
            {this.state.mostrarAvatares && 
                <div className="container">
                    <div className="row">
                        {avataresArr}
                        {avataresArr.length % 2 === 1 && cardVacio}
                    </div>
                </div>}
            {this.state.mostrarDados &&
                <div className="container">
                    <div className="row">
                        {dadosArr}
                        {dadosArr.length % 2 === 1 && cardVacio}
                    </div>
                </div>}
            <br/><br/><br/>
            <BarraInferior></BarraInferior>
        </div>
        );  
    }
}
