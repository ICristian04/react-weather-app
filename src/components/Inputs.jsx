import React, { useRef, useState } from "react";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";
import { UilSearch } from '@iconscout/react-unicons'
import { UilLocationPoint } from '@iconscout/react-unicons'
import getLocationPromise from '../services/location';



export default function Inputs({setLocation, setIsMetric}) {
    const [libraries] = useState(['places'])
    const inputRef = useRef();

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        libraries 
    });

    const [address, setAddress] = useState("");

    const handlePlaceChanged = () => { 
        if(inputRef.current.getPlaces()){
            const [place] = inputRef.current.getPlaces();
            if(place) { 
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();
                setLocation({lat: lat, lng: lng})
                setAddress('')
            } 
        }
    }

    const handleSearchClick = () => {
        if(address !== ''){
            setLocation({city: address})
            setAddress('')
        }
    }



    const handleLocationClick = async () => {
        const {lat, lng} = await getLocationPromise();
        setLocation({lat: lat, lng: lng})
        setAddress('');
    }

    return (
        isLoaded
        &&
        <StandaloneSearchBox
            onLoad={ref => inputRef.current = ref}
            onPlacesChanged={handlePlaceChanged}
        >
            <div className="flex flex-row items-center justify-center my-6 mx-3 sm:mx-20 sm:px-5 md:px-10 xl:px-20 xxl:px-28">
                <div className='flex flex-row w-full items-center justify-center space-x-4'>
                    <input
                        type="text"
                        className='text-sm sm:text-lg md:text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase'
                        placeholder="search for city"
                        onChange={(e) => setAddress(e.currentTarget.value)}
                        
                    />
                    <UilSearch
                        size={25}
                        className='text-white cursor-pointer transition ease-out hover:scale-125'
                        onClick={handleSearchClick}
                    />
                    <UilLocationPoint
                        size={25}
                        className='text-white cursor-pointer transition ease- hover:scale-125'
                        onClick={handleLocationClick}
                    />
                </div>

                <div className='flex flex-row w-1/10 items-center justify-center ml-4'>
                    <button 
                        name='metric'
                        className='text-sm sm:text-lg text-white font-light transition ease- hover:scale-125'
                        onClick={() => setIsMetric(true)}
                    >°C</button>
                    <p className='text-sm sm:text-lg text-white mx-2 pt-2.5'> | </p>
                    <button 
                        name='imperial'
                        className='text-sm sm:text-lg text-white font-light transition ease- hover:scale-125'
                        onClick={() => setIsMetric(false)}
                    >°F</button>
                </div>
            </div>
        </StandaloneSearchBox>
    );
};