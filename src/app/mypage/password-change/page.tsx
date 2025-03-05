export default function PasswordChange() {
  return (
    <main className="min-h-screen bg-white flex flex-col relative">
      {/* Status Bar */}
      <header className="w-[393px] h-[48px] absolute left-1/2 -translate-x-1/2 top-0">
        <div className="absolute right-[14px] top-1/2 -translate-y-1/2 w-[68px] h-[14px]">
          <img src="container0.svg" className="absolute left-[0.5px] top-[1.16px]" />
        </div>
        <div className="absolute left-[20px] top-1/2 -translate-y-1/2 w-[54px] text-black text-center font-['NotoSansKr-Bold'] text-[15px] tracking-[-0.17px] font-bold">
          9:41
        </div>
      </header>

      {/* Title */}
      <h1 className="absolute left-1/2 -translate-x-1/2 top-[84px] text-black text-center font-['NotoSansKr-Bold'] text-[20px] tracking-[-0.17px] font-bold">
        비밀번호 변경
      </h1>

      {/* Divider */}
      <div className="absolute left-0 top-[134px] w-[393px] h-[1px] border-t border-[#DADADA]"></div>

      {/* Back Button */}
      <button className="absolute left-[8.91%] top-[10.09%]">
        <img src="vector0.svg" className="w-[2.97%] h-[2.32%]" />
      </button>

      {/* Subtitle */}
      <h2 className="absolute left-[44px] top-[176px] w-[96px] h-[18px] text-black font-['NotoSansKr-Regular'] text-[16px] tracking-[-0.17px]">
        비밀번호 변경
      </h2>

      {/* Password Inputs */}
      <div className="absolute left-[44px] top-[226px] w-[235px] h-[32px] bg-white border border-[#DADADA] rounded-[5px] flex items-center px-[6px]">
        <input type="password" placeholder="현재 비밀번호" className="text-[#C4C4C4] font-['NotoSansKr-Regular'] text-[12px] tracking-[-0.17px] w-full" />
      </div>

      <div className="absolute left-[44px] top-[271px] w-[235px] h-[33px] bg-white border border-[#DADADA] rounded-[5px] flex items-center px-[6px]">
        <input type="password" placeholder="새 비밀번호" className="text-[#C4C4C4] font-['NotoSansKr-Regular'] text-[12px] tracking-[-0.17px] w-full" />
      </div>

      <div className="absolute left-[44px] top-[317px] w-[235px] h-[32px] bg-white border border-[#DADADA] rounded-[5px] flex items-center px-[6px]">
        <input type="password" placeholder="새 비밀번호 재입력" className="text-[#C4C4C4] font-['NotoSansKr-Regular'] text-[12px] tracking-[-0.17px] w-full" />
      </div>

      {/* Submit Button */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[647px] w-[292px]">
        <button className="w-full bg-[#C4C4C4] rounded-[12px] py-[15px] px-6 text-white font-['NotoSansKr-Medium'] text-[17px] leading-[22px] tracking-[-0.41px]">
          비밀번호 변경
        </button>
      </div>
    </main>
  );
}

