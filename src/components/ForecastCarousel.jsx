
import React from 'react';
import { iconUrlFromCode } from '../services/weatherService';
import Carousel from 'react-bootstrap/Carousel';

export default function ForecastCarousel({ items }) {
  const numSlides = Math.ceil(items.length / 6);

  return (
    <Carousel
      className='px-3'
      nextIcon={<span className='carousel-control-next-icon ml-10'/>}
      prevIcon={<span className='carousel-control-prev-icon mr-10'/>}
      controls={numSlides > 1}
      indicators={false}
    >
      {Array.from({ length: numSlides }).map((_, slideIndex) => (
        <Carousel.Item key={slideIndex}>
          <div className="flex flex-wrap text-white justify-around lg:justify-between">
            {items
              .slice(slideIndex * 6, (slideIndex + 1) * 6)
              .map((item, itemIndex) => (
                <div className="w-full sm:w-1/6 p-2" key={itemIndex}>
                  <div className="flex sm:flex-col items-center justify-evenly sm:justify-center">
                    <p className="font-light text-sm">{item.time}</p>
                    <img
                      src={iconUrlFromCode(item.icon)}
                      alt=""
                      className="w-12 sm:my-1"
                    />
                    <p className="font-medium">{item.temperature.toFixed()}°</p>
                  </div>
                </div>
              ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}