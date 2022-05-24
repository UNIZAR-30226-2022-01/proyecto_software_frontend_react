import React from 'react';
import swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';
import queryString from 'query-string';
import InfoJugador from "../../componentes/infoJugador/InfoJugador";
import MapaPartida from "../../componentes/mapaPartida/MapaPartida";
import MapaInfo from "../../componentes/mapaInfo/MapaInfo";
import BarraSuperiorJuego from '../../componentes/barraSuperiorJuego/BarraSuperiorJuego'
import BarChart from "../../imagenes/bar-chart.png";
import Cards from "../../imagenes/cards.png";
import User from "../../imagenes/user.png";
import World from "../../imagenes/world.png";
import Fase from "../../imagenes/fase.png";
import Chat from "../../imagenes/chat.png";
import Constantes from '../../constantes';
import "./mapa.css";

const territorios = ["Australia_Oriental", "Indonesia", "Nueva_Guinea", "Alaska", "Ontario", "Territorio_del_Noroeste", "Venezuela", 
  "Madagascar", "Africa_del_Norte", "Groenlandia", "Islandia", "Reino_Unido", "Escandinavia", "Japon", "Yakutsk", "Kamchatka", 
  "Siberia", "Ural", "Afganistan", "Oriente_Medio", "India", "Siam", "China", "Mongolia", "Irkutsk", "Ucrania", "Europa_del_Sur", 
  "Europa_Occidental", "Europa_del_Norte", "Egipto", "Africa_Oriental", "Congo", "Sudafrica", "Brasil", "Argentina", 
  "Este_de_los_Estados_Unidos", "Estados_Unidos_Occidental", "Quebec", "America_Central", "Peru", "Australia_Occidental", "Alberta"];

const circulosTerritorios = ["cAustralia_Oriental", "cIndonesia",
  "cNueva_Guinea", "cAlaska", "cOntario", "cTerritorio_del_Noroeste", "cVenezuela", "cMadagascar", "cAfrica_del_Norte", "cGroenlandia",
  "cIslandia", "cReino_Unido", "cEscandinavia", "cJapon", "cYakutsk", "cKamchatka", "cSiberia", "cUral", "cAfganistan", "cOriente_Medio",
  "cIndia", "cSiam", "cChina", "cMongolia", "cIrkutsk", "cUcrania", "cEuropa_del_Sur", "cEuropa_Occidental", "cEuropa_del_Norte", "cEgipto",
  "cAfrica_Oriental", "cCongo", "cSudafrica", "cBrasil", "cArgentina", "cEste_de_los_Estados_Unidos", "cEstados_Unidos_Occidental", "cQuebec",
  "cAmerica_Central", "cPeru", "cAustralia_Occidental", "cAlberta"];

export default class Mapa extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombrePropioJugador: this.getNombreUsuario(document.cookie),
      nombreJugadores: [],
      tropasJugadores: [0,0,0,0,0,0],
      regionesJugadores: [0,0,0,0,0,0],
      cartasJugadores: [0,0,0,0,0,0],
      numJugadores: 0,
      enableButton: false,
      enableMapInfo: false,
      coloresJugadores: ["rgb(249, 65, 68)", "rgb(249, 199, 79)", "rgb(144, 190, 109)", "rgb(10, 147, 150)", "rgb(140, 110, 181)", "rgb(249, 132, 74)"],
      coloresCirculos: ["#fc7476", "#fad57d", "#b7db9c", "#22afb3", "#8c6eb5", "#fa9664"],
      coloresInfo: ["rgb(249, 65, 68)", "rgb(249, 199, 79)", "rgb(144, 190, 109)", "rgb(10, 147, 150)", "rgb(140, 110, 181)", "rgb(249, 132, 74)"],
      accionesIniciales: [],
      indexAccionesIniciales: 0,
      territorioSeleccionado: "",
      habilitarSeleccionar: false,
      habilitarCartas: false,
      fase: 0,
      accionesRestantes: [],
      indiceAccionesRestantes: 0,
      numTropasReforzar: 0,
      resultadoAlerta: null,
      turno: null,
      territorioOrigenFortificar: null,
      territorioOrigenAtaque: null,
      finPartida: false,
      obtenerInfoPartida: localStorage.getItem("volver_partida"),
      volviendoMapaPartida: false,
      imagenes: [],
      dadosDefensor: [],
      jugadorChat: "", 
      mensajeChat: "",
      irCartas: false
    };

    this.getNombreUsuario = this.getNombreUsuario.bind(this);
    this.min = this.min.bind(this);
    this.mostrarAlertaInformativaAsincrona = this.mostrarAlertaInformativaAsincrona.bind(this);
    this.mostrarAlertaRangoAsincrona = this.mostrarAlertaRangoAsincrona.bind(this);
    this.mostrarAlertaInformativaAvatar = this.mostrarAlertaInformativaAvatar.bind(this);
    this.mostrarAlertaInformativaAccion = this.mostrarAlertaInformativaAccion.bind(this);
    this.mostrarAlertaDados = this.mostrarAlertaDados.bind(this);
    this.mostrarAlertaChat = this.mostrarAlertaChat.bind(this);
    this.mostrarAlertaFin = this.mostrarAlertaFin.bind(this);
    this.handleChartButton = this.handleChartButton.bind(this);
    this.handleWorldButton = this.handleWorldButton.bind(this);
    this.handleUserButton = this.handleUserButton.bind(this);
    this.handleCardButton = this.handleCardButton.bind(this);
    this.handleFase = this.handleFase.bind(this);
    this.changeMap = this.changeMap.bind(this);
    this.comprobarAcciones = this.comprobarAcciones.bind(this);
    this.comprobarOcupar = this.comprobarOcupar.bind(this);
    this.rellenarTerritorios = this.rellenarTerritorios.bind(this);
    this.habilitarSeleccionar = this.habilitarSeleccionar.bind(this);
    this.deshabilitarSeleccionar = this.deshabilitarSeleccionar.bind(this);
    this.obtenerTerritorio = this.obtenerTerritorio.bind(this);
    this.habilitarCartas = this.habilitarCartas.bind(this);
    this.deshabilitarCartas = this.deshabilitarCartas.bind(this);
    this.actualizarTerritorio = this.actualizarTerritorio.bind(this);
    this.actualizarInfoJugadores = this.actualizarInfoJugadores.bind(this);
    this.actualizarValorTerritorio = this.actualizarValorTerritorio.bind(this);
    this.sumarRestarValorTerritorio = this.sumarRestarValorTerritorio.bind(this);
    this.obtenerNombreFase = this.obtenerNombreFase.bind(this);
    this.jugadorEliminado = this.jugadorEliminado.bind(this);
    this.obtenerEstadoActualPartida = this.obtenerEstadoActualPartida.bind(this);
    this.finalizarPartida = this.finalizarPartida.bind(this);
    this.limpiarIntervalos = this.limpiarIntervalos.bind(this);
  }

  getNombreUsuario(nombre) {
		if (nombre.length > 0) {
    	nombre = nombre.split('=')[1];
    	nombre = nombre.split('|')[0];
		}
    return nombre;
  }

  min(a, b) {
    if (a <= b) {
      return a;
    }
    return b;
  }

  mostrarAlertaInformativaAccion(titulo, texto) {
    const Toast = swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', swal.stopTimer)
        toast.addEventListener('mouseleave', swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'info',
      title: titulo,
      text: texto
    })
  }

  mostrarAlertaInformativaAsincrona(titulo, texto) {
    clearInterval(this.interval);
    swal.fire({
      title: titulo,
      text: texto,
      icon: 'info',
      confirmButtonText: 'OK',
      confirmButtonColor: '#3085d6',
      allowOutsideClick: false
		}).then(() => {
      this.interval = setInterval(() => this.comprobarAcciones(), 500);
    })
  }

  mostrarAlertaRangoAsincrona(titulo, minn, maxx) {
    swal.fire({
      title: titulo,
      icon: 'question',
      input: 'range',
      inputAttributes: {
        min: minn,
        max: maxx,
        step: 1
      },
      inputValue: minn,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.setState({resultadoAlerta: result.value});
      } else {
        this.setState({resultadoAlerta: 0});
      }
    });
  }

  mostrarAlertaInformativaAvatar(titulo, texto, imagen) {
    swal.fire({
      title: titulo,
      text: texto,
      imageUrl: imagen,
      imageWidth: 300,
      imageHeight: 300,
      imageAlt: 'Avatar usuario',
      confirmButtonText: 'OK',
      confirmButtonColor: '#3085d6',
		})
  }

  mostrarAlertaChat() {
    swal.fire({
      title: 'Escribe en el chat',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
        maxlength: 32
      },
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Enviar',
      reverseButtons: true,
      showLoaderOnConfirm: true,
      preConfirm: (chat) => {
        return fetch(Constantes.RUTA_API + `/api/enviarMensaje`, {
          method: 'post',
          credentials: 'include',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body: queryString.stringify({
            mensaje: chat,
			    })
        })
      }
    })
  }

  mostrarAlertaDados(accion) {
    clearInterval(this.interval);

    // Atacante
    for (var i = 0; i < accion.DadosAtacante.length; i++) {
      fetch(Constantes.RUTA_API + `/api/obtenerDados/${accion.JugadorAtacante}/${accion.DadosAtacante[i]}`, {
        method: 'get',
        credentials: 'include'
      })
      .then((response) => {
        if (!response.ok) {
          return response.text().then(text => {throw new Error(text)});
        }
        return response.blob();
      })
      .then((blob) => {
        let objectURL = URL.createObjectURL(blob);
        this.setState({imagenes: this.state.imagenes.concat(objectURL)})
      })
      .catch ((e) => {
        swal.fire({
          title: 'Se ha producido un error al recuperar los dados del atacante',
          text: e,
          icon: 'error',
        });
      })
    }
    
    // Defensor
    for (var j = 0; j < accion.DadosDefensor.length; j++) {
      fetch(Constantes.RUTA_API + `/api/obtenerDados/${accion.JugadorDefensor}/${accion.DadosDefensor[j]}`, {
        method: 'get',
        credentials: 'include'
      })
      .then((response) => {
        if (!response.ok) {
          return response.text().then(text => {throw new Error(text)});
        }
        return response.blob();
      })
      .then((blob) => {
        let objectURL = URL.createObjectURL(blob);
        this.setState({dadosDefensor: this.state.dadosDefensor.concat(objectURL)})
      })
      .catch ((e) => {
        swal.fire({
          title: 'Se ha producido un error al recuperar los dados del defensor',
          text: e,
          icon: 'error',
        });
      })
    } 

    this.setState({accionAtaque: accion})
    this.interval = setInterval(() => {
      if ((this.state.imagenes.length === this.state.accionAtaque.DadosAtacante.length) && 
          (this.state.dadosDefensor.length === this.state.accionAtaque.DadosDefensor.length)) {
        clearInterval(this.interval);
        swal.fire({
          title: 'Los dados decidirán el ataque',
          confirmButtonText: 'Tirar dados',
          allowOutsideClick: false
        })
        .then(() => {
          let htmlText = '<img src=' + this.state.imagenes[0] +  ' height="110" width="110">';
          if (this.state.imagenes.length >= 2) {
            htmlText += '&nbsp; <img src=' + this.state.imagenes[1] +  ' height="110" width="110">';
          }
          if (this.state.imagenes.length >= 3) {
            htmlText += '&nbsp; <img src=' + this.state.imagenes[2] +  ' height="110" width="110">';
          }
          htmlText += ' <br> <br> ' ;
          htmlText += '<img src=' + this.state.dadosDefensor[0] +  ' height="70" width="70">';
          if (this.state.dadosDefensor.length >= 2) {
            htmlText += '&nbsp; <img src=' + this.state.dadosDefensor[1] +  ' height="70" width="70">';
          }
          if (this.state.dadosDefensor.length >= 3) {
            htmlText += '&nbsp; <img src=' + this.state.dadosDefensor[2] +  ' height="70" width="70">';
          }
          
          swal.fire({
            title: "Resultado",
            html: htmlText
          })
          .then(() => {
            this.actualizarInfoJugadores(this.state.accionAtaque.JugadorAtacante, this.state.accionAtaque.TropasPerdidasAtacante, 0, 0, false);
            this.actualizarInfoJugadores(this.state.accionAtaque.JugadorDefensor, this.state.accionAtaque.TropasPerdidasDefensor, 0, 0, false);
            this.sumarRestarValorTerritorio(this.state.accionAtaque.Origen, this.state.accionAtaque.TropasPerdidasAtacante, false);
            this.sumarRestarValorTerritorio(this.state.accionAtaque.Destino, this.state.accionAtaque.TropasPerdidasDefensor, false);
            this.comprobarOcupar(this.state.accionAtaque);
            this.setState({imagenes: []});
            this.setState({dadosDefensor: []});
            this.setState({accionAtaque: null});
          })
        })
      }
    }, 300)
  }

  mostrarAlertaFin(titulo, texto) {
    swal.fire({
      title: titulo,
      text: texto,
      icon: 'warning',
    });
  }

  /* En caso de pulsar el botón "bar_char_but" y !enableButton se mostrarán el resto de botones. 
     Por otro lado, en caso de pulsar el botón "bar_char_but" y !enableButton desapareceran 
     el resto de botones. */
  handleChartButton(event) {
		event.preventDefault();

    if (event.target.id === 'bar_char_but') {
      if (this.state.enableButton) {
        document.getElementById('hidden_buttons').style.visibility = 'hidden';
        this.setState({enableButton: false});
      }
      else {
        document.getElementById('hidden_buttons').style.visibility = 'visible';
        this.setState({enableButton: true});
      }
    }
	};

  /* Muestra el mapa de la partida normal, indicando el número de tropas de cada casilla
     y mostrando el dueño de cada territorio */
  handleWorldButton() {
    this.setState({enableMapInfo: true});
  };

  /* Muestra el mapa con la información de las regiones del mapa, indicando el número de 
     tropas extras recibidas por controlar al completo una región */
  handleUserButton() {
    this.setState({enableMapInfo: false});
    this.setState({volviendoMapaPartida: true});
  };

  handleCardButton() {
    if (this.state.habilitarCartas) {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        clearInterval(this.interval);
        this.setState({irCartas: true});
      }, 150);
    }
  };

  handleFase() {
    fetch(Constantes.RUTA_API + '/api/pasarDeFase', {
      method: 'post',
      credentials: 'include'
    })
    .then((response) => {
      if (!response.ok) {
        return response.text().then(text => {throw new Error(text)});
      }
    })
    .catch ((e) => {
      swal.fire({
        title: 'Se ha producido un error al cambiar de fase',
        text: e,
        icon: 'error',
      });
    })
  }

  habilitarSeleccionar() {
    this.setState({habilitarSeleccionar: true});
    this.setState({territorioSeleccionado: ""});
  }

  deshabilitarSeleccionar() {
    this.setState({habilitarSeleccionar: false});
  }

  actualizarTerritorio(id, numero, jugador) {
    var indexJugador = this.state.nombreJugadores.indexOf(jugador);

    document.getElementById("t" + territorios[id]).textContent=numero;
    document.getElementById(territorios[id]).style.fill = this.state.coloresJugadores[indexJugador];
    document.getElementById(circulosTerritorios[id]).style.fill = this.state.coloresCirculos[indexJugador];
  }

  actualizarValorTerritorio(id, numero) {
    document.getElementById("t" + territorios[id]).textContent=numero;
  }

  sumarRestarValorTerritorio(id, numero, sumar = true) {
    var tropas = parseInt(document.getElementById("t" + territorios[id]).textContent);
    if (sumar) {
      tropas += numero;
    } else {
      tropas -= numero;
    }
    document.getElementById("t" + territorios[id]).textContent = tropas;
  }

  limpiarInfoJugadores() {
    this.setState({tropasJugadores: [0,0,0,0,0,0]});
    this.setState({regionesJugadores: [0,0,0,0,0,0]});
    this.setState({cartasJugadores: [0,0,0,0,0,0]});
  }

  actualizarInfoJugadores(jugador, numTropas = 0, numTerritorios = 0, numCartas = 0, sumar = true) {
    var indexJugador = this.state.nombreJugadores.indexOf(jugador);
    /* Actualizar valor tropas */
    const tJ = this.state.tropasJugadores;
    if (sumar) {
      tJ[indexJugador] = tJ[indexJugador] + parseInt(numTropas);
    }  else {
      tJ[indexJugador] = tJ[indexJugador] - parseInt(numTropas);
    }
    this.setState({tropasJugadores: tJ});
    
    /* Actualizar valor territorios */
    const tT = this.state.regionesJugadores;
    if (sumar) {
      tT[indexJugador] = tT[indexJugador] + parseInt(numTerritorios);
    } else {
      tT[indexJugador] = tT[indexJugador] - parseInt(numTerritorios);
    }
    this.setState({regionesJugadores: tT});

    /* Actualizar valor cartas */
    const tC = this.state.cartasJugadores;
    if (sumar) {
      tC[indexJugador] = tC[indexJugador] + parseInt(numCartas);
    } else {
      tC[indexJugador] = tC[indexJugador] - parseInt(numCartas);
    }
    this.setState({cartasJugadores: tC});
  }

  comprobarTerritorio(idTerritorio) {
    var colorTerritorio = document.getElementById(territorios[idTerritorio]).style.fill;
    var indexJugador = this.state.nombreJugadores.indexOf(this.state.nombrePropioJugador);
    if (this.state.coloresJugadores[indexJugador] === colorTerritorio) {
      return true;
    } else {
      return false;
    }
  }

  comprobarOcupar(accion) {
    var numTropasDefensor = parseInt(document.getElementById("t" + territorios[accion.Destino]).textContent);
    if (numTropasDefensor <= 0) {
      clearInterval(this.interval);
      var numTropasAtacante = parseInt(document.getElementById("t" + territorios[accion.Origen]).textContent);
      numTropasAtacante -= accion.TropasPerdidasAtacante;
      this.mostrarAlertaRangoAsincrona("Número de tropas a desplazar", accion.DadosAtacante.length - accion.TropasPerdidasAtacante, numTropasAtacante - 1);
      this.interval = setInterval(() => {
        if (this.state.resultadoAlerta > 0) {
          fetch(Constantes.RUTA_API + `/api/ocupar/${accion.Destino}/${this.state.resultadoAlerta}`, {
            method: 'post',
            credentials: 'include'
          })
          .then((response) => {
            if (!response.ok) {
              return response.text().then(text => {throw new Error(text)});
            }
          })
          .then(() => {
            this.actualizarTerritorio(accion.Destino, this.state.resultadoAlerta, accion.JugadorAtacante);
            this.sumarRestarValorTerritorio(accion.Origen, this.state.resultadoAlerta, false);
            this.actualizarInfoJugadores(accion.JugadorAtacante, 0, 1, 0);
            this.actualizarInfoJugadores(accion.JugadorDefensor, 0, 1, 0, false);

            this.setState({resultadoAlerta: null});
            clearInterval(this.interval);
            this.interval = setInterval(() => this.comprobarAcciones(), 500);
          })
          .catch ((e) => {
            swal.fire({
              title: 'Se ha producido un error al ocupar el territorio',
              text: e,
              icon: 'error',
            });
            this.setState({resultadoAlerta: null});
            this.mostrarAlertaRangoAsincrona("Número de tropas a desplazar", accion.DadosAtacante.length - accion.TropasPerdidasAtacante, numTropasAtacante - 1);
          })
        } else if (this.state.resultadoAlerta === 0) {
          this.setState({resultadoAlerta: null});
          this.mostrarAlertaRangoAsincrona("Número de tropas a desplazar", accion.DadosAtacante.length - accion.TropasPerdidasAtacante, numTropasAtacante - 1);
        }
      }, 500);
    } else {
      this.interval = setInterval(() => this.comprobarAcciones(), 500);
    }
  }

  obtenerTerritorio(pais) {
    var idTerritorio = territorios.indexOf(pais);
    if (this.state.habilitarSeleccionar && (this.comprobarTerritorio(idTerritorio) ||  (this.state.fase === 2))) {
      clearInterval(this.interval);
      
      switch (this.state.fase) {
        // ----------------------------------------------------------------------------------
        case 0:   // Fase refuerzo especial
        case 1:   // Fase refuerzo normal
          this.mostrarAlertaRangoAsincrona("Número de tropas a reforzar", 0, this.state.numTropasReforzar);
          this.interval = setInterval(() => {
            if (this.state.resultadoAlerta > 0) {
              fetch(Constantes.RUTA_API + `/api/reforzarTerritorio/${idTerritorio}/${this.state.resultadoAlerta}`, {
                method: 'post',
                credentials: 'include'
              })
              .then((response) => {
                if (!response.ok) {
                  return response.text().then(text => {throw new Error(text)});
                }
              })
              .then(() => {
                var num = parseInt(document.getElementById("t" + territorios[idTerritorio]).textContent);
                this.actualizarValorTerritorio(idTerritorio, num + parseInt(this.state.resultadoAlerta));
                this.actualizarInfoJugadores(this.state.nombrePropioJugador, this.state.resultadoAlerta);

                this.setState({numTropasReforzar: this.state.numTropasReforzar - this.state.resultadoAlerta});
                this.setState({resultadoAlerta: null});
                clearInterval(this.interval);
                this.interval = setInterval(() => this.comprobarAcciones(), 500);
              })
              .catch ((e) => {
                swal.fire({
                  title: 'Se ha producido un error al reforzar el territorio',
                  text: e,
                  icon: 'error',
                });
                this.setState({resultadoAlerta: null});
                clearInterval(this.interval);
                this.interval = setInterval(() => this.comprobarAcciones(), 500);
              })
            } else if (this.state.resultadoAlerta === 0) {
              this.setState({resultadoAlerta: null});
              clearInterval(this.interval);
              this.interval = setInterval(() => this.comprobarAcciones(), 500);
            }
          }, 500);
          break;

        // Fase de ataque----------------------------------------------------------------------------
        case 2: 
          if (this.state.territorioOrigenAtaque === null) {
            let tropasAtacar = parseInt(document.getElementById("t" + territorios[idTerritorio]).textContent); 
            if (tropasAtacar > 1) {
              this.setState({territorioOrigenAtaque: idTerritorio});
            } else {
              this.mostrarAlertaInformativaAsincrona("No se puede realizar el ataque", 
              "El territorio origen debe contener un mínimo de 2 tropas.");
            }
          } else if (this.state.territorioOrigenAtaque === idTerritorio) {
            this.mostrarAlertaInformativaAsincrona("Seleccione otro territorio destino", 
              "Los territorios origen y destino a atacar no pueden ser los mismos");
          } else {
            var tropasAtacar = parseInt(document.getElementById("t" + territorios[this.state.territorioOrigenAtaque]).textContent); 
            this.mostrarAlertaRangoAsincrona("Número de dados ataque", 1, this.min(tropasAtacar - 1, 3));
            this.interval = setInterval(() => {
              if (this.state.resultadoAlerta > 0) {
                fetch(Constantes.RUTA_API + `/api/atacar/${this.state.territorioOrigenAtaque}/${idTerritorio}/${this.state.resultadoAlerta}`, {
                method: 'post',
                credentials: 'include'
                })
                .then((response) => {
                  if (!response.ok) {
                    return response.text().then(text => {throw new Error(text)});
                  }
                })
                .then(() => {
                  this.setState({territorioOrigenAtaque: null});
                  this.setState({resultadoAlerta: null});
                  clearInterval(this.interval);
                  this.interval = setInterval(() => this.comprobarAcciones(), 500);
                })
                .catch ((e) => {
                  swal.fire({
                    title: 'Se ha producido un error al atacar el territorio',
                    text: e,
                    icon: 'error',
                  });
                  this.setState({territorioOrigenAtaque: null});
                  this.setState({resultadoAlerta: null});
                  clearInterval(this.interval);
                  this.interval = setInterval(() => this.comprobarAcciones(), 500);
                })
              } else if (this.state.resultadoAlerta === 0) {
                this.setState({territorioOrigenAtaque: null});
                this.setState({resultadoAlerta: null});
                clearInterval(this.interval);
                this.interval = setInterval(() => this.comprobarAcciones(), 500);
              }
            }, 500);
          }
          break;
        
        // Fase de fortificación----------------------------------------------------------------------------
        case 3: 
          if (this.state.territorioOrigenFortificar === null) {
            this.setState({territorioOrigenFortificar: idTerritorio});
          } else if (this.state.territorioOrigenFortificar === idTerritorio) {
            this.mostrarAlertaInformativaAsincrona("Seleccione otro territorio destino", 
              "Los territorios origen y destino a fortificar no pueden ser los mismos");
          } else {
            var tropasFortificar = parseInt(document.getElementById("t" + territorios[this.state.territorioOrigenFortificar]).textContent); 
            this.mostrarAlertaRangoAsincrona("Número de tropas a fortificar", 0, tropasFortificar - 1);
            this.interval = setInterval(() => {
              if (this.state.resultadoAlerta > 0) {
                fetch(Constantes.RUTA_API + "/api/fortificar/" + this.state.territorioOrigenFortificar + "/" + idTerritorio + "/" + this.state.resultadoAlerta, {
                method: 'post',
                credentials: 'include'
                })
                .then((response) => {
                  if (!response.ok) {
                    return response.text().then(text => {throw new Error(text)});
                  }
                })
                .then(() => {
                  var tropasOr = parseInt(document.getElementById("t" + territorios[this.state.territorioOrigenFortificar]).textContent);
                  var tropasDes = parseInt(document.getElementById("t" + territorios[idTerritorio]).textContent); 
                  this.actualizarValorTerritorio(this.state.territorioOrigenFortificar, tropasOr - this.state.resultadoAlerta);
                  this.actualizarValorTerritorio(idTerritorio, tropasDes + parseInt(this.state.resultadoAlerta));

                  this.setState({territorioOrigenFortificar: null});
                  this.setState({resultadoAlerta: null});
                  this.deshabilitarSeleccionar();
                  clearInterval(this.interval);
                  this.interval = setInterval(() => this.comprobarAcciones(), 500);
                })
                .catch ((e) => {
                  swal.fire({
                    title: 'Se ha producido un error al fortificar el territorio',
                    text: e,
                    icon: 'error',
                  });
                  this.setState({territorioOrigenFortificar: null});
                  this.setState({resultadoAlerta: null});
                  clearInterval(this.interval);
                  this.interval = setInterval(() => this.comprobarAcciones(), 500);
                })
              } else if (this.state.resultadoAlerta === 0) {
                this.setState({territorioOrigenFortificar: null});
                this.setState({resultadoAlerta: null});
                clearInterval(this.interval);
                this.interval = setInterval(() => this.comprobarAcciones(), 500);
              }
            }, 500);
          }
          break;

        default: 
          break;
      }
    }  
  }

  habilitarCartas() {
    this.setState({habilitarCartas: true});
  }

  deshabilitarCartas() {
    this.setState({habilitarCartas: false});
  }

  jugadorEliminado(jugador) {
    var indexJugador = this.state.nombreJugadores.indexOf(jugador);
    const vCC = this.state.coloresInfo;
    vCC[indexJugador] = "#F8DDD7";
    this.setState({coloresInfo: vCC}); 
  }

  changeMap() {
    if (this.state.enableMapInfo) {
      return <MapaInfo />;
    }
    return <MapaPartida onClick={(pais) => this.obtenerTerritorio(pais)}/>;
  }

  obtenerNombreJugadores() {
    fetch(Constantes.RUTA_API + '/api/obtenerJugadoresPartida', {
      method: 'get',
      credentials: 'include'
    })
    .then((response) => {
      if (!response.ok) {
        return response.text().then(text => {throw new Error(text)});
      }
      return response.json();
    })
    .then((response) => {
      var jugadores = [];

      this.setState({numJugadores: Object.keys(response).length});
      for (var i = 0; i < Object.keys(response).length; i++) {
        jugadores.push(response[i]);
      }
      this.setState({nombreJugadores: jugadores});
    })
    .catch ((e) => {
      swal.fire({
        title: 'Se ha producido un error al obtener los jugadores de la partida',
        text: e,
        icon: 'error',
      });
    })
  }

  rellenarTerritorios() {
    if (this.state.indexAccionesIniciales === 42) {
      clearInterval(this.interval);
      this.interval = setInterval(() => this.comprobarAcciones(), 500);
    } 
    else {
      const index = this.state.nombreJugadores.indexOf(
        this.state.accionesIniciales[this.state.indexAccionesIniciales].Jugador);

      document.getElementById(territorios[this.state.indexAccionesIniciales]).style.fill = 
      this.state.coloresJugadores[index];

      document.getElementById(circulosTerritorios[this.state.indexAccionesIniciales]).style.fill = 
      this.state.coloresCirculos[index];

      document.getElementById("t" + territorios[this.state.indexAccionesIniciales]).textContent="1";

      const tropasArr = this.state.tropasJugadores;
      tropasArr[index]++;
      this.setState({tropasJugadores: tropasArr});

      const regionesArr = this.state.regionesJugadores;
      regionesArr[index]++;
      this.setState({regionesJugadores: regionesArr});

      this.setState({indexAccionesIniciales: this.state.indexAccionesIniciales + 1});
    }
  }

  resolverOcupacion(origen, destino) {
    clearInterval(this.interval);
    var numTropasAtacante = parseInt(document.getElementById("t" + territorios[origen]).textContent);
    this.mostrarAlertaRangoAsincrona("Número de tropas a desplazar", 1, numTropasAtacante - 1);
    this.interval = setInterval(() => {
      if (this.state.resultadoAlerta > 0) {
        fetch(Constantes.RUTA_API + `/api/ocupar/${destino}/${this.state.resultadoAlerta}`, {
          method: 'post',
          credentials: 'include'
        })
        .then((response) => {
          if (!response.ok) {
            return response.text().then(text => {throw new Error(text)});
          }
        })
        .then(() => {
          this.actualizarTerritorio(destino, this.state.resultadoAlerta, this.state.nombrePropioJugador);
          this.sumarRestarValorTerritorio(origen, this.state.resultadoAlerta, false);
          this.actualizarInfoJugadores(this.state.nombrePropioJugador, 0, 1, 0);

          this.setState({resultadoAlerta: null});
          clearInterval(this.interval);
          this.interval = setInterval(() => this.comprobarAcciones(), 500);
        })
        .catch ((e) => {
          swal.fire({
            title: 'Se ha producido un error al ocupar el territorio',
            text: e,
            icon: 'error',
          });
          this.setState({resultadoAlerta: null});
          this.mostrarAlertaRangoAsincrona("Número de tropas a desplazar", 1, numTropasAtacante - 1);
        })
      } else if (this.state.resultadoAlerta === 0) {
        this.setState({resultadoAlerta: null});
        this.mostrarAlertaRangoAsincrona("Número de tropas a desplazar", 1, numTropasAtacante - 1);
      }
    }, 500);
  }

  obtenerEstadoActualPartida() {
    fetch(Constantes.RUTA_API + '/api/resumirPartida', {
      method: 'get',
      credentials: 'include'
    })
    .then((response) => {
      if (!response.ok) {
        return response.text().then(text => {throw new Error(text)});
      }
      return response.json();
    })
    .then((response) => {
      clearInterval(this.interval);
      if (response.Terminada) {
        this.mostrarAlertaFin("Fin de la partida", 
          "La partida en la que te encontrabas ha terminado.");
        this.finalizarPartida();
      } else {
        if (response.TurnoJugador === this.state.nombrePropioJugador) {
          this.habilitarSeleccionar();
          if (response.Fase === 1) {
            this.habilitarCartas();
          }
        }
        this.setState({turno: response.TurnoJugador});
        this.setState({fase: response.Fase});

        // Tropas y cartas
        for (var i = 0; i < Object.keys(response.EstadosJugadores).length; i++) {
          var jugador = this.state.nombreJugadores[i];
          var estadoJugador = response.EstadosJugadores[jugador];
          
          if (jugador === this.state.nombrePropioJugador) {
            this.setState({numTropasReforzar: estadoJugador.Tropas});
          } 
          this.actualizarInfoJugadores(jugador, 0, 0, estadoJugador.NumCartas);
          
          if (estadoJugador.Expulsado || estadoJugador.Eliminado) {
            this.jugadorEliminado(jugador);
          }
        }

        // Territorios
        for (var j = 0; j < Object.keys(response.Mapa).length; j++) {
          this.actualizarInfoJugadores(response.Mapa[j].Ocupante, response.Mapa[j].NumTropas, 1);
          this.actualizarTerritorio(j, response.Mapa[j].NumTropas, response.Mapa[j].Ocupante);
        }

        // Ocupación pendiente
        if (response.OcupacionPendiente && (response.TurnoJugador === this.state.nombrePropioJugador)) {
          this.resolverOcupacion(response.TerritorioOcupacionOrigen, response.TerritorioOcupacionDestino);
        } else {
          this.interval = setInterval(() => this.comprobarAcciones(), 500);
        }
      }
    })
    .catch ((e) => {
      swal.fire({
        title: 'Se ha producido un error al obtener la información sobre la partida',
        text: e,
        icon: 'error',
      });
    })
  }

  finalizarPartida() {
    this.interval = setInterval(() => {
      clearInterval(this.interval);
      this.setState({finPartida: true});
    }, 150);
  }

  comprobarAcciones() {
    fetch(Constantes.RUTA_API + '/api/obtenerEstadoPartida', {
      method: 'get',
      credentials: 'include'
    })
    .then((response) => {
      if (!response.ok) {
        return response.text().then(text => {throw new Error(text)});
      }
      return response.json();
    })
    .then((response) => {
      var fin = false;
      var acciones = this.state.accionesRestantes.concat(response);
      for (var i = this.state.indiceAccionesRestantes; i < Object.keys(acciones).length && !fin; i++) {
        var accion = acciones[i];

        switch (accion.IDAccion) {
          // IDAccionRecibirRegion----------------------------------------------------------------------------
          case 0: 
            const jAux = this.state.accionesIniciales;
            jAux.push(accion);
            this.setState({accionesIniciales: jAux});

            if (accion.Jugador === this.state.nombrePropioJugador) {
              this.setState({numTropasReforzar: accion.TropasRestantes});
            }
            
            if (accion.Region === 41) {
              clearInterval(this.interval);
              this.interval = setInterval(() => this.rellenarTerritorios(), 80);
              this.setState({accionesRestantes: response});
              this.setState({indiceAccionesRestantes: ++i});
              fin = true;
            }
            break;
          
          // IDAccionCambioFase----------------------------------------------------------------------------
          case 1: 
            clearInterval(this.interval);
            this.setState({accionesRestantes: []});
            this.setState({indiceAccionesRestantes: 0});
            this.setState({fase: accion.Fase});
            
            if ((accion.Fase === 0) && (accion.Jugador === this.state.nombrePropioJugador)) {
              this.habilitarSeleccionar();
            }
            // Fase de refuerzo
            else if ((accion.Fase === 1) && (accion.Jugador === this.state.nombrePropioJugador)) {
              this.habilitarSeleccionar();
              this.habilitarCartas();
            } // Fase de ataque
            else if ((accion.Fase === 2) && (accion.Jugador === this.state.nombrePropioJugador)) {
              this.deshabilitarCartas();
              if (this.state.nombrePropioJugador === accion.Jugador) {
                this.mostrarAlertaInformativaAsincrona("Fase de ataque", 
                  "Selecciona un territorio desde el que lanzar un ataque.");
              }
              else {
                this.mostrarAlertaInformativaAsincrona("Fase de ataque", "Turno de " + accion.Jugador);
              }
            } // Fase de fortificar
            else if ((accion.Fase === 3) && (accion.Jugador === this.state.nombrePropioJugador)) {
              this.deshabilitarCartas();
              if (this.state.nombrePropioJugador === accion.Jugador) {
                this.mostrarAlertaInformativaAsincrona("Fase de fortificación", 
                  "Selecciona el territorio origen de la fortificaión.");
              }
              else {
                this.mostrarAlertaInformativaAsincrona("Fase de fortificación", "Turno de " + accion.Jugador);
              }
            } // No es tu turno
            else {
              this.deshabilitarSeleccionar();
              this.deshabilitarCartas();
            }
            this.interval = setInterval(() => this.comprobarAcciones(), 500);
            break;
          
          // IDAccionInicioTurno----------------------------------------------------------------------------
          case 2:
            this.setState({turno: accion.Jugador});

            fetch(Constantes.RUTA_API + `/api/obtenerFotoPerfil/${accion.Jugador}`, {
              method: 'get',
              credentials: 'include'
            })
            .then((response) => {
              if (!response.ok) {
                return response.text().then(text => {throw new Error(text)});
              }
              return response.blob();
            })
            .then((blob) => { 
              let objectURL = URL.createObjectURL(blob);
 
              if (this.state.nombrePropioJugador === accion.Jugador) {
                if (accion.TropasObtenidas !== 0) {
                  this.setState({numTropasReforzar: accion.TropasObtenidas});
                }
                this.mostrarAlertaInformativaAvatar("Tu turno: Fase de refuerzo", "Has obtenido " + 
                accion.TropasObtenidas + " tropas debido a que controlas " + accion.RazonNumeroTerritorios + 
                " territorios y " + accion.RazonContinentesOcupados + " continentes.", objectURL);
              }
              else {
                this.mostrarAlertaInformativaAvatar("Fase de refuerzo", "Turno de " + accion.Jugador, objectURL);
              }
            })
            .catch ((e) => {
              swal.fire({
                title: 'Se ha producido un error al obtener el avatar del usuario',
                text: e,
                icon: 'error',
              });
            })
            break;
          
          // IDAccionCambioCartas----------------------------------------------------------------------------
          case 3: 
            this.actualizarInfoJugadores(accion.Jugador, 0, 0, 3, false);
            if (accion.Jugador === this.state.nombrePropioJugador) {
              this.setState({numTropasReforzar: this.state.numTropasReforzar + accion.NumTropasObtenidas});
              swal.fire({
                title: 'Cambio de cartas',
                text: 'Has obtenido ' + accion.NumTropasObtenidas + ' tropas.',
                icon: 'info',
              });
            } else {
              swal.fire({
                title: 'Cambio de cartas',
                text: 'El jugador ' + accion.Jugador + " ha recibido " + accion.NumTropasObtenidas + ' tropas.',
                icon: 'info',
              });
            }
            break;
          
          // IDAccionReforzar----------------------------------------------------------------------------
          case 4: 
            if (accion.Jugador !== this.state.nombrePropioJugador) {
              var num = parseInt(document.getElementById("t" + territorios[accion.TerritorioReforzado]).textContent);
              this.actualizarValorTerritorio(accion.TerritorioReforzado, num + accion.TropasRefuerzo);
              this.actualizarInfoJugadores(accion.Jugador, accion.TropasRefuerzo);
              this.mostrarAlertaInformativaAccion("Región reforzada", "El jugador " + accion.Jugador + 
              " ha reforzado " + territorios[accion.TerritorioReforzado] + " con " + accion.TropasRefuerzo + " tropas.");
            }
            break;
          
          // IDAccionAtaque----------------------------------------------------------------------------
          case 5: {
            if (accion.JugadorAtacante === this.state.nombrePropioJugador) {
              this.mostrarAlertaDados(accion);
            }
            else {
              this.actualizarInfoJugadores(accion.JugadorAtacante, accion.TropasPerdidasAtacante, 0, 0, false);
              this.actualizarInfoJugadores(accion.JugadorDefensor, accion.TropasPerdidasDefensor, 0, 0, false);
              this.sumarRestarValorTerritorio(accion.Origen, accion.TropasPerdidasAtacante, false);
              this.sumarRestarValorTerritorio(accion.Destino, accion.TropasPerdidasDefensor, false);
              this.mostrarAlertaInformativaAccion("Ataque realizado", "El jugador " + accion.JugadorAtacante + 
                " ha perdido " + accion.TropasPerdidasAtacante + " tropas en " + territorios[accion.Origen] + " atacando " + territorios[accion.Destino] +
                " de " + accion.JugadorDefensor + ", que ha perdido " + accion.TropasPerdidasDefensor + " tropas");
            }
           break;
          }

          // IDAccionOcupar----------------------------------------------------------------------------
          case 6: {
            if (accion.JugadorOcupante !== this.state.nombrePropioJugador) {
              this.actualizarValorTerritorio(accion.Origen, accion.TropasOrigen);
              this.actualizarTerritorio(accion.Destino, accion.TropasDestino, accion.JugadorOcupante);
              this.actualizarInfoJugadores(accion.JugadorOcupante, 0, 1, 0);
              this.actualizarInfoJugadores(accion.JugadorOcupado, 0, 1, 0, false);
              this.mostrarAlertaInformativaAccion("Región ocupada", "El jugador " + accion.JugadorOcupante + 
                " ha ocupado " + territorios[accion.Destino] + " desde " + territorios[accion.Origen] + ", del jugador " + accion.JugadorOcupado);
            }
            break;
          }

          // IDAccionFortificar----------------------------------------------------------------------------
          case 7: {
            if (accion.Jugador !== this.state.nombrePropioJugador) {
              this.actualizarValorTerritorio(accion.Origen, accion.TropasOrigen);
              this.actualizarValorTerritorio(accion.Destino, accion.TropasDestino);
              this.mostrarAlertaInformativaAccion("Región fortificada", "El jugador " + accion.Jugador + 
              " ha fortificado " + territorios[accion.Destino] + ", sumando un total de " + accion.TropasDestino + " tropas");
            }
            break;
          }

          // IDAccionObtenerCarta----------------------------------------------------------------------------
          case 8: {
            this.actualizarInfoJugadores(accion.Jugador, 0, 0, 1);
            break;
          }

          // IDAccionJugadorEliminado----------------------------------------------------------------------------
          case 9: { 
            if (accion.JugadorEliminado === this.state.nombrePropioJugador) {
              clearInterval(this.interval);
              this.mostrarAlertaFin("Fin de la partida", 
                "El jugador " + accion.JugadorEliminador + " te ha eliminado.");
              this.finalizarPartida();
            } else if (accion.JugadorEliminador === this.state.nombrePropioJugador) {
              this.mostrarAlertaFin("Has eliminado a un jugador", 
                "Has obtenido " + accion.CartasRecibidas + " cartas de " + accion.JugadorEliminado + ".");
            } else {
              this.mostrarAlertaFin("Jugador eliminado", 
                "El jugador " + accion.JugadorEliminador + " ha eliminado a " + accion.JugadorEliminado + ".");
            }
            this.actualizarInfoJugadores(accion.JugadorEliminado, 0, 0, accion.CartasRecibidas, false);
            this.actualizarInfoJugadores(accion.JugadorEliminador, 0, 0, accion.CartasRecibidas);
            this.jugadorEliminado(accion.JugadorEliminado);
            break;
          }

          // IDAccionJugadorExpulsado----------------------------------------------------------------------------
          case 10: { 
            if (accion.JugadorEliminado === this.state.nombrePropioJugador) {
              clearInterval(this.interval);
              this.mostrarAlertaFin("Fin de la partida", 
                "Has sido expulsado.");
              this.finalizarPartida();
            } else {
              this.mostrarAlertaFin("Jugador eliminado", 
                "El jugador " + accion.JugadorEliminado + " ha sido desconectado de la partida.");
            }
            this.jugadorEliminado(accion.JugadorEliminado);
            break;
          }

          // IDAccionPartidaFinalizada----------------------------------------------------------------------------
          case 11: {
            clearInterval(this.interval);
            if (accion.JugadorGanador === this.state.nombrePropioJugador) {
              console.log("Hola")
              swal.fire({
                title: "Fin de la partida",
                text: "Enhorabuena. Has ganado al resto de jugadores.",
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#3085d6',
              });
            } else {
              this.mostrarAlertaFin("Fin de la partida", 
                "El jugador " + accion.JugadorGanador + " es el ganador.");
            }
            this.finalizarPartida();
            break;
          }

          // IDAccionPartidaFinalizada----------------------------------------------------------------------------
          case 12: {
            this.setState({jugadorChat: accion.JugadorEmisor});
            this.setState({mensajeChat: accion.Mensaje});
            break;
          }

          default:
            break;
        }
      }
    })
    .catch ((e) => {
      // Error
    })
  }

  obtenerNombreFase() {
    switch(this.state.fase) {
      case 0:
      case 1:
        return("Refuerzo");
      case 2:
        return("Ataque");
      case 3:
        return("Fortificación");
      default: 
        break;
    }
  }

  limpiarIntervalos() {
    // Get a reference to the last interval + 1
    const interval_id = window.setInterval(function(){}, Number.MAX_SAFE_INTEGER);

    // Clear any timeout/interval up to that id
    for (let i = 1; i < interval_id; i++) {
      window.clearInterval(i);
    }
  }

  componentDidMount() {
    this.limpiarIntervalos();
    this.obtenerNombreJugadores();
    if (this.state.obtenerInfoPartida) {
      localStorage.removeItem("volver_partida");
      this.interval = setInterval(() => this.obtenerEstadoActualPartida(), 700);
    } else {
      this.interval = setInterval(() => this.comprobarAcciones(), 500);
    }
  }

  componentWillUnmount() {
    this.limpiarIntervalos();
  }

  componentDidUnmount() {
    this.limpiarIntervalos();
  }

  render() {
    document.body.style.backgroundColor = "rgb(50,173,230)";

    if (this.state.finPartida) {
      clearInterval(this.interval);
      return <Navigate to='/inicio'/>;
    }

    if (this.state.irCartas) {
      clearInterval(this.interval);
      return <Navigate to='/cartas'/>;
    }

    if (this.state.volviendoMapaPartida) {
      this.limpiarInfoJugadores();
      this.obtenerEstadoActualPartida();
      this.setState({volviendoMapaPartida: false});
    }

    var jugadores = [];
    for (var i = 0; i < this.state.numJugadores; i++) {
      jugadores.push(<InfoJugador  
        id={"jugador-" + i}
        usuario={this.state.nombreJugadores[i]}
        numTropas={this.state.tropasJugadores[i]}
        numTerritorios={this.state.regionesJugadores[i]}
        numCartas={this.state.cartasJugadores[i]}
        color={this.state.coloresInfo[i]}/>);
    }

    return (
      <div className='cen'>
        <BarraSuperiorJuego></BarraSuperiorJuego>
        
        <this.changeMap></this.changeMap>
      
        {/* Información de las tropas, territorios y cartas de los jugadores */}
        <div className="containerJugadores">
          {jugadores}
        </div>

        {/* Container en el que se encuentran todos los botones del mapa */}
        <div className='containerBotones'>
          {/* Botones desplegables: botón info regiones y botón mapa usuario */}
          <div className="botonClick" id="hidden_buttons">
            <div className="boton">
              <input type="image" id="user_but" onClick={this.handleUserButton} src={User} alt='user' height="70" width="70" />
            </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="boton">
             <input type="image" id="world_but" onClick={this.handleWorldButton} src={World} alt='world' height="70" width="70"/>
            </div>
          </div>

          {/* Botones principales: botón desplegable mapas y botón cartas usuario */}
          <div className="botonesPrincipales">          
            <div className="boton">
              <input type="image" id="bar_char_but" onClick={this.handleChartButton} src={BarChart} alt='bar-chart' height="70" width="70" />
            </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="boton">
              <input type="image" id="cards_but" onClick={this.handleCardButton} src={Cards} alt='cards' height="70" width="70"/>
            </div>
            <div className="botonFase">
              <input type="image" id="fase_but" onClick={this.handleFase} src={Fase} alt='cambioFase' height="70" width="70"/>
            </div>
            <div className="botonInfo">
              <text className="textoInfo"> Fase: {this.obtenerNombreFase()}</text> <br></br>
              <text className="textoInfo"> Turno: {this.state.turno}</text> <br></br>
              <text className="textoInfo"> Refuerzos: {this.state.numTropasReforzar}</text>
            </div>
            <div className="botonFase">
              <input type="image" id="chat_but" onClick={this.mostrarAlertaChat} src={Chat} alt='chat' height="70" width="70"/>
            </div>
            <div className="botonChat">
              {(this.state.jugadorChat === "" && this.state.mensajeChat === "") && 
                <text className="textoChat"> Chat vacío</text>}
              {(this.state.jugadorChat !== "" && this.state.mensajeChat !== "") && 
                <text className="textoChat"> {this.state.jugadorChat}: {this.state.mensajeChat}</text>}
            </div>
          </div>
        </div>
      </div>
    );  
  }
}
