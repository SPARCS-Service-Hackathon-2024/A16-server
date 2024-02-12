import React from 'react';

type BtnProps = {
    text: string;
    className: string;
    action?: () => void;
}

const Btn: React.FC<BtnProps> = ({text, className, action}) => {
    return (
        <div className={`w-[100%] h-[48px] mb-[10px] ${className} text-lg text-center leading-[48px] rounded-lg`}>
            {text}
        </div>
    );
}

export default Btn;