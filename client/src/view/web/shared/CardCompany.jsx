import React, { useState } from 'react';
import { Hrz, Imagez } from '@components/core';

const CardCompany = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-xl bg-white shadow-md text-color transition-all duration-500 my-4
        ease-in-out mx-4 ${isHovered ? 'translate-y-[-16px]' : ''} cursor-pointer`}
    >
      <div className={`absolute rounded-md inset-0 justify-center items-center group-hover:flex flex`}>
        {isHovered && <div className="absolute inset-0 rounded-xl bg-black bg-opacity-50 opacity-50 z-[5]"></div>}
        <div
          className={`font-medium z-10 duration-300 ease-in-out transform 
            ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        ></div>
      </div>
      <div className="relative sm:h-32 h-32 overflow-hidden">
        <Imagez
          src={item.avatar}
          alt="Ảnh mô tả"
          className={`h-full w-full transition-transform duration-500 ease-in-out transform ${isHovered ? 'scale-105' : ''}`}
        />
      </div>
      <div className="mt-8 px-4 flex flex-col gap-2 pb-4 text-left">
        <Hrz />
        <h4 className="line-clamp-1 font-medium my-1 uppercase">{item.name}</h4>
        <span className='line-clamp-6'>{item.description}</span>
      </div>
    </div>
  );
};

export default CardCompany;
