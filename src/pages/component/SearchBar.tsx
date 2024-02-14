import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type SearchBarProps = {
    type: string;
}



const SearchBar: React.FC<SearchBarProps> = ({ type}) => {
    let navigate = useNavigate();

    const [value, setValue] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(newValue);
    }

    const toBackClick = () => {
        navigate(-1);
    }

    return (
        <div>

            <div className={` max-w-screen-sm w-[100%] h-[56px] top-0  left-50% px-5 z-50 fixed flex items-center justify-around pl-3 leading-[56px] bg-white border-b border-[#E5E5E5]`}>
                <div className='w-[7.5%]'>
                <button onClick={toBackClick} className='bg-transparent outline-none h-[24px] w-[24px] flex items-center'><img src="/assets/back.png" alt="back" className="object-cover w-auto h-full" /></button>
                </div>
                <input
                    value={value}
                    onChange={handleChange}
                    className="w-[85%] h-[48px] text-base mb-[4px] outline-none placeholder-[#CECED1] bg-[#ffffff]"
                    placeholder={type == "person" ? "리뷰를 보고 싶은 장소를 입력해주세요!" : "찾고 싶은 사람의 닉네임을 입력하세요!"}
                />
                <div className='w-[7.5%] flex justify-end'>
                    <button className=' w-[18px] h-[18px]'><img className='w-[100%] h-[100%]' src="/assets/search.png" alt="search" /></button>
                </div>
            </div>
        </div>

    );
}

export default SearchBar;
