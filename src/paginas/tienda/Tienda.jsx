import React from 'react';
import swal from 'sweetalert2';
import BarraSuperiorGeneral from "../../componentes/barraSuperiorGeneral/BarraSuperiorGeneral";
import BarraInferior from "../../componentes/barraInferior/BarraInferior";
import { Button, ButtonGroup} from 'react-bootstrap';
import "./tienda.css";

export default class Tienda extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrarAvatares: true,
            mostrarDados: false,
            avataresTienda: [],
            dadosTienda: [],
            coleccion: [], // IDs de los cosméticos que ya ha comprado
            puntos: 0,
        };
        this.consultarColeccion = this.consultarColeccion.bind(this);
        this.getNombreUsuario = this.getNombreUsuario.bind(this);
        this.consultarTienda = this.consultarTienda.bind(this);
        this.obtenerImagen = this.obtenerImagen.bind(this);
        this.obtenerPuntos = this.obtenerPuntos.bind(this);
    }

    componentDidMount() {
        let usuario = this.getNombreUsuario(document.cookie);
        this.consultarColeccion(usuario);
        this.obtenerPuntos(usuario);
        this.consultarTienda();
    }

    getNombreUsuario(nombre) {
        if (nombre.length > 0) {
            nombre = nombre.split('=')[1];
            nombre = nombre.split('|')[0];
        }
        return nombre;
    }

    // Obtener la imagen de uno de los cosméticos de la tienda id
    obtenerImagen(id) {
        for (var i = 0; i < this.state.avataresTienda.length; i++) {
            if (id === this.state.avataresTienda[i].id) {
                return this.state.avataresTienda[i].img;
            }
        }

        for (var j = 0; j < this.state.dadosTienda.length; j++) {
            if (id === this.state.dadosTienda[j].id) {
                return this.state.dadosTienda[j].img;
            }
        }

        return null;
    }
    
    // Obtener el precio de uno de los cosméticos de la tienda por id
    obtenerPrecio(id) {
        for (var i = 0; i < this.state.avataresTienda.length; i++) {
            if (id === this.state.avataresTienda[i].id) {
                return this.state.avataresTienda[i].precio;
            }
        }

        for (var j = 0; j < this.state.dadosTienda.length; j++) {
            if (id === this.state.dadosTienda[j].id) {
                return this.state.dadosTienda[j].precio;
            }
        }

        return 0;
    }

    // Obtener puntos del usuario
    obtenerPuntos(usuario) {
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
            this.setState({puntos: response['Puntos']});
        })
        .catch((e) => {
            swal.fire({
                title: 'Se ha producido un error al recuperar el perfil',
                text: e,
                icon: 'error',
            });
        })
    }

    // Obtener la lista de objetos ya comprados por el usuario
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
            let coleccionArr = [];
            for (var i=0; i < Object.keys(response).length; i++) { 
                coleccionArr.push(response[i]["Id"]);
            }

            this.setState({coleccion: coleccionArr});
        })
        .catch((e) => {
            swal.fire({
                title: 'Se ha producido un error al recuperar la colección de cosméticos',
                text: e,
                icon: 'error',
            });
        })
    }

    // Consultar los objetos a la venta
    consultarTienda() {
        fetch(`http://localhost:8090/api/consultarTienda`, {
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
                let cosmetico = {id: response[i]["Id"], nombre: response[i]["Nombre"], descripcion: response[i]["Descripcion"],
                        precio: response[i]["Precio"], img: response[i]["Imagen"]};
                
                if (response[i]["Tipo"] === "dado") {
                    
                    dadosArr.push(cosmetico);
                }
                else {
                    avataresArr.push(cosmetico);
                }
            }

            this.setState({dadosTienda: dadosArr, avataresTienda:avataresArr});
        })
        .catch((e) => {
            swal.fire({
                title: 'Se ha producido un error al recuperar la colección de cosméticos',
                text: e,
                icon: 'error',
            });
        })
    }

    // Comprar un nuevo cosmético
    comprarCosmetico(e, mensaje) {
        e.preventDefault();
        let img = this.obtenerImagen(e.currentTarget.id);
        let idCosmetico = e.currentTarget.id;
        let precio = this.obtenerPrecio(e.currentTarget.id);
        swal.fire({
            title: `¿Seguro que quieres comprar este aspecto?`,
            showCancelButton: true,
            html: `<img class="imagenAlerta" src='data:image;base64,${img}'/>`,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3085d6',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
            backdrop: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                    return fetch(`http://localhost:8090/api/comprarObjeto/${idCosmetico}`, {
                    method: 'post',
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
                    title: mensaje,
                    icon: 'success',
                    timer: 3000,
                    timerProgressBar: true,
                    });
                    
                    // Actualizamos los puntos del jugador y su colección de objetos
                    this.setState({coleccion: this.state.coleccion.concat(idCosmetico)})
                    this.setState({puntos: this.state.puntos - precio})
                })
                .catch(error => {
                    swal.showValidationMessage(`${error}`)
                })},
            allowOutsideClick: () => !swal.isLoading()
        })
    }

    render() {
        document.body.style.backgroundColor = "rgb(28,28,30)";
        let dadosTienda = [];
        let dadosColeccion = [];
        let avataresTienda = [];
        let avataresColeccion = [];

        // Carta vacía para alinear bien las columnas cuando el número de objetos es impar
        let cardVacio = <div className="cardTienda cardVacio"></div>
        
        // Creamos la lista de dados a mostrar
        for (var i=0; i < this.state.dadosTienda.length; i++) {
            let comprado = false;
            for (var j=0; j < this.state.coleccion.length; j++) {
                if (this.state.coleccion[j] === this.state.dadosTienda[i].id) {
                    comprado = true;
                }
            }
            let dado = <div className="card mb-3 cardTienda">
                <div className="row g-0 imagenDadoTienda">
                    <div className="col-md-4">
                    <img className="imagenDadoTienda" src={`data:image;base64,${this.state.dadosTienda[i].img}`}
                    alt={this.state.dadosTienda[i].descripcion}></img>
                    </div>
                
                    <div className="col-md-8">
                        <div className="card-body" >
                            <h5 className="card-title">{this.state.dadosTienda[i].nombre}</h5>
                            <p className="card-text">{this.state.dadosTienda[i].descripcion}</p>
                            
                        </div>
                    </div>
                </div>
                {!comprado && <div className="card-footer">
                    <button id={this.state.dadosTienda[i].id} 
                        type="button" className="botonCompra btn btn-primary" 
                        onClick={(e) => this.comprarCosmetico(e, "Dados comprados")}>
                        Comprar por {this.state.dadosTienda[i].precio} puntos</button>
                </div>}
            </div>

            // Separamos dados comprados de dados no comprados
            // Los comprados aparecerán al principio de la lista, los no comprados al final
            if (comprado) {
                dadosColeccion.push(dado);
            }
            else {
                dadosTienda.push(dado)
            }
        }

        // Creamos la lista de avatares a mostrar
        for (let i=0; i < this.state.avataresTienda.length; i++) {
            let comprado = false;
            for (let j=0; j < this.state.coleccion.length; j++) {
                if (this.state.coleccion[j] === this.state.avataresTienda[i].id) {
                    comprado = true;
                }
            }
            let avatar = <div className="card mb-3 cardTienda">
                <div className="row g-0 imagenAvatarTienda">
                    <div className="col-md-4">
                    <img className="imagenAvatarTienda" src={`data:image;base64,${this.state.avataresTienda[i].img}`}
                    alt={this.state.avataresTienda[i].descripcion}></img>
                    </div>
                
                    <div className="col-md-8">
                        <div className="card-body" >
                            <h5 className="card-title">{this.state.avataresTienda[i].nombre}</h5>
                            <p className="card-text">{this.state.avataresTienda[i].descripcion}</p>
                            
                        </div>
                    </div>
                </div>
                {!comprado && <div className="card-footer">
                    <button id={this.state.avataresTienda[i].id} 
                        type="button" className="botonCompra btn btn-primary" 
                        onClick={(e) => this.comprarCosmetico(e, "Avatar comprado")}>
                        Comprar por {this.state.avataresTienda[i].precio} puntos</button>
                </div>}
            </div>

            // Separamos avatares comprados de dados no comprados
            // Los comprados aparecerán al principio de la lista, los no comprados al final
            if (comprado) {
                avataresColeccion.push(avatar);
            }
            else {
                avataresTienda.push(avatar)
            }
        }
        

        return (
        <div className="cen, tienda">
            <BarraSuperiorGeneral puntos={this.state.puntos}></BarraSuperiorGeneral>
            <div className="contenedorTituloTienda">
                <text className="tituloTienda">Tienda</text>
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
            <br/>
            <br/>
            {this.state.mostrarAvatares && 
                <div>
                    <h3>Avatares disponibles</h3> 
                    <br/>
                    <div className="container">
                        <div className="row">
                            {avataresTienda} 
                            {avataresTienda.length % 2 === 1 && cardVacio}
                        </div>
                    </div>
                    {avataresTienda.length === 0 && <div className="mensajeTiendaComprada"><br/><h4>Has comprado todos los avatares disponibles</h4></div>}

                    <br/><br/>
                    <h3>Tu colección</h3> 
                    <br/>
                    <div className="container">
                        <div className="row">
                            {avataresColeccion} 
                            {avataresColeccion.length % 2 === 1 && cardVacio}
                        </div>
                    </div>
                </div>
            }
            {this.state.mostrarDados && 
                <div>
                    <h3>Dados disponibles</h3> 
                    <br/>
                    <div className="container">
                        <div className="row">
                            {dadosTienda} 
                            {dadosTienda.length % 2 === 1 && cardVacio}
                        </div>
                    </div>
                    {dadosTienda.length === 0 && <div className="mensajeTiendaComprada"><br/><h4>Has comprado todos los dados disponibles</h4></div>}

                    <br/><br/>
                    <h3>Tu colección</h3> 
                    <br/>
                    <div className="container">
                        <div className="row">
                            {dadosColeccion} 
                            {dadosColeccion.length % 2 === 1 && cardVacio}
                        </div>
                    </div>
                </div>
            }
            <br/><br/><br/><br/>
            <BarraInferior></BarraInferior>
        </div>
        );  
    }
}
