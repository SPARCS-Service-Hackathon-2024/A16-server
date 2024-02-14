import React, { useState } from 'react';

type Category = {
  text: string;
}
const Category: React.FC<Category> = ({text}) => {


    return (
        <div className={`px-2 py-1 border border-[#2E83F2] bg-white text-[#2E83F2]`}>
            {text}
        </div>
    );
}

export default Category;
