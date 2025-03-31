'use client';
import Image from 'next/image';

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-white relative overflow-hidden">

      {/* Title */}
      <h1 className="absolute left-1/2 -translate-x-1/2 top-[65px] text-black text-center font-['NotoSansKr-Bold'] text-[20px] tracking-[-0.17px] font-bold">여행 메이트</h1>
      
      {/* Divider */}
      <div className="absolute left-0 top-[121px] w-[393px] h-[1px] border-t border-[#DADADA]"></div>

      {/* Profile Name */}
      <div className="absolute left-[179px] top-[143px] text-black font-['NotoSansKr-Regular'] text-[16px] tracking-[-0.17px]">최지호</div>

      {/* Profile Image */}
      <Image 
        src="/ellipse-2970.png" 
        alt="프로필 이미지" 
        width={97} 
        height={97} 
        className="absolute left-[151px] top-[180px] w-[97px] h-[97px] rounded-full object-cover" 
      />

      {/* Stats */}
      <div className="absolute left-[94px] top-[317px] text-black font-['NotoSansKr-Regular'] text-[18px] tracking-[-0.17px]">5</div>
      <div className="absolute left-[74px] top-[365px] text-black font-['NotoSansKr-Regular'] text-[18px] tracking-[-0.17px]">게시물</div>

      <div className="absolute left-[183px] top-[317px] text-black font-['NotoSansKr-Regular'] text-[18px] tracking-[-0.17px]">20</div>
      <div className="absolute left-[169px] top-[365px] text-black font-['NotoSansKr-Regular'] text-[18px] tracking-[-0.17px]">팔로워</div>

      <div className="absolute left-[284px] top-[317px] text-black font-['NotoSansKr-Regular'] text-[18px] tracking-[-0.17px]">20</div>
      <div className="absolute left-[270px] top-[365px] text-black font-['NotoSansKr-Regular'] text-[18px] tracking-[-0.17px]">팔로잉</div>

      {/* Action Buttons */}
      <div className="absolute left-[62px] top-[441px] w-[131px] h-[33px]">
        <button className="w-full h-full bg-[#490085] rounded-[12px] text-white font-['NotoSansKr-Regular'] text-[16px] leading-[22px] tracking-[-0.41px]">
          팔로우
        </button>
      </div>

      <div className="absolute left-[200px] top-[441px] w-[131px] h-[33px]">
        <button className="w-full h-full bg-[#E7E7E7] rounded-[12px] text-black font-['NotoSansKr-Regular'] text-[16px] leading-[22px] tracking-[-0.41px]">
          쪽지
        </button>
      </div>

      {/* Bottom Divider */}
      <div className="absolute left-0 top-[515px] w-[393px] h-[1px] border-t border-[#DADADA]"></div>

      {/* Image Grid */}
      <Image 
        src="/frame-17074819320.svg" 
        alt="여행 이미지 1" 
        width={149} 
        height={143} 
        className="absolute left-[calc(50%-157.5px)] top-[563px] w-[149px] h-[143px] rounded-[12px]" 
      />
      <Image 
        src="/frame-17074819330.svg" 
        alt="여행 이미지 2" 
        width={149} 
        height={143} 
        className="absolute left-[calc(50%+15.5px)] top-[563px] w-[149px] h-[143px] rounded-[12px]" 
      />
      <Image 
        src="/frame-17074819340.svg" 
        alt="여행 이미지 3" 
        width={149} 
        height={143} 
        className="absolute left-[calc(50%-157.5px)] top-[729px] w-[149px] h-[143px] rounded-[12px]" 
      />
    </main>
  );
}

