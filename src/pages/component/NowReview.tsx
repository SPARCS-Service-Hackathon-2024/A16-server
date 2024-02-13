import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type NowReview = {
  link: string;
  title: string;
  address: string;
  img: string;
}
const NowReview: React.FC<NowReview> = ({link, title, address, img}) => {


    return (
        <div className={`w-[50%] px-[3%] mt-[20px]`}>
            <Link to={link} className='w-full h-[200px] block bg-gray-300 rounded-2xl'>
              <img className='h-full object-cover' src={img} alt="img" />
            </Link>
            <Link to={link}>
              <h3 className='text-lg leading-[35px]'>{title}</h3>
            </Link>
            <Link to={link}>
              <p className='text-sm'>{address}</p>
            </Link>
        </div>
    );
}

export default NowReview;
