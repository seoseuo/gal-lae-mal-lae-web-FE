export default function NoticePage() {
    return (
    <main className="min-h-screen bg-white relative pb-[80px]">
      {/* 제목 */}
      <h1 className="absolute left-1/2 -translate-x-1/2 top-[65px] text-black text-center font-['NotoSansKr-Bold'] text-[20px] tracking-[-0.17px] font-bold">
        여행 메이트
      </h1>

      {/* 구분선 */}
      <div className="absolute left-0 top-[121px] w-[393px] h-[1px] border-t border-[#DADADA]"></div>

      {/* 프로필 영역 */}
      <div className="absolute left-[43px] right-[43px] top-[196px] flex items-center gap-4">
        <img src="ellipse-2980.png" className="w-[45px] h-[45px] rounded-full object-cover" />
        <div>
          <div className="text-black font-['NotoSansKr-Regular'] text-[12px] tracking-[-0.17px]">
            김아람
          </div>
          <div className="flex gap-2 items-center mt-1">
            <span className="text-[#C4C4C4] font-['NotoSansKr-Regular'] text-[12px] tracking-[-0.17px]">2/14</span>
            <div className="w-[0.5px] h-[11px] bg-[#C4C4C4]"></div>
            <span className="text-[#C4C4C4] font-['NotoSansKr-Regular'] text-[12px] tracking-[-0.17px]">20:00</span>
          </div>
        </div>
        <button className="ml-auto px-4 py-2 bg-[#490085] rounded-[6px] text-white font-['NotoSansKr-Medium'] text-[14px]">
          채팅하기
        </button>
      </div>

      {/* 메인 이미지 */}
      <img src="frame-50.svg" className="absolute left-1/2 -translate-x-1/2 top-[263px] w-[305px] h-[198px] rounded-xl" />

      {/* 본문 내용 */}
      <h2 className="absolute left-[43px] top-[499px] text-black font-['NotoSansKr-Regular'] text-[16px] tracking-[-0.17px]">
        춘천여행 같이 가실 메이트 찾아요!
      </h2>
      <p className="absolute left-[47px] top-[544px] text-[#C4C4C4] font-['NotoSansKr-Regular'] text-[16px] tracking-[-0.17px]">
        남녀노소 다 가능해요 날짜는 1월 25일
      </p>
      <p className="absolute left-[47px] top-[573px] text-[#C4C4C4] font-['NotoSansKr-Regular'] text-[16px] tracking-[-0.17px]">
        부터 1월 28일까지 여행 할 예정입니다...
      </p>
      <p className="absolute left-[48px] top-[601px] text-[#C4C4C4] font-['NotoSansKr-Regular'] text-[16px] tracking-[-0.17px]">
        쪽지 보내주세요!
      </p>

      {/* 하단 구분선 */}
      <div className="absolute left-0 top-[640px] w-[393px] h-[1px] border-t border-[#DADADA]"></div>

      {/* 좋아요 영역 */}
      <div className="absolute left-[50px] top-[665px] flex items-center gap-6">
        <div className="flex items-center gap-2">
          <img src="/heart.svg" className="w-[18px] h-[16px]" />
          <span className="text-black font-['NotoSansKr-Regular'] text-[16px] tracking-[-0.17px]">
            5
          </span>
        </div>
      </div>
    </main>
    )
}
