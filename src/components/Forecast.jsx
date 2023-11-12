import React from 'react';
import ForecastCarousel from './ForecastCarousel'; // Adjust the import path

export default function Forecast({ title, items }) {
  return (
    <div>
      <div className='flex items-center justify-start mt-6 ml-3 xl:ml-0'>
        <p className='text-white font-medium uppercase'>{title}</p>
      </div>
      <hr className='my-2' />
      <ForecastCarousel items={items} />
    </div>
  );
}