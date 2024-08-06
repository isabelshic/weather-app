import React, { useState } from 'react';
import { fetchWeather } from '../services/weatherServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faSearch } from '@fortawesome/free-solid-svg-icons';

const weatherImages = {
  Clear: '/images/clear.png',
  Clouds: '/images/cloud.png',
  Rain: '/images/rain.png',
  Snow: '/images/snow.png',
  Haze: '/images/haze.png',
  Thunderstorm: '/images/thunder.png'
};

const WeatherCard = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const handleSearch = async () => {
    const data = await fetchWeather(city);
    setWeather(data);
  };

  const getWeatherImage = (weather) => {
    return weatherImages[weather] || '/images/temperature.png';
  };

  return (
    <div className="bg-white rounded-sm border border-black p-5 m-4 w-fit mx-auto">
      <div className="flex items-center pb-4">
        <FontAwesomeIcon icon={faLocationDot} className="pr-2 text-black" />
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border-b border-b-zinc-300 p-2 flex-grow font-roboto-mono"
        />
        <button
          onClick={handleSearch}
          className="text-black p-2 ml-4"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      {weather && (
        <div className="text-center">
          <img
            src={getWeatherImage(weather.weather[0].main)}
            alt={weather.weather[0].main}
            className="w-20 h-20 my-8 object-cover mx-auto"
          />
          <div className="flex justify-center items-start">
            <h1 className="text-4xl font-semibold font-roboto-mono pr-2">{weather.main.temp}</h1>
            <p className="tet-sm font-semibold font-roboto-mono">°F</p>
          </div>
          <p className="font-roboto-mono pb-10">{weather.weather[0].description}</p>
          <div className="pt-2 flex justify-center border-t">
            <div className="flex justify-center items-center border border-white px-4 py-4 mr-4 rounded-sm">
                <img src="/images/humidity.png" className="w-8 h-8 mr-4"></img>
                <div className="text-start pr-2">
                    <p className="text-xl font-semibold font-roboto-mono pr-4">{weather.main.humidity}%</p>
                    <p className="text-sm font-roboto-mono">Humidity</p>
                </div>
            </div>
            <div className="flex justify-center items-center border border-white px-4 py-2 rounded-sm">
                <img src="/images/wind.png" className="w-8 h-8 mr-4"></img>
                <div className="text-start">
                    <p className="text-xl font-semibold font-roboto-mono pr-4">{weather.wind.speed} mph</p>
                    <p className="text-sm font-roboto-mono">Wind Speed</p>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
