import Inicio from "./paginas/inicio/Inicio";
import Registrar from "./paginas/registrar/Registrar";
import IniciarSesion from "./paginas/iniciarSesion/IniciarSesion";

export default class Identificacion extends React.Component {
  render() {
    return (
    <div>
      <h1>World domination</h1>

      <button>
        <Link to="/iniciarSesion">Iniciar Sesión</Link>
      </button>

      <button>
        <Link to="/registrarUsuario">Registrar Usuario</Link>
      </button>
    </div>
    );  
  }
}
