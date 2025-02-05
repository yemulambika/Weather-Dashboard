import React from 'react';
import './Temperature.css'; 

const Temperature = () => {
  return (
    <div className="temperature-container">
      <h1>Understanding Temperature and Its Impact on Weather</h1>
      <p>
        The first factor that affects Weather is <span className="highlight">temperature</span>.
        Temperature is a measure of the kinetic energy within the particles of an object, or how hot or cold an object is.
        An object with higher kinetic energy means the particles move faster, creating heat.
        While an object with lower kinetic energy means the particles move much slower and leading to colder temperatures.
      </p>
      <p>
        When referring to the Weather, the object described is air masses. As air temperature increases, the ability of an air mass to absorb water vapor is increased.
        An increase of water vapor in the air mass leads to an increase in the chances of rain and thunderstorms.
      </p>
      <p>
        Temperature varies with height above sea level, an increase in height leads to a decrease in temperature.
        The collision of hot and cold air masses can also affect the Weather due to the differences in the density of the air masses.
      </p>
      <small>Source: Meteorological Studies</small>
    </div>
  );
}

export default Temperature;
