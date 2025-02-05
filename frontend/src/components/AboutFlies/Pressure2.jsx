import React from "react";
import "./Temperature.css"; // Make sure to import the CSS file

const Pressure2 = () => {
  return (
    <div className="pressure-container">
      <h1>Understanding Air Pressure</h1>
      <p>
        Back on Earth, as elevation increases, the number of molecules decreases
        and the density of air therefore is less, which means there is a
        decrease in air pressure. In fact, while the atmosphere extends hundreds
        of miles up, one half of the air molecules in the atmosphere are
        contained within the first 18,000 feet (5.6 km).
      </p>
      <p>
        This decrease in pressure with height makes it very hard to compare the
        air pressure at ground level from one location to another, especially
        when the elevations of each site differ. Therefore, to give meaning to
        the pressure values observed at each station, we convert the station air
        pressures reading to a value with a common denominator.
      </p>
      <small>Source: Meteorological Studies</small>
    </div>
  );
};

export default Pressure2;
