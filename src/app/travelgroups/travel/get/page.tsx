"use client"

import { getTravel } from "@/lib/travelgroup-api";
import ScheduleListView from "@/components/travelgroups/schedule-list-view";
import Header from "../../../header";
import "@/styles/travelgroups/travelgroups-style.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const [show, setShow] = useState<string>("");
    const [travel, setTravel] = useState<any[]>([]);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [period, setPeriod] = useState<number>(0);
    const travelGroup = JSON.parse(localStorage.getItem("travelGroup") || "{}");
    const trIdx = localStorage.getItem("trIdx");
    
    const [scheduleList, setScheduleList] = useState<any[]>([]);
    const [empty, setEmpty] = useState<boolean>(false);
    
    const clickPeriod = (index: number) => {
        console.log("index", index);

        // 이 요소의 글씨 색 바꾸기
        // 다른 index 요소들의 글씨색은 초기화
        const periodDot = document.querySelector(`.period-dot:nth-child(${index})`);
        if (periodDot) {
            periodDot.style.color = '#490085';

            //travel의 scheduleList 중 해당 scDate 일정 보여주기
            const scheduleList = travel.scheduleList;
            const filteredScheduleList = scheduleList.filter((schedule: any) => schedule.scDate === index);

            // filteredScheduleList 의 scStartTime 으로 오름 차순 정렬
            //filteredScheduleList.sort((a: any, b: any) => a.scStartTime - b.scStartTime);

            setScheduleList(filteredScheduleList);
            console.log("scheduleList", filteredScheduleList);
        }
        const periodDots = document.querySelectorAll('.period-dot');
        periodDots.forEach((dot) => {
            if (dot !== periodDot) {
                dot.style.color = '#787676';
            }
        });
    }

    const setShowWhat = (what: string) => {
        // 클릭하면 다른 요소는 밑줄 없고 클릭 된 요소만 밑줄 있게        
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


    useEffect(() => {
        getTravel(Number(trIdx)).then((travel) => {
            setTravel(travel);
            const formattedStartDate = travel.travel.trStartTime.split('T')[0].split('-').map((part: string, index: number) => index === 0 ? part.slice(2) : part).join('.');
            const formattedEndDate = travel.travel.trEndTime.split('T')[0].split('-').map((part: string, index: number) => index === 0 ? part.slice(2) : part).join('.');
            setStartDate(formattedStartDate);
            setEndDate(formattedEndDate);
            setPeriod(travel.travel.trPeriod);
            setShowWhat("schedule");

            localStorage.setItem("travel", JSON.stringify(travel.travel));

            // 기본 스케쥴 리스트
            const defaultScheduleList = travel.scheduleList.filter((schedule: any) => schedule.scDate === 1);
            setScheduleList(defaultScheduleList);
            if (travel.scheduleList.length === 0) {
                setEmpty(true);
            }
        });
    }, []);

    return (
        <div>
            <Header text="일정" icon="back"></Header>

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
                            <span className='regular show travelogue' style={{ fontSize: '16px', color: '#787676', cursor: 'pointer' }} onClick={() => {
                                setShowWhat("travelogue");
                            }}>여행록</span>
                            <span className='regular show schedule custom-underline' style={{ fontSize: '16px', color: '#787676', cursor: 'pointer' }} onClick={() => {
                                setShowWhat("schedule");
                            }}>일정
                            </span>
                        </div>
                        <br />
                        <br />

                        <hr />



                        {show === "schedule" && (
                            <>
                                <div className="travel-box-inner-container-2">
                                    {Array.from({ length: period }).map((_, index) => (
                                        index === 0 ? (
                                            <div key={index} className="period-dot"
                                                style={{ cursor: 'pointer', color: '#490085' }}
                                                onClick={() => {
                                                    clickPeriod(index + 1);
                                                }}>
                                                {index + 1}일차
                                            </div>
                                        ) : (
                                            <div key={index} className="period-dot"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => {
                                                    clickPeriod(index + 1);
                                                }}>
                                                {index + 1}일차
                                            </div>
                                        )
                                    ))}
                                </div>

                                <ScheduleListView scheduleList={scheduleList} />

                                {empty ? (
                                    <div>
                                        {/* <img id="tip-box" src="/travelgroups/tipbox.svg" alt="tipbox" />
                                        <span id="tip-box-text" className='bold' style={{ fontSize: '12px', color: '#696969' }}>Tip) 어떻게 일정을 짜야할 지 모르시겠다고요 ?<br />그럼 AI가 추천해주는 일정으로 떠나보세요 !</span>
                                        <img className="travel-box-btn" id="ai-btn-postion" src="/travelgroups/ai-btn.svg" alt="ai-btn" /> */}
                                        <img className="travel-box-btn" id="plus-btn-postion" src="/travelgroups/plus-btn.svg" alt="edit-icon"
                                            onClick={() => {
                                                router.push("/travelgroups/travel/tour-spots");
                                            }}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <img className="travel-box-btn" id="ai-btn-postion" src="/travelgroups/plus-btn.svg" alt="plus-icon"
                                            onClick={() => {
                                                router.push("/travelgroups/travel/tour-spots");
                                            }}
                                            style={{ cursor: 'pointer' }}
                                        />
                                        <img className="travel-box-btn" id="plus-btn-postion" src="/travelgroups/edit-icon.svg" alt="edit-icon"
                                            onClick={() => {
                                                router.push("/travelgroups/travel/schedule/edit");
                                            }}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                        {show !== "schedule" && (
                            <div>
                                <img className="travel-box-btn" id="plus-btn-postion" src="/travelgroups/plus-btn.svg" alt="plus-btn" />
                            </div>
                        )}


                    </div>
                </div>



            </div>

        </div>
    );
}