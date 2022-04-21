import React from 'react';
import "./barraSuperiorJuego.css";

export default class BarraSuperiorJuego extends React.Component {

	render() {
		return (
			<div className="topnav">
        <a className="active" >World Domination</a>
  
      	<div className="topnav-right">
      	  <a><img className="imagenes invertida" src="https://img.icons8.com/android/48/000000/dice.png"/></a>
      	  <a><img className="imagenes invertida" src="https://img.icons8.com/ios-filled/50/000000/question-mark.png" /></a>
      	  <a><img className="imagenes" src="https://img.icons8.com/emoji/48/000000/white-flag.png"/></a>
      	  <a><img className="imagenes invertida" src="https://img.icons8.com/material-sharp/48/000000/settings.png" /></a>     
    		</div>
      </div>
		);  
  }
}
