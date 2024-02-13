import React, { useState } from 'react';

type InputProps = {
    text: string;
    type: string;
    label?: string;
    className?: string;
    errorMsg?: string;
    condition?: string;
    action?: () => void;
}

const Input: React.FC<InputProps> = ({ type, text, label, className, action, errorMsg, condition}) => {
    const [value, setValue] = useState<string>('');
    const [typeInput, setTypeInput] = useState<string>(type);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(newValue);
    }

    const togglePasswordVisibility = () => {
        setTypeInput(typeInput === "text" ? "password" : "text");
    }

    return (
        <div className={`${className}`}>
            {label && <h3 className='leading-[30px]'>{label}</h3>}
            <div className={` w-[100%] h-[48px] flex justify-between mb-[8px] pl-3 leading-[48px] rounded-lg border border-[#E5E5E5] bg-[#F7F8F9]`}>
                <input
                    type={typeInput}
                    value={value}
                    onChange={handleChange}
                    className={`${type=="text"? "w-[98%]": "w-[85%]"} h-[48px] text-base mb-[4px] outline-none placeholder-[#CECED1] bg-[#F7F8F9]`}
                    placeholder={text}
                />
                {type=="password"&& <button onClick={togglePasswordVisibility} className='bg-transparent outline-none h-[24px] w-[24px] m-auto'><img src={typeInput=="text" ? "/assets/show.png" : "/assets/hide.png"} alt="eye" className="object-cover w-full h-full" /></button>}
            </div>
        </div>
    );
}

export default Input;
