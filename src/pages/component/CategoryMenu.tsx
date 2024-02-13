import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHome } from "react-icons/fi";
import { GrMap } from "react-icons/gr";
import { LuPlayCircle } from "react-icons/lu";
import { GoPerson } from "react-icons/go";

// type CategoryMenuProps = {
//     home?: boolean;
//     map?: boolean;
//     video?: boolean;
//     mypage?: boolean;
// }

const CategoryMenu: React.FC = () => {


    return (
        <div className='mb-[80px]'>
            <h3 className='text-md font-bold ml-[5%] leading-[50px] mb-[10px]'>누구와 함께하는 일정인가요?</h3>
            <div className="mb-[20px] flex">
                <Link to="/" className={`flex flex-col items-center justify-center text-sm w-[48px] h-[60px] mx-auto `}>
                    <img className='w-[48px] h-[48px]' src="/assets/category/person1.png" alt="person" />
                    <p>가족</p>
                </Link>
                <Link to="/" className={`flex flex-col items-center justify-center text-sm w-[48px] h-[60px] mx-auto`}>
                    <img className='w-[48px] h-[48px]' src="/assets/category/person2.png" alt="person" />
                    <p>친구</p>
                </Link>
                <Link to="/" className={`flex flex-col items-center justify-center text-sm w-[48px] h-[60px] mx-auto`}>
                    <img className='w-[48px] h-[48px]' src="/assets/category/person3.png" alt="person" />
                    <p>부모님</p>
                </Link>
                <Link to="/" className={`flex flex-col items-center justify-center text-sm w-[48px] h-[60px] mx-auto`}>
                    <img className='w-[48px] h-[48px]' src="/assets/category/person4.png" alt="person" />
                    <p>연인</p>
                </Link>
            </div>
            <h3 className='text-md font-bold ml-[5%] leading-[50px] mb-[10px]'>대전, 이런 곳은 어때요?</h3>
            <div className="mb-[20px] flex">
                <Link to="/" className={`flex flex-col items-center justify-center text-sm w-[48px] h-[60px] mx-auto `}>
                    <img className='w-[48px] h-[48px]' src="/assets/category/place1.png" alt="place" />
                    <p>맛집</p>
                </Link>
                <Link to="/" className={`flex flex-col items-center justify-center text-sm w-[48px] h-[60px] mx-auto`}>
                    <img className='w-[48px] h-[48px]' src="/assets/category/place2.png" alt="place" />
                    <p>디저트</p>
                </Link>
                <Link to="/" className={`flex flex-col items-center justify-center text-sm w-[48px] h-[60px] mx-auto`}>
                    <img className='w-[48px] h-[48px]' src="/assets/category/place3.png" alt="place" />
                    <p>여가</p>
                </Link>
                <Link to="/" className={`flex flex-col items-center justify-center text-sm w-[48px] h-[60px] mx-auto`}>
                    <img className='w-[48px] h-[48px]' src="/assets/category/place4.png" alt="place" />
                    <p>과학</p>
                </Link>
            </div>
        </div>
    );
}

export default CategoryMenu;
