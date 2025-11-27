import React, { useEffect, useState } from 'react';
import './App.css';

const API_KEY = "96beaeae4483942701353b3880971b2d";

function App() {
  const [city, setCity] = useState("Toronto");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const getWeather = async (cityName) => {
    try {
      const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };

  useEffect(() => {
    getWeather(city);
  }, []);

  const handleSearch = () => {
    if (city.trim() !== "") {
      getWeather(city);
    }
  };

  return (
      <div className="App">
        <h1>Weather App</h1>
        <div className="search">
          <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {weatherData && (
            <div className="weather-box">
              <h2>{weatherData.name}</h2>
              <p>{weatherData.weather[0].description}</p>
              <img
                  src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt="weather icon"
              />
              <p>Temperature: {weatherData.main.temp}°C</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Wind: {weatherData.wind.speed} m/s</p>
            </div>
        )}
      </div>
  );
}

export default App;
