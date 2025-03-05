'use client'
import React, { useState } from 'react';

export default function Signup() {
  const [email, setEmail] = useState("");
  const [domain, setDomain] = useState("");
  const [customDomain, setCustomDomain] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3분
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isVerificationEnabled = email !== "" && domain !== "";

  const domains = [
    { value: "direct", label: "직접입력" },
    { value: "naver.com", label: "naver.com" },
    { value: "gmail.com", label: "gmail.com" },
    { value: "daum.net", label: "daum.net" },
    { value: "nate.com", label: "nate.com" },
    { value: "kakao.com", label: "kakao.com" }
  ];

  const handleVerificationRequest = () => {
    setIsVerifying(true);
    // 여기에 이메일 인증 요청 API 호출 로직 추가
    
    // 타이머 시작
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <main className="pt-[50px] min-h-screen bg-white flex flex-col">
      <nav className="pt-[px] flex items-center h-[44px] border-b border-[#DADADA] relative px-4">
        <button className="flex items-center justify-center left-4">
          <img className="w-4" src="x.svg" alt="뒤로가기" />
        </button>
        <h1 className="text-black text-center font-['NotoSansKr-Bold'] text-[17px] w-full">
          회원가입
        </h1>
      </nav>

      <form className="px-4 flex-1 flex flex-col justify-center">
        <section className="mb-2">
          <label className=" text-black font-['NotoSansKr-Regular'] text-base tracking-[-0.17px] block mb-2">
            이메일
          </label>
          <div className="flex items-center gap-3">
            <input 
              type="text"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white rounded-[5px] border border-[#C4C4C4] flex-1 h-[39px] text-[10px] p-3"
            />
            <span className="text-[#C4C4C4] text-center text-base flex items-center">@</span>
            {domain === "direct" ? (
              <div className="flex items-center relative">
                <input
                  type="text"
                  placeholder="도메인 입력"
                  value={customDomain}
                  onChange={(e) => {
                    const value = e.target.value;
                    setCustomDomain(value);
                    if (!value) {
                      setDomain("");
                    }
                  }}
                  className="bg-white rounded-l-[5px] border border-r-0 border-[#C4C4C4] w-[78px] h-[39px] text-[10px] p-3"
                />
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="h-[39px] w-[20px] rounded-r-[5px] bg-white border-y border-r border-[#C4C4C4] flex items-center justify-center"
                >
                  <img src="drop-down.svg" alt="드롭다운" className="w-3 h-3" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute left-0 top-[39px] w-full bg-white border border-[#C4C4C4] rounded-[5px] z-10">
                    {domains.map((d) => (
                      <button
                        key={d.value}
                        onClick={() => {
                          setDomain(d.value);
                          setCustomDomain("");
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-2 py-2 text-left text-[10px] text-[#787676] hover:bg-gray-100"
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <select 
                value={domain}    
                onChange={(e) => setDomain(e.target.value)}
                className="bg-white rounded-[5px] border border-[#C4C4C4] w-[78px] h-[39px] flex items-center justify-center px-2"
              >
                <option value="">선택</option>
                {domains.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            )}
            <button 
              type="button"
              onClick={handleVerificationRequest}
              disabled={!isVerificationEnabled}
              className={`rounded-[5px] w-[100px] flex items-center justify-center h-[39px] ${
                isVerificationEnabled ? 'bg-[#2D2D2D]' : 'bg-[#E7E7E7]'
              }`}
            >
              <span className={`text-[12px] font-medium ${
                isVerificationEnabled ? 'text-white' : 'text-[#C4C4C4]'
              }`}>
                {isVerifying ? '재전송' : '인증 요청'}
              </span>
            </button>
          </div>
        </section>

        {isVerifying && (
          <>
            <div className="mt-2 flex items-center gap-3">
              <div className="relative w-[292px]">
                <input
                  type="text"
                  placeholder="인증번호 입력"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  disabled={timeLeft === 0}
                  className={`bg-white rounded-[5px] border border-[#C4C4C4] w-full h-[39px] text-[10px] p-3 ${
                    timeLeft === 0 ? 'bg-[#E7E7E7] cursor-not-allowed' : ''
                  }`}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#787676] text-[12px] font-medium">
                  {formatTime(timeLeft)}
                </div>
              </div>
              <button 
                type="button"
                disabled={timeLeft === 0}
                className={`rounded-[5px] w-[70px] h-[39px] ${
                  timeLeft === 0 ? 'bg-[#E7E7E7]' : 'bg-[#2D2D2D]'
                }`}
              >
                <span className={`text-[12px] font-medium ${
                  timeLeft === 0 ? 'text-[#C4C4C4]' : 'text-white'
                }`}>
                  확인
                </span>
              </button>
            </div>
            <p className="text-[#490085] text-[10px] mt-1">
              인증번호는 3분 이내 입력해야합니다.<br />
              제한시간이 지났을 경우 인증번호를 다시 받아 주세요.
            </p>
          </>
        )}

        <section>
          <label className="text-black font-['NotoSansKr-Regular'] text-base tracking-[-0.17px] block mb-2 mt-4">
            비밀번호
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호"
              className="bg-white rounded-[5px] border-2 border-[#C4C4C4] flex items-center justify-center w-full h-[39px] mb-2 px-3"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <img 
                src={showPassword ? "/eye-off.svg" : "/eye.svg"} 
                alt={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"} 
                className="w-5 h-5"
              />
            </button>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="비밀번호 확인" 
              className="bg-white rounded-[5px] border-2 border-[#C4C4C4] flex items-center justify-center w-full h-[39px] px-3"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <img 
                src={showConfirmPassword ? "/eye-off.svg" : "/eye.svg"} 
                alt={showConfirmPassword ? "비밀번호 숨기기" : "비밀번호 보기"} 
                className="w-5 h-5"
              />
            </button>
          </div>
          <p className="text-[#787676] text-[10px] mt-4">
            영문 대문자와 소문자, 숫자, 특수문자 중 2가지 이상을 조합하여<br />
            6~20자로 입력해주세요.
          </p>
        </section>
      </form>

      <div className="pb-[161px]">
        <button 
          type="submit"
          className="bg-[#C4C4C4] rounded-xl px-6 py-[15px] w-[292px] mx-auto block"
        >
          <span className="text-white text-[17px] font-medium">다음</span>
        </button>
      </div>
    </main>
  );
}
        
