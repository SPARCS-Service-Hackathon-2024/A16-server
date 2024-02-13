import React from 'react';
import Header from './component/Header';
import Menu from './component/Menu';

export default function Home() {
    return (
        <div className='h-[100%]'>
            <Header back={false} alarm={true} review={true} search={true} setting={false} />
            <div className='pt-[58px]'>
                
            </div>
            <Menu home={true}/>
        </div>
    );
}

