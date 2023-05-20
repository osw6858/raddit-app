import React from "react";
import cls from "classnames";
//interface ->  객체의 구조를 정의하기 위해 사용되는 개념
interface InputGroupProps {
    className?: string; // ? -> className 이라는 props가 들어올수도 있고 안들어올수도 있고 옵션임
    type?: string;
    placeholder?: string;
    value: string;
    error: string | undefined;
    setValue: (str:string) => void;
}

const InputGroup: React.FC<InputGroupProps> = ({
    className = "mb-2",
    type = "text",
    placeholder = "",
    error,
    value,
    setValue
}) => {
    return (
        <div className={className}>
            <input 
            type={type}
            style={{minWidth: 300}}
            className={cls(`w-full p-3 transition duration-200 border border-gray-400 rounded bg-gray-50 focus:bg-white hover:bg-white` , 
                {"border-red-500": error} //error이 참이면 border-red-500을 넣는다
            )}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            />
            <small className="font-medium text-red-500">{error}</small>
        </div>
    )
}

export default InputGroup