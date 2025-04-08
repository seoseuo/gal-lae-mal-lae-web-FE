"use client";

import { getTravel } from "@/lib/travelgroup-api";
import ScheduleListView from "@/components/travelgroups/schedule-list-view";
import Header from "../../../header";
import "@/styles/travelgroups/travelgroups-style.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TravelogueListView from "@/components/travelgroups/travelogue-list-view";

export default function Home() {
    const router = useRouter();
    const [show, setShow] = useState<string>("");

    const [travel, setTravel] = useState<any>({});

    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [period, setPeriod] = useState<number>(0);

    const [travelGroup, setTravelGroup] = useState<any>({});
    const [trIdx, setTrIdx] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [travelogueList, setTravelogueList] = useState<any[]>([]);
    const [scheduleList, setScheduleList] = useState<any[]>([]);
    const [empty, setEmpty] = useState<boolean>(false);
    const [scDate, setScDate] = useState<number>(1);

    // 클라이언트 사이드에서만 실행되도록 useEffect로 데이터를 로드
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedTravelGroup = JSON.parse(localStorage.getItem("travelGroup") || "{}");
            const storedTrIdx = localStorage.getItem("trIdx");
            const storedMemberList = JSON.parse(localStorage.getItem("memberList") || "[]");

            setTravelGroup(storedTravelGroup);
            setTrIdx(storedTrIdx);
            
            //console.log("storedMemberList", storedMemberList);

            // localStorage에서 'user' 데이터를 꺼냄
            const storedUserData = JSON.parse(localStorage.getItem("user") || "{}");
            // storedMemberList 배열에서 'ADMIN' 역할을 가진 멤버를 찾음
            
            const isAdmin = storedMemberList.some((member: any) =>
                member.usIdx === storedUserData.usIdx && member.meRole === "ADMIN"
            );

            console.log("isAdmin ?",isAdmin);
            // isAdmin 값에 따라 setIsAdmin 호출
            setIsAdmin(isAdmin);                    
        }
    }, []);

    // 여행 데이터 가져오기
    useEffect(() => {
        if (trIdx) {
            getTravel(Number(trIdx)).then((travelInfo) => {
                setTravel(travelInfo);
                const formattedStartDate = travelInfo.travel.trStartTime.split('T')[0].split('-').map((part: string, index: number) => index === 0 ? part.slice(2) : part).join('.');
                const formattedEndDate = travelInfo.travel.trEndTime.split('T')[0].split('-').map((part: string, index: number) => index === 0 ? part.slice(2) : part).join('.');

                setStartDate(formattedStartDate);
                setEndDate(formattedEndDate);
                setPeriod(travelInfo.travel.trPeriod);
                setShowWhat("schedule");

                localStorage.setItem("travel", JSON.stringify(travelInfo.travel));

                const travelogueList = travelInfo.travelogueList;
                setTravelogueList(travelogueList);
                // 기본 스케쥴 리스트
                const defaultScheduleList = travelInfo.scheduleList.filter((schedule: any) => schedule.scDate === 1);
                setScheduleList(defaultScheduleList);
                if (travelInfo.scheduleList.length === 0) {
                    setEmpty(true);
                }
            });
        }
    }, [trIdx]);

    // 일정 날짜 선택 클릭 이벤트
    const clickPeriod = (index: number) => {
        console.log("index", index);

        const periodDot = document.querySelector(`.period-dot:nth-child(${index})`) as HTMLElement | null;
        if (periodDot) {
            periodDot.style.color = '#490085';

            // travel의 scheduleList 중 해당 scDate 일정 보여주기            
            const filteredScheduleList = travel.scheduleList.filter((schedule: any) => schedule.scDate === index);
            setScDate(index);
            setScheduleList(filteredScheduleList);
            console.log("scheduleList", filteredScheduleList);
        }
        const periodDots = document.querySelectorAll('.period-dot');
        periodDots.forEach((dot) => {
            if (dot !== periodDot) {
                (dot as HTMLElement).style.color = '#787676';
            }
        });
    }

    // 여행록 또는 일정 보기 탭 전환
    const setShowWhat = (what: string) => {
        const elements = document.querySelectorAll('.show');
        elements.forEach((element) => {
            element.classList.remove('custom-underline');
        });

        if (what === "travelogue") {
            setShow("travelogue");
            document.querySelector('.show.travelogue')?.classList.add('custom-underline');
        } else {
            setShow("schedule");
            document.querySelector('.show.schedule')?.classList.add('custom-underline');
        }
    }

    const handleFilteredScheduleClick = () => {
        if (typeof window !== "undefined") {
            localStorage.setItem("filteredScheduleList", JSON.stringify(scheduleList));
            localStorage.setItem("scDate", scDate.toString());
            router.push("/travelgroups/travel/schedule/edit");
        }
    };

    const handleTravelogueClick = () => {
        if (typeof window !== "undefined") {
            localStorage.setItem("scDate", scDate.toString());
            router.push("/travelgroups/travel/travelogues/post");
        }
    };

    const handleAddScheduleClick = () => {
        if (typeof window !== "undefined") {
            localStorage.setItem("scDate", scDate.toString());
            router.push("/travelgroups/travel/tour-spots");
        }
    };


    return (
        <div>
            <Header text="일정" icon="back" parent="/travelgroups/get"></Header>

            <div className="travel-header-container" style={{ marginTop: '-30px' }}>
                <img src="/travelgroups/user-icon.svg" alt="user-icon" />
                <span className='regular' style={{ fontSize: '12px' }}>&nbsp;{travelGroup.grName}</span>
            </div>
            <div className="travel-header-container">
                <img src="/travelgroups/time-icon.svg" alt="time-icon" />
                <span className='regular' style={{ fontSize: '12px' }}>&nbsp;{startDate} ~ {endDate}</span>
            </div>

            <div className="travelgroup-container">
                <div className="travel-box-parent-container">
                    <div className="travel-box-container">
                        <div className="travel-box-inner-container-1" style={{ marginBottom: '40px' }}>
                            <span className='regular show travelogue' style={{ fontSize: '16px', color: '#787676', cursor: 'pointer' }} onClick={() => setShowWhat("travelogue")}>여행록</span>
                            <span className='regular show schedule custom-underline' style={{ fontSize: '16px', color: '#787676', cursor: 'pointer' }} onClick={() => setShowWhat("schedule")}>일정</span>
                        </div>


                        <hr style={{ marginTop: '5px' }} />

                        {show === "schedule" && (
                            <>
                                <div className="travel-box-inner-container-2">
                                    {Array.from({ length: period }).map((_, index) => (
                                        <div key={index} className="period-dot"
                                            style={{ cursor: 'pointer', color: index === 0 ? '#490085' : '#787676' }}
                                            onClick={() => clickPeriod(index + 1)}>
                                            {index + 1}일차
                                        </div>
                                    ))}
                                </div>

                                <ScheduleListView scheduleList={scheduleList} />

                                {isAdmin && (
                                    <div>
                                        {empty ? (
                                            <img className="travel-box-btn" id="plus-btn-postion" src="/travelgroups/plus-btn.svg" alt="edit-icon"
                                                onClick={handleAddScheduleClick}
                                                style={{ cursor: 'pointer' }} />
                                        ) : (
                                            <>
                                                <img className="travel-box-btn" id="ai-btn-postion" src="/travelgroups/plus-btn.svg" alt="plus-icon"
                                                    onClick={handleAddScheduleClick}
                                                    style={{ cursor: 'pointer' }} />
                                                <img className="travel-box-btn" id="plus-btn-postion" src="/travelgroups/edit-icon.svg" alt="edit-icon"
                                                    onClick={handleFilteredScheduleClick}
                                                    style={{ cursor: 'pointer' }} />
                                            </>
                                        )}
                                    </div>
                                )}
                            </>
                        )}

                        {show !== "schedule" && (
                            <div>
                                <TravelogueListView travelogueList={travelogueList} />
                                <div onClick={handleTravelogueClick} style={{ cursor: 'pointer' }}>
                                    <img className="travel-box-btn" id="plus-btn-postion" src="/travelgroups/plus-btn.svg" alt="plus-btn" />
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
