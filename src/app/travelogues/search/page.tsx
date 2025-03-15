"use client";

import Header from "@/app/header";
import { getPublicTravelogueList } from "@/lib/travelgroup-api";
import TraveloguePublicListView from "@/components/travelgroups/travelogue-public-list-view";
import "@/styles/travelgroups/travelgroups-style.css";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  // 검색 제출 시 처리: 검색어, 페이지, 결과 초기화
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const search = formData.get("search") as string;

    if (!search) {
      console.log("search is empty");
      return;
    }
    setSearchQuery(search);
    setPage(0);
    setSearchResult([]);
    setHasMore(true);
  };

  // 페이지나 검색어가 변경될 때마다 데이터 로드
  useEffect(() => {
    if (!searchQuery) return;

    const loadResults = async () => {
      setLoading(true);
      const result = await getPublicTravelogueList(page, 10, searchQuery);
      const newResults = result.travelogueList;
      if (page === 0) {
        setSearchResult(newResults);
      } else {
        setSearchResult((prev) => [...prev, ...newResults]);
      }
      
      setHasMore(newResults.length >0);
      setLoading(false);
    };

    loadResults();
  }, [page, searchQuery]);

  // Intersection Observer를 사용하여 마지막 요소가 보이면 페이지 증가
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
      <Header text="여행록 검색" icon="back" parent="/travelogues" />
      <div className="travelgroup-container">
        <form method="get" name="search-list" onSubmit={handleSubmit}>
          <div className="search-bar">
            <img
              src="/travelgroups/search.svg"
              alt="search"
              style={{ width: "17.49px", margin: "0 15px 0 15px" }}
            />
            <input
              name="search"
              style={{ color: "#490085", width: "80%", height: "100%" }}
              placeholder="여행록 검색"
            />
          </div>
        </form>
      </div>
      <br />
      <div className="travelgroup-container">
        <TraveloguePublicListView traveloguePublicList={searchResult} />
      </div>
      {loading && <div>Loading...</div>}
      {/* 이 감시 요소가 화면에 보이면 다음 페이지를 요청합니다. */}
      <div ref={lastElementRef} style={{ height: "1px" }}></div>
    </div>
  );
}
