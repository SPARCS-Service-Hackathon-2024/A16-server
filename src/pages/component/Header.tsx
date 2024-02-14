import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SearchMenu from './SearchMenu';
import alarmSrc from '../../assets/alarm.png'

type HeaderProps = {
    text?: string;
    back?: boolean;
    alarm?: boolean;
    review?: boolean;
    search?: boolean;
    setting?: boolean;
    className?: string;
    border?: boolean;
}

const Header: React.FC<HeaderProps> = ({ text, back, alarm, review, search, className, setting, border}) => {
    let navigate = useNavigate();

    const toBackClick = () => {
        navigate(-1);
    }

    return (
        <div>

            <div className={` max-w-screen-sm w-[100%] h-[56px] top-0  left-50% px-5 z-50 fixed flex justify-between items-center pl-3 leading-[56px] bg-white ${ border && 'border-b border-[#E5E5E5]'} ${className}`}>
                <div className='w-[100px]'>
                {back && <button onClick={toBackClick} className='bg-transparent outline-none h-[24px] w-[24px] flex items-center'><img src="/assets/back.png" alt="back" className="object-cover w-auto h-full" /></button>}
                </div>
                <div className="flex justify-center">
                    {text ? <p>{text}</p> : <Link to={"/"} onClick={toBackClick} className='bg-transparent outline-none h-[48px] flex justify-end'><img src="/assets/logo.png" alt="back" className="object-cover w-auto h-full" /></Link>}
                </div>
                <div className='flex w-[100px] justify-end'>
                    {alarm && <Link to={"/Alarm"} className='bg-transparent outline-none h-[24px] w-[48px] flex justify-end'><img src={alarmSrc} alt="back" className="object-cover w-auto h-full" /></Link>}
                    {review && <Link to={"/Review"} className='bg-transparent outline-none h-[24px] w-[48px] flex justify-end'><img src="/assets/review.png" alt="back" className="object-cover w-auto h-full" /></Link>}
                    {setting && <Link to={"/Setting"} className='bg-transparent outline-none h-[24px] w-[48px] flex justify-end'><img src="/assets/setting.png" alt="back" className="object-cover w-auto h-full" /></Link>}
                </div>
            </div>
            {search && <SearchMenu />}
        </div>

    );
}

export default Header;
