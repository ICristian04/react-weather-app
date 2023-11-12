import React from 'react'
import {
    UilTemperature,
    UilTear,
    UilWind,
    UilSun,
    UilSunset,
} from '@iconscout/react-unicons'
import { iconUrlFromCode } from '../services/weatherService'

export default function TemperatureAndDetails({weather: {
    formattedCurrentWeather: weather,
    formattedDailyForecast: {sunrise, sunset, temperatureMax, temperatureMin}
    }}) {
        return (
            <div>
                
                <div className='flex items-center justify-center sm:py-6 text-md sm:text-xl text-cyan-300'>
                    <p>{weather.weatherText}</p>
                </div>

                <div className='flex flex-col justify-center  sm:flex-row items-center sm:justify-between text-white py-3 sm:ml-20'>
                    <img src={iconUrlFromCode(weather.weatherIcon)} alt="" className='w-20'/>
                    <div className=''>
                        <p className='text-5xl'>{weather.temperature.toFixed()}°</p>
                    </div>
                    <div className='flex flex-col space-y-2  justify-center items-center  sm:items-start px-2'>

                        <div className='flex font-light text-sm items-center justify-center'>
                            <UilTemperature size={18} className='mr-1'/>
                            Real feel:
                            <span className='font-medium ml-1'>{weather.realFeel.toFixed()}°</span>
                        </div>

                        <div className='flex font-light text-sm items-center justify-center'>
                            <UilTear size={18} className='mr-1'/>
                            Humidity:
                            <span className='font-medium ml-1'>{weather.relativeHumidity}%</span>
                        </div>

                        <div className='flex font-light text-sm items-center justify-center'>
                            <UilWind size={18} className='mr-1'/>
                            Wind Speed:
                            <span className='font-medium ml-1'>{weather.windSpeed} km/h</span>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col sm:flex-row items-center justify-center sm:space-x-2 md:space-x-7 text-white text-sm py-3'>
                    <div className='flex flex-row items-center justify-center space-x-1'>
                        <UilSun className='mb-3'/>
                        <p className='font-light'>
                            Rise: <span className='font-medium ml-1'> {sunrise}</span>
                        </p>
                    </div>
                    <p className='font-light'>|</p>


                    <div className='flex flex-row items-center justify-center space-x-1'>
                        <UilSunset className='mb-3'/>
                        <p className='font-light'>
                            Set: <span className='font-medium ml-1'> {sunset}</span>
                        </p>
                    </div>
                    <p className='font-light'>|</p>

                    <div className='flex flex-row items-center justify-center space-x-1'>
                        <UilSun className='mb-3'/>
                        <p className='font-light'>
                            High: <span className='font-medium ml-1'> {temperatureMax.toFixed()}°</span>
                        </p>
                    </div>
                    <p className='font-light'>|</p>

                    <div className='flex flex-row items-center justify-center space-x-1'>
                        <UilSun className='mb-3'/>
                        <p className='font-light'>
                            Low: <span className='font-medium ml-1'> {temperatureMin.toFixed()}°</span>
                        </p>
                    </div>
                
                </div>
            </div>
        )
}