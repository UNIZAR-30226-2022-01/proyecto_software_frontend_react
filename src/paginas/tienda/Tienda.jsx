import React from 'react';
import swal from 'sweetalert2';
import BarraSuperiorGeneral from "../../componentes/barraSuperiorGeneral/BarraSuperiorGeneral";
import BarraInferior from "../../componentes/barraInferior/BarraInferior";
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
            if (id == this.state.avataresTienda[i].id) {
                return this.state.avataresTienda[i].img;
            }
        }

        for (var i = 0; i < this.state.dadosTienda.length; i++) {
            if (id == this.state.dadosTienda[i].id) {
                return this.state.dadosTienda[i].img;
            }
        }

        return null;
    }
    
    // Obtener el precio de uno de los cosméticos de la tienda por id
    obtenerPrecio(id) {
        for (var i = 0; i < this.state.avataresTienda.length; i++) {
            if (id == this.state.avataresTienda[i].id) {
                return this.state.avataresTienda[i].precio;
            }
        }

        for (var i = 0; i < this.state.dadosTienda.length; i++) {
            if (id == this.state.dadosTienda[i].id) {
                return this.state.dadosTienda[i].precio;
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
            console.log('Respuesta recibida de la api');
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
            console.log('Respuesta recibida de la api');
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

            console.log(coleccionArr)
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
                    //console.log("Actualizando coleccion:"+this.state.coleccion)
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
        console.log("Render tienda")
        console.log("Coleccion de cosméticos del usuario: "+this.state.coleccion)
        let dadosTienda = [];
        let dadosColeccion = [];
        let avataresTienda = [];
        let avataresColeccion = [];
        
        // Creamos la lista de dados a mostrar
        // TODO, el estado cambia correctamente y la coleccion se actualiza, pero el nuevo item aparece con comprado = false
        for (var i=0; i < this.state.dadosTienda.length; i++) {
            let comprado = this.state.coleccion.includes(this.state.dadosTienda[i].id);
            let dado = (
                <div className="dado" key={this.state.dadosTienda[i].id}>
                    <img className="imagenDado" src={`data:image;base64,${this.state.dadosTienda[i].img}`}></img>
                    {this.state.dadosTienda[i].nombre}, {this.state.dadosTienda[i].descripcion}
                    <br></br>
                    Precio: {this.state.dadosTienda[i].precio} puntos
                    {comprado && <button disabled>Dados comprados</button>}
                    {!comprado && 
                    <button id={this.state.dadosTienda[i].id } 
                        onClick={(e) => this.comprarCosmetico(e, "Dados comprados")}>Comprar dados</button>}
                </div>)

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
        for (var i=0; i < this.state.avataresTienda.length; i++) {
            let comprado = this.state.coleccion.includes(this.state.avataresTienda[i].id);
            console.log("i = ", i, ", añadiendo avatar ", this.state.avataresTienda[i].id, " comprado:", comprado)
            let avatar = 
                (<div className="avatar" key={this.state.avataresTienda[i].id}>
                    <img className="imagenAvatar" src={`data:image;base64,${this.state.avataresTienda[i].img}`}></img>
                    {this.state.avataresTienda[i].nombre}, {this.state.avataresTienda[i].descripcion}
                    <br></br>
                    Precio: {this.state.avataresTienda[i].precio} puntos
                    {comprado && <button disabled>Avatar comprado</button>}
                    {!comprado && 
                        <button id={this.state.avataresTienda[i].id} onClick={(e) => this.comprarCosmetico(e, "Avatar comprado")}>Comprar avatar</button>}
                </div>);

            // Separamos dados comprados de dados no comprados
            // Los comprados aparecerán al principio de la lista, los no comprados al final
            if (comprado) {
                avataresColeccion.push(avatar);
            }
            else {
                avataresTienda.push(avatar)
            }
        }
        

        return (
        <div className="cen">
            <BarraSuperiorGeneral puntos={this.state.puntos}></BarraSuperiorGeneral>
            <h1>Tienda</h1>

            <button onClick={() => {this.setState({mostrarAvatares: true, mostrarDados: false})}}>Avatares</button>
            <button onClick={() => {this.setState({mostrarAvatares: false, mostrarDados: true})}}>Dados</button>

            {this.state.mostrarAvatares && 
                <div className="avatares">
                    <h2>Avatares disponibles</h2> {avataresColeccion} {avataresTienda}
                </div>}
            {this.state.mostrarDados && <div className="dados">
                    <h2>Dados disponibles</h2> {dadosColeccion} {dadosTienda}
                </div>}
            <BarraInferior></BarraInferior>
        </div>
        );  
    }
}
