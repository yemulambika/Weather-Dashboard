import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink
import "../App.css";
import "bootstrap/dist/css/bootstrap.css";
import "./About.css";

const About = () => {
  return (
    <div className="zigzag-container">
      <div className="card-about card-left">
        <div className="card-body">
          <h5 className="card-title-about">Temperature</h5>
          <p className="card-text-about">
            Temperature is a physical quantity that quantitatively expresses the
            attribute of hotness or coldness. Temperature is measured with a
            thermometer. It reflects the average kinetic energy of the vibrating
            and colliding atoms making up a substance. Thermometers are
            calibrated in various temperature scales that historically have
            relied on various reference points and thermometric substances for
            definition. The most common scales are the Celsius scale with the
            unit symbol °C (formerly called centigrade), the Fahrenheit scale
            (°F), and the Kelvin scale (K), with the third being used
            predominantly for scientific purposes.
          </p>
          {/* Use NavLink instead of <a> */}
          <NavLink to="/Temperature">Read More about Temperature...</NavLink>
        </div>
      </div>

      <div className="card-about card-right">
        <div className="card-body">
          <h5 className="card-title-about">Wind Speed</h5>
          <p className="card-text-about">
            In meteorology, wind speed, or wind flow speed, is a fundamental
            atmospheric quantity caused by air moving from high to low pressure,
            usually due to changes in temperature. Wind speed is now commonly
            measured with an anemometer. Wind speed affects weather forecasting,
            aviation and maritime operations, construction projects, growth and
            metabolism rates of many plant species, and has countless other
            implications.[2] Wind direction is usually almost parallel to
            isobars (and not perpendicular, as one might expect), due to Earth's
            rotation.
          </p>
          {/* Use NavLink instead of <a> */}
          <NavLink to="/WindAbout">Read More about Wind Speed...</NavLink>
        </div>
      </div>

      <div className="card-about card-left">
        <div className="card-body">
          <h5 className="card-title-about">Humidity</h5>
          <p className="card-text-about">
            The same amount of water vapor results in higher relative humidity
            in cool air than warm air. A related parameter is the dew point. The
            amount of water vapor needed to achieve saturation increases as the
            temperature increases. As the temperature of a parcel of air
            decreases it will eventually reach the saturation point without
            adding or losing water mass. The amount of water vapor contained
            within a parcel of air can vary significantly. For example, a parcel
            of air near saturation may contain 8 g of water per cubic metre of
            air at 8 °C (46 °F), and 28 g of water per cubic metre of air at 30
            °C (86 °F)
          </p>
          {/* Use NavLink instead of <a> */}
          <NavLink to="/HumidityAbout">Read More about Humidity...</NavLink>
        </div>
      </div>

      <div className="card-about card-right">
        <div className="card-body">
          <h5 className="card-title-about">Pressure</h5>
          <p className="card-text-about">
            Various units are used to express pressure. Some of these derive
            from a unit of force divided by a unit of area similarly, the
            pound-force per square inch (psi, symbol lbf/in2) is the traditional
            unit of pressure in the imperial and US customary systems. Pressure
            may also be expressed in terms of standard atmospheric pressure; the
            unit atmosphere (atm) is equal to this pressure, and the torr is
            defined as 1⁄760 of this. Manometric units such as the centimetre of
            water, millimetre of mercury, and inch of mercury are used to
            express pressures in terms of the height of column of a particular
            fluid in a manometer.
          </p>
          {/* Use NavLink instead of <a> */}
          <NavLink to="/Pressure2">Read More about Pressure...</NavLink>
        </div>
      </div>

      <div className="card-about card-left">
        <div className="card-body">
          <h5 className="card-title-about">Cloud Coverage</h5>
          <p className="card-text-about">
            Cloud cover (also known as cloudiness, cloudage, or cloud amount)
            refers to the fraction of the sky obscured by clouds on average when
            observed from a particular location. Okta is the usual unit for
            measurement of the cloud cover. The cloud cover is correlated to the
            sunshine duration as the least cloudy locales are the sunniest ones
            while the cloudiest areas are the least sunny places, as clouds can
            block sunlight, especially at sunrise and sunset where sunlight is
            already limited.
          </p>
          {/* Use NavLink instead of <a> */}
          <NavLink to="/CloudCoverage">
            Read More about Cloud Coverage...
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default About;
