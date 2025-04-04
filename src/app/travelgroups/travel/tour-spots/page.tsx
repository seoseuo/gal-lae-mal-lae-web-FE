"use client";

import Header from "../../../header";
import TourSpotsListView from "../../../../components/travelgroups/tour-spots-list-view";
import "@/styles/travelgroups/travelgroups-style.css";
import { useState, useEffect, useRef } from "react";
import { getTourSpotList } from "@/lib/travelgroup-api";

interface Schedule {
    tsIdx: number;
    scDate: number;
    scStartTime: string | null;
    scEndTime: string | null;
}

interface TourSpot {
    tsIdx: number;
    tsName: string;
    tsFirstImage: string | null;
    tsAddr1: string;
    tsTel: string | null;
}

export default function Home() {
    const [tourSpotList, setTourSpotList] = useState<TourSpot[]>([]);
    const [page, setPage] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useState({ searchValue: "", selectedValue: "" });
    const observer = useRef<IntersectionObserver | null>(null);

    const [travel, setTravel] = useState<any>({});
    const [scDate, setScDate] = useState<string | null>(null);
    const [filteredScheduleList, setFilteredScheduleList] = useState<Schedule[]>([]);

    const lastElementRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const travelData = JSON.parse(localStorage.getItem("travel") || "{}");
            setTravel(travelData);
            setScDate(localStorage.getItem("scDate"));
            setFilteredScheduleList(JSON.parse(localStorage.getItem("filteredScheduleList") || "[]"));

            // travel 준비되었을 때 page 초기화
            if (travelData.lsIdx !== undefined && travelData.ldIdx !== undefined) {
                setPage(0);
            }
        }
    }, []);

    // ✅ travel.lsIdx/ldIdx가 있을 때만 loadTourSpots 호출
    useEffect(() => {
        if (
            travel &&
            travel.lsIdx !== undefined &&
            travel.ldIdx !== undefined &&
            page === 0
        ) {
            setTourSpotList([]); // page 0일 땐 초기화
        }

        if (
            travel &&
            travel.lsIdx !== undefined &&
            travel.ldIdx !== undefined
        ) {
            loadTourSpots(page, searchParams.searchValue, searchParams.selectedValue);
        }
    }, [page, searchParams, travel]);

    const loadTourSpots = async (page: number, searchValue: string, selectedValue: string) => {
        if (isLoading) return;

        setIsLoading(true);
        try {
            const data = await getTourSpotList(page, 20, travel.lsIdx, travel.ldIdx, searchValue, selectedValue);
            setTourSpotList(prev => page === 0 ? data.content : [...prev, ...data.content]);
            setHasMore(data.content.length > 0);
        } catch (error) {
            console.error("Error fetching tour spots:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore && !isLoading) {
                setPage(prevPage => prevPage + 1);
            }
        });

        if (lastElementRef.current) {
            observer.current.observe(lastElementRef.current);
        }
    }, [hasMore, isLoading]);

    const handleChange = (event: React.FormEvent<HTMLFormElement> | React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();

        if (event.type === "submit") {
            const searchInput = document.getElementById("search-input") as HTMLInputElement;
            const searchValue = searchInput.value;
            setSearchParams(prevParams => ({ ...prevParams, searchValue }));
            setPage(0); // 검색 시 페이지 초기화
        } else if (event.type === "change") {
            const selectedValue = (event.target as HTMLSelectElement).value;
            setSearchParams(prevParams => ({ ...prevParams, selectedValue }));
            setPage(0); // 필터 선택 시 페이지 초기화
        }
    };

    const filteredTourSpotList = tourSpotList.filter(tourSpot =>
        !filteredScheduleList.some(schedule => schedule.tsIdx === tourSpot.tsIdx)
    );

    return (
        <div>
            <Header text={`${scDate}일차 관광지 선정`} icon="back" parent="/travelgroups/travel/get" />
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

                <TourSpotsListView tourSpotList={filteredTourSpotList} scDate={Number(scDate)} />
                <div ref={lastElementRef} style={{ height: '1px' }}></div>
            </div>
        </div>
    );
}
