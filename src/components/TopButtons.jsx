import React from 'react'

export default function TopButtons({setLocation}) {
    const cities = [
        {
            id:1,
            title: 'London'
        },
        {
            id:2,
            title: 'Paris'
        },
        {
            id:3,
            title: 'Cluj-Napoca'
        },
        {
            id:4,
            title: 'Bucuresti'
        },      
        {
            id:5,
            title: 'Campia Turzii'
        }
    ]

    return <div className='flex items-center justify-around my-6'>
        {cities.map((city) => (
            <button key={city.id} 
                className='text-white text-sm sm:text-lg font-med transition ease- hover:scale-110'
                onClick={() => setLocation({city: city.title})}
            >{city.title}</button>
        ))}
    </div>
  
}
