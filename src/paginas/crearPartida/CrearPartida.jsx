import React from 'react';
import "./crearPartida.css";

export default class CrearPartida extends React.Component {
  prueba(e) {
    let x = e.clientX;
    let y = e.clientY;
    console.log(x,y);
  }
  
  
  render() {
    return (
    <div className="cen">
      <h1>Crear partida</h1>
      
      <svg
        width="60%"
        viewBox="0 0 1024 792"
        
      >
      <g id="map" visibility="visible" fill="none" strokeWidth={2.5}>
        <country
          name="East Africa"
          index={1}
          continent="africa"
          d="M532 514c-1,-6 -1,-12 -2,-17 5,-1 6,-8 7,-12 1,0 2,0 4,0 1,-8 11,-8 10,-19 -5,-1 -10,-2 -16,-2 0,-2 -1,-4 -2,-6 0,1 -1,2 -2,3 -7,-10 -12,-18 -16,-29 -1,-14 2,-24 4,-37 0,-1 0,-3 0,-4 1,0 2,0 4,0 -1,-3 -1,-3 1,-9 11,0 22,0 33,0 2,-3 2,-3 5,-4 7,11 9,26 14,38 1,1 2,1 3,1 2,5 3,9 5,14 -1,0 -2,0 -3,0 9,6 21,1 30,-1 0,0 0,1 1,2 -4,12 -9,23 -16,34 -15,12 -22,25 -33,39 0,7 0,14 1,21 -6,1 -11,2 -16,4 -2,6 -2,16 -2,18 -2,-1 -3,-1 -5,-1 0,-7 0,-15 0,-23 -2,-3 -5,-7 -7,-10 -1,0 -2,0 -2,0z"
        />
        <g id="Seas" fill="#FFF">
          <path
            className="sea"
            id="Mediterranean"
            d="m484 328-6-3v-3c-3 0-3 0-3-1h4c0-4 1-7-1-10 1 0 1 0 2-1v-4c-18 1-21 2-28 2-7 3-16 9-23 4 4-5 8-6 14-7 2-3 5-5 6-8 0-13 1-14 7-25 4-1 8-1 12-1 0-1 0-2 1-3 0 0 1-1 1-2h7c0 3 1 5 2 8 1 0 2 0 3 1v2c5 3 11 11 14 17-1 2-2 4-3 7-5 0-5 0-6 1l4 4s1 0 2-1c2-2 4-5 6-8h3c-2-3-3-5 0-9 2 2 3 3 5 4-2-4-5-9-8-13-5-2-17-17-12-23 4 6 10 17 16 19 2 5 5 10 7 16h2c2 12 2 12 5 18l1-1 1 1c6-5 3-14 2-21 2 0 2 0 2 3 0-1 1-1 2-1l-1-1h3c0 6 3 11 5 21 2 0 4 0 6-1 0 1 1 2 1 3l9-3 2 2c8-1 8-1 11-3 1 0 1 1 2 1-2 11 1 21-6 29h-14c-11-4-23-11-35-8-1 3-1 3-1 7-8 1-15-7-23-9z"
          />
          <path
            className="sea"
            id="Dead Sea"
            d="M607 293c1-4 3-8 4-12-2 0-5-1-7-2v-11c-7-2-3-8-1-13 7-4 11-5 18-5v9h-2c-1-1-1-2-1-3-3 5-4 6-5 12 3 1 5 2 7 3 0 8 0 8 2 9 1-3 1-3 0-7h3v10c-1 0-2 1-3 1v8c1 0 2 1 3 1 1 2 1 4 1 7v4c-6 2-10 1-17 0-1-3-1-3-2-11z"
          />
          <path
            className="sea"
            id="Black Sea"
            d="M542 259c0-1 0-1 2-1v-8h5c0 1 0 1-3 3 0 0 1 1 2 1s3-1 4-1c0 2 0 2-1 4 5 3 5 3 10 3 0-1 1-2 1-3 1 0 2 0 3-1v-2c-3 0-3 0-5-1 3-4 8-4 13-5-3 3-5 5-6 10h3c0 2 1 4 1 6 7 2 13 6 12 15-8 2-12 1-14 2-5-8-11-5-20-4v3h-8c-2-2-4-5-6-7 2-5 4-10 7-14z"
          />
          <path
            className="sea"
            id="Great Lakes"
            d="M241 211c21-8 13 5 29 10 0 2 1 4 1 6-1-1-3-1-4-2-1 5-1 5-3 6v-1h-4c2-4 3-6 0-9-2 1-3 2-4 5h-2c-1 3-1 7-2 10-1 1-3 1-5 2 1-8 3-11 7-17h5v-3c-4-1-4-1-6 0 0-1-1-2-2-3-4 1-8 1-13 2v-3h3v-3z"
          />
        </g>
        <g id="Africa" stroke="#C68A31" fill="#CEA252" visibility="visible">
          <path
            fill="#CEA252"
            className="country"
            id="East Africa"
            d="M532 514c-1-6-1-12-2-17 5-1 6-8 7-12h4c1-8 11-8 10-19-5-1-10-2-16-2 0-2-1-4-2-6 0 1-1 2-2 3-7-10-12-18-16-29-1-14 2-24 4-37v-4h4c-1-3-1-3 1-9h33c2-3 2-3 5-4 7 11 9 26 14 38 1 1 2 1 3 1 2 5 3 9 5 14h-3c9 6 21 1 30-1 0 0 0 1 1 2-4 12-9 23-16 34-15 12-22 25-33 39 0 7 0 14 1 21-6 1-11 2-16 4-2 6-2 16-2 18-2-1-3-1-5-1v-23c-2-3-5-7-7-10h-2z"
          />
          <path
            className="country"
            id="Egypt"
            d="M484 328c8 2 15 10 23 9 0-4 0-4 1-7 12-3 24 4 35 8h14c1 5 3 10 4 15-2 0-4-1-6-1 2 9 5 17 7 26-3 1-3 1-5 4h-33c-2 6-2 6-1 9h-4v4c-7-2-8-7-15-9 0-2-1-4-2-6-12-2-19-3-28-11-1-11 0-19-1-29 1-1 2-1 2-2 1-2 1-4 1-7 4-3 4-3 8-3z"
          />
          <path
            className="country"
            id="Congo"
            d="M473 502c-5-6-11-12-11-20 4-3 4-4 6-9h6v-3c9 2 9 2 13 2 1-8 2-13 0-20 4-2 5-5 10-7 1-1 1-2 1-4 7-1 11-5 17-9 4 11 9 19 16 29 1-1 2-2 2-3 1 2 2 4 2 6 6 0 11 1 16 2 1 11-9 11-10 19h-4c-1 4-2 11-7 12 1 5 1 11 2 17-1 2-2 3-3 5h-3c1 5 1 11 2 16h-4v-4c-23-5-15-2-21-20-2 0-4-1-6-1 0 1-1 2-1 3-1 0-3 0-4 1-1-4-1-4-4-9-8-1-9-2-15-3z"
          />
          <path
            className="country"
            id="Madagascar"
            d="M579 589c-5-6-4-15-1-22h2c2-15 1-16 14-21 6-5 6-5 7-8h3v17h-2v4h-3c-1 11-9 26-20 30z"
          />
          <path
            className="country"
            id="South Africa"
            d="M473 502c6 1 7 2 15 3 3 5 3 5 4 9 1-1 3-1 4-1 0-1 1-2 1-3 2 0 4 1 6 1 6 18-2 15 21 20v4h4c-1-5-1-11-2-16h3c1-2 2-3 3-5h2c2 3 5 7 7 10v23c2 0 3 0 5 1 0-2 0-12 2-18 5-2 10-3 16-4 0 13 2 29-13 33-1 2-1 2-6 7-1 9 0 19-10 22-2 13-2 13-3 18h-3v3h-3c-7 18-20 18-39 22-2-1-4-2-5-2v-4h2c0-10-1-15-6-24-1-9-2-12-5-30-4-11-8-21-2-31 1 0 3-1 4-1 0-8-1-16-1-24 1 0 2-1 3-1 0-3 0-7-1-11h-3v-1z"
          />
          <path
            className="country"
            id="North Africa"
            d="M468 473c-1-4-1-6 0-10-7-3-7-3-13-3-2-6-2-6-4-7-5 0-9 1-14 1v3c-16-1-25 7-36-8-6-2-10-16-12-22h-2v-3h-3c-2-9-2-16 1-25 0-9-1-19 2-28 5-1 8-15 10-20 13-6 13-10 17-25 7-4 9-7 14-14h1c7 5 16-1 23-4 7 0 10-1 28-2v4c-1 1-1 1-2 1 2 3 1 6 1 10h-4c0 1 0 1 3 1v3l6 3c-4 0-4 0-8 3 0 3 0 5-1 7 0 1-1 1-2 2 1 10 0 18 1 29 9 8 16 9 28 11 1 2 2 4 2 6 7 2 8 7 15 9-2 13-5 23-4 37-6 4-10 8-17 9 0 2 0 3-1 4-5 2-6 5-10 7 2 7 1 12 0 20-4 0-4 0-13-2v3h-6z"
          />
        </g>
        <g id="Asia" stroke="#9CC35A" fill="#BDDB8C" visibility="visible">
          <path
            className="country"
            id="Afghanistan"
            d="M651 310c-3-4-4-5-8-7-3-8-10-4-17-3 0-3 0-5-1-7-1 0-2-1-3-1v-8c1 0 2-1 3-1v-10h-3c1 4 1 4 0 7-2-1-2-1-2-9-2-1-4-2-7-3 1-6 2-7 5-12 0 1 0 2 1 3h2v-9c-7 0-11 1-18 5 4-14-7-21 0-33 8-5 22-6 31-7 0 1 1 2 1 3 11-1 14 1 25-6 0-2-1-15 0-15 10 0 21-4 27 7 4 1 15 15 18 19 12-1 10 9 15 16-4 4-5 5-7 11-11 3-5 14-16 18v3c-4 1-7 1-11 2 0 7 5 19 7 26-3 1-5 3-7 5-2-3-3-5-6-5v-3c-5-1-7-1-9 4-6-1-8-1-11 5-3 1-3 1-9 5z"
          />
          <path
            className="country"
            id="India"
            d="M713 452c-1-1-2-3-4-4 0-3 1-7 1-10h4c3 5 4 6 4 11-2 1-3 2-5 3zm-57-89c0-6 3-10 4-16h-3c-1-6-3-13-4-19-1-1-2-1-3-1 0-6 0-11 1-17 6-4 6-4 9-5 3-6 5-6 11-5 2-5 4-5 9-4v3c3 0 4 2 6 5 2-2 4-4 7-5h7c1 6 4 6 10 7v16h-4v4c7 1 21 10 25 14 4 0 7 1 10 1 0 2 0 3-1 5 3 0 5-1 8-1v-3c2 0 5-1 8-1-1-2-1-3-1-5 6-2 8-7 13-8 1 2 2 5 3 8-3 5-3 7-4 13h-2c0 3 0 3-1 7-1 0-2 0-3 1-2 4-3 8-4 12-7 4-12 6-20 7-3 7-13 25-19 27-1 11-5 21-6 32h-5c0 1 0 2 1 3l-3 3h-4l-15-39c0-15 0-15-1-17 2-5 2-5 1-7 0 2-1 3-2 4-4 0-8-1-9-5 1-1 2-2 4-2-2-1-3-2-4-2-1-1-1-2-1-3-4-1-4-3-5-7h-13z"
          />
          <path
            className="country"
            id="Irkutsk"
            d="M786 217c-11-10-5-34 3-45 5-3 5-3 8-6 3 0 7-1 11-2 2-2 3-5 5-7 8 0 10-2 29-1 0 0 0 1 1 2 2 1 5 1 8 1 2 6 3 6 8 9-1 10-5 20-6 30-4 0-9 2-12-1-2 1-4 2-5 3 0 4 1 8-4 9 0 5-1 8-3 13h-3c0-2-1-4-1-7-4 1-4 1-11 5-9-1-19 0-28-3z"
          />
          <path
            className="country"
            id="Kamchatka"
            d="M853 198c1-10 5-20 6-30 3-11 12-13 14-24 3 0 5-1 7-1 0-1 1-2 1-3 3-1 5-2 8-2 1 1 1 3 2 5 2 1 4 1 6 2 0 1 0 2 1 3 2-1 4-2 6-2 1-3 2-5 3-7h4v-8c-3-1-6-1-8-2 0-3 1-7 1-10 7-3 12-7 19-8 1-2 2-4 3-5s2-1 3-1c0-1 0-2 1-3 4 0 24 8 28 4h-4v-3h-3v-3h18c1 2 1 3 1 4 2-1 2-1 6-2l-2 2c2 1 2 1 7 1 8 5 8 5 11 6 2 4 4 5 7 8 0-1 1-2 1-3 4 2 4 2 9 8 1-1 2-1 4-1-2 4-2 4-3 9-1 0-3-1-5-1v2c1 1 3 1 4 1-1 1-1 1-9 1-2-1-2-1-2-5-1 0-2 0-3-1v-2c-3 0-5 1-8 1 0-2-1-4-2-6v9h-8v2c2 1 4 1 6 1 0 2-1 4-1 6h3v5h-5c-1-1-1-1-1-2-5 3-11 10-14 15-7-1-8-2-14 1-1-1-2-3-3-4-1 1-3 2-4 4 1 0 2 0 2 1 0 3-4 3-4 5h3c-1 3-2 5-3 8h3c0 6 0 10-5 12 0 7-1 9-4 16-1 0-2 1-2 1-4-5-7-11-10-16-2-22 13-23 19-40 1 0 2-1 3-1-3 0-4 0-7 2 0 1 0 1 1 2-2 2-4 4-5 7h-5c-1-2-1-4-1-6-3 1-6 1-9 2-1 3-1 3-2 8 1 0 2 1 3 1v3c-12 0-40-6-44 6-5 2-8 8-11 13 3 1 7 2 10 3 0 1 0 2 1 3 0-1 1-3 1-4 2 0 4 0 6 1 6 13 7 28 5 43-3-2-5-3-8-4 0-2-1-3-1-5-1 0-3 0-4-1v-2h-9c-3-9-10-8-12-18 0 0-1-1-2-1zm109-99c-1 0-2-1-3-1 0-1 1-2 1-3 3-2 3-2 7-2-2 2-2 2-3 6h-2z"
          />
          <path
            className="country"
            id="Middle East"
            d="M548 321c0-1-1-3-1-4 4-2 6-2 10-2-3 4-4 5-9 6zm15 32c-1-5-3-10-4-15 7-8 4-17 6-28-1 0-1-1-2-1-3 2-3 2-11 3l-2-2-9 3c0-1-1-2-1-3-1 1-3 1-5 1-2-10-5-15-5-21l8-15c2 2 3 4 5 6h8v-3c9 0 15-3 20 4 2-1 6 0 14-2 1 1 1 1 5 3 1 2 1 4 1 6h4c1 2 3 5 4 7 4 0 4 0 9-2 1 8 1 8 2 11 7 1 11 2 17 0v-4c7-1 13-5 16 3 4 2 5 3 8 7-1 6-1 11-1 16 1 0 2 0 3 1 1 6 3 13 4 19h3c-1 6-4 10-4 16-5 1-11 1-16 2v-6c-2 0-6 1-15 0-1-1-1-2-1-3-2 0-3 0-4-1-4-12-3-15-15-12 0 4 2 6 4 10h3l6 12c1-2 2-3 3-4 3 2 0 6 0 9 1 1 2 1 3 2 4-3 8-6 13-10 3 8 7 9 10 15-1 4-3 7-5 10l-1-1c-1 3-1 6-2 9-1 1-3 1-4 1-4 14-34 22-45 26 0-16-6-29-16-42 0-9-7-18-11-27z"
          />
          <path
            className="country"
            id="Mongolia"
            d="M836 271c-7-10-24-9-34-11v-9c-3 0-5-1-8-1-3-7-3-12-8-18 0-2 0-3 1-4-2-4-1-7-1-11 9 3 19 2 28 3 7-4 7-4 11-5 0 3 1 5 1 7h3c2-5 3-8 3-13 5-1 4-5 4-9 1-1 3-2 5-3 3 3 8 1 12 1 1 0 2 1 2 1 2 10 9 9 12 18h9v2c1 1 3 1 4 1 0 2 1 3 1 5 3 1 5 2 8 4-4 5-8 11-11 17h-5l-1-1c-4 6-4 10-9 15v3c6 3 11 10 11 17-4 3-6 5-11 5 1-5 1-6-2-10 0 1-1 1-1 2-2-3-3-3-2-7-5 0-8 0-12 2 0-5 1-5-1-9-3 2-5 5-9 8z"
          />
          <path
            className="country"
            id="Siam"
            d="M757 369c1-4 2-8 4-12 1-1 2-1 3-1 1-4 1-4 1-7h2c1-6 1-8 4-13 2-1 3-2 5-2 3 8 3 9 0 16h4v3c1-1 2-1 2-1 6-10 14-14 20-3-3 1-5 3-7 5 0 2-1 5-1 8 2 0 3 1 5 1 0 2 1 3 1 4 1 1 2 1 3 2v2h3c0 9 0 14-3 21h-5c-2 4-2 6-6 8-1-2-1-2-2-6h-2v-4c-3-1-5-1-7-2v-2h-4v-4h-1c-1 11-6 13 2 24 3 1 5 2 7 3 1 6 0 11 1 17h-4c-7-6-7-8-9-18h-2c-7-12 2-31-14-35v-4z"
          />
          <path
            className="country"
            id="China"
            d="M803 361c1-2 1-3 2-5 2 0 5 0 7-1v4c-3 1-6 1-9 2zm-1-12c-6-11-14-7-20 3 0 0-1 0-2 1v-3h-4c3-7 3-8 0-16-2 0-3 1-5 2-1-3-2-6-3-8-5 1-7 6-13 8 0 2 0 3 1 5-3 0-6 1-8 1v3c-3 0-5 1-8 1 1-2 1-3 1-5-3 0-6-1-10-1-4-4-18-13-25-14v-4h4v-16c-6-1-9-1-10-7h-7c-2-7-7-19-7-26 4-1 7-1 11-2v-3c11-4 5-15 16-18 2-6 3-7 7-11 10 3 27 19 38 11 12 7 30 13 44 10 10 2 27 1 34 11-1 1-1 1-4 0 1 1 2 3 3 4 1 0 2 1 4 1-1 1-1 2-1 3 3 0 5-1 14 0v2c-6 2-9 3-13 6 3 3 3 3 4 6 3 1 3 1 5 2-1 1-2 1-3 2 2 0 3 1 4 1 1 2 1 3 1 5-2 0-2 0-2 1h2v4h-2c7 14-23 43-36 41v5c-5-1-5-4-10-5zm39-4c1-8 1-8 3-12h2v-3h4c-2 8-2 11-9 15z"
          />
          <path
            className="country"
            id="Japan"
            d="M887 288v5h-2c-1 2-2 5-2 7-2 0-3 1-5 1 0-5 2-6 2-10-1 1-3 1-4 2v-8c8 1 8 1 11 3zm0 0c0-1-1-2-1-3 4-6 8-7 14-8v3c-3 5-6 5-11 9 0-1-1-1-2-1zm13-8v-3c-1 0-1-1-2-2-7 2-13 8-20 9v-3c5-2 13-10 16-14 2 0 4 1 6 1-2-4-1-5 0-9h3c-1-7-2-9-1-15 3 0 3 0 5 1v-5h2s-1-1-1-2c-1 0-2 1-3 1v-3c-2 2-2 2-1 6h-4v-5c2-4 2-4 5-5 0-1-1-3-1-5-1 0-2-1-3-1-3-17-12-23-8-42 6 3 8 13 8 20 4 3 6 5 7 10-1 0-2-1-3-1 0 7 1 13 7 17v2h5c0 3 1 5 1 7-12 2-3 13-7 22 1 5 3 8 1 13-2 0-4 0-5 1v5c-2 1-5 2-7 3v-3z"
          />
          <path
            className="country"
            id="Siberia"
            d="M758 250c-6-12 1-24-14-27 1-5 2-6 2-9-6-4-11-8-13-14-12-5-16-18-18-31-3-4-4-9-8-10-1-7-1-9-5-15l-1 1c-2-6-2-6-3-13-2 0-4-1-6-1 1-2 1-2 0-4 0 0 1 0 2 1 1-3 1-3-1-10-3 0-6 0-9 1-1-6-1-12-2-17l3-3c2 6 3 6 9 8-2-4-2-4-2-7 1 0 1-1 1-1 8 5 6 11 14 13v-2h-3v-3h-2v-8l-1 1c-3-3-4-4-4-9 3-1 6-3 9-4v4c3-1 5-3 7-5l-2-2c8-3 20-11 29-11 3 2 3 2 9 1 1-2 1-4 1-5 9-4 10-2 17 3 1 3 1 3 3 3v-2c4 0 9 0 14 1 2 3 1 5 1 9l-15 9c5 0 8-4 13-4 0 1 0 2 1 3h2v-3c5 1 5 1 7 3 2-6 9-4 14-4 0 1 0 2 1 3 2 1 4 2 6 2 1 6 2 7 2 12-5 6-6 12-8 19-8 0-15 0-23 2 0 1 1 2 1 3 1 1 2 1 3 1v3c2 1 5 2 8 2v3c-1 1-3 2-4 3 3 8 3 18 4 26-3 3-3 3-8 6-8 11-14 35-3 45 0 4-1 7 1 11-1 1-1 2-1 4 5 6 5 11 8 18 3 0 5 1 8 1v9c-14 3-32-3-44-10zM747 54h3c1 4 1 4 2 5 1 0 1 0 2-1 0 2 1 5 2 7h-6c-1-1-1-1-3-11zm0 0c-2 3-2 3-3 8-10-1-10-1-15-3 1-12 8-8 18-8v3zm-22-1c0 1 1 2 1 4-4 0-5 2-8 2-1-2-1-2 0-6h7zm0 0c-4-2-4-2-5-4 1-1 1-3 2-4 6-1 7-1 12 3-3 2-6 3-9 5z"
          />
          <path
            className="country"
            id="Ural"
            d="M720 239c-5-7-3-17-15-16-3-4-14-18-18-19-6-11-17-7-27-7-1-2-1-4-2-5s-3-1-4-1c-1-16 0-33-2-50-6-10 0-14 7-22 0-5 0-9 1-13 3-4 3-10 7-14 4 3 8 5 12 7-4 8-7 12 1 17 0 5 0 10-1 15l-9 6c6 0 6 0 13-2 2-4 2-4 2-11h4l3 3c1 2 1 2 0 4 2 0 4 1 6 1 1 7 1 7 3 13l1-1c4 6 4 8 5 15 4 1 5 6 8 10 2 13 6 26 18 31 2 6 7 10 13 14 0 3-1 4-2 9 15 3 8 15 14 27-11 8-28-8-38-11z"
          />
          <path
            className="country"
            id="Yakutsk"
            d="M797 166c-1-8-1-18-4-26 1-1 3-2 4-3v-3c-3 0-6-1-8-2v-3c-1 0-2 0-3-1 0-1-1-2-1-3 8-2 15-2 23-2 2-7 3-13 8-19 0-5-1-6-2-12 1 0 2-1 3-2h-4v-3c7 0 19-4 22 4-1 1-2 1-3 1 1 2 1 3 1 4 5 0 8 4 13 4 1-1 2-3 3-5 4 3 8-1 10 2 3 0 5-1 8-1-2-1-3-2-5-2 0-2 0-4-1-5 3 0 6 0 8-1v3c4-2 4-2 12-3v3c-3 0-3 0-3 1 15 2 30 4 44 8l-1 1c1 1 3 1 5 2v3c-1 1-2 3-3 5-7 1-12 5-19 8 0 3-1 7-1 10 2 1 5 1 8 2v8h-4c-1 2-2 4-3 7-2 0-4 1-6 2-1-1-1-2-1-3-2-1-4-1-6-2-1-2-1-4-2-5-3 0-5 1-8 2 0 1-1 2-1 3-2 0-4 1-7 1-2 11-11 13-14 24-5-3-6-3-8-9-3 0-6 0-8-1-1-1-1-2-1-2-19-1-21 1-29 1-2 2-3 5-5 7-4 1-8 2-11 2zm60-79c0-1 1-3 2-4 8 0 8 0 9 1-5 1-6 2-11 3zm0-10c-2 7-11 2-15 0v-3h5c0-1 0-2 1-3 1 1 2 1 3 1 0 1 0 2 1 3s3 1 5 2zm5 0v-4c4 0 4 0 10 4h-10z"
          />
        </g>
        <g id="Austrailia" stroke="#D65163" fill="#E78A94" visibility="visible">
        <path
            className="country"
            id="Eastern Austrailia"
            d="M875 600v-52h-41c-1-13-2-25-3-38 1 0 2-1 2-1 0-8 6-9 12-10v-4h3c0 2 1 3 2 4 1-1 1-1 12 0-1 4-3 4-5 6v5c7 3 11 6 18 5 2-4 2-13 4-21 1-1 2-1 3-1 1 6 2 10 6 14l1-1c5 8 5 18 15 21v4c1 0 2 1 3 1 0 1 1 2 1 3 32 8 6 44 3 62-8 2-14 5-22 6l-3-3c-2 3-2 5 0 8 3 0 7 1 10 1-2 8-3 10-11 12-4-9-1-16-10-21zm73-6c-8-10-19-5-11-21 7 0 12-6 13-13 2 0 4-1 6-1 1-4 3-7 4-11h3c0 2 1 4 1 5 4 1 4 1 5 3 0 1-1 2-1 3h3c-2 2-2 2-9 20h-3c-3 6-5 12-11 15zm24-38c-1-8-2-9-7-14 4-7-1-13-1-20 3 3 3 7 6 10l1-1c1 1 2 3 3 4 2 0 5 1 7 1 0-1 1-1 1-2l3 6c-2 7-2 7-7 15-2 0-4 1-6 1z"
          />
          <path
            className="country"
            id="New Guinea"
            d="M936 485c-2-1-5-2-8-3-2-3-2-5-6-6v-3h-3c-1 8-12 2-18 1l3-6c-1-1-2-1-3-1 0-1 0-2-1-3-2-1-4-2-6-2 0-1 1-1 1-2h-4v2c-1 0-2 0-3-1 0-1 0-3-1-4 3 0 3 0 3-1h-4v-4c-1 0-2-1-2-1 4-4 9-4 14-2l-3 6c1 0 2 0 3 1v2c2-1 4-3 6-4 0-1-1-1-1-2 2-2 21 8 24 10l3 6c1 0 2 0 3 1 0 1 0 2 1 3h-4c1 2 1 3 2 5h3v4c1 1 3 1 5 2-1 0-3 1-4 2zm19-24c0 1 0 2-1 3-8 3-8 3-19 5-1-1-1-2-1-3 7-2 14-3 21-5zm0 0c-4-3-4-3-7-4v-3c3 1 6 2 10 3 0 1 0 2 1 3-1 0-3 1-4 1z"
          />
          <path
            className="country"
            id="Western Austrailia"
            d="M831 510c1 13 2 25 3 38h41v52c-2-1-3-1-5-1 0-3-1-6-2-9-4 0-4 0-5-2 1 0 2-1 3-1v-3c-1 2-1 2-5 2 1-1 2-3 3-4-2 0-5 1-8 2-2-4-4-7-5-10-12-2-25-1-32 9-5 0-8-1-13-1-11 6-19 10-30 5 2-7 2-11 1-18-5-14-5-14-5-17h2c-2-5-1-10 0-15h4v-2c7-4 14-6 21-9v-3c9-3 12-9 21-12 0-1 1-2 1-4l2 2v-3c1 0 3-1 4-1l3 3c-1 0-1 1-1 1s1 1 2 1z"
            
          />
          <path
            className="country"
            id="Indonesia"
            d="M838 474s1-1 2-1c3-1 3-1 6 1-3 2-7 4-11 6v-4c1-1 2-1 3-2zm-16 2v1c-2-1-4-1-6-1v2c-10-2-10-2-30-2v-3c-2-1-5-2-7-3v-6h-4c-3-8-6-11-8-18-1 0-2-1-2-1-1-4-1-4-4-10h-3c0-2-1-4-1-6 5 1 5 1 13 4 2 6 5 8 7 13 1 0 2-1 3-1 1 6 2 7 8 8v3c-1 0-2 1-3 1 1 1 1 3 2 4l1-1c2 2 0 4 4 6v3c0 1 1 1 2 1v-2c9-1 16 3 26 5v3h2zm0 0c3-6 13-3 18-3-1 0-2 1-2 1h-4v3c-4-1-8-1-12-1zm-1-11c1-11 4-16 10-24 5 0 10 0 15-2v2c-4 2-8 4-13 3 0 1 0 2-1 3h8c-1 2-1 2-6 2v12h-5v-7h-2c-1 4-1 7-2 11h-4zm-19-5c-2-4-4-5-3-9h-2c-1-5 0-7 2-12 2 0 4-1 7-2v-3c3-1 6-2 8-3 1-3 2-5 3-7h3c0-2 0-3 1-4 4 0 5 0 9 1v3c-1 0-2 0-3 1 1 0 1 1 2 2-3 3-6 8-2 13-7 5-8 10-11 17-3 2-3 2-14 3zm39-2v-2c7-1 11-2 17 2h-17zm8-13v-8c1 1 2 1 3 1 0 3 1 5 1 7h-4zm26-51c0-1 0-1 1-2 0 0 1 0 2-1 0 4 0 4-2 7-1 0-3 1-4 1 1-2 2-4 3-5zm-22 2c1-5 8-10 12-14 0 8-4 13-12 14zm23-4c-1 1-1 1-1 2h-3c0-6-3-8-4-12 4 0 8 4 12 6-2 0-3 1-4 2v2zm5-4c0-2-1-5-1-8h-8c-1-1-1-2-2-3h-2c-2-1-3-1-4-4h4c0-2 0-2-2-2-1-3-1-6-1-9 1 1 2 3 3 4-2-5-2-5-1-11h9c0 2-1 3-1 5 1 0 1 0 2 1 0 2-1 4-2 6l-1-1c0 2 0 4 1 7 2 0 4 1 6 2 2 5 3 7 3 12-1 1-2 1-3 1z"
          />
        </g>
        <g id="Europe" stroke="#9482AD" fill="#CEBADE" visibility="visible">
          <path
            className="country"
            id="Great Britain"
            d="M455 226c-7 2-23 9-30 8 0-1-1-2-1-3 4-2 8-5 12-7-2 0-4-1-6-1 2-6 2-6 3-12h5c0-3-1-5 1-8-1 0-2-1-3-1v-4h-3c0-9 2-13 3-21 5-2 5-2 8-2 1 2 1 2 0 6l6 3c-8 11 0 20 2 33 1 0 2 0 3 1v8zm-40 0c-1-5 1-9 0-20 1-1 2-1 4-2-1-2-1-2 0-5 5 0 8 0 13 2v9h-3c-1 10-3 14-14 16z"
          />
          <path
            className="country"
            id="Iceland"
            d="M425 156c-2-1-5-2-8-2 0-2 0-3-1-5 3 0 3 0 3-1h-4v-3h4v-1h-4c0-1 1-2 1-3 4-2 4-2 8-1v2c7 0 15-1 23-1 1 1 2 1 3 2l-2 2h3c-2 12-17 10-26 11z"
          />
          <path
            className="country"
            id="Northern Europe"
            d="M470 242c-2-3-3-4-6-4-2-5-6-7-9-11v-1c2-3 4-6 7-7 2-8 2-8 4-9 0 0 0 1 1 1 3-4 6-6 1-10 0-4 1-8 2-12 4-2 5-3 7-7 1 6 3 15-2 19 5 3 9 4 14 5 0-1 1-2 1-3 1 1 2 2 2 3 4-4 9-4 14-5 0 1-1 2-1 3 1 0 1 0 2 1v-3c1 0 3-1 4-1l9 6c2 8 3 14 3 23h-3c0 2-1 3-1 5-2 5-2 5-4 16-6 4-8 3-15 2-1-15 2-14-12-15 0 2-1 3-1 5-8 2-10 2-17-1z"
          />
          <path
            className="country"
            id="Scandinavia"
            d="M541 95c-9 16 1 39 1 57-3 4-6 8-7 13h-2c-8 1-10 2-19 2-5-7-3-12-3-20h3c4-8 7-11 7-20-2 1-4 1-6 2-4 9-8 15-14 23 0 7 3 15 2 21h-2c-1 1-1 3-1 4-1 1-2 1-3 1-1 10-1 17-11 18-2-8-7-13-6-22h-2c-1-1-1-1-1-2-1 2-3 4-4 7-5 0-7-1-12-3-2-11-3-12-4-21 1-1 2-1 2-1v-3c0-1 1-1 2-1 0-1-1-1-1-1 3-4 6-3 8-8h2c1-1 2-3 2-5 5 1 5-3 6-7 1 0 2-1 4-2-1 0-1-1-1-1 3-4 3-4 6-15 1 0 1 1 2 1v-2h3V99c3-1 5 1 7 0 0-1-1-3-1-4 4-1 4 1 8 1 1-4 1-5 5-5 0-1-1-2-1-4 3-3 8-2 11-2 0 2 0 2 2 2v-5c1-1 3-1 5-1-1 5-1 5 0 6 1-2 2-3 3-5 4 1 7 3 11 4v3c0 1-1 2-2 3 0 1 0 2 1 3zm16-47c1 0 2 0 3 1v2h-3c-1 5-1 5-5 5-2 2-4 5-6 7-2-1-3-1-4-2l1-1c-1-1-2-1-3-2 0-3 0-3 1-4-2-1-3 1-6 0 0-4-2-4-3-8 5 1 10 1 15-1 1 1 1 3 2 4 1-2 2-5 4-7 0 2 1 4 2 6h2zm3 13-3-3c1-1 1-2 1-4 3 0 5 0 7-1-1 1-1 1-1 2 0 0 1 1 2 1-2 3-2 3-6 5zm-3-13v-7h6c0 1 0 2 1 3h6c0 1-1 3-1 5h-8s1 0 1-1h-5z"
          />
          <path
            className="country"
            id="Southern Europe"
            d="M521 316c-1-2-1-2-4-3v-3c10 1 10 1 15 3 0 1 0 2 1 3h-12zm-47-28c-1-3-1-6-2-10h3c0 3 0 6 1 9-1 0-2 1-2 1zm53 1h-3l1 1c-1 0-2 0-2 1 0-3 0-3-2-3 1 7 4 16-2 21l-1-1-1 1c-3-6-3-6-5-18h-2c-2-6-5-11-7-15-6-2-12-13-16-19-4 6 7 20 12 22 3 4 6 9 8 13-2-1-3-2-5-4-3 4-2 6 0 9h-3c-2 3-4 6-6 8-1 1-2 1-2 1l-4-4c1-1 1-1 6-1 1-3 2-5 3-7-3-6-9-14-13-17v-1c-1-1-2-1-3-1-1-3-2-5-2-8h-7c0 1-1 2-1 2-8-4-5-21 1-26 7 3 9 3 16 1 0-2 1-3 1-5 14 1 11 0 12 15 7 1 9 2 15-2 2-11 2-11 4-16 4-2 4-2 8-2 0 1 0 2 1 3s2 1 3 1c2 10 2 17 10 22-3 4-4 9-6 14l-8 15z"
          />
          <path
            className="country"
            id="Ukraine"
            d="M583 279c1-9-5-13-12-15 0-2-1-4-1-6h-3c1-5 3-7 6-10-5 1-10 1-13 5 2 1 2 1 5 1v2c-1 1-2 1-3 1 0 1-1 2-1 3-5 0-5 0-10-3 1-2 1-2 1-4-1 0-3 1-4 1s-2-1-2-1c3-2 3-2 3-3h-5v8c-2 0-2 0-2 1-9-5-9-12-11-22-1 0-2 0-3-1s-1-2-1-3c-4 0-4 0-8 2 0-2 1-3 1-5h3c0-9-1-15-3-23l-9-6c0-3-1-6-1-8h2c1-4 3-7 4-11 1 0 2-1 3-1 0 1-1 3-1 4 2 0 3 1 5 1v-6h-3c0-1 1-2 1-3-1-1-2-1-2-1 0-1 0-2 1-3 3-1 3-1 6 1 6-3 6-3 12-4-1-3-2-3-5-5h2c1-5 4-9 7-13 0-18-10-41-1-57 4-3 5-3 11-3v4c7 1 32 14 23 23-5 2-5 2-19 3 0-1-1-3-1-3-2-1-3-1-4-1 1 6 6 9 11 11 0 3-1 5-1 7 6 0 11-1 17 1-1-2-1-4-2-6 4-2 5-2 9-2 1-2 3-4 4-7-1 0-2-1-3-1 0-4-2-9 0-13 5 1 8 2 10 7h-3c0 2 0 4 1 6h4c1-2 1-3 1-5 5 0 6-3 11-3 0-2 1-3 1-5 5-2 8-4 14-4-1 0-3 1-4 2v2c5-1 7-2 12-1 0-1 1-3 2-4v3h4c-1-4-1-4-2-7 0 0 0-1 1-1 4 0 6 2 19 4 1 2 1 2 3 4-1 4-1 8-1 13-7 8-13 12-7 22 2 17 1 34 2 50 1 0 3 0 4 1s1 3 2 5c-1 0 0 13 0 15-11 7-14 5-25 6 0-1-1-2-1-3-9 1-23 2-31 7-7 12 4 19 0 33-2 5-6 11 1 13v11c2 1 5 2 7 2-1 4-3 8-4 12-5 2-5 2-9 2-1-2-3-5-4-7h-4c0-2 0-4-1-6-5-2-5-2-6-3zm55-181c-1 0-1 1-1 1-2-1-3-1-5-2 0-5 0-5 1-6 2 2 3 5 5 7zm-23-12-12-6c2-4 3-7 7-9l-2-2c5-5 5-5 12-8v-3c10-2 10-2 13-4v4c-3 3-9 6-16 11v2h-2c0 7 2 8 4 14-2 0-3 0-4 1z"
          />
          <path
            className="country"
            id="Western Europe"
            d="M428 312c-1-2-3-3-4-5h-9c-3-11-2-19-1-31 0 0 0-1-1-1 3-12 15-7 26-7 5-6 0-16-1-22-4-1-4-1-8-4 3-1 3-1 4-4h3v2c6-2 6-2 7-3 0 0-1 0-2-1v-2h8c1-1 1-1 2-5 3 0 3 0 3-2 3 4 7 6 9 11 3 0 4 1 6 4-6 5-9 22-1 26-1 1-1 2-1 3-4 0-8 0-12 1-6 11-7 12-7 25-1 3-4 5-6 8-6 1-10 2-14 7h-1z"
            onClick={(e) => this.prueba(e)}
          />
        </g>
        <g
          id="North America"
          stroke="#C99B32"
          fill="#EFCB73"
          visibility="visible"
        >
          <path
            className="country"
            id="Alaska"
            d="m109 174 3 3v7c-1-3-3-5-5-8 1 0 1-1 2-2zm-4-10v-3c3 0 3 0 3-1-3-1-6-3-8-4-1 1-1 2-1 2-2 0-4-1-6-2v-3c0-1-1-1-2-1 0 1-1 1-1 2-1 0-2-1-3-1l2-2c-1 0-2-1-2-1s-1 1-1 2c-3-1-3-2-5-5-3 0-3 0-6-2-1 0-1 0-2 1 1 1 2 3 3 5-8 2-13 4-17 5v-4c3-2 5-4 8-6-6 1-10 7-15 6v5c-2 2-5 4-7 5v3c-6 3-24 13-29 9 5-4 10-6 16-8v-2c4-1 4-3 5-7-2 1-5 1-7 1 0-2 0-2-2-2v2c-1 1-3 1-5 1 0-3 0-3 2-7h-3c-1-5-3-4-6-3-1-2-1-4-2-6 2-1 3-2 4-2-1-1-2-1-2-1 0-2 0-4 1-5 5-3 9-1 15 0 2-3 5-6 4-9-7 4-8 3-14-2 1-1 2-3 3-5 1 0 1 1 1 1v-5h9c-2-4-5-8-4-12 1-1 2-1 4-1v-3c9-2 19-9 29-8 0 1-1 2-1 3 13 0 26 5 40 6v49h7c8 10 12 20 12 32-4-2-11-12-13-17h-4zm-61 8c0-3 2-8 6-7 1 1 1 2 1 3-2 1-5 2-7 4z"
          />
          <path
            className="country"
            id="Alberta"
            d="M136 205c-1-1-2-3-4-4 0-2 1-4 1-6l-8-8h-4v-5c1 1 1 1 1 2v-3c0-12-4-22-12-32 34 2 69 4 103 6-1 17-3 35-4 52-24-1-49-1-73-2z"
          />
          <path
            className="country"
            id="Central America"
            d="M212 363c-3-4-6-9-9-14 0-7 0-7-2-16-10-6-18-11-28-16v-3h4c0-1-1-3-1-4-9-7-11-18-16-27-1 0-1 1-2 1 4 11 8 20 11 32-6-2-9-10-10-16-4-1-5-2-7-6 0-1 1-1 1-2-2-6-3-10-8-13-1-1-1-3-1-4h14c8 9 18 0 27 10 2 0 4 1 6 2l6 6c-2 8-2 22 5 26h12c4-4 11-4 14 2-2 5-9 8-13 11l6 3v6c-6 4-8 5-11 11 0 1 1 2 1 2 6 1 8 0 13 4-5 3-8 3-12 5z"
          />
          <path
            className="country"
            id="Eastern United States"
            d="m197 293-6-6v-13c1 0 3 0 5-1 1-4 2-8 3-13 2 0 5-1 8-1 0-3 1-6 2-9h18c1-15 1-29 2-43 3 1 6 1 9 1l3 3v3h-3v3c5-1 9-1 13-2 1 1 2 2 2 3 2-1 2-1 6 0v3h-5c-4 6-6 9-7 17 2-1 4-1 5-2 1-3 1-7 2-10h2c1-3 2-4 4-5 3 3 2 5 0 9h4v1c0 2-1 4-1 6 7 1 13-5 20-7v-2l9-3c7 0 7 0 17-2 0-2 0-4 1-5 5-2 5-2 9-2v13c-15 1-18 18-33 21-1 1-2 3-3 5-1 0-1-1-2-1v6c-4 5-11 9-17 11-1 4-1 4-3 8 0 8 0 15-3 22-2 1-4 1-6 2-2-14-2-14-1-20-8 0-10-1-20-2 0 2 1 4 1 6-10-5-19-4-30 0-3 5-3 5-5 6z"
          />
          <path
            className="country"
            id="Greenland"
            d="M373 174c-4-2-6-3-8-8-2 0-4 0-7-1 0-1 0-2-1-3-1 0-2 0-2-1-1-1-1-3-1-5-2-1-3-1-4-2 0-1 1-1 2-2-1-4-2-7-3-11 0 0-1-1-2-1v-5c1-1 2-1 3-1-4-3-2-5 0-9l2 2c0-2 1-5 2-7 2 0 2 0 2-1h-6c0 1 1 2 1 4h-4v-4c0-1 1-1 1-2-1 0-1 0-2-1 1-4 1-4 2-6 6 3 6 3 8 3l-3-6c-2 1-3 1-5 1 0-10-2-22-12-25v-4c-1 0-3 1-4 1-2-2-2-2-3-5-7 1-9 5-17 3-1-3-1-3-2-3v3c-5-1-5-1-8-2-1-4-1-7-2-10 3-1 3-1 10 1v-3c-2 0-5 0-8-1 2-7 10-3 16-7-2-1-3-2-4-3 6-3 10-5 17-7v-2h6c1-4 1-4 4-5 1 0 2 1 3 2 0-2 1-4 2-5 3 0 5 4 6 4v-3c2 0 3 1 4 1 1-1 1-2 1-2 2-1 4-1 6-1 0 1 1 2 1 3 2-1 2-1 10-3l-1-1c1-2 1-2 13-2-1-3-1-6-1-9 3 0 6 0 10-1v3h2c3-9 19-7 26-7v3c13 3 22 7 36 8v3c-2 0-4 1-6 2 5-1 10-3 13 0-4 4-6 4-13 4v3c4 0 9-1 12 2 0-1 1-1 1-2 7-1 14-1 21-2 1 1 1 2 2 3-1 1-1 1-10 3 1 0 1 2 1 3h-4c-2 4-3 9-7 10-1 3-1 6-1 9h3v4c0 1-1 1-2 1v6c-1 0-2 1-3 1v3c2 0 4 0 6 1v4c-8 1-7 5-8 11-2 0-2-3-3-3v3c-3-1-6-4-9-1 2 1 4 2 7 3 0 3 1 6 2 9-2 2-3 4-4 6-2-1-2-1-5-1-3-4-4-8-5-8v5c-2 1-3 1-5 2 3 1 6 1 9 2-1 1-2 3-2 4-10 3-18 8-28 10v-2c-5 4-7 6-12 6v3c-7 2-14 2-20 4 0 7-4 10-8 16-2 8-4 12-8 18z"
          />
          <path
            className="country"
            strokeWidth={4.75}
            d="M213 155c-34-2-69-4-103-6h-7v-49c2 2 5 3 7 4 1-1 1-2 1-3 4-1 4-1 10-1 0 0 0 1 1 1-1 0-2 1-3 1 7 2 7 2 9 3 5-3 13-3 18-3l-1-1h6c3-3 4-3 8-3 0 1-1 2-1 3 2 0 4-1 10-2v3h-3v2c9-4 18 2 27 4v3h-2v3c6 0 9-1 15-2v3h3v-3h4c0-1-3-1-3-2 9-1 13 0 22 2-1 15-2 29-3 44-5-1-10-1-15-1zm15 1c1-15 2-29 3-44 2 0 4-1 6-1-1-4-1-4-2-6 3-1 5-1 8-1v4h6v-2h-3c3-17 9-26 26-28-4 6-5 10-12 10-2 10 0 14 3 23 1-1 2-3 2-4 2 1 3 1 4 2 1 2 1 4 1 6h4v-3c1 0 2-1 3-1 0-1 1-3 1-4h8v-1h-8c0-1 0-2-1-3l-1 1c-4-6-3-7-2-15 5-2 8-4 14-4-1 2-3 4-4 6 0 2 1 4 1 5 2-3 3-5 6-7 0-2 1-4 1-6h12c-2 4-3 7-4 11h6c0-6 0-6 1-7 9 5 9 5 10 6 0 1 0 2-1 3 8 1 8 1 9 2 0 1-1 1-1 2h4c0 1-1 2-1 3 2 1 5 3 7 4 0 1-1 2-1 3h-4v2h4v3h5c1 2 2 5 3 8h2c-1 2-2 4-3 5-2 1-3 1-4 1-2-2-2-2-4-7-1 1-1 1-1 7l3 3c-1 3-1 6-1 9-4 0-5 0-8-3 0 2 0 2 2 6-8-1-14-2-16-10-5 0-10 0-15-1 0-1 1-2 1-3 9-3 13-5 18-6 0-1-1-2-1-3-1 0-3 0-4 1 0-2-1-3-1-5-2 0-4 0-7 1 1-1 1-3 1-3 1-1 2-1 3-1v-3h-2c-1-3-1-5-2-8-1 0-1 0-1 3-3 0-5 1-8 2 0-1-1-2-1-2-1 0-3 0-4 1 0 12-4 20-18 19-2 3-2 4-5 5-3-2-4-4-7-4 1 2 3 4 5 6-5 5-13 8-20 12-1 4-3 7-5 11h-10zm36-11c1-5 3-10 6-15 2 1 4 1 5 1v2h3c1 4 2 4 5 6-1 2-1 2-2 5h-3v-4c-6 1-8 4-14 5zm32-21c-1-6-1-6 5-8v6c-2 0-3 1-5 2zm-101-14c-1-3-3-6-4-8-4-1-9-1-13-2-1-2-2-5-2-8 2 0 4-1 6-2-1 0-3 0-4-1 1-1 1-1 9-3-2 0-4-1-5-1-1-1-1-2-1-3 6-1 7-2 14-2 3 4 5 3 9 5-1 1-1 1-2 1 3 1 6 2 8 2 1-2 1-2 3-3 2 3 2 4 5 5 1-4 3-8 4-12 3 6 3 10 2 17 3 1 5 2 8 3v2c-1 1-2 1-3 1 1 0 1 1 2 1-2 1-3 1-4 2 0 1 1 2 1 3-4 0-5 0-9-2-8 2-16 3-24 5zm40-15c-1-3-2-6-2-9 0-1 1-2 2-3 1 1 1 2 1 3 1-2 2-3 3-4l1 1c0-1 1-2 1-2h4c-1 1-1 3-2 5 3-1 6-2 8-2-3 5-3 5-6 6v2c-4 1-7 2-10 3zm-75-7c0-2-1-4-1-6 2-1 3-1 5-1v-4c6-1 6-1 10-3v-3h5c1 2 1 3 1 5 3-1 5-1 7-1 0 1-1 2-1 3-4 2-8 3-12 5 0 1-1 2-1 3-9 0-9 0-13 2zm92-9v-8c1 1 2 1 3 1 1 3 1 5 1 7h-4zm-53-1c-2-1-3-1-4-2 0-1 1-1 1-1-2-1-3-1-5-1v-3c1 0 3-1 4-2-1 0-1-1-1-1-3 1-6 2-8 3-1-1-1-2-1-2h-4c2-8 15-7 21-7v3c-3 0-3 0-5 2h8c1 1 2 2 2 3 2-1 4-1 6-1-1-1-1-2-1-3 4-3 8-1 14-1v4c-3 0-3 0-3 1h4c-1 1-1 3-1 4-11 1-16 1-27 4zm41-3c-3-2-6-2-9-2 0-3 1-7 1-10h4c0 2 1 3 2 4v-2c3-1 6-2 8-3 1 2 2 4 2 6-5 3-5 3-8 7zm28-1c-5-2-8-3-11-8h-5v-8c-5-1-5-7-6-12h3v3c4 2 5 2 7 6h3c1 4 3 7 5 10 8 0 16 1 24 1 0 2 0 5-1 7-6 0-13 1-19 1zm22-9c-2-1-4-1-6-2v-2c-1-1-2-1-2-1-1 1-1 1-1 2-3 0-5-1-7-1 0-1-1-2-1-3h-4c-1-1-1-2-1-3-4 1-5 1-8-1-1-1-1-2-1-3h9c1-1 1-2 2-3h3c0 1 1 2 1 3h3v-3c-4-1-7-2-10-2 1-2 1-2 9-3 0-1 0-1 1-2-3 0-7-1-10-1v-3c11-7 25-5 38-6-13-5-27 1-40 1-1-1-2-1-2-2 1-1 3-2 5-2 0-2 1-5 1-7 3 0 5 1 8 1 1-1 1-2 2-3 10 0 20-1 30-2v3c18-1 18-1 27-3 0 2 0 4 1 5 4 1 18-1 13 7-1 1-4 1-10 4v3c-4 0-6-1-8 0 0 1 1 1 1 2-1 1-19 6-21 8 0 1 0 2 1 3-7 2-7 2-10 5v3c-5 0-6-1-10-4 0 5 1 6 3 10-2 1-4 1-6 2zm-66-8v-5h4v4c-1 0-2 0-4 1zm17 0c-4-6-9-5-6-13 5 3 5 3 7 4 1 4 1 5-1 9z"
          />
          <path
            className="country"
            strokeWidth={0}
            id="Northwest Territory"
            d="M213 155c-34-2-69-4-103-6h-7v-49c2 2 5 3 7 4 1-1 1-2 1-3 4-1 4-1 10-1 0 0 0 1 1 1-1 0-2 1-3 1 7 2 7 2 9 3 5-3 13-3 18-3l-1-1h6c3-3 4-3 8-3 0 1-1 2-1 3 2 0 4-1 10-2v3h-3v2c9-4 18 2 27 4v3h-2v3c6 0 9-1 15-2v3h3v-3h4c0-1-3-1-3-2 9-1 13 0 22 2-1 15-2 29-3 44-5-1-10-1-15-1zm15 1c1-15 2-29 3-44 2 0 4-1 6-1-1-4-1-4-2-6 3-1 5-1 8-1v4h6v-2h-3c3-17 9-26 26-28-4 6-5 10-12 10-2 10 0 14 3 23 1-1 2-3 2-4 2 1 3 1 4 2 1 2 1 4 1 6h4v-3c1 0 2-1 3-1 0-1 1-3 1-4h8v-1h-8c0-1 0-2-1-3l-1 1c-4-6-3-7-2-15 5-2 8-4 14-4-1 2-3 4-4 6 0 2 1 4 1 5 2-3 3-5 6-7 0-2 1-4 1-6h12c-2 4-3 7-4 11h6c0-6 0-6 1-7 9 5 9 5 10 6 0 1 0 2-1 3 8 1 8 1 9 2 0 1-1 1-1 2h4c0 1-1 2-1 3 2 1 5 3 7 4 0 1-1 2-1 3h-4v2h4v3h5c1 2 2 5 3 8h2c-1 2-2 4-3 5-2 1-3 1-4 1-2-2-2-2-4-7-1 1-1 1-1 7l3 3c-1 3-1 6-1 9-4 0-5 0-8-3 0 2 0 2 2 6-8-1-14-2-16-10-5 0-10 0-15-1 0-1 1-2 1-3 9-3 13-5 18-6 0-1-1-2-1-3-1 0-3 0-4 1 0-2-1-3-1-5-2 0-4 0-7 1 1-1 1-3 1-3 1-1 2-1 3-1v-3h-2c-1-3-1-5-2-8-1 0-1 0-1 3-3 0-5 1-8 2 0-1-1-2-1-2-1 0-3 0-4 1 0 12-4 20-18 19-2 3-2 4-5 5-3-2-4-4-7-4 1 2 3 4 5 6-5 5-13 8-20 12-1 4-3 7-5 11h-10zm36-11c1-5 3-10 6-15 2 1 4 1 5 1v2h3c1 4 2 4 5 6-1 2-1 2-2 5h-3v-4c-6 1-8 4-14 5zm32-21c-1-6-1-6 5-8v6c-2 0-3 1-5 2zm-101-14c-1-3-3-6-4-8-4-1-9-1-13-2-1-2-2-5-2-8 2 0 4-1 6-2-1 0-3 0-4-1 1-1 1-1 9-3-2 0-4-1-5-1-1-1-1-2-1-3 6-1 7-2 14-2 3 4 5 3 9 5-1 1-1 1-2 1 3 1 6 2 8 2 1-2 1-2 3-3 2 3 2 4 5 5 1-4 3-8 4-12 3 6 3 10 2 17 3 1 5 2 8 3v2c-1 1-2 1-3 1 1 0 1 1 2 1-2 1-3 1-4 2 0 1 1 2 1 3-4 0-5 0-9-2-8 2-16 3-24 5zm40-15c-1-3-2-6-2-9 0-1 1-2 2-3 1 1 1 2 1 3 1-2 2-3 3-4l1 1c0-1 1-2 1-2h4c-1 1-1 3-2 5 3-1 6-2 8-2-3 5-3 5-6 6v2c-4 1-7 2-10 3zm-75-7c0-2-1-4-1-6 2-1 3-1 5-1v-4c6-1 6-1 10-3v-3h5c1 2 1 3 1 5 3-1 5-1 7-1 0 1-1 2-1 3-4 2-8 3-12 5 0 1-1 2-1 3-9 0-9 0-13 2zm92-9v-8c1 1 2 1 3 1 1 3 1 5 1 7h-4zm-53-1c-2-1-3-1-4-2 0-1 1-1 1-1-2-1-3-1-5-1v-3c1 0 3-1 4-2-1 0-1-1-1-1-3 1-6 2-8 3-1-1-1-2-1-2h-4c2-8 15-7 21-7v3c-3 0-3 0-5 2h8c1 1 2 2 2 3 2-1 4-1 6-1-1-1-1-2-1-3 4-3 8-1 14-1v4c-3 0-3 0-3 1h4c-1 1-1 3-1 4-11 1-16 1-27 4zm41-3c-3-2-6-2-9-2 0-3 1-7 1-10h4c0 2 1 3 2 4v-2c3-1 6-2 8-3 1 2 2 4 2 6-5 3-5 3-8 7zm28-1c-5-2-8-3-11-8h-5v-8c-5-1-5-7-6-12h3v3c4 2 5 2 7 6h3c1 4 3 7 5 10 8 0 16 1 24 1 0 2 0 5-1 7-6 0-13 1-19 1zm22-9c-2-1-4-1-6-2v-2c-1-1-2-1-2-1-1 1-1 1-1 2-3 0-5-1-7-1 0-1-1-2-1-3h-4c-1-1-1-2-1-3-4 1-5 1-8-1-1-1-1-2-1-3h9c1-1 1-2 2-3h3c0 1 1 2 1 3h3v-3c-4-1-7-2-10-2 1-2 1-2 9-3 0-1 0-1 1-2-3 0-7-1-10-1v-3c11-7 25-5 38-6-13-5-27 1-40 1-1-1-2-1-2-2 1-1 3-2 5-2 0-2 1-5 1-7 3 0 5 1 8 1 1-1 1-2 2-3 10 0 20-1 30-2v3c18-1 18-1 27-3 0 2 0 4 1 5 4 1 18-1 13 7-1 1-4 1-10 4v3c-4 0-6-1-8 0 0 1 1 1 1 2-1 1-19 6-21 8 0 1 0 2 1 3-7 2-7 2-10 5v3c-5 0-6-1-10-4 0 5 1 6 3 10-2 1-4 1-6 2zm-66-8v-5h4v4c-1 0-2 0-4 1zm17 0c-4-6-9-5-6-13 5 3 5 3 7 4 1 4 1 5-1 9z"
          />
          
          <path
            className="country"
            id="Ontario"
            d="M264 231c2-1 2-1 3-6 1 1 3 1 4 2 0-2-1-4-1-6-16-5-8-18-29-10l-3-3c-3 0-6 0-9-1h-20c1-17 3-35 4-52 5 0 10 0 15 1h10v5c1 1 2 1 3 1 0 2 0 4 1 6 2 2 5 3 8 5v3c7 2 15 6 23 5 0 8 1 11 5 17 0 8-1 17-1 25h4v-2c5 0 7 0 11 4l-9 3v2c-7 2-13 8-20 7 0-2 1-4 1-6z"
          />
          <path
            className="country"
            id="Western United States"
            d="M144 275c-15-24-15-33-9-61h4c-1-5-1-5-3-9 24 1 49 1 73 2h20c-1 14-1 28-2 43h-18c-1 3-2 6-2 9-3 0-6 1-8 1-1 5-2 9-3 13-2 1-4 1-5 1v13c-2-1-4-2-6-2-9-10-19-1-27-10h-14z"
          />
          <path
            className="country"
            id="Quebec"
            d="M319 229v-13c-4 0-4 0-9 2-1 1-1 3-1 5-10 2-10 2-17 2-4-4-6-4-11-4v2h-4c0-8 1-17 1-25h3c2-5 2-11 2-17 5-1 7-3 11-6 0-7-1-9-3-15 8-2 7-8 8-16 5 3 10 2 15 2 0 1 1 2 1 3h4c3 6 3 6 4 9h-3c1 3 3 5 4 7 2 1 3 1 5 1v-2l6-3c0-1 0-3 1-5 1-1 3-2 5-2 3 7 4 17 6 24 2 2 5 4 8 6-4 2-4 2-4 4h9c0 3 1 6 1 9-9 2-9 2-15 4-7 7-18 1-22 6 2 1 5 2 7 3 0 1 0 2 1 4-2 0-3 0-4 1 2 1 2 1 2 7h10v3c-9 3-13 9-21 10v-3c2-1 3-2 5-3-1-1-1-1-5 0zm38-10c0-1-1-2-2-4-1 1-2 2-4 3v-3c-2 0-5 0-7-1 0-2 1-3 2-5h3c1-6 9-10 15-11-1 2-1 4-1 5h-4c0 1 0 2 1 3 1-1 2-1 3-1 0 1 1 3 2 4-1 0-2 1-2 1v3c1 0 2 1 3 1 0 1 0 2-1 3-2 1-5 1-8 2z"
          />
        </g>
        <g
          id="South America"
          stroke="#DE7952"
          fill="#E79273"
          visibility="visible"
        >
          <path
            className="country"
            id="Argentina"
            d="M227 487c1 0 3-1 5-2 0 2 1 5 1 8 6 2 5 8 10 10 1-2 2-4 3-5 1 0 2-1 3-1 3 4 4 3 9 1v3h5c4 7 9 7 16 10-1 4-2 7-4 11 4-1 8-1 12-2 2-4 2-4 5-6 1 1 1 2 2 3-4 3-10 8-11 13h7v6c5 1 6 4 10 8 0 2 0 2-3 2 0 1 0 2-1 4-8 3-12-1-19-1 5 5 5 5 7 8 0 0 1 0 1-1v8c-3 2-13 3-16 5-1 6-1 6-2 9h-6c0-1-1-1-1-2v4c0 1 1 2 2 3-3 1-3 1-3 2h2v3h-2c0 1 0 2 1 3-4 4-4 4-4 9 1 0 2 1 3 1-1 3-1 5-1 8-1 0-2 1-3 1 1 3-2 8-2 11l4 4c0 1-1 1-2 2 1 1 1 2 1 3h3v3c6 3 12 6 18 10-14 4-13 3-26 0 1-1 1-1 1-2h-3v-4h-5v-3s-1 1-2 1c-1-1-3-1-5-2v-4c-9-5-9-14-10-23-3 0-3 0-4-2 1-1 1-2 1-3h-2v-4c2 0 2 0 2-1h-2v-6h4v-13c-1 0-2-1-3-1 5-28 6-61 4-89m82 144c-2 0-3-1-4-2-1-3-1-6-1-9 7-7 9-5 18-4 0 1 0 3 1 5-6 2-7 3-10 9-2 1-3 1-4 1zm-14-1c-1-2-1-2-4-3v-2c1 0 2-1 4-1-1-1-2-3-3-4 3-2 6-3 9-4 0 3 0 7 1 10-3 3-3 3-7 4z"
          />
          <path
            className="country"
            id="Brazil"
            d="M292 514c-2-10-4-13-13-18 0-2-1-4-1-6 1-1 2-1 3-1-5-12-5-12-7-14-5-1-5-1-6-3 1-1 1-2 2-2-1-1-2-2-3-2v-4c-8-1-14-5-20-9l-3-6c-5 3-11 8-16 7-2-6-2-6-1-9-4 0-5 2-9 2-5-8-14-6-9-17h3c0-7 1-7 7-9l1 1h8c4-7-1-11 0-18 2-1 5-2 7-2 4 3 6 2 11 2 3-3 3-4 3-9 6-1 7-3 15-4 3 7 3 7 4 13 7-1 14 1 20-4 7 5 13-5 16-11 8 3 7 7 9 16h7c-1 2-2 4-3 5 5 1 10 1 16 3v2c14-1 25 9 38 12-1 14-3 19-14 27 0 3-1 7-1 10-1 1-2 1-3 1v16c-12 18-11 19-31 23v3h-4c-5 8-5 11-5 20-6 3-9 9-11 15h-2c-4-4-5-7-10-8v-6h-7c1-5 7-10 11-13-1-1-1-2-2-3z"
          />
          <path
            className="country"
            id="Peru"
            d="M227 487c-4-1-7-3-10-5v-2c-4-3-8-5-12-7-5-7-17-29-25-34v-7c2-2 4-3 4-7l-3 3c-4-7 4-16 7-22 6 4 14 4 16 10 14 5 14 5 16 6l-1 1c-6 2-7 2-7 9h-3c-5 11 4 9 9 17 4 0 5-2 9-2-1 3-1 3 1 9 5 1 11-4 16-7l3 6c6 4 12 8 20 9v4c1 0 2 1 3 2-1 0-1 1-2 2 1 2 1 2 6 3 2 2 2 2 7 14-1 0-2 0-3 1 0 2 1 4 1 6 9 5 11 8 13 18-3 2-3 2-5 6-4 1-8 1-12 2 2-4 3-7 4-11-7-3-12-3-16-10h-5v-3c-5 2-6 3-9-1-1 0-2 1-3 1-1 1-2 3-3 5-5-2-4-8-10-10 0-3-1-6-1-8-2 1-4 2-5 2z"
          />
          <path
            className="country"
            id="Venezuela"
            d="m219 423 1-1c-2-1-2-1-16-6-2-6-10-6-16-10 1-7 4-13 5-21-1 0-2 0-3-1 0-3 1-7 2-10h3v-5c2 2 3 3 3 6 1 1 2 1 3 2 0-2-1-4-1-6 4-2 8-5 12-8 4-2 7-2 12-5 2 0 3 0 5-1l3 3c-1 1-2 3-4 4 1 2 2 3 3 5v-3c1-1 1-1 2-1v-3c5-1 8 0 13 2 10 0 18-2 21 9h2c1 1 1 2 1 4 6 1 9 3 13 7 1-1 2-1 2-2 5 3 16 7 19 9-3 6-9 16-16 11-6 5-13 3-20 4-1-6-1-6-4-13-8 1-9 3-15 4 0 5 0 6-3 9-5 0-7 1-11-2-2 0-5 1-7 2-1 7 4 11 0 18h-8l-1-1z"
          />
        <g
          id="Lines"
          stroke="#000000"
          fill="#000000"
          visibility="visible"
        > 
        <path
            // Madagascar - Este África
            className="sea-line"
            // Sube baja long [der]      long Sube baja  [izq]
            d="M 586,550 L 570,495" />
        <path
            // Madagascar - Sudáfrica
            className="sea-line"
            // Sube baja long [der]      long Sube baja  [izq]
            d="M 586,549 L 544,580" />
        <path
            className="sea-line"
            // Groenlandia - Islandia
            d="M 387,142 L 418,150" />
        <path
            className="sea-line"
            // Islandia - Escandinavia
            d="M 430,155 L 460,170" />
        <path
            className="sea-line"
            // Escandinavia - Reino Unido
            d="M 441,174 L 460,170" />
        <path
            className="sea-line"
            // Islandia - Reino Unido
            d="M 430,155 L 442,175" />
        <path
            className="sea-line"
            // Africa - América
            d="M 370,430 L 383,420" />

        <path
            className="sea-line"
            // M 566,389 L 580,390"
            d="M 578,418 L 579,386" />
        
        <path
            className="sea-line"
            // M 566,389 L 580,390"
            d="M 1466,589 L 700,390" />
        
        
        </g>
        
        
          
        </g>
      </g>
  </svg>

    </div>
    
    
    );  
  }
}
