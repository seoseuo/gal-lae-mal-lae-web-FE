"use client";

import { useRouter } from "next/navigation";
import "@/styles/travelgroups/travelgroups-style.css";
import { useState, useEffect, useRef } from "react";
import { getPublicTravelogueList } from "@/lib/travelgroup-api";
import TraveloguePublicListView from "@/components/travelgroups/travelogue-public-list-view";

export default function Home() {
  const router = useRouter();
  const [traveloguePublicList, setTraveloguePublicList] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  // 페이지 또는 검색 조건이 변경될 때마다 데이터를 로드합니다.
  useEffect(() => {
    const loadTravelogueList = async () => {
      setLoading(true);
      const result = await getPublicTravelogueList(page, 10, "");
      if (page === 0) {
        setTraveloguePublicList(result.travelogueList);
      } else {
        setTraveloguePublicList((prev) => [...prev, ...result.travelogueList]);
      }
      setHasMore(result.travelogueList.length > 0);
      setLoading(false);
    };
    loadTravelogueList();
  }, [page]);

  // Intersection Observer를 사용하여 마지막 요소가 보이면 다음 페이지를 요청합니다.
  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        setPage((prev) => prev + 1);
      }
    });

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }
  }, [hasMore, loading]);

  return (
    <div>
      <div>
        <p className="header">
          <img
            src="/back.svg"
            alt="back-icon"
            className="header-icon"
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/")}
          />
          <span className="header-text bold">여행록 둘러보기</span>
          <img
            src="/search.svg"
            alt="option-icon"
            className="header-icon-option"
            style={{ cursor: "pointer" }}
            onClick={() => (location.href = "/travelogues/search")}
          />
        </p>
        <hr />
        <hr style={{ margin: "0 0 40px 0" }} />
      </div>

      <div className="travelgroup-container">
        <TraveloguePublicListView traveloguePublicList={traveloguePublicList} />
      </div>
      {loading && <div>Loading...</div>}
      {/* 이 요소가 화면에 보이면 다음 페이지를 요청합니다. */}
      <div ref={lastElementRef} style={{ height: "1px" }}></div>
      <br />
    </div>
  );
}
