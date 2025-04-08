"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function TipPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  return (
    <div className="min-h-[852px] bg-white flex flex-col items-center px-5">
      <div className="w-full flex items-center mt-[42px] relative">
        <Image 
          src="/arrow-back-ios0.svg" 
          alt="뒤로가기"
          width={24}
          height={24}
          className="w-6 h-6 ml-[14px]"
          onClick={() => router.back()}
        />
        <div className="text-[#1D0E07] text-center font-['NotoSansKr-Bold'] text-[16px] ml-[37px]">
          게시물 업로드 TIP
        </div>
      </div>

      <Image 
        src="/Romantic-Messages.png" 
        alt="여행 메이트 업로드 가이드 이미지"
        width={281}
        height={281}
        className="w-[281px] h-[281px] object-cover mt-6" 
      />

      <div className={`w-[330px] bg-white rounded-[10px_10px_0px_10px] p-[22px_28px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.15)] mt-8 transition-all duration-500 ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <span className="font-['NotoSansKr-Regular'] text-[11px]">
          <span className="text-black">여행 메이트들과</span>
          <span className="text-[#490085]">가고자 하는 지역의 이미지</span>
          <span className="text-black">를 업로드!</span>
        </span>
      </div>

      <div className={`w-[330px] bg-white rounded-[10px_10px_10px_0px] p-[22px_28px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.15)] mt-6 transition-all duration-500 ${step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="font-['NotoSansKr-Regular'] text-[11px]">
          <span className="text-black">지역 선택 후 간결하고 친근하게</span>
          <span className="text-[#490085]">여행에 대한</span>
        </div>
        <div className="font-['NotoSansKr-Regular'] text-[11px] mt-2">
          <span className="text-[#490085]">구체적인 정보</span>
          <span className="text-black">를 적어주세요!</span>
        </div>
      </div>

      <div className={`w-[330px] bg-white rounded-[10px_10px_0px_10px] p-[22px_28px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.15)] mt-6 transition-all duration-500 ${step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="font-['NotoSansKr-Regular'] text-[12px]">
          <span className="text-black">연락 방법은 무조건</span>
          <span className="text-[#490085]">쪽지</span>
          <span className="text-black">로!</span>
        </div>
        <div className="font-['NotoSansKr-Regular'] text-[12px] mt-2">
          <span className="text-black">여행 메이트가 구해졌다면</span>
          <span className="text-[#490085]">모임 생성 진행</span>
          <span className="text-black">해주세요!</span>
        </div>
      </div>

      <div className="w-[292px] mt-8 mb-[52px]">
        <button 
          onClick={() => {
            if (step < 3) {
              setStep(step + 1);
            }else{
              router.push("/mate/notice/upload");
            }
          }}
          className="w-full bg-[#490085] rounded-[12px] py-[15px] px-6 text-white font-['NotoSansKr-Medium'] text-[17px] leading-[22px] tracking-[-0.41px]"
        >
          {step === 3 ? '완료' : '다음'}
        </button>
      </div>
    </div>
  );
}

