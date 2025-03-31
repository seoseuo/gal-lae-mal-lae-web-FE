'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ServiceDescriptionProps {
  className?: string;
  currentPage: number;
  handlePageChange: () => void;
}

const slides = [
  {
    image: "/Location.svg",
    title: "모임관리",
    description: ["여행 모임 개설부터", "일정 관리까지 쉽게!"]
  },
  {
    image: "/Add_video.svg",
    title: "여행록 작성",
    description: ["여행에 느낀 경험을", "쓰고, 공유하고, 둘러보고"]
  },
  {
    image: "/Shakehand.svg",
    title: "여행메이트 찾기",
    description: ["커뮤니티를 통해", "빠르게 여행 메이트 생성!"]
  }
];

export default function ServiceDescription({ className, currentPage }: ServiceDescriptionProps) {
  const [swiper, setSwiper] = useState<any>(null);

  useEffect(() => {
    if (swiper) {
      swiper.slideTo(currentPage - 1);
    }
  }, [currentPage, swiper]);

  return (
    <div className={`relative ${className || ''}`}>
      <Swiper
        modules={[Pagination]}
        className="h-full"
        style={{
          paddingBottom: '40px'
        }}
        onSwiper={setSwiper}
        initialSlide={currentPage - 1}
        allowTouchMove={false}
        pagination={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className='flex flex-col items-center justify-center'>
            <div className="flex flex-col items-center justify-center">
              <Image 
                src={slide.image}
                alt={slide.title}
                width={288}
                height={288}
                className="object-cover"
              />
              <div className="mt-8 text-center font-['NotoSansKr-Regular'] text-base font-normal tracking-[-0.17px] text-black">
                {slide.title}
              </div>
              <div className="mt-6 text-center font-['NotoSansKr-Bold'] text-xl font-bold tracking-[-0.17px] text-black">
                {slide.description[0]}
                <br />
                {slide.description[1]}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}