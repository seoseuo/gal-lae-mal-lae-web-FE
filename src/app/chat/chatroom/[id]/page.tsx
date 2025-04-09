'use client'
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import Image from "next/image";

interface User {
  usIdx: number;
  usName: string;
  usProfile: string;
}
interface ChatRoom{
  crIdx: number;
  myUser: User;
  otherUser: User;
}
interface Chat {
  msgIdx: number;
  msgSender: number;
  msgContent: string;
  crIdx: number;
  msgCreatedAt: string;
  msgRead: 'READ' | 'UNREAD';
  msgState: number;
}

export default function ChatRoom() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [chatList, setChatList] = useState<Chat[]>([]);
  const [chatRoom, setChatRoom] = useState<ChatRoom>();
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [message, setMessage] = useState<string>('');
  const socket = new SockJS(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}`);

  const getChatList = useCallback(async () => {
    try {
      const response = await axios.get(`/api/chat/message/${chatRoom?.crIdx}`);
      setChatList(response.data);
    } catch (error) {
      console.error('Error fetching chat list:', error)
    }
  }, [chatRoom?.crIdx]);
  
  const getChatRoom = useCallback(async () => {
    try {
      const response = await axios.get(`/api/chat/room?usIdx=${id}`);
      setChatRoom(response.data);
    } catch (error) {
      console.error('Error fetching chat room:', error)
    }
  }, [id]);

  const connectWebSocket = useCallback(() => {
    if(!chatRoom) return;
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log(str);
      },
      onConnect: () => {
        console.log('WebSocket 연결 성공 채팅방 번호:', chatRoom?.crIdx);
        client.subscribe(`/sub/chat/${chatRoom?.crIdx}`, (message) => {
          try{
            const chat = JSON.parse(message.body);
            setChatList((prev) => [...prev, chat]);
          } catch (error) {
            console.error('WebSocket 메시지 파싱 오류:', error);
          }
        });
      },
      onDisconnect: () => {
        console.log('WebSocket 연결 끊김 채팅방 번호:', chatRoom?.crIdx);
      },
    });
    client.activate();
    setStompClient(client);

    return () => {
      if(client){
        console.log('WebSocket 연결 해제 채팅방 번호:', chatRoom?.crIdx);
        client.deactivate();
      }
    }
  }, [chatRoom, socket]);

  useEffect(() => {
    getChatRoom();
  }, [getChatRoom]);

  useEffect(() => {
    if(chatRoom){
      getChatList();
      connectWebSocket();
    }
  }, [chatRoom, getChatList, connectWebSocket]);

  const getFormattedDate = (date: string) => {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const weekdays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const weekday = weekdays[dateObj.getDay()];
    return `${year}년 ${month}월 ${day}일 ${weekday}`;
  };

  const getFormattedTime = (date: string) => {
    const dateObj = new Date(date);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? '오후' : '오전';
    const formattedHours = hours > 12 ? hours - 12 : hours;
    return `${ampm} ${formattedHours}:${minutes}`;
  };

  // 날짜만 추출하는 함수 (그룹화를 위해)
  const getDateOnly = (date: string) => {
    return date.split('T')[0];
  };

  const getUser = (id: number) => {
    if (!chatRoom) return null;
    return id === chatRoom.myUser.usIdx 
      ? { ...chatRoom.myUser, isMine: true }
      : { ...chatRoom.otherUser, isMine: false };
  };

  const sendMessage = () => {
    if (!stompClient || !chatRoom || !message.trim()) return;
  
    const chatMessage = {
      sender: chatRoom.myUser.usIdx, // 내 ID
      message: message,
      crIdx: chatRoom.crIdx, // 채팅방 ID
    };
    stompClient.publish({
      destination: `/pub/chat`,
      body: JSON.stringify(chatMessage),
    });
  
    setMessage(""); // 입력창 초기화
  };
  
  const handleBack = () => {
    router.back();
  };

  return (
    <main className="min-h-screen bg-[#490085]/5 flex flex-col">
      {/* Header - Fixed */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-[#DADADA] z-10">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Image
            src="/back.svg"
            alt="Back"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={handleBack}
          />
          <div className="flex-1 flex items-center justify-center gap-2">
            <h1 className="text-[#490085] font-['NotoSansKr-Bold'] text-[18px]">
              {chatRoom?.otherUser.usName}
            </h1>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 container mx-auto px-4 py-4 overflow-y-auto mt-[60px] mb-[76px]">
        {chatRoom && chatList.length > 0 ? (
          Object.entries(
            chatList.reduce((groups, chat) => {
              const dateKey = getDateOnly(chat.msgCreatedAt);
              if (!groups[dateKey]) {
                groups[dateKey] = {
                  date: chat.msgCreatedAt,
                  messages: []
                };
              }
              groups[dateKey].messages.push(chat);
              return groups;
            }, {} as Record<string, { date: string; messages: typeof chatList }>)
          ).map(([dateKey, group], index) => (
            <div key={dateKey} className={index > 0 ? 'mt-10' : ''}>
              {/* Date Divider */}
              <div className="flex justify-center mb-6">
                <span className="text-xs text-[#490085] bg-[#490085]/10 px-3 py-1 rounded-full">
                  {getFormattedDate(group.date)}
                </span>
              </div>

              {/* Messages */}
              <div className="space-y-4">
                {group.messages.map((chat) => {
                  const user = getUser(chat.msgSender);
                  if (!user) return null;
                  
                  return user.isMine ? (
                    // Sent Message
                    <div key={chat.msgIdx} className="flex flex-row-reverse items-end gap-2">
                      <div className="bg-[#490085]/70 rounded-2xl px-3 py-2 shadow-sm max-w-[70%]">
                        <p className="text-white text-[15px]">
                          {chat.msgContent}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-[2px]">
                        <span className="text-xs text-[#490085]/70">
                          {getFormattedTime(chat.msgCreatedAt)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    // Received Message
                    <div key={chat.msgIdx} className="flex items-start gap-2">
                      <Image 
                        src={`/s3/${user.usProfile}`}
                        alt={`${user.usName}의 프로필`}
                        width={36}  // w-9 = 36px
                        height={36} // h-9 = 36px
                        className="rounded-full object-cover"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm text-[#490085] mb-1">{user.usName}</span>
                        <div className="flex items-end gap-2">
                          <div className="bg-white rounded-2xl px-3 py-2 shadow-sm max-w-[70%]">
                            <p className="text-black text-[15px]">
                              {chat.msgContent}
                            </p>
                          </div>
                          <span className="text-xs text-[#490085]/70">{getFormattedTime(chat.msgCreatedAt)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-[#490085]/70">채팅 내역을 불러오는 중...</p>
          </div>
        )}
      </div>

      {/* Input Box - Fixed */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-10">
        <div className="container mx-auto flex items-center gap-2">
          <div className="flex-1 min-h-[40px] max-h-[100px] bg-[#490085]/5 rounded-full px-4 py-2">
            <input 
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="메시지 보내기"
              className="w-full bg-transparent outline-none text-[15px] placeholder:text-[#490085]/50"
            />
          </div>
          <button className="w-10 h-10 flex items-center justify-center bg-[#490085] rounded-full" onClick={sendMessage}>
            <Image 
              src="/send.svg"
              alt="메시지 보내기"
              width={20}  // w-5 = 20px
              height={20} // h-5 = 20px
              className="brightness-0 invert"
            />
          </button>
        </div>
      </div>
    </main>
  );
}

