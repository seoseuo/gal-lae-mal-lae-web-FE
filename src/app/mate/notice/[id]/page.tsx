'use client'
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

interface Board {
  boIdx: number;
  boTitle: string;
  boContent: string;
  boImg: string;
  ldIdx: number;
  boLike: number;
  lsIdx: number;
  usIdx: number;
  boDate: string;
  usName: string;
  boAge: String;
  usProfile: string;
}

export default function NoticePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [board, setBoard] = useState<Board>();
  const [chatCheck, setChatCheck] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      getBoard();
    }
  }, [id]);

  useEffect(() => {
    if (board) {
      checkChat();
    }
  }, [board]);

  const getBoard = () => {
    axios.get(`/api/mate/board/${id}`).then((res) => {
      setBoard(res.data);
      console.log(res.data);
    });
  };

  const checkChat = () => {
    axios.get(`/api/chat/room/check?usIdx=${board?.usIdx}`).then((res) => {
      console.log(res.data);
      setChatCheck(res.data.success);
    });
  };
  const getDate = (date: string) => {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    return `${year}-${month}-${day}`;
  };

  const getTime = (date: string) => {
    const dateObj = new Date(date);
    const hour = dateObj.getHours();
    const minute = dateObj.getMinutes();
    return `${hour}:${minute}`;
  };

  const handleLike = () => {
   // localStorage 에 좋아요 여부 저장
   const isLiked = localStorage.getItem(`board_${id}_like`);
   if (isLiked) {
    alert('이미 좋아요를 눌렀습니다.');
    return;
   } else {
    localStorage.setItem(`board_${id}_like`, 'true');
   }
    axios.put(`/api/mate/board/${id}/like`).then((res) => {
      console.log(res.data);
      setBoard(prev => prev ? {...prev, boLike: res.data} : prev);
    });
  };

  const handleChat = async () => {
    if (chatCheck) {
      router.push(`/chat/chatroom/${board?.usIdx}`);
    } else {
      const res = await axios.post(`/api/chat/room?usIdx=${board?.usIdx}`);
      console.log(res.data);
      router.push(`/chat/chatroom/${board?.usIdx}`);
    }
  };

  return (
    <main className="min-h-screen bg-white flex flex-col px-[43px] py-[65px]">
      {/* 제목 */}
      <h1 className="text-black text-center font-['NotoSansKr-Bold'] text-[20px] tracking-[-0.17px] font-bold mb-[35px]">
        여행 메이트
      </h1>

      {/* 구분선 */}
      <div className="w-full h-[1px] border-t border-[#DADADA] mb-[75px]"></div>

      {/* 프로필 영역 */}
      <div className="flex items-center gap-4 mb-[67px]">
        {board?.usProfile && (
          <img 
            src={`/s3/${board.usProfile}`} 
            className="w-[45px] h-[45px] rounded-full object-cover" 
            alt="프로필 이미지"
          />
        )}
        <div>
          <div className="text-black font-['NotoSansKr-Regular'] text-[12px] tracking-[-0.17px]">
            {board?.usName}
          </div>
          <div className="flex gap-2 items-center mt-1">
            <span className="text-[#C4C4C4] font-['NotoSansKr-Regular'] text-[12px] tracking-[-0.17px]">
              {board ? getDate(board.boDate) : ''}
            </span>
            <div className="w-[0.5px] h-[11px] bg-[#C4C4C4]"></div>
            <span className="text-[#C4C4C4] font-['NotoSansKr-Regular'] text-[12px] tracking-[-0.17px]">
              {board ? getTime(board.boDate) : ''}
            </span>
          </div>
        </div>
        <button className="ml-auto px-4 py-2 bg-[#490085] rounded-[6px] text-white font-['NotoSansKr-Medium'] text-[14px]"
        onClick={handleChat}
        >
          채팅하기
        </button>
      </div>

      {/* 메인 이미지 */}
      <div className="flex justify-center mb-[38px]">
        {board?.boImg && (
          <img 
            src={`/s3/${board.boImg}`} 
            className="w-[305px] h-[198px] rounded-xl" 
            alt="게시글 이미지"
          />
        )}
      </div>

      {/* 본문 내용 */}
      <div className="flex flex-col gap-4 mb-[40px]">
        <h2 className="text-black font-['NotoSansKr-Regular'] text-[16px] tracking-[-0.17px]">
          {board?.boTitle}
        </h2>
        <p className="text-[#C4C4C4] font-['NotoSansKr-Regular'] text-[16px] tracking-[-0.17px]">
          {board?.boContent}
        </p>
      </div>

      {/* 하단 구분선 */}
      <div className="w-full h-[1px] border-t border-[#DADADA] mb-[24px]"></div>

      {/* 좋아요 영역 */}
      <div className="flex items-center gap-6">
        <button className="flex items-center gap-2" onClick={handleLike}>
          <img src="/heart.svg" className="w-[18px] h-[16px]" />
          <span className="text-black font-['NotoSansKr-Regular'] text-[16px] tracking-[-0.17px]">
            {board?.boLike}
          </span>
        </button>
      </div>
    </main>
  );
}
