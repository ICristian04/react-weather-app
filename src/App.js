import './App.css';
import getLocationPromise from './services/location'
import Forecast from './components/Forecast';
import Inputs from './components/Inputs';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import TimeAndLocation from './components/TimeAndLocation';
import TopButtons from './components/TopButtons';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';


function App() {

  const [location, setLocation] = useState();
  const [isMetric, setIsMetric] = useState(true);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const  getLocation = async () => {
      const {lat, lng} = await getLocationPromise();
      setLocation({lat: lat, lng: lng})
    }

    getLocation();
  }, [])

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData(location, isMetric)
      .then((data) => {
        setWeather(data);
      })
    };

    fetchWeather();
  }, [location, isMetric])

  const formatBackground = () => {
    const threshold = isMetric === true ? 20 : 70
    if(!weather || weather.formattedCurrentWeather.temperature <= threshold)
      return 'from-cyan-500 to-blue-500';
    
    return 'from-yellow-500 to-orange-500';
  }

  return (
    <div className={`bg-gradient-to-br ${formatBackground()} h-fit shadow-xl shadow-gray-40`}>
      <div className={`mx-auto py-6 md:px-16 lg:px-32`} >
        <TopButtons setLocation={setLocation}/>
        <Inputs setLocation={setLocation} setIsMetric={setIsMetric}/>
        
      </div>
      <div className={`mx-auto  xl:max-w-screen-xl`} >
        {weather && (
          <div className='pb-10'>
            <TimeAndLocation weather={weather}/>
            <TemperatureAndDetails weather={weather}/>
            <Forecast title='hourly forecast' items={weather.formattedHourlyForecast}/>
            <Forecast title='daily forecast' items={weather.formattedDailyForecast.formattedForecast}/>
            
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
