import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink
import c from "../images/c.jpg"
import d from "../images/d.jpg"
import e from "../images/e.jpg"
import f from "../images/f.jpg"
import front from "../images/front.jpg";
import "../App.css"

const Home = () => {
  return (
    <div className="home-container">
      {/* Cards Section */}
      <div className="card-container" >
        {/* Card 1 */}
        <NavLink to="/temp" className="card" style={{"padding":"0px"}}>
          <img src={c} className="card-img-top" alt="Temperature" />
          <div className="card-body">
            <h5 className="card-title" style={{textDecoration:"none"}}>Temperature</h5>
            <p className="card-text" style={{textDecoration:"none"}}>
              View today's temperature and its graph representation.
            </p>
          </div>
        </NavLink>
 
        {/* Card 2 */}
        <NavLink to="/wind" className="card"style={{"padding":"0px"}}>
          <img src={e} className="card-img-top" alt="Wind" />
          <div className="card-body">
            <h5 className="card-title" style={{textDecoration:"none"}}>Wind</h5>
            <p className="card-text" style={{textDecoration:"none"}}>Check the wind speed and view its graph.</p>
          </div>
        </NavLink>
 
        {/* Card 3 */}
       <div className="pressure">
        <NavLink to="/pressure" className="card "style={{"padding":"0px"}}>
          <img src={f} className="card-img-top" alt="Pressure" />
          <div className="card-body">
            <h5 className="card-title" style={{textDecoration:"none"}}>Pressure</h5>
            <p className="card-text" style={{textDecoration:"none"}}>
              Explore the pressure data and its graphical representation.
            </p>
          </div>
        </NavLink>
        </div>

 
        <NavLink to="/humidity" className="card" style={{"padding":"0px"}}>
          <img src={front} className="card-img-top" alt="Humidity" />
          <div className="card-body">
            <h5 className="card-title" style={{textDecoration:"none"}}>Humidity</h5>
            <p className="card-text" style={{textDecoration:"none"}}>
              Discover the humidity levels along with a graph.
            </p>
          </div>
        </NavLink>
 
        {/* Card 5 */}
        <NavLink to="/cloud" className="card" style={{"padding":"0px"}}>
          <img src={d} className="card-img-top" alt="Clouds" />
          <div className="card-body">
            <h5 className="card-title" style={{textDecoration:"none"}}>Clouds</h5>
            <p className="card-text" style={{textDecoration:"none"}}>
              See the cloud coverage and its graphical data.
            </p>
          </div>
        </NavLink>
      </div>
    </div>
  );
};
 
export default Home;