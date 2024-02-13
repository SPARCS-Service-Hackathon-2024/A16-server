import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHome } from "react-icons/fi";
import { GrMap } from "react-icons/gr";
import { LuPlayCircle } from "react-icons/lu";
import { GoPerson } from "react-icons/go";

type MenuProps = {
    home?: boolean;
    map?: boolean;
    video?: boolean;
    mypage?: boolean;
}

const Menu: React.FC<MenuProps> = ({home, map, video, mypage}) => {


    return (
        <div className={`max-w-screen-sm w-[100%] h-[60px] bottom-0  left-50% z-50 fixed flex justify-between items-center`}>
            <Link to="/Home" className={`flex flex-col items-center justify-center text-sm w-[25%] h-[60px] text-[#000000] ${home ? 'text-[#000000]' : 'text-[#828282]'}`}>
                <FiHome className='text-xl' />
                <p>홈</p>
            </Link>
            <Link to="/Map" className={`flex flex-col items-center justify-center text-sm w-[25%] h-[60px] ${map ? 'text-[#000000]' : 'text-[#828282]'}`}>
                <GrMap className='text-xl' />
                <p>지도</p>
            </Link>
            <Link to="/Video" className={`flex flex-col items-center justify-center text-sm w-[25%] h-[60px] ${video ? 'text-[#000000]' : 'text-[#828282]'}`}>
                <LuPlayCircle  className='text-xl' />
                <p>탐색</p>
            </Link>
            <Link to="/Mypage" className={`flex flex-col items-center justify-center text-sm w-[25%] h-[60px] ${mypage ? 'text-[#000000]' : 'text-[#828282]'}`}>
                <GoPerson className='text-xl' />
                <p>마이페이지</p>
            </Link>

        </div>
    );
}

export default Menu;
