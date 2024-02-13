import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NowReview from './NowReview';

type NowReviews = {
  link: string;
  title: string;
  address: string;
  img: string;
}
const NowReviews: React.FC= () => {


    return (
        <div className={`w-[100%] px-[5%] mx-auto mt-[10px] max-w-[480px] `}>
            <h1 className='text-xl'>오늘의 추천 리뷰</h1>
            <div className="flex flex-wrap">
                <NowReview link="Etiam semper" title="Etiam semper" address="Etiam semper" img="Etiam semper"/>
                <NowReview link="Etiam semper" title="Etiam semper" address="Etiam semper" img="Etiam semper"/>
                <NowReview link="Etiam semper" title="Etiam semper" address="Etiam semper" img="Etiam semper"/>
                <NowReview link="Etiam semper" title="Etiam semper" address="Etiam semper" img="Etiam semper"/>
                <NowReview link="Etiam semper" title="Etiam semper" address="Etiam semper" img="Etiam semper"/>
            </div>
        </div>
    );
}

export default NowReviews;
