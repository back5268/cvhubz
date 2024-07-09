import React, { useState } from 'react';
import { formatNumber } from '@lib/helper';
import { Buttonz, Hrz, Imagez } from '@components/core';
import { experiences } from '@constant';
import { DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const CardProduct = ({ item, locations }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/jobs/${item.slug}`)}
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
      <div className="relative sm:h-48 h-32 overflow-hidden">
        <Imagez
          src={item.avatar}
          alt="Ảnh mô tả"
          className={`h-full w-full transition-transform duration-500 ease-in-out transform ${isHovered ? 'scale-105' : ''}`}
        />
      </div>
      <div className="mt-2 px-4 flex flex-col gap-1 text-left">
        <Hrz />
        <h4 className="line-clamp-1 font-medium my-1 !text-center">{item.name}</h4>
        <span>
          Mức lương: <b>{formatNumber(item.min)}</b> - <b>{formatNumber(item.max)}</b>
        </span>
        <span>
          Địa điểm: <b>{locations?.find((l) => l._id === item.location)?.name}</b>
        </span>
        <span>
          Kinh nghiệm: <b>{experiences?.find((e) => e.key === item.experience)?.label}</b>
        </span>
      </div>
      <div className="flex justify-end">
        <Buttonz color="red" className="my-8" style={{ background: '#ff7c08' }}>
          <div className="flex gap-2 items-center">
            <DocumentMagnifyingGlassIcon className="w-5 stroke-2" />
            Xem chi tiết
          </div>
        </Buttonz>
      </div>
    </div>
  );
};

export default CardProduct;
