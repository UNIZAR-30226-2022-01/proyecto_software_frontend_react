import Identificacion from "./paginas/identificacion/Identificacion";
import Inicio from "./paginas/inicio/Inicio";
import Registrar from "./paginas/registrar/Registrar";
import IniciarSesion from "./paginas/iniciarSesion/IniciarSesion";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/identificacion" element={<Identificacion />} />
          <Route path="/iniciarSesion" element={<IniciarSesion />} />
          <Route path="/registrarUsuario" element={<Registrar />} />
        </Routes>
      </BrowserRouter>
    );  
  }
}
