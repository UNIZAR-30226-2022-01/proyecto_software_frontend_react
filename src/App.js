import React from 'react';
import Identificacion from "./paginas/identificacion/Identificacion";
import Registrar from "./paginas/registrar/Registrar";
import IniciarSesion from "./paginas/iniciarSesion/IniciarSesion";
import Inicio from "./paginas/inicio/Inicio";
import BuscarPartida from "./paginas/buscarPartida/BuscarPartida";
import CrearPartida from "./paginas/crearPartida/CrearPartida";
import LobbyPartida from "./paginas/lobbyPartida/LobbyPartida";
import Mapa from "./paginas/mapa/Mapa";
import Ranking from "./paginas/ranking/Ranking";
import Tienda from "./paginas/tienda/Tienda";
import Personalizacion from "./paginas/personalizacion/Personalizacion";
import Perfil from './paginas/perfil/Perfil';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Notificaciones from './paginas/notificaciones/Notificaciones';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Identificacion />} />
          <Route path="/iniciarSesion" element={<IniciarSesion />} />
          <Route path="/registrarUsuario" element={<Registrar />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/buscarPartida" element={<BuscarPartida />} />
          <Route path="/crearPartida" element={<CrearPartida />} />
          <Route path="/lobbyPartida" element={<LobbyPartida />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/personalizacion" element={<Personalizacion />} />
          <Route path="/perfil" element={<Perfil/>}/>
          <Route path="/notificaciones" element={<Notificaciones/>}/>
        </Routes>
      </BrowserRouter>
    );  
  }
}
