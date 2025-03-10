'use client'
import Footer from "@/component/footer";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Mate() {
  const router = useRouter();
    const mateList = [
        {
            id: 1,
            region: '강원도',
            timeAgo: '48분전',
            author: '김아람',
            title: '춘천여행 같이 가실 메이트 찾아요!',
            description: '남녀노소 다 가능해요 날짜는 1월 25일부터 1월 28일까지 여행 할 예정입니다...',
            image: 'image.png',
            likes: 5
        },
        {
            id: 2,
            region: '제주도',
            timeAgo: '2시간전',
            author: '이지민',
            title: '제주도 한달살기 동행구해요',
            description: '2월부터 제주도 한달살기 계획중입니다. 함께하실 분 구합니다...',
            image: 'image.png',
            likes: 12
        },
        {
            id: 3,
            region: '부산',
            timeAgo: '3시간전',
            author: '박서준',
            title: '부산 맛집 투어 하실 분!',
            description: '이번 주말 부산 맛집 투어 계획중입니다. 맛집 좋아하시는 분들...',
            image: 'image.png',
            likes: 8
        }
    ];

    const content = [
        {
            title: '여행 메이트',
            description: '여행 메이트를 찾아보세요!',
            image: 'add1.svg'
        }
    ]
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <h1 className="mt-[65px] text-center font-['NotoSansKr-Bold'] text-[20px] tracking-[-0.17px] font-bold text-black">여행 메이트</h1>
      
      <div className="w-full mt-[35px] border-t border-[#DADADA]"></div>

      {/* 검색창 */}
      <div className="mx-[24px] mt-[38px]">
        <div className="flex items-center gap-3 w-full h-[44px] px-[17px] py-[13px] bg-white border border-black rounded-[56px]">
          <img src="search.svg" className="w-[20px] h-[20px]" />
          <div className="text-black text-[13px] tracking-[-0.17px]">가고싶은 여행지를 입력하세요.</div>
        </div>
      </div>

      {/* 필터 버튼 */}
      <div className="flex justify-end mx-[25px] mt-[24px] gap-[7px]">
        <div className="flex items-center justify-start gap-[5px] px-2 py-[5px] bg-white border border-black rounded-xl w-[68px] h-[26px]">
          <span className="text-black text-xs font-['NotoSansKr-Regular']">강원도</span>
          <img src="vector0.svg" className="w-2 h-3" />
        </div>
        <div className="flex items-center justify-start gap-[5px] px-2 py-[5px] bg-white border border-black rounded-xl w-[68px] h-[26px]">
          <span className="text-black text-xs font-['NotoSansKr-Regular']">최신순</span>
          <img src="vector1.svg" className="w-2 h-3" />
        </div>
      </div>

      {/* 배너 섹션 */}
      <div className="mx-[25px] mt-[30px]">
        <div className="relative w-full h-[190px]">
          <div className="mb-[8px]">
            <img src="add1.svg" alt="메이트 찾기 배너" className="w-full h-[130px]" />
          </div>
          <div className="text-black text-xs font-['NotoSansKr-Regular'] tracking-[-0.17px] mb-[8px]">
            갈래말래가 전하는 여행 메이트 찾기 꿀팁
          </div>
          <div className="text-black text-xs font-['NotoSansKr-Regular'] tracking-[-0.17px]">
            보고싶다면? click!
          </div>
        </div>
      </div>

      {/* 메이트 찾기 섹션 */}
      <div className="mx-[25px] mt-[18px]">
        <div className="text-[13px] tracking-[-0.17px] text-black mb-[20px]">여행 메이트를 찾아보세요!</div>
        
        <div className="w-full flex flex-col gap-6">
            {mateList.map((mate) => (
                <Link  href={`/mate/notice/${mate.id}`} key={mate.id}>
                    <div className="flex gap-[14px]">
                        <img 
                            src={mate.image}
                            alt="여행 이미지" 
                            className="w-[149px] h-[114px] rounded-xl"
                        />
                        
                        <div className="flex-1 flex flex-col">
                            <div className="flex items-center gap-2">
                                <div className="px-3 py-1 border border-[#490085] rounded-xl">
                                    <span className="text-[#490085] text-xs">{mate.region}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[#C4C4C4] text-xs">
                                    <span>{mate.timeAgo}</span>
                                    <div className="w-[0.5px] h-3 bg-[#C4C4C4]"></div>
                                    <span>{mate.author}</span>
                                </div>
                            </div>

                            <h2 className="mt-[13px] text-xs tracking-[-0.17px]">
                                {mate.title}
                            </h2>

                            <p className="mt-[9px] text-xs tracking-[-0.17px] text-[#C4C4C4]">
                                {mate.description}
                            </p>

                            <div className="mt-auto flex items-center">
                                <img src="heart.svg" className="w-[14px] h-[12px]" alt="좋아요" />
                                <span className="ml-1 text-xs tracking-[-0.17px]">{mate.likes}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
      </div>

      {/* 글쓰기 버튼 */}
      <div className="fixed right-[25px] bottom-[25px]">
        <button
          onClick={() => router.push("/mate/notice/upload")}
          className="w-[39px] h-[39px] flex items-center justify-center rounded-[20px] bg-[#490085]"
        >
          <img src="write.svg" alt="글쓰기" className="w-[39px] h-[39px]" />
        </button>
      </div>
    </main>
  );
}

