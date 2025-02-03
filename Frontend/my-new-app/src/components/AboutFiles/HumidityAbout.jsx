import React from 'react';
import './Temperature.css'; // Make sure to import the CSS file

const HumidityAbout = () => {
  return (
    <div className="humidityabout-container">
      <h1>Understanding Humidity</h1>
      <p>
        <span className="highlight">Humidity</span>, the amount of water vapour in the air, is the most variable characteristic of the atmosphere and constitutes a major factor in climate and weather. A brief treatment of humidity follows. For full treatment, see climate: Atmospheric humidity and precipitation.
      </p>
      <p>
        Atmospheric water vapour is an important factor in weather for several reasons. It regulates air temperature by absorbing thermal radiation both from the Sun and the Earth. Moreover, the higher the vapour content of the atmosphere, the more latent energy is available for the generation of storms. In addition, water vapour is the ultimate source of all forms of condensation and precipitation.
      </p>
      <p>
        Water vapour enters the atmosphere primarily by the evaporation of water from the Earth’s surface, both land and sea. The water-vapour content of the atmosphere varies from place to place and from time to time because the humidity capacity of air is determined by temperature. At 30 °C (86 °F), for example, a volume of air can contain up to 4 percent water vapour. At -40 °C (-40 °F), however, it can hold no more than 0.2 percent.
      </p>
      <small>Source: Meteorological Studies</small>
    </div>
  );
}

export default HumidityAbout;
