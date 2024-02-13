import React, { useState } from 'react';
import './App.css'
import Png8 from "./assets/8 1.png";
import Png1 from "./assets/8 1 (2).png"
import Png2 from "./assets/8 1 (3).png"
import Png3 from "./assets/8 1 (1).png"


const url = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '4f8d5ffc1a3bcda9509d775b3bcfbd6d';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  async function getWeather() {
    try {
      const res = await fetch(`${url}${city}&appid=${apiKey}`);
      const data = await res.json();
      console.log(data);
      
     

      const weatherData = {
        location: `${data.name}`,
        temperature: `${Math.floor(data.main.temp-273.15)}`,
        humidity: `${data.main.humidity} %`,
        wind: `${data.wind.speed} km/h`,
        condition: `${data.weather[0].main}`,
      };

      const condition = data.weather[0].main.toLowerCase();
      if (condition.includes('cloudy')) {
        setImageUrl(Png8);
      } else if (condition.includes('snow')) {
        setImageUrl(Png1)
      } else if (condition.includes('clear')) {
         setImageUrl(Png2)
      } else if (condition.includes('rain')) {
         setImageUrl(Png3)
      } else if (condition.includes('smoke')) {
        setImageUrl('https://i.pinimg.com/564x/59/a3/56/59a356e223ec070f27977981a4337f91.jpg')
     } else if (condition.includes('clouds')) {
        setImageUrl('https://static.vecteezy.com/system/resources/thumbnails/005/502/367/small/solid-cloud-illustration-glyph-icon-free-vector.jpg')
     }
      else {
         setImageUrl('https://cdn-icons-png.flaticon.com/512/10127/10127236.png')
      }
      // const condition = data.weather[0].main.toLowerCase();
      // switch (condition) {
      //   case 'cloudy':
      //     setImageUrl(Png8);
      // case 'snow':
      //   setImageUrl(Png1)
      //   case 'clear':
      //     setImageUrl(Png2)
      //    case 'rain':
      //     setImageUrl(Png3)
      //     case 'smoke':
      //       setImageUrl('https://i.pinimg.com/564x/59/a3/56/59a356e223ec070f27977981a4337f91.jpg')
      //       case 'clouds':
      //         setImageUrl('https://static.vecteezy.com/system/resources/thumbnails/005/502/367/small/solid-cloud-illustration-glyph-icon-free-vector.jpg')
      //   default:
      //     setImageUrl('https://cdn-icons-png.flaticon.com/512/10127/10127236.png')
      //     break;
      // }

      setWeather(weatherData);
    } catch (error) {
      setError('City not found');
    }
  }

  const handleInputChange = (e) => {
    setCity(e.target.value);
    setError(''); // Clear error when input changes
    setWeather(null); // Clear weather data when input changes
  }

  return (
    <div className="container">
      <div className="search">
        <h1>Прогноз погоды</h1>
        <div className="search-btn">
          <input
            type="text"
            value={city}
            onChange={handleInputChange} // Handle input change
            placeholder='Введите название города'
          />
          <button onClick={getWeather}>Показать</button>
        </div>
      </div>
      {error && <h2 className='h2'>{error}</h2>}
      {weather && (
        <div className="card">
          <div className="card-in">
            <h2>{weather.location}</h2>
            <div className="cradus-icons">
              <h3>{weather.temperature}°c</h3>
              <img src={imageUrl} alt="" />
            </div>
            <p>{weather.condition}</p>
            <div className="text-1">
              <p>Wind</p><span>{weather.wind}</span>
            </div>
            <div className="text-1">
              <p>Humidity</p><span>{weather.humidity}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
