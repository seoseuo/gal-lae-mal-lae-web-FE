'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface SignupData {
  usEmail: string;
  usName: string;
  usProfile?: string;
}

export default function ProfileSet() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [swiper, setSwiper] = useState<any>(null);

  useEffect(() => {
    const email = sessionStorage.getItem('email');
    if (email) {
      setEmail(email.replace(/['"]+/g, '').trim());
    }
  }, []);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하여야 합니다.');
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 선택 가능합니다.');
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleImageDelete = () => {
    setProfileImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const signup = async () => {
    try {
      const data: SignupData = {
        usEmail: email,
        usName: username,
      };

      if (!username) {
        console.log("이름이 입력되지 않음");
        return;
      }

      if (fileInputRef.current?.files?.[0]) {
        const formData = new FormData();
        formData.append('file', fileInputRef.current.files[0]);
        
        try {
          const response = await axios.post('api/s3/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          
          data.usProfile = response.data.message;
        } catch (error) {
          console.error('이미지 업로드 실패:', error);
          alert('이미지 업로드에 실패했습니다.');
          throw error;
        }
      }

      const response = await axios.post('api/auth/signup', data);
      if (response.data.success) {
        if (swiper) {
          swiper.slideTo(1);
        }
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("signup 함수 에러:", error);
      throw error;
    }
  };

  return (
    <main className="relative h-[817px] overflow-hidden bg-white">
      <Swiper
        modules={[Pagination]}
        className="h-full"
        style={{
          paddingBottom: '40px'
        }}
        initialSlide={0}
        onSwiper={(swiper) => setSwiper(swiper)}
        allowTouchMove={false}
      >
        <SwiperSlide>
          <div className="relative h-full">
            <h1 className="absolute left-[calc(50%-163.5px)] top-[81px] text-black text-center font-['NotoSansKr-Bold'] text-[20px] tracking-[-0.17px] font-bold">
              사진과 이름을<br />등록해주세요!
            </h1>
            
            <div className="absolute left-1/2 -translate-x-1/2 top-[21.71%] w-[120px] h-[120px]">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                className="hidden"
                id="profileImage"
              />
              <label 
                htmlFor="profileImage" 
                className="relative block w-full h-full rounded-full overflow-hidden cursor-pointer"
              >
                {profileImage ? (
                  <Image 
                    src={profileImage} 
                    alt="프로필 이미지" 
                    width={120}
                    height={120}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <Image 
                      src="/BasicProfile.svg" 
                      alt="기본 프로필 이미지" 
                      width={120}
                      height={120}
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                      <span className="text-white opacity-0 hover:opacity-100">
                        사진 변경
                      </span>
                    </div>
                  </>
                )}
              </label>
              {profileImage && (
                <button 
                  type="button"
                  onClick={handleImageDelete}
                  className="absolute -right-2 -top-2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
                >
                  <Image 
                    src="/x.svg" 
                    alt="이미지 삭제" 
                    width={12}
                    height={12}
                    className="w-3 h-3" 
                  />
                </button>
              )}
            </div>

            <form className="relative">
              <label htmlFor="username" className="sr-only">이름</label>
              <input  
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="이름을 입력해주세요"
                className="absolute left-6 top-[370px] w-[345px] h-[30px] px-3 bg-white rounded-[5px] text-[20px] outline-none focus:outline-none"
              />
              <div className="absolute left-6 top-[406px] -mt-[1px] w-[345px] border-t border-[#DADADA]"></div>
            </form>

            <div className="absolute left-1/2 -translate-x-1/2 bottom-[161px] w-[292px]">
              <button 
                type="button"
                onClick={signup}
                className={`w-full rounded-xl px-6 py-[15px] flex flex-row items-center justify-center cursor-pointer ${
                  username ? 'bg-[#490085] hover:bg-[#3a006c]' : 'bg-[#C4C4C4]'
                }`}
              >
                <span className="text-white text-right font-['NotoSansKr-Medium'] text-[17px] leading-[22px] tracking-[-0.41px] font-medium">
                  가입하기
                </span>
              </button>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative h-full">
            <h1 className="absolute left-[calc(50%-78.5px)] top-[512px] text-black text-center font-['NotoSansKr-Bold'] text-[20px] tracking-[-0.17px] font-bold">
              {username}님, 환영합니다!
            </h1>
            <h2 className="absolute left-[calc(50%-127.5px)] top-[564px] text-black text-center font-['NotoSansKr-Bold'] text-[20px] tracking-[-0.17px] font-bold">
              갈래말래와 여행을 떠나볼까요?
            </h2>

            <Image 
              className="absolute left-1/2 top-[97px] -translate-x-1/2 w-[373px]"
              src="/star_galmo.svg"
              alt="갈래말래와 별 장식 이미지"
              width={373}
              height={373}
            />

            <div className="absolute left-1/2 -translate-x-1/2 bottom-[161px] w-[292px]">
              <button 
                type="button"
                onClick={() => router.push('/login')}
                className={`w-full rounded-xl px-6 py-[15px] flex flex-row items-center justify-center cursor-pointer ${
                  username ? 'bg-[#490085] hover:bg-[#3a006c]' : 'bg-[#C4C4C4]'
                }`}
              >
                <span className="text-white text-right font-['NotoSansKr-Medium'] text-[17px] leading-[22px] tracking-[-0.41px] font-medium">
                  시작하기
                </span>
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </main>
  );
}
