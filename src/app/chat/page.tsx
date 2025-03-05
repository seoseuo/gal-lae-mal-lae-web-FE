import Link from "next/link";

export default function ChatPage() {
    const chatList = [
        {
            image: "/ellipse-3000.png",
            name: "유하연",
            message: "네 모임 생성 후 구체적인 일정 공유해드릴게요!"
        },
        {
            image: "/ellipse-3010.png",
            name: "김아람",
            message: "이메일 주소 보내주세요!"
        },
        {
            image: "/ellipse-3020.png",
            name: "박지민",
            message: "다음 주 화요일에 시간 되시나요?"
        },
        {
            image: "/ellipse-3030.png",
            name: "이서연",
            message: "참가 신청서 제출했습니다!"
        },
        {
            image: "/ellipse-3040.png",
            name: "정민수",
            message: "안녕하세요, 모임 관련 문의드립니다."
        },
        {
            image: "/ellipse-3050.png",
            name: "최다은",
            message: "네, 확인했습니다. 감사합니다!"
        }
    ]
  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* 상태바 */}
      <div className="relative h-[48px] w-full">
        <div className="absolute right-[14px] top-1/2 -translate-y-1/2 w-[68px] h-[14px]">
          <img src="container0.svg" className="absolute left-[0.5px] top-[1.16px]" />
        </div>
        <div className="absolute left-[20px] top-1/2 -translate-y-1/2 w-[54px] text-black text-center font-['NotoSansKr-Bold'] text-[15px] tracking-[-0.17px] font-bold">
          9:41
        </div>
      </div>

      {/* 제목 */}
      <h1 className="text-black text-center font-['NotoSansKr-Bold'] text-[20px] tracking-[-0.17px] font-bold py-4">
        쪽지
      </h1>

      {/* 구분선 */}
      <div className="w-full h-[1px] border-t border-[#DADADA]"></div>
      {/* 채팅 목록 */}
      <div className="flex flex-col gap-8 p-7 relative z-10">
        {chatList.map((chat, index) => (
          <Link  href={`/chat/chatroom/${index}`} key={index}>
            <div className="flex items-start gap-[14px]">
              <img src={chat.image} className="w-[48px] h-[48px] rounded-full object-cover" />
              <div>
                <div className="text-black font-['NotoSansKr-Regular'] text-[16px] tracking-[-0.17px] mb-[9px]">
                  {chat.name}
                </div>
                <div className="text-[#C4C4C4] font-['NotoSansKr-Regular'] text-[12px] tracking-[-0.17px]">
                  {chat.message}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 하단 이미지 */}
      <div className="fixed bottom-[20px] left-[610px] z-[0]">
        <img src="/galmo.png" className="w-[150px]" />
      </div>
    </main>
  );
}

