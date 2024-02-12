import React from 'react';
import Btn from './component/Btn';
import LinkText from './component/LinkText';

export default function JoinWay() {
    return (
        <div className='mx-[10%] pt-[30%]'>
            <h3 className='text-3xl leading-[250px] text-center font-bold'>회원가입 방법을 선택하세요!</h3>
            <Btn text="이메일로 가입하기" className="bg-[#2E83F2] text-[#ffffff]"/>
            <Btn text="카카오톡으로 가입하기" className="bg-[#F2DA00] text-[#282732] border border-[#E8E9EA]"/>
            <LinkText className="leading-[80px] mb-[40px] justify-center" text='이미 회원이신가요?' LinkMsg='로그인' to='/Login' />
        </div>
    );
}

