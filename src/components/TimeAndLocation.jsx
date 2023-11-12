import React from 'react'

export default function TimeAndLocation({ weather: { cityName, countryId, localDate}}) {
  return (
    <div>
        <div className='flex items-center justify-center my-3 sm:my-6'>

            <p className='text-white text-sm sm:text-xl xl:text-2xl font-extralight'>
                {localDate}
            </p>
        </div>

        <div className='flex items-center justify-center my-3'>
            <p className='text-white text-2xl sm:text-3xl xl:text-4xl font-medium'>
                {`${cityName}, ${countryId}`}
            </p>
        </div>
    </div>
  )
}