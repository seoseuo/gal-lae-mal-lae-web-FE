export default function ChatRoom() {
  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* Status Bar */}
      <div className="w-full max-w-[393px] h-[5vh] absolute left-1/2 -translate-x-1/2 top-0">
        <div className="w-[17%] absolute right-[3.5%] top-1/2 -translate-y-1/2">
          <img src="container0.svg" className="absolute left-[0.5%] top-[8%]" />
        </div>
        <div className="absolute left-[5%] top-1/2 -translate-y-1/2 w-[14%] text-black text-center font-['NotoSansKr-Bold'] text-[15px] tracking-[-0.17px] font-bold">
          9:41
        </div>
      </div>

      {/* Title */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[8vh] text-black text-center font-['NotoSansKr-Bold'] text-[20px] tracking-[-0.17px] font-bold">
        쪽지
      </div>

      {/* Divider */}
      <div className="absolute left-0 top-[15vh] w-full h-[1px] border-t border-[#DADADA]"></div>

      {/* Back Button */}
      <img src="arrow-back-ios0.svg" className="absolute left-[12%] top-[8vh] w-[6%] h-auto" />

      {/* Menu Button */}
      <img src="group0.svg" className="absolute left-[83%] top-[8.5vh]" />

      {/* Profile */}
      <img src="ellipse-2970.png" className="absolute left-[5%] top-[34vh] w-[11%] aspect-square rounded-full object-cover" />
      <div className="absolute left-[18%] top-[36vh] text-black font-['NotoSansKr-Regular'] text-[16px] tracking-[-0.17px]">
        최지호
      </div>

      {/* Chat Messages */}
      <div className="absolute left-[39%] top-[21vh] w-[54%] h-auto py-[3vh] border border-[#490085] rounded-[30px_0px_24px_30px] bg-white">
        <div className="absolute left-[8%] top-[29%] text-black font-['NotoSansKr-Regular'] text-[12px] tracking-[-0.17px]">
          안녕하세요! 여행에 참여하고 싶어서<br />연락드렸어요!
        </div>
      </div>

      <div className="absolute right-[39%] top-[43vh] w-[54%] h-auto py-[3vh] border border-[#490085] rounded-[30px_0px_24px_30px] bg-white scale-x-[-1]">
        <div className="absolute left-[24%] top-[41%] text-black font-['NotoSansKr-Regular'] text-[12px] tracking-[-0.17px] scale-x-[-1]">
          넵! 혹시 인적사항 여쭤봐도 될까요?
        </div>
      </div>

      {/* Input Box - Fixed Position */}
      <div className="fixed left-1/2 -translate-x-1/2 bottom-[3vh] w-[83%] max-w-[393px]">
        <div className="relative bg-[#C4C4C4] rounded-[12px] h-[52px] px-[6%] py-[15px]">
          <div className="text-white font-['NotoSansKr-Medium'] text-[17px] leading-[22px] tracking-[-0.41px]">
            댓글을 입력하세요
          </div>
          <img 
            src="/send.svg" 
            className="absolute right-[6%] top-1/2 -translate-y-1/2 w-[24px] h-[24px]" 
          />
        </div>
      </div>
    </main>
  );
}

