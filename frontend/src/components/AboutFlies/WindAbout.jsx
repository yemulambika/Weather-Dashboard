import React from "react";
import "./Temperature.css"; // Make sure to import the CSS file

const WindAbout = () => {
  return (
    <div className="windabout-container">
      <h1>Understanding Wind Speed and Direction</h1>
      <p>
        The normal unit of wind speed is the{" "}
        <span className="highlight">knot</span> (nautical mile per hour = 0.51 m
        sec<sup>-1</sup> = 1.15 mph). Wind direction is measured relative to
        true north (not magnetic north) and is reported from where the wind is
        blowing. An easterly wind blows from the east or 90 degrees, a southerly
        from the south or 180 degrees, and a westerly from the west or 270
        degrees.
      </p>
      <p>
        Wind speed normally increases with height above the earth's surface and
        is much affected by such factors as the roughness of the ground and the
        presence of buildings, trees, and other obstacles in the vicinity.
      </p>
      <p>
        The optimal exposure for the measurement of wind is over level ground of
        uniform roughness with no large obstacles within 300 m of the tower. In
        practice, few sites in the observing network meet this requirement
        exactly for all incident wind directions, but most are reasonably
        representative of an open site.
      </p>
      <small>Source: Meteorological Studies</small>
    </div>
  );
};

export default WindAbout;
