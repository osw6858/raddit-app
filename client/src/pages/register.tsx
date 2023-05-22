import Link from "next/link";
import React, { FormEvent } from "react";
import InputGroup from "../components/InputGroup";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuthState } from '../context/auth';

const Register = () => {
    const [email, setEmail] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errors, setErrors] = React.useState<any>({});
    const { authenticated } = useAuthState();
    let router = useRouter();

    if (authenticated) router.push("/");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();//form에서 submit 버튼을 눌렀을때 페이지가 새로고침 되는걸 방지
    try{
        const res = await axios.post('/auth/register', {
            email,
            password,
            username
        })

        console.log('res', res);
        router.push("/login")
    }catch(error: any){
        console.log('error', error);
       setErrors(error.response.data || {});
        }
    }

    //async는 비동기 함수임을 선언 / await은 프라미스를 기다리는데 사용 비동기 작업이 완료될때까지 코드 실행을 일시중지, 완료후 결과값 반환


    return <div className="bg-white">
        <div className='flex flex-col items-center justify-center h-screen p-6'>
            <div className="w-10/12 mx-auto md:w-96">
                <h1 className="mb-2 text-lg font-medium">회원가입</h1>
                <form onSubmit={handleSubmit}>
                <InputGroup 
                    placeholder="Email"
                    value={email}
                    setValue={setEmail}
                    error={errors.email}
                    />

                <InputGroup 
                    placeholder="User"
                    value={username}
                    setValue={setUsername}
                    error={errors.username}
                    />

                <InputGroup 
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                    error={errors.password}
                    />
                <button className="w-full py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border border-gray-400 rounded">
                    회원 가입
                </button>
                </form>
                <small>
                    이미 가입하셨나요?
                    <Link href="/login" className="ml-1 text-blue-500 upper">
                        로그인
                    </Link>
                </small>
            </div>
        </div>
    </div>;
};

export default Register;
