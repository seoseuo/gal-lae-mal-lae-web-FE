'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useState, useRef,useEffect} from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function ProfileSet() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [swiper, setSwiper] = useState<any>(null);  // Swiper 인스턴스를 저장할 state 추가

  //세션에서 이메일정보 가져오기
  useEffect(() => {
    const email = sessionStorage.getItem('email');
    if (email) {
      //이메일만남기기
      // 따옴표 제거 및 공백 제거
      setEmail(email.replace(/['"]+/g, '').trim());

    }
  }, []);


  // 이미지 선택 핸들러
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 크기 체크 (예: 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하여야 합니다.');
        return;
      }

      // 이미지 파일 타입 체크
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 선택 가능합니다.');
        return;
      }

      // 이미지 미리보기 URL 생성
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  // 이미지 삭제 핸들러
  const handleImageDelete = () => {
    setProfileImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const signup = async () => {
    try {
      var data = {
        usEmail: email,
        usName: username,
      }
      if (!username) {
        console.log("이름이 입력되지 않음");
        return;
      }

      if (!fileInputRef.current?.files?.[0]) {
        console.log("파일이 선택되지 않음");
      }else{

      const formData = new FormData();
      formData.append('file', fileInputRef.current.files[0]);
      
      console.log("API 호출 시작");
      
      try {
        const response = await axios.post('api/s3/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        console.log('업로드 성공:', response);
        data.usProfile = response.data.message;
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
        alert('이미지 업로드에 실패했습니다.');
        throw error; // 에러를 상위로 전파
      }
      }
      console.log('회원가입 데이터:', data);
      await axios.post('api/auth/signup', data)
        .then((response) => {
          if(response.data.success){
            console.log('회원가입 성공:', response);
            // 성공 후 다음 슬라이드로 넘어가도록 수정
            if (swiper) {
              swiper.slideTo(1);
            }
          }else{
            console.error('회원가입 실패:', response.data.message);
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.error('회원가입 실패:', error);
        });
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
        initialSlide={currentPage - 1}
        onSwiper={(swiper) => setSwiper(swiper)}
        allowTouchMove={false}
      >
        <SwiperSlide>
          <div className="relative h-full">
            <h1 className="absolute left-[calc(50%-163.5px)] top-[81px] text-black text-center font-['NotoSansKr-Bold'] text-[20px] tracking-[-0.17px] font-bold">
              사진과 이름을<br />등록해주세요!
            </h1>
            
            {/* 프로필 이미지 영역 */}
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
                  <img 
                    src={profileImage} 
                    alt="프로필 이미지" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <img 
                      src="BasicProfile.svg" 
                      alt="기본 프로필 이미지" 
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
                  <img src="x.svg" alt="이미지 삭제" className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* 이름 입력 폼 */}
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

            {/* 가입하기 버튼 */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[161px] w-[292px]">
              <button 
                type="button"
                onClick={async (e) => {
                  try {
                    const filename = await signup();
                    // 성공 후 추가 처리
                  } catch (error) {
                    console.error('처리 실패:', error);
                  }
                }}
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

            <img 
              className="absolute left-1/2 top-[97px] -translate-x-1/2 w-[373px]"
              src="star_galmo.svg"
              alt="갈래말래와 별 장식 이미지"
            />

            {/* 두 번째 슬라이드에도 동일한 버튼 배치 */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[161px] w-[292px]">
              <button 
                type="button"
                onClick={() => {
                  //로그인페이지로 이동
                  router.push('/login');
                }}
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
