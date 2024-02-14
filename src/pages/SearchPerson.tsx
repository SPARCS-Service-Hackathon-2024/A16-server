import React from 'react';
import Header from './component/Header';
import { IoMdStar } from "react-icons/io";
import SearchBar from './component/SearchBar';
import Parson from './component/person';

export default function SearchPerson() {
    return (
        <div className='h-[100vh]'>
            <SearchBar type="porsen" />
            <div className='pt-[56px] h-[100%]'>
                {/* <Parson link={} name={} img={} category={}/> */}
            </div>
        </div>
    );
}

