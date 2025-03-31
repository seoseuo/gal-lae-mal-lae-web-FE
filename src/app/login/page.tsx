"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    console.log("로그인 버튼 클릭됨");
    if(email == "" || password == "" ){
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    const data = {
      usEmail: email,
      usPassword: password
    }
    console.log(data);
    axios.post('api/auth/login', data)
      .then((response) => {
        console.log(response);
        if(response.data.success){
          router.push('/');
        }else{
          alert("로그인 실패");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <section className="relative h-[852px] overflow-hidden bg-white">
      <button 
        type="button" 
        aria-label="뒤로 가기"
        className="absolute right-[88.04%] left-[7.89%] bottom-[87.79%] top-[10.33%] w-[4.07%] h-[1.88%]"
        onClick={() => router.back()}
      >
        <Image 
          src="/vector0.svg" 
          alt="뒤로 가기" 
          width={24} 
          height={24} 
        />
      </button>
      
      <h1 className="absolute left-[calc(50%-26.5px)] top-[84px] text-black text-center font-['NotoSansKr-Bold'] text-xl tracking-[-0.17px] font-bold">
        로그인
      </h1>
      <div className="absolute left-0 top-[134px] w-[393px] h-0 border-t border-[#DADADA] -mt-[1px]"></div>

      <form>
        <div>
          <label 
            htmlFor="email"
            className="absolute left-[calc(50%-167.5px)] top-[calc(50%-256px)] text-black text-center font-['NotoSansKr-Regular'] text-base tracking-[-0.17px]"
          >
            이메일
          </label>
          <input 
            id="email"
            type="text"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="absolute left-[28px] top-[206px] flex items-center gap-[6px] w-[338px] h-[39px] bg-white rounded-[5px] border border-[#DADADA] px-[6px] py-5 text-black placeholder:text-[#C4C4C4] text-left font-['NotoSansKr-Regular'] text-[13px] tracking-[-0.17px]"
          />
        </div>

        <div>
          <label 
            htmlFor="password"
            className="absolute left-[calc(50%-167.5px)] top-[calc(50%-155px)] text-black text-center font-['NotoSansKr-Regular'] text-base tracking-[-0.17px]"
          >
            비밀번호
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="absolute left-[28px] top-[305px] flex items-center gap-[6px] w-[338px] h-[39px] bg-white rounded-[5px] border border-[#DADADA] px-[6px] py-5 text-black placeholder:text-[#C4C4C4] text-left font-['NotoSansKr-Regular'] text-[13px] tracking-[-0.17px]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
              className="absolute right-[40px] top-[315px] w-[24px] h-[24px] flex items-center justify-center"
            >
              <Image 
                src={showPassword ? "/eye-off.svg" : "/eye.svg"}
                alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>

        <Link 
          href="/forgot-password"
          className="absolute left-[calc(50%-168.5px)] top-[calc(50%-73px)] text-black text-center font-['NotoSansKr-Regular'] text-[8px] tracking-[-0.17px]"
        >
          비밀번호를 잊어버리셨나요?
        </Link>
        <Link 
          href="/signup"
          className="absolute left-[calc(50%-168.5px)] top-[calc(50%-53px)] text-black text-center font-['NotoSansKr-Regular'] text-[8px] tracking-[-0.17px]"
        >
          아직 회원이 아니신가요?
        </Link>

        <button 
          type="button"
          className="absolute left-1/2 -translate-x-1/2 top-[651px] flex flex-col gap-2 items-center w-[292px]"
          onClick={(e) => {
            e.preventDefault();
            login();
          }}
          disabled={!email || !password}
        >
          <div className={`w-full flex items-center justify-center gap-[13px] rounded-xl px-6 py-[15px] ${
            email && password 
              ? 'bg-[#490085] hover:bg-[#3a006c] cursor-pointer' 
              : 'bg-[#C4C4C4] cursor-not-allowed'
          }`}>
            <span className="text-white text-right font-['NotoSansKr-Medium'] text-[17px] leading-[22px] tracking-[-0.41px] font-medium">
              다음
            </span>
          </div>
        </button>
      </form>
    </section>
  );
}
