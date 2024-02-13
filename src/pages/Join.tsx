import React from 'react';
import Btn from './component/Btn';
import Input from './component/Input';
import LinkText from './component/LinkText';
import Header from './component/Header';

export default function Join() {
    return (
        <div className='h-[100%]'>
            <Header text='회원가입' back={true} alarm={false} review={false} search={false} setting={false} />
            <div className='relative mx-[10%] pt-[50px] h-[100%]'>
                <Input type="text" text='abcde@gmail.com' label='이메일' errorMsg='규칙에 맞는 이메일을 입력해주세요!' className='mt-[10%] h-[115px]'/>
                <Input type="password" text='영어 대소문자, 숫자로 구성' label='비밀번호' className='h-[115px]'/>
                <Input type="password" text='비밀번호 확인' label='비밀번호 확인' className='h-[115px]'/>
                <Input type="text" text='닉네임 입' label='닉네임' errorMsg='중복된 닉네임 입니다!' className='h-[115px]'/>
                <Btn text="가입하기" className="bg-[#2E83F2] text-[#ffffff] absolute bottom-[5%] left-0"/>
            </div>
        </div>
    );
}

