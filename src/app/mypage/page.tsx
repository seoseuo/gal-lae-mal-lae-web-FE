'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';

interface UserInfo {
  usIdx: number;
  usName: string;
  usProfile: string;
  usEmail: string;
  usPw: string;
  usJoinDate: Date;
  usLeaveDate: Date;
  usState: number;
  msgContent: string;
  msgCreatedAt: string;
}

export default function MyPage() {
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const router = useRouter();

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const res = await axios.get('/api/users/me');
    setUserInfo(res.data);
  };

  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-4">
        <button>
          <Image 
            src="/vector0.svg" 
            alt="뒤로가기" 
            width={12} 
            height={16} 
            className="w-3 h-4"
            onClick={() => router.back()}
          />
        </button>
        <h1 className="text-black text-center font-['NotoSansKr-Bold'] text-[20px] tracking-[-0.17px]">마이페이지</h1>
        <div className="w-3"></div> {/* 좌우 균형을 위한 빈 공간 */}
      </nav>

      {/* Divider */}
      <div className="w-full h-[1px] border-t border-[#DADADA]"></div>

      {/* Profile Section */}
      <section className="flex flex-col items-center mt-8 space-y-4">
        <Image 
          src={`s3/${userInfo?.usProfile}` || 'BasicProfile.svg'} 
          alt="프로필 이미지" 
          width={107} 
          height={107} 
          className="w-[107px] h-[107px] rounded-full object-cover" 
        />
        <button className="text-[#490085] font-['NotoSansKr-Regular'] text-[16px] tracking-[-0.17px]">사진 수정</button>
      </section>

      {/* Name Section */}
      <section className="flex items-center px-[50px] mt-6">
        <label className="text-black font-['NotoSansKr-Regular'] text-[16px] tracking-[-0.17px] mr-4">이름</label>
        <div className="flex-1 h-[42px] bg-white border border-[#DADADA] rounded-[5px] flex items-center px-[6px]">
          <span className="text-[#222222] font-['NotoSansKr-Regular'] text-[15px] tracking-[-0.17px]">{userInfo?.usName}</span>
        </div>
      </section>

      {/* Menu Items */}
      <nav className="flex flex-col space-y-8 px-8 mt-12">
        <button className="flex items-center w-full" onClick={() => router.push('/mypage/password-change')}>
          <div className="flex items-center gap-4">
            <Image 
              src="/lock.svg" 
              alt="비밀번호 변경" 
              width={21} 
              height={21} 
            />
            <span className="text-black font-['NotoSansKr-Regular'] text-[16px] tracking-[-0.17px]">비밀번호 변경</span>
          </div>
          <Image 
            src="/arrow-back-ios2.svg" 
            alt="화살표" 
            width={24} 
            height={24} 
            className="ml-auto" 
          />
        </button>
        <button className="flex items-center w-full" onClick={() => router.push('/mypage/like')}>
          <div className="flex items-center gap-4">
            <Image 
              src="/heart.svg" 
              alt="좋아요" 
              width={21} 
              height={21} 
            />
            <span className="text-black font-['NotoSansKr-Regular'] text-[16px] tracking-[-0.17px]">좋아요</span>
          </div>
          <Image 
            src="/arrow-back-ios2.svg" 
            alt="화살표" 
            width={24} 
            height={24} 
            className="ml-auto" 
          />
        </button>
        <button className="flex items-center w-full" onClick={() => router.push('/mypage/my-post')}>
          <div className="flex items-center gap-4">
            <Image 
              src="/trave_log.svg" 
              alt="나의 게시글" 
              width={21} 
              height={21} 
            />
            <span className="text-black font-['NotoSansKr-Regular'] text-[16px] tracking-[-0.17px]">나의 게시글</span>
          </div>
          <Image 
            src="/arrow-back-ios2.svg" 
            alt="화살표" 
            width={24} 
            height={24} 
            className="ml-auto" 
          />
        </button>
        <button className="flex items-center w-full" onClick={() => router.push('/mypage/travel-log')}>
          <div className="flex items-center gap-4">
            <Image 
              src="/Location.svg" 
              alt="여행록" 
              width={21} 
              height={21} 
            />
            <span className="text-black font-['NotoSansKr-Regular'] text-[16px] tracking-[-0.17px]">여행록</span>
          </div>
          <Image 
            src="/arrow-back-ios2.svg" 
            alt="화살표" 
            width={24} 
            height={24} 
            className="ml-auto" 
          />
        </button>
      </nav>
    </main>
  );
}
