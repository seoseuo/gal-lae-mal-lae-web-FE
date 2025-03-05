export default function MyPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Status Bar */}
      <header className="w-full h-[48px] flex justify-between items-center px-5">
        <span className="text-black font-['NotoSansKr-Bold'] text-[15px] tracking-[-0.17px]">9:41</span>
        <img src="container0.svg" className="h-[14px]" />
      </header>

      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-4">
        <button>
          <img src="vector0.svg" className="w-3 h-4" />
        </button>
        <h1 className="text-black text-center font-['NotoSansKr-Bold'] text-[20px] tracking-[-0.17px]">마이페이지</h1>
        <div className="w-3"></div> {/* 좌우 균형을 위한 빈 공간 */}
      </nav>

      {/* Divider */}
      <div className="w-full h-[1px] border-t border-[#DADADA]"></div>

      {/* Profile Section */}
      <section className="flex flex-col items-center mt-8 space-y-4">
        <img src="kakao-talk-20250214-233948386-020.png" className="w-[107px] h-[107px] rounded-full object-cover" />
        <button className="text-[#490085] font-['NotoSansKr-Regular'] text-[16px] tracking-[-0.17px]">사진 수정</button>
      </section>

      {/* Name Section */}
      <section className="flex items-center px-[50px] mt-6">
        <label className="text-black font-['NotoSansKr-Regular'] text-[16px] tracking-[-0.17px] mr-4">이름</label>
        <div className="flex-1 h-[42px] bg-white border border-[#DADADA] rounded-[5px] flex items-center px-[6px]">
          <span className="text-[#C4C4C4] font-['NotoSansKr-Regular'] text-[10px] tracking-[-0.17px]">이름</span>
        </div>
      </section>

      {/* Menu Items */}
      <nav className="flex flex-col space-y-8 px-8 mt-12">
        <button className="flex items-center w-full">
          <div className="flex items-center gap-4">
            <img src="lock.svg" className="w-[21px] h-[21px]" />
            <span className="text-black font-['NotoSansKr-Regular'] text-[16px] tracking-[-0.17px]">비밀번호 변경</span>
          </div>
          <img src="arrow-back-ios0.svg" className="w-[24px] h-[24px] ml-auto" />
        </button>
        <button className="flex items-center w-full">
          <div className="flex items-center gap-4">
            <img src="heart.svg" className="w-[21px] h-[21px]" />
            <span className="text-black font-['NotoSansKr-Regular'] text-[16px] tracking-[-0.17px]">좋아요</span>
          </div>
          <img src="arrow-back-ios1.svg" className="w-[24px] h-[24px] ml-auto" />
        </button>
        <button className="flex items-center w-full">
          <div className="flex items-center gap-4">
            <img src="post.svg" className="w-[21px] h-[21px]" />
            <span className="text-black font-['NotoSansKr-Regular'] text-[16px] tracking-[-0.17px]">나의 게시글</span>
          </div>
          <img src="arrow-back-ios2.svg" className="w-[24px] h-[24px] ml-auto" />
        </button>
        <button className="flex items-center w-full">
          <div className="flex items-center gap-4">
            <img src="location.svg" className="w-[21px] h-[21px]" />
            <span className="text-black font-['NotoSansKr-Regular'] text-[16px] tracking-[-0.17px]">여행록</span>
          </div>
          <img src="arrow-back-ios3.svg" className="w-[24px] h-[24px] ml-auto" />
        </button>
      </nav>
    </main>
  );
}
