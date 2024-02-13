import React from 'react';
import Btn from './component/Btn';
import Input from './component/Input';
import Header from './component/Header';

export default function Alarm() {
    return (
        <div className='h-[100vh] w-[100%]'>
            <Header text='알림' back={true} />
            <div className='relative mx-[10%] pt-[50px] h-[100%]'>
                
            </div>
        </div>
    );
}

