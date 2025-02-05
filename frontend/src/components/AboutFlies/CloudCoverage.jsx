import React from "react";
import "./Temperature.css";

const CloudCoverage = () => {
  return (
    <div className="cloud-coverage-container">
      <h1>Understanding Cloud Coverage</h1>
      <p>
        Cloud cover (also known as cloudiness, cloudage, or cloud amount) refers
        to the fraction of the sky obscured by clouds on average when observed
        from a particular location.
      </p>
      <p>
        <span className="highlight">Okta</span> is the usual unit for
        measurement of the cloud cover. The cloud cover is correlated to the
        sunshine duration as the least cloudy locales are the sunniest ones
        while the cloudiest areas are the least sunny places, as clouds can
        block sunlight, especially at sunrise and sunset where sunlight is
        already limited.
      </p>
      <p>Partial cloud cover over the North Atlantic Ocean.</p>
      <p>Complete cloud coverage over France.</p>
      <small>Source: Meteorological Studies</small>
    </div>
  );
};

export default CloudCoverage;
