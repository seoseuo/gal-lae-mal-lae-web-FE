'use client'
import ServiceDescription from '../../component/ServiceDescription';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function First() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3; // 전체 페이지 수 설정

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    } else {
      router.push('/signup');
    }
  };

  const handleSkip = () => {
    router.push('/signup');
  };

  const buttonStyles = "relative flex w-full flex-row items-center justify-center gap-[13px] rounded-xl px-6 py-[15px] cursor-pointer";
  const textStyles = "relative font-['NotoSansKr-Medium'] text-[17px] font-medium leading-[22px] tracking-[-0.41px] text-white";

  return (
    <main className="relative h-[852px] overflow-hidden bg-white">
      <h1 className="absolute left-[calc(50%-(-111.5px))] top-[78px] text-center font-['NotoSansKr-Regular'] text-base font-normal tracking-[-0.17px] text-black">
        로그인
      </h1>
      <ServiceDescription className='absolute top-[161px]' currentPage={currentPage} handlePageChange={handleNext} />
      <nav className="absolute left-[53px] top-[613px] flex w-72 flex-col items-center justify-start gap-2">
        <button 
          onClick={handleSkip}
          className={`${buttonStyles} bg-[#C4C4C4]`}
        >
          <span className={textStyles}>건너뛰기</span>
        </button>
      </nav>
      <nav className="absolute left-[53px] top-[685px] flex h-[62px] w-72 flex-col items-center justify-start gap-2">
        <button 
          onClick={handleNext}
          className={`${buttonStyles} bg-[#490085]`}
        >
          <span className={textStyles}>
            {currentPage === totalPages ? '시작하기' : '다음'}
          </span>
        </button>
      </nav>
    </main>
  );
}
