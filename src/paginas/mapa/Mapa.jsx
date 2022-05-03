import React from 'react';
import swal from 'sweetalert2';
import InfoJugador from "../../componentes/infoJugador/InfoJugador";
import MapaPartida from "../../componentes/mapaPartida/MapaPartida";
import MapaInfo from "../../componentes/mapaInfo/MapaInfo";
import BarraSuperiorJuego from '../../componentes/barraSuperiorJuego/BarraSuperiorJuego'
//import FuncionesAuxiliares from '../../paginas/mapa/auxiliaresMapa'
import BarChart from "../../imagenes/bar-chart.png";
import Cards from "../../imagenes/cards.png";
import User from "../../imagenes/user.png";
import World from "../../imagenes/world.png";
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
      nombreJugadores: [],
      tropasJugadores: [0,0,0,0,0,0],
      regionesJugadores: [0,0,0,0,0,0],
      cartasJugadores: [0,0,0,0,0,0],
      numJugadores: 0,
      enableButton: false,
      enableMapInfo: false,
      coloresJugadores: ['red', 'purple','green', 'blue', 'orange', 'yellow'],
      coloresCirculos: ['red', 'purple','green', 'blue', 'orange', 'yellow'],
      accionesIniciales: [],
      indexAccionesIniciales: 0,

      territorioSeleccionado: "",
      habilitarSeleccionar: true,
      mapa: React.createRef()
    };

    this.handleChartButton = this.handleChartButton.bind(this);
    this.handleWorldButton = this.handleWorldButton.bind(this);
    this.handleUserButton = this.handleUserButton.bind(this);
    this.handleCardButton = this.handleCardButton.bind(this);
    this.changeMap = this.changeMap.bind(this);
    this.comprobarAcciones = this.comprobarAcciones.bind(this);
    this.rellenarTerritorios = this.rellenarTerritorios.bind(this);
    this.habilitarSeleccionar = this.habilitarSeleccionar.bind(this);
    this.deshabilitarSeleccionar = this.deshabilitarSeleccionar.bind(this);
    this.obtenerTerritorio = this.obtenerTerritorio.bind(this);
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
  handleWorldButton(event) {
    event.preventDefault();
    this.setState({enableMapInfo: true});
  };

  /* Muestra el mapa con la información de las regiones del mapa, indicando el número de 
     tropas extras recibidas por controlar al completo una región */
  handleUserButton(event) {
    event.preventDefault();
    this.setState({enableMapInfo: false});
  };

  handleCardButton() {
    //document.style.background-blend-mode = "darken";
  };

  habilitarSeleccionar(event) {
    event.preventDefault();
    this.setState({habilitarSeleccionar: true});
    this.setState({territorioSeleccionado: ""});
  }

  deshabilitarSeleccionar(event) {
    event.preventDefault();
    this.setState({habilitarSeleccionar: false});
  }

  obtenerTerritorio(pais) {

    //if(this.state.habilitarSeleccionar) {
      this.setState({territorioSeleccionado: pais});
      console.log(this.mapa);
    //}    
  }

  changeMap() {
    if (this.state.enableMapInfo) {
      return <MapaInfo />;
    }
    return <MapaPartida mapa/>;
  }

  obtenerNombreJugadores() {
    fetch('http://localhost:8090/api/obtenerJugadoresPartida', {
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

      const tropas = this.state.accionesIniciales[this.state.indexAccionesIniciales].TropasRestantes;
      const tropasArr = this.state.tropasJugadores;
      tropasArr[index] = tropas;
      this.setState({tropasJugadores: tropasArr});

      const regiones = this.state.accionesIniciales[this.state.indexAccionesIniciales].TerritoriosRestantes;
      const regionesArr = this.state.regionesJugadores;
      regionesArr[index] = 42 - regiones;
      this.setState({regionesJugadores: regionesArr});

      this.setState({indexAccionesIniciales: this.state.indexAccionesIniciales + 1});
    }
  }

  comprobarAcciones() {
    fetch('http://localhost:8090/api/obtenerEstadoPartidaCompleto', {
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
      for (var i = 0; i < Object.keys(response).length; i++) {
        var accion = response[i];

        switch (accion.IDAccion) {
          // IDAccionRecibirRegion
          case 0: {
            const jAux = this.state.accionesIniciales;
            jAux.push(accion);
            this.setState({accionesIniciales: jAux});
            
            if (accion.Region === 41) {
              clearInterval(this.interval);
              this.interval = setInterval(() => this.rellenarTerritorios(), 150);
            }
            break;
          }
          default: 
            break;
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

  componentDidMount() {
    //this.interval = setInterval(() => this.obtenerTerritorio(), 500);
    //this.obtenerTerritorio();
    //this.obtenerNombreJugadores();
    //this.interval = setInterval(() => this.comprobarAcciones(), 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    document.body.style.backgroundColor = "#45AFCB";

    var jugadores = [];
    for (var i = 0; i < this.state.numJugadores; i++) {
      jugadores.push(<InfoJugador  
        id={"jugador-" + i}
        usuario={this.state.nombreJugadores[i]}
        numTropas={this.state.tropasJugadores[i]}
        numTerritorios={this.state.regionesJugadores[i]}
        numCartas={this.state.cartasJugadores[i]}
        color={this.state.coloresJugadores[i]}/>);
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
              <input type="image" id="user_but" onClick={this.handleUserButton} src={User} alt='user' height="60" width="60" />
            </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="boton">
             <input type="image" id="world_but" onClick={this.handleWorldButton} src={World} alt='world' height="60" width="60"/>
            </div>
          </div>

          {/* Botones principales: botón desplegable mapas y botón cartas usuario */}
          <div className="botonesPrincipales">          
            <div className="boton">
              <input type="image" id="bar_char_but" onClick={this.handleChartButton} src={BarChart} alt='bar-chart' height="60" width="60" />
            </div> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="boton">
              <input type="image" id="cards_but" onClick={this.handleCardButton} src={Cards} alt='cards' height="60" width="60"/>
            </div>
          </div>
        </div>
      </div>
    );  
  }
}
