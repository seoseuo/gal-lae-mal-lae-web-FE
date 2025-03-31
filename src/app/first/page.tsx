'use client'
import ServiceDescription from '../../component/ServiceDescription';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function First() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

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

  const buttonStyles = "w-full flex items-center justify-center gap-[13px] rounded-xl px-6 py-[15px] cursor-pointer";
  const textStyles = "font-['NotoSansKr-Medium'] text-[17px] font-medium leading-[22px] tracking-[-0.41px] text-white";

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex justify-end items-center px-6 pt-[78px] mb-10">
        <Link 
          href="/login" 
          className="font-['NotoSansKr-Regular'] text-base font-normal tracking-[-0.17px] text-black hover:text-gray-600 transition-colors"
        >
          로그인
        </Link>
      </header>

      {/* Main Content */}
      <section className="flex-1 flex flex-col">
        {/* Service Description Component */}
        <div className="mb-auto">
          <ServiceDescription 
            currentPage={currentPage} 
            handlePageChange={handleNext} 
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col gap-4 px-[53px] mb-[105px]">
          {/* Skip Button */}
          <button 
            onClick={handleSkip}
            className={`${buttonStyles} bg-[#C4C4C4]`}
          >
            <span className={textStyles}>건너뛰기</span>
          </button>

          {/* Next/Start Button */}
          <button 
            onClick={handleNext}
            className={`${buttonStyles} bg-[#490085]`}
          >
            <span className={textStyles}>
              {currentPage === totalPages ? '시작하기' : '다음'}
            </span>
          </button>
        </div>
      </section>
    </main>
  );
}
