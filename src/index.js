import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import useDateInfo from './useDateInfo';
import './styles.css';

// eslint-disable-next-line no-unused-vars
const dataEndpoint = 'https://emuentes.github.io/example/weatherForecastData.json';

function App() {
  const [weatherDataArray, setweatherDataArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(dataEndpoint);
      const data = await response.json();
      setweatherDataArray(data.list);
    };
    fetchData();
  }, []);

  const filteredWeatherDataArray = weatherDataArray.reduce((acc, cur) => {
    const dayOfWeekName = useDateInfo(cur.dt).dayOfWeekName;
    if (acc.length === 0 || dayOfWeekName !== acc[acc.length - 1].dayOfWeekName) {
      acc.push({ dayOfWeekName, tempMin: cur.main.temp_min, tempMax: cur.main.temp_max });
    }
    if (dayOfWeekName === acc[acc.length - 1].dayOfWeekName) {
      acc[acc.length - 1].tempMin = acc[acc.length - 1].tempMin > cur.main.temp_min ? cur.main.temp_min : acc[acc.length - 1].tempMin;
      acc[acc.length - 1].tempMax = acc[acc.length - 1].tempMax < cur.main.temp_max ? cur.main.temp_max : acc[acc.length - 1].tempMax;
    }
    return acc;
  }, []);

  return (
    <div className='App'>
      <h1>Hello Candidate!</h1>
      <h2>Our Goal:</h2>
      <img alt='weather forecast example' src='https://emuentes.github.io/example/weatherWidgetExample.png' width='500px' />
      <h2>Your Code:</h2>
      <div className='weather-tiles'>
        {filteredWeatherDataArray.map(({ dayOfWeekName, tempMin, tempMax }) => {
          return (
            <div className='weather-tile'>
              <p>{dayOfWeekName.substring(0, 3)}</p>
              <div className='weather-tile_temps'>
                <span>{Math.floor(tempMin)}</span>
                <span>{Math.floor(tempMax)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
