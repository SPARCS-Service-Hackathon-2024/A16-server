import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GrMap } from "react-icons/gr";
import { GoPerson } from "react-icons/go";


const SearchMenu: React.FC = () => {

    return (
        <div className="h-[62px]">
            <div className={`max-w-screen-sm w-[60%] my-[9px] mx-auto h-[44px] flex justify-between items-center text-[#828282] shadow-custom rounded-[44px]`}>
                <Link to="/SearchMap" className={`flex items-center justify-center text-sm w-[50%] h-[60px]`}>
                    <GrMap className='text-xl mr-2' />
                    <p>장소 검색</p>
                </Link>
                <div className="w-[2px] h-[17px] my-auto bg-[#828282]"></div>
                <Link to="/SearchPerson" className={`flex items-center justify-center text-sm w-[50%] h-[60px]`}>
                    <GoPerson className='text-xl mr-2' />
                    <p>사람 검색</p>
                </Link>

            </div>
        </div>
    );
}

export default SearchMenu;
