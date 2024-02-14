import React from 'react';
import Header from './component/Header';

export default function Alarm() {
    return (
        <div className='h-[100vh] w-[100%]'>
            <Header text='알림' back={true} border={true} />
            <div className='relative mx-[10%] pt-[50px] h-[100%]'>
                
            </div>
        </div>
    );
}

