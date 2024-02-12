import React from 'react';
import Btn from './component/Btn';
import Input from './component/Input';
import LinkText from './component/LinkText';

export default function Login() {
    return (
        <div className='mx-[10%] pt-[30%]'>
            <h3 className='text-3xl leading-[100px] text-center font-bold'>로그인</h3>
            <Input type="text" text='아이디 또는 이메일주소' />
            <Input type="password" text='비밀번호' />
            <LinkText className="leading-[30px] mb-[40px] justify-end" LinkMsg='비밀번호 재설정' to='/Login' />
            <Btn text="로그인" className="bg-[#2E83F2] text-[#ffffff]"/>
            <Btn text="카카오톡으로 로그인하기" className="bg-[#F2DA00] text-[#282732] border border-[#E8E9EA]"/>
            <LinkText className="leading-[80px] mb-[40px] justify-center" text='아직계정이 없으신가요?' LinkMsg='회원가입' to='/Join' />
        </div>
    );
}

