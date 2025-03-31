'use client'
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

interface Chat {
    usIdx: number;
    usName: string;
    usProfile: string;
    usState: number;
    msgContent: string;
    msgCreatedAt: string;  // LocalDateTime은 문자열로 처리
}

export default function ChatPage() {
    const [chatList, setChatList] = useState<Chat[]>([]);
    useEffect(() => {
        axios.get('/api/chat/room/list').then((res) => {
          console.log(res.data);
            setChatList(res.data);
        });
    }, []);
  return (
    <main className="min-h-screen bg-white flex flex-col">

      {/* 제목 */}
      <h1 className="fixed top-0 w-full bg-white text-black text-center font-['NotoSansKr-Bold'] text-[20px] tracking-[-0.17px] font-bold py-4 z-20">
        체팅방
      </h1>

      {/* 채팅 목록 */}
      <div className="flex flex-col gap-4 p-4 relative z-10 mt-[60px]">
        {chatList.map((chat, index) => (
          <Link href={`/chat/chatroom/${chat.usIdx}`} key={index} className="block w-full">
            <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
              <Image 
                src={`/s3/${chat.usProfile}`}
                alt={`${chat.usName}의 프로필`}
                width={48}
                height={48}
                className="rounded-full object-cover flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="text-black font-['NotoSansKr-Medium'] text-[15px] tracking-[-0.17px] mb-1 truncate">
                  {chat.usName}
                </div>
                <div className="text-gray-500 font-['NotoSansKr-Regular'] text-[13px] tracking-[-0.17px] truncate">
                  {chat.msgContent}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 하단 이미지 */}
      <div className="fixed bottom-5 w-full flex justify-center">
        <Image 
          src="/galmo.png" 
          alt="갈모 이미지"
          width={150}
          height={150}
          priority
        />
      </div>
    </main>
  );
}

