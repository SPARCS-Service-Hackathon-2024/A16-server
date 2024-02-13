import React, { useState } from 'react';
import { Link } from 'react-router-dom';


type AlarmLineProps = {
    type: string;
    profileImg: string;
    profileUrl: string;
    name: string;
    videoImg?: string;
    followChk?: boolean;
    videoUrl?: string;
}

const SearchMenu: React.FC<AlarmLineProps> = ({type, profileImg, profileUrl, videoUrl, name, videoImg, followChk }) => {

    return (
        <div className="h-[64px] flex items-center justify-between px-">
            <Link className='block' to={profileUrl}><img src={profileImg} alt="" /></Link>
            <p><Link className='block font-bold' to={profileUrl}>{name}</Link>{type == 'hart' && "님이 회원님의 리뷰를 공감합니다."}{type == 'comment' && "님이 회원님의 리뷰에 댓글을 달았습니다."}{type == 'follow' && "님이 회원님을 팔로우 하기 시작 했습니다."}</p>
            {type == 'follow' ?  followChk ? <button>팔로우</button> : <button>팔로잉</button> : <Link className='block' to={videoUrl}><img src={videoImg} alt="" /></Link>}
            <p></p>
        </div>
    );
}

export default SearchMenu;
