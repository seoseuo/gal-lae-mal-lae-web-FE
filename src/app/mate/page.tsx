'use client'
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState, useRef, useCallback } from "react";
import Image from 'next/image';
import Link from 'next/link';

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
  boAge: string;
}

interface Location {
  ldIdx: number;
  ldName: string;
}

export default function Mate() {
  const router = useRouter();

  const [boardList, setBoardList] = useState<Board[]>([]);
  const [locationList, setLocationList] = useState<Location[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [sort, setSort] = useState<string>('latest');

  const getBoardList = useCallback(async (pageNum: number) => {
    if (loading || !hasMore) return;
    
    try {
      setLoading(true);
      const res = await axios.get(`api/mate/board?page=${pageNum}&search=${searchTerm}&location=${location}&sort=${sort}`);
      const newBoards = res.data.content;
      
      if (pageNum === 0) {
        setBoardList(newBoards);
      } else {
        setBoardList(prev => [...prev, ...newBoards]);
      }
      
      setHasMore(newBoards.length > 0);
      setPage(pageNum);
    } catch (error) {
      console.error('게시글 목록을 가져오는데 실패했습니다:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, searchTerm, location, sort]);

  const resetAndSearch = useCallback(() => {
    setPage(0);
    setHasMore(true);
    getBoardList(0);
  }, [getBoardList]);

  const getLocationList = useCallback(() => {
    try {
      axios.get('api/mate/location/do').then((res) => {
        setLocationList(res.data);
      });
    } catch (error) {
      console.error('지역 목록을 가져오는데 실패했습니다:', error);
    }
  }, []);

  useEffect(() => {
    getLocationList();
  }, [getLocationList]);

  const getLocationName = (board: Board) => {
    return locationList.find(location => location.ldIdx === board.ldIdx)?.ldName;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          getBoardList(page + 1);
        }
      },
      { threshold: 1.0 }
    );
    
    observerRef.current = observer;
    return () => observer.disconnect();
  }, [hasMore, loading, page, getBoardList]);

  useEffect(() => {
    const observer = observerRef.current;
    const lastElement = lastElementRef.current;
    
    if (observer && lastElement) {
      observer.observe(lastElement);
    }
    
    return () => {
      if (observer && lastElement) {
        observer.unobserve(lastElement);
      }
    };
  }, [boardList]);

  useEffect(() => {
    resetAndSearch();
  }, [searchTerm, location, sort, resetAndSearch]);

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const minutes = Math.floor(diffTime / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}분전`;
    if (hours < 24) return `${hours}시간전`;
    return `${days}일전`;
  };

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <h1 className="mt-[65px] text-center font-['NotoSansKr-Bold'] text-[20px] tracking-[-0.17px] font-bold text-black">여행 메이트</h1>
      
      <div className="w-full mt-[35px] border-t border-[#DADADA]"></div>

      <div className="mx-[24px] mt-[38px]">
        <div className="flex items-center gap-3 w-full h-[44px] px-[17px] py-[13px] bg-white border border-black rounded-[56px]">
          <button 
            onClick={() => getBoardList(0)}
            className="flex items-center justify-center hover:opacity-70"
          >
            <Image 
              src="/search.svg" 
              alt="검색" 
              width={20} 
              height={20} 
            />
          </button>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="가고싶은 여행지를 입력하세요."
            className="w-full text-black text-[13px] tracking-[-0.17px] outline-none"
          />
        </div>
      </div>

      <div className="flex justify-end mx-[25px] mt-[24px] gap-[7px]">
        <select 
          value={location}
          onChange={handleLocationChange}
          className="flex items-center justify-start gap-[5px] px-2 py-[5px] bg-white border border-black rounded-xl w-[76px] h-[28px] text-black text-xs font-['NotoSansKr-Regular']"
        >
          <option value="">지역</option>
          {locationList.map((loc) => (
            <option key={loc.ldIdx} value={loc.ldIdx.toString()}>
              {loc.ldName}
            </option>
          ))}
        </select>
        <select 
          value={sort}
          onChange={handleSortChange}
          className="flex items-center justify-start gap-[5px] px-2 py-[5px] bg-white border border-black rounded-xl w-[76px] h-[28px] text-black text-xs font-['NotoSansKr-Regular']"
        >
          <option value="latest">최신순</option>
          <option value="oldest">오래된순</option>
          <option value="like">좋아요순</option>
        </select>
      </div>

      <div className="mx-[25px] mt-[30px]">
        <div 
          onClick={() => router.push("/mate/notice/tip")}
          className="relative w-full h-[190px] cursor-pointer hover:opacity-80"
        >
          <div className="mb-[8px]">
            <Image 
              src="/add1.svg" 
              alt="메이트 찾기 배너" 
              width={343} 
              height={130} 
              className="w-full h-[130px]"
            />
          </div>
          <div className="text-black text-xs font-['NotoSansKr-Regular'] tracking-[-0.17px] mb-[8px]">
            갈래말래가 전하는 여행 메이트 찾기 꿀팁
          </div>
          <div className="text-black text-xs font-['NotoSansKr-Regular'] tracking-[-0.17px]">
            보고싶다면? click!
          </div>
        </div>
      </div>

      <div className="mx-[25px] mt-[18px]">
        <div className="text-[13px] tracking-[-0.17px] text-black mb-[20px]">여행 메이트를 찾아보세요!</div>
        
        <div className="w-full flex flex-col gap-6">
          {boardList.map((board) => (
            <Link href={`/mate/notice/${board.boIdx}`} key={board.boIdx}>
              <div className="flex gap-[14px]">
                <Image 
                  src={`/s3/${board.boImg}`}
                  alt={`${board.boTitle} 이미지`}
                  width={120}
                  height={92}
                  className="rounded-xl"
                />
                
                <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-2">
                        <div className="px-3 py-1 border border-[#490085] rounded-xl">
                            <span className="text-[#490085] text-xs">{getLocationName(board)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#C4C4C4] text-xs">
                            <span>{getTimeAgo(board.boDate)}</span>
                            <div className="w-[0.5px] h-3 bg-[#C4C4C4]"></div>
                            <span>{board.usName}</span>
                        </div>
                    </div>

                    <h2 className="mt-[13px] text-sm tracking-[-0.17px]">
                        {board.boTitle}
                    </h2>

                    <p className="mt-[9px] text-sm tracking-[-0.17px] text-[#C4C4C4]">
                        {board.boContent}
                    </p>

                    <div className="mt-auto flex items-center">
                        <Image 
                          src="/heart.svg" 
                          alt="좋아요" 
                          width={14} 
                          height={12} 
                        />
                        <span className="ml-1 text-xs tracking-[-0.17px]">{board.boLike}</span>
                    </div>
                </div>
              </div>
            </Link>
          ))}
          <div ref={lastElementRef} className="h-4" />
          {loading && (
            <div className="text-center py-4">
              <span>로딩 중...</span>
            </div>
          )}
        </div>
      </div>

      <div className="fixed right-[25px] bottom-[25px]">
        <button
          onClick={() => router.push("/mate/notice/upload")}
          className="w-[39px] h-[39px] flex items-center justify-center rounded-[20px] bg-[#490085]"
        >
          <Image 
            src="/write.svg" 
            alt="글쓰기" 
            width={39} 
            height={39} 
          />
        </button>
      </div>
    </main>
  );
}

