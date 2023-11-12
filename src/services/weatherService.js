import { DateTime } from "luxon";
const API_KEY = process.env.REACT_APP_ACCUWEATHER_API_KEY;


const getCity = async (city, lat='', lng='') => {
    const baseUrl = 'http://dataservice.accuweather.com/locations/v1/cities/';
    let query;
    if(city){
        query = `search?apikey=${API_KEY}&q=${city}`;
        const response = await fetch(baseUrl + query);
        const data = await response.json();
    
        return data[0];
    } else if (lat && lng) {
        query = `geoposition/search?apikey=${API_KEY}&q=${lat}%2C%20${lng}`;

        const response = await fetch(baseUrl + query);
        const data = await response.json();
    
        return data;
    }

}

const getCurrentWeather = async (id) => {
    const baseUrl = `http://dataservice.accuweather.com/currentconditions/v1/${id}`;
    const query = `?apikey=${API_KEY}&details=true`;

    const response = await fetch(baseUrl + query)
    const data = await response.json();

    return data[0];
}

const getDailyForecast = async (id, isMetric) => {
    const baseUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${id}`;
    const query = `?apikey=${API_KEY}&details=true&metric=${isMetric}`;

    const response = await fetch(baseUrl + query)
    const data = await response.json();

    return data;
}

const getHourlyForecast = async (id, isMetric) => {
    const baseUrl = `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${id}`;
    const query = `?apikey=${API_KEY}&metric=${isMetric}`;

    const response = await fetch(baseUrl + query)
    const data = await response.json();

    return data;
}

const formatCurrentWeather = (data, isMetric) => {
    const {
        IsDayTime: isDayTime,
        WeatherText: weatherText,
        WeatherIcon: weatherIcon,
        Wind: {Speed : {Metric : {Value : windSpeed}}},
        Temperature: {Metric : {Value : tempC}, Imperial: {Value : tempF}},
        RealFeelTemperature: {Metric : {Value : realFeelC}, Imperial : {Value : realFeelF}},
        RelativeHumidity : relativeHumidity
    } = data;
    
    const temperature = isMetric ? tempC : tempF;
    const realFeel = isMetric ? realFeelC : realFeelF;

    return {
        isDayTime,
        weatherText,
        weatherIcon,
        windSpeed,
        temperature,
        relativeHumidity,
        realFeel
    }
}

const formatDailyForecast = (data, timeZone) => {
    const firstDay = data.DailyForecasts[0];
    const {
        Sun: { EpochRise: sunrise, EpochSet: sunset },
        Temperature: {
          Maximum: { Value: temperatureMax },
          Minimum: { Value: temperatureMin },
        },
      } = firstDay;

    const formattedSunrise = formatToLocalTime(sunrise, timeZone, 'hh:mm a');
    const formattedSunset = formatToLocalTime(sunset, timeZone, 'hh:mm a');

    const formattedForecast = data.DailyForecasts.slice(1).map((day) => {
        const {
            EpochDate : time,
            Temperature: {Maximum : { Value : temperature}},
            Day: { Icon: icon }
        } = day;
        const formattedDate = formatToLocalTime(time, timeZone, 'ccc')
        return { time: formattedDate, temperature, icon };
    })

    return {
        sunrise : formattedSunrise,
        sunset : formattedSunset,
        temperatureMax,
        temperatureMin,
        formattedForecast
    }
}

const formatHourlyForecast = async (data, timeZone) => {
   const hourlyForecast = data.map((h) => {
        const {
            EpochDateTime : time,
            WeatherIcon : icon,
            Temperature : { Value : temperature}
        } = h;

        const formattedTime = formatToLocalTime(time, timeZone, 'hh:mm a')

        return {
            time : formattedTime,
            icon,
            temperature
        }
    })

    return hourlyForecast;
}


const getFormattedWeatherData = async (location, isMetric = true) => {
    try{
        const {
            Key : cityId,
            EnglishName : cityName,
            Country : { ID : countryId},
            TimeZone : { Name : timeZone}
        } = await getCity(location.city, location.lat, location.lng);
    
        const dateEpochTime = Math.floor(new Date().getTime() / 1000)
        const localDate = formatToLocalTime(dateEpochTime, timeZone) //move this to another fc
    
        const formattedCurrentWeather = await getCurrentWeather(cityId).then((data) => formatCurrentWeather(data, isMetric));
    
        const formattedDailyForecast = await getDailyForecast(cityId, isMetric).then((data) => formatDailyForecast(data, timeZone));
    
        const formattedHourlyForecast = await getHourlyForecast(cityId, isMetric).then((data) => formatHourlyForecast(data, timeZone));
    
        return{
            cityName,
            countryId,
            localDate,
            formattedCurrentWeather,
            formattedDailyForecast,
            formattedHourlyForecast
        }
    }catch(e){
        console.log("City not Found")
    }
}


const formatToLocalTime = (secs, zone, format="cccc, dd LLLL yyyy' | Local time: 'hh:mm a") =>
     DateTime.fromSeconds(secs)
             .setZone(zone)
             .toFormat(format)


const iconUrlFromCode = (code) => {
    const formattedCode = code < 10 ? `0${code}` : code;
    return `https://developer.accuweather.com/sites/default/files/${formattedCode}-s.png`;
};
export default getFormattedWeatherData;

export {iconUrlFromCode}