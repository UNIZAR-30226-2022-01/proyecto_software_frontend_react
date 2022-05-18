import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import "./barraInferior.css";

export default class BarraInferior extends React.Component {
  
	render() {
		return (
			<div>
      <Navbar fixed="bottom" bg="primary" variant="dark">
          <Container>
          <Navbar.Brand>Copyright &copy; 2022 Unizzard</Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link href="https://github.com/fran1017">Fran Crespo</Nav.Link>
            <Nav.Link href="https://github.com/Guilleuz">Guillermo Enguita</Nav.Link>
            <Nav.Link href="https://github.com/emiiidk">Emilio Estevan</Nav.Link>
            <Nav.Link href="https://github.com/Sondeluz">Samuel García</Nav.Link>
            <Nav.Link href="https://github.com/jamonn">Laura González</Nav.Link>
            <Nav.Link href="https://github.com/JorgeGrima">Jorge Grima</Nav.Link>
          </Nav>
          </Container>
        </Navbar>
      </div>
		);  
  }
}
