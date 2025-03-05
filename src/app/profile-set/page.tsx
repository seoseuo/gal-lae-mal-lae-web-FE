'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useState } from 'react';

export default function ProfileSet() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <main className="relative h-[817px] overflow-hidden bg-white">
      <Swiper
        modules={[Pagination]}
        className="h-full"
        style={{
          paddingBottom: '40px'
        }}
        initialSlide={currentPage - 1}
      >
        <SwiperSlide>
          <div>
      <h1 className="absolute left-[calc(50%-163.5px)] top-[81px] text-black text-center font-['NotoSansKr-Bold'] text-[20px] tracking-[-0.17px] font-bold">
        사진과 이름을
        <br />
        등록해주세요!
      </h1>
      
      <form className="relative">
        <label htmlFor="username" className="sr-only">이름</label>
        <input  
          id="username"
          type="text"
          placeholder="이름을 입력해주세요"
          className="absolute left-6 top-[370px] w-[345px] h-[30px] px-3 bg-white rounded-[5px] text-[20px] outline-none focus:outline-none"
        />
        <div className="absolute left-6 top-[406px] -mt-[1px] w-[345px] border-t border-[#DADADA]"></div>
        
        <button type="button" aria-label="입력 지우기" className="absolute right-6 top-[320px] w-6 h-6">
          <img className="w-full h-full" src="x.svg" alt="입력 지우기" />
        </button>
      </form>

      <img className="absolute left-1/2 -translate-x-1/2 top-[21.71%] w-[30.7044%] h-[16.4916%]" 
           src="BasicProfile.svg" 
           alt="기본 프로필 이미지" />
           </div>
      </SwiperSlide>
      <SwiperSlide>
      <div>
        <h1 className="absolute left-[calc(50%-78.5px)] top-[512px] text-black text-center font-['NotoSansKr-Bold'] text-[20px] tracking-[-0.17px] font-bold">
          김봄님, 환영합니다!
        </h1>
        <h2 className="absolute left-[calc(50%-127.5px)] top-[564px] text-black text-center font-['NotoSansKr-Bold'] text-[20px] tracking-[-0.17px] font-bold">
          갈래말래와 여행을 떠나볼까요?
        </h2>

        <img 
          className="absolute left-1/2 top-[97px] -translate-x-1/2 w-[373px]"
          src="star_galmo.svg"
          alt="갈래말래와 별 장식 이미지"
        />
      </div>
      </SwiperSlide>  
      </Swiper>
      <div className="absolute left-1/2 -translate-x-1/2 top-[651px] w-[292px]">
        <button type="submit" className="w-full bg-[#C4C4C4] rounded-xl px-6 py-[15px] flex flex-row items-center justify-center">
          <span className="text-white text-right font-['NotoSansKr-Medium'] text-[17px] leading-[22px] tracking-[-0.41px] font-medium">
            가입하기
          </span>
        </button>
      </div>
    </main>
  );
}
