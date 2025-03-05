"use client";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [customDomain, setCustomDomain] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const domains = [
    { value: "direct", label: "직접입력" },
    { value: "naver.com", label: "naver.com" },
    { value: "gmail.com", label: "gmail.com" },
    { value: "daum.net", label: "daum.net" },
    { value: "hanmail.net", label: "hanmail.net" }
  ];

  return (
    <section className="relative h-[852px] overflow-hidden bg-white">
      <button 
        type="button" 
        aria-label="뒤로 가기"
        className="absolute right-[88.04%] left-[7.89%] bottom-[87.79%] top-[10.33%] w-[4.07%] h-[1.88%]"
      >
        <img src="vector0.svg" alt="" />
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
            type="email"
            placeholder="이메일"
            className="absolute left-[29px] top-[206px] flex items-center gap-[6px] w-[153px] h-[39px] bg-white rounded-[5px] border border-[#DADADA] px-[6px] py-5 text-black placeholder:text-[#C4C4C4] text-left font-['NotoSansKr-Regular'] text-[13px] tracking-[-0.17px]"
          />
          <span className="absolute left-[190px] top-[215px] w-[15px] h-[18px] text-[#C4C4C4] text-center font-['NotoSansKr-Regular'] text-base tracking-[-0.17px]">
            @
          </span>
          {selectedDomain === "direct" ? (
            <div className="flex items-center relative">
              <input
                type="text"
                placeholder="도메인 입력"
                value={customDomain}
                onChange={(e) => {
                  const value = e.target.value;
                  setCustomDomain(value);
                  if (!value) {
                    setSelectedDomain("");
                  }
                }}
                className="absolute left-[213px] top-[206px] w-[123px] h-[39px] rounded-l-[5px] bg-white border border-r-0 border-[#DADADA] px-[6px] text-black placeholder:text-[#C4C4C4] font-['NotoSansKr-Regular'] text-[13px]"
              />
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="absolute left-[336px] top-[206px] w-[30px] h-[39px] rounded-r-[5px] bg-white border border-[#DADADA] flex items-center justify-center"
              >
                <img src="drop-down.svg" alt="드롭다운" className="w-3 h-3" />
              </button>
              {isDropdownOpen && (
                <div className="absolute left-[213px] top-[245px] w-[153px] bg-white border border-[#DADADA] rounded-[5px] z-10">
                  {domains.map((domain) => (
                    <button
                      key={domain.value}
                      type="button"
                      onClick={() => {
                        setSelectedDomain(domain.value);
                        setCustomDomain("");
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-[6px] py-2 text-left text-[13px] text-black hover:bg-gray-100"
                    >
                      {domain.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <select 
              id="emailDomain"
              aria-label="이메일 도메인 선택"
              className="absolute left-[213px] top-[206px] w-[153px] h-[39px] rounded-[5px] bg-white border border-[#DADADA] px-[6px] text-[#C4C4C4] font-['NotoSansKr-Regular'] text-[13px]"
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
            >
              <option value="">선택</option>
              {domains.map((domain) => (
                <option key={domain.value} value={domain.value}>
                  {domain.label}
                </option>
              ))}
            </select>
          )}
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
              className="absolute left-[28px] top-[305px] flex items-center gap-[6px] w-[338px] h-[39px] bg-white rounded-[5px] border border-[#DADADA] px-[6px] py-5 text-black placeholder:text-[#C4C4C4] text-left font-['NotoSansKr-Regular'] text-[13px] tracking-[-0.17px]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
              className="absolute right-[40px] top-[315px] w-[24px] h-[24px] flex items-center justify-center"
            >
              <img 
                src={showPassword ? "/eye-off.svg" : "/eye.svg"}
                alt=""
                className="w-[20px] h-[20px]"
              />
            </button>
          </div>
        </div>

        <a 
          href="/forgot-password"
          className="absolute left-[calc(50%-168.5px)] top-[calc(50%-73px)] text-black text-center font-['NotoSansKr-Regular'] text-[8px] tracking-[-0.17px]"
        >
          비밀번호를 잊어버리셨나요?
        </a>
        <a 
          href="/signup"
          className="absolute left-[calc(50%-168.5px)] top-[calc(50%-53px)] text-black text-center font-['NotoSansKr-Regular'] text-[8px] tracking-[-0.17px]"
        >
          아직 회원이 아니신가요?
        </a>

        <button 
          type="submit"
          className="absolute left-1/2 -translate-x-1/2 top-[651px] flex flex-col gap-2 items-center w-[292px]"
        >
          <div className="w-full flex items-center justify-center gap-[13px] bg-[#C4C4C4] rounded-xl px-6 py-[15px]">
            <span className="text-white text-right font-['NotoSansKr-Medium'] text-[17px] leading-[22px] tracking-[-0.41px] font-medium">
              다음
            </span>
          </div>
        </button>
      </form>
    </section>
  );
}
