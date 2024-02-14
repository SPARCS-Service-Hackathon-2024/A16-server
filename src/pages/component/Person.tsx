import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Category from './Category';

type Parson = {
  link: string;
  name: string;
  category: string[];
  img: string;
}
const Parson: React.FC<Parson> = ({link, name, img, category}) => {


    return (
        <div className={`w-[50%] px-[3%] mt-[20px]`}>
            <Link to={link} className='w-full h-[76px] flex items-center'>
              <div className="h-[60px] w-[60px]">
                <img className='h-full w-full object-cover' src={img} alt="img" />
              </div>
              <div>
                <p>{name}</p>
                <div className="flex items-center">
                    {category.map((e, index) => <Category key={index} text={e} />)}
                </div>
              </div>
            </Link>
        </div>
    );
}

export default Parson;
