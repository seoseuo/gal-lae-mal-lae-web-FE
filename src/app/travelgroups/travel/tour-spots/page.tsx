"use client";

import Header from "../../../header";
import TourSpotsListView from "../../../../components/travelgroups/tour-spots-list-view";
import "@/styles/travelgroups/travelgroups-style.css";
import { useState, useEffect, useRef } from "react";
import { getTourSpotList } from "@/lib/travelgroup-api";

interface Schedule {
    tsIdx: number; // Index for the tour spot
    scDate: number; // The date of the schedule
    scStartTime: string | null; // Start time
    scEndTime: string | null; // End time
}

interface TourSpot {
    tsIdx: number; // Index for the tour spot
    tsName: string; // Name of the tour spot
    tsFirstImage: string | null; // Image URL
    tsAddr1: string; // Address of the tour spot
    tsTel: string | null; // Phone number
}

export default function Home() {
    const [tourSpotList, setTourSpotList] = useState<TourSpot[]>([]);
    const [page, setPage] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [searchParams, setSearchParams] = useState({ searchValue: "", selectedValue: "" });
    const observer = useRef<IntersectionObserver | null>(null);


    // const travel = JSON.parse(localStorage.getItem("travel") || "{}");
    // const scDate = localStorage.getItem("scDate");
    // const filteredScheduleList: Schedule[] = JSON.parse(localStorage.getItem("filteredScheduleList") || "[]");

    const [travel, setTravel] = useState<any>({});
    const [scDate, setScDate] = useState<string | null>(null);
    const [filteredScheduleList, setFilteredScheduleList] = useState<Schedule[]>([]);
    
    useEffect(() => {
        if (typeof window !== "undefined") {
            setTravel(JSON.parse(localStorage.getItem("travel") || "{}"));
            setScDate(localStorage.getItem("scDate"));
            setFilteredScheduleList(JSON.parse(localStorage.getItem("filteredScheduleList") || "[]"));
        }
    }, []);
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

    const handleChange = (event: React.FormEvent<HTMLFormElement> | React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();

        if (event.type === "submit") {
            // form onSubmit 처리
            const searchInput = document.getElementById("search-input") as HTMLInputElement;
            const searchValue = searchInput.value;
            setSearchParams(prevParams => ({ ...prevParams, searchValue }));
            setPage(0); // 검색 시 페이지를 0으로 초기화
        } else if (event.type === "change") {
            // select onChange 처리
            const selectedValue = (event.target as HTMLSelectElement).value;
            setSearchParams(prevParams => ({ ...prevParams, selectedValue }));
            setPage(0); // 선택 시 페이지를 0으로 초기화
        }
    };


    // filteredScheduleList와 tsIdx가 겹치는 항목을 필터링
    const filteredTourSpotList = tourSpotList.filter(tourSpot =>
        !filteredScheduleList.some(schedule => schedule.tsIdx === tourSpot.tsIdx)
    );

    return (
        <div>
            <Header text={`${scDate}일차 관광지 선정`} icon="back" parent="/travelgroups/travel/get"></Header>
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

                {/* 필터링된 tourSpotList를 TourSpotsListView로 전달 */}
                <TourSpotsListView tourSpotList={filteredTourSpotList} scDate={Number(scDate)} />
                <div ref={lastElementRef} style={{ height: '1px' }}></div>
            </div>
        </div>
    );
}
