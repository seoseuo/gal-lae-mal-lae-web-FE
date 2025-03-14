"use client";

import Header from "../../../header";
import TourSpotsListView from "../../../../components/travelgroups/tour-spots-list-view"
import "@/styles/travelgroups/travelgroups-style.css";
import { useState, useEffect, useRef } from "react";
import { getTourSpotList } from "@/lib/travelgroup-api";

export default function Home() {
    const [tourSpotList, setTourSpotList] = useState<any[]>([]);
    const [page, setPage] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [searchParams, setSearchParams] = useState({ searchValue: "", selectedValue: "" });
    const observer = useRef<IntersectionObserver | null>(null);
    const travel = JSON.parse(localStorage.getItem("travel") || "{}");

    useEffect(() => {
        loadTourSpots(page, searchParams.searchValue, searchParams.selectedValue);
    }, [page, searchParams]);

    const loadTourSpots = async (page: number, searchValue: string, selectedValue: string) => {
        try {
            const data = await getTourSpotList(page, 20, travel.lsIdx, travel.ldIdx, searchValue, selectedValue);
            setTourSpotList(prev => page === 0 ? data.content : [...prev, ...data.content]);
            setHasMore(data.content.length > 0);
        } catch (error) {
            console.error("Error fetching tour spots:", error);
        }
    };

    const lastElementRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });

        if (lastElementRef.current) {
            observer.current.observe(lastElementRef.current);
        }
    }, [hasMore]);

    const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const searchInput = document.getElementById("search-input") as HTMLInputElement;
        const searchValue = searchInput.value;

        const selectedValue = (event.target as HTMLInputElement)?.value || "";

        console.log("travel.ldIdx:", travel.ldIdx);
        console.log("travel.lsIdx:", travel.lsIdx);
        console.log("searchValue value:", searchValue);
        console.log("selectedValue value:", selectedValue);

        setSearchParams({ searchValue, selectedValue });
        setPage(0); // 검색 시 페이지를 0으로 초기화
    };

    return (
        <div>
            <Header text="관광지 선정" icon="back"></Header>
            <div className="travelgroup-container">
                <div className="search-bar">
                    <img src="/travelgroups/search.svg" alt="search" style={{ width: '17.49px', margin: '0 15px 0 15px' }} />
                    <form onSubmit={handleChange}>
                        <input
                            id="search-input"
                            style={{ color: '#490085', width: '90%', height: '100%' }}
                            placeholder="관광지 검색"
                        />
                        <button type="submit" style={{ display: 'none' }}>검색</button>
                    </form>
                </div>

                <div className="filter-container">
                    <select className="filter-select" onChange={handleChange} defaultValue="">
                        <option value="">전체</option>
                        <option value="A01">자연</option>
                        <option value="A02">인문</option>
                        <option value="A03">레포츠</option>
                        <option value="A04">쇼핑</option>
                        <option value="A05">음식</option>
                        <option value="B02">숙박</option>
                    </select>
                </div>

                <TourSpotsListView tourSpotList={tourSpotList} />
                <div ref={lastElementRef} style={{ height: '1px' }}></div>
                <button className="long-nomal-button bottom-button-postion travelgroups-font-size">추가</button>
            </div>
        </div>
    );
}
