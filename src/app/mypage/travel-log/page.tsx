export default function TravelLogue() {
  return (
    <main className="min-h-screen bg-white flex flex-col">

      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-4 relative">
        <button className="p-2">
          <img src="/back.svg" className="w-3 h-4" alt="뒤로가기" />
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-black font-['NotoSansKr-Bold'] text-[20px] tracking-[-0.17px]">
          여행록
        </h1>
      </nav>

      {/* Divider */}
      <div className="w-full h-px bg-[#DADADA]"></div>

      {/* Travel Log Content */}
      <section className="flex flex-col px-10 py-8 space-y-6">
        {/* Section Title */}
        <h2 className="text-black font-['NotoSansKr-Regular'] text-[16px]">
          여행록
        </h2>

        {/* Menu Items */}
        <div className="flex flex-col space-y-4 ml-10">
          {/* My Travel Log */}
          <button className="flex items-center w-full group">
            <div className="flex items-center flex-1">
              <img src="/text.svg" className="w-[22px] h-[22px] mr-4" alt="나의 여행록 아이콘" />
              <span className="text-black font-['NotoSansKr-Regular'] text-[16px] tracking-[-0.17px]">
                나의 여행록
              </span>
            </div>
            <img 
              src="/arrow-back-ios2.svg" 
              className="w-4 h-4 transition-transform group-hover:translate-x-1" 
              alt="화살표"
            />
          </button>

          {/* Followed Travel Log */}
          <button className="flex items-center w-full group">
            <div className="flex items-center flex-1">
              <img src="/bell.svg" className="w-[22px] h-[22px] mr-4" alt="팔로우한 여행록 아이콘" />
              <span className="text-black font-['NotoSansKr-Regular'] text-[16px] tracking-[-0.17px]">
                팔로우한 여행록
              </span>
            </div>
            <img 
              src="/arrow-back-ios2.svg" 
              className="w-4 h-4 transition-transform group-hover:translate-x-1" 
              alt="화살표"
            />
          </button>
        </div>
      </section>
    </main>
  );
}

