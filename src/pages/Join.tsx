import React from 'react';
import Btn from './component/Btn';
import Input from './component/Input';
import LinkText from './component/LinkText';
import Header from './component/Header';

export default function Join() {
    return (
        <div className='h-[100%]'>
            <Header text='회원가입' back={true} alarm={false} review={false} search={false} />
            <div className='relative mx-[10%] pt-[50px] h-[100%]'>
                <Input type="text" text='아이디 또는 이메일주소' className='mt-[10%]'/>
                <Input type="password" text='비밀번호' />
                <Btn text="가입하기" className="bg-[#2E83F2] text-[#ffffff] absolute bottom-[11%] left-0"/>
            </div>
        </div>
    );
}

