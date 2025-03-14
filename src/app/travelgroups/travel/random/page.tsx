"use client";

import React, { useState, useEffect } from 'react';
import Header from "../../../header";
import "@/styles/travelgroups/travelgroups-style.css";
import { getRandomTravel } from "@/lib/travelgroup-api";
import { useRouter } from 'next/navigation';
import { saveRandomTravel } from "@/lib/travelgroup-api";

export default function Home() {
    const router = useRouter();
    const [randomTravel, setRandomTravel] = useState(null);
    const [isWithinRange, setIsWithinRange] = useState(false);
    const travelGroup = JSON.parse(localStorage.getItem("travelGroup") || "{}");

    useEffect(() => {
        async function fetchRandomTravel() {
            const travelData = await getRandomTravel();
            setRandomTravel(travelData);
            setIsWithinRange(travelData.ldIdx >= 1 && travelData.ldIdx <= 8);
        }
        fetchRandomTravel();
    }, []);

    return (
        <div>
            <Header text="여행지 설정" icon="back" parent="/travelgroups/get"></Header>
            {randomTravel && (
                <span className='regular' style={{ fontSize: '14px', marginLeft: '10px' }}>
                    {isWithinRange ? (
                        randomTravel.ldName
                    ) : (
                        <>
                            {randomTravel.locationDo.ldName} {randomTravel.lsName}
                        </>
                    )}
                </span>
            )}

            <br />
            <br />
            <div className="travelgroup-container">
                {randomTravel && (
                    isWithinRange ? (
                        <img className="travel-box-parent-container-img" src={`/travelgroups/location/${randomTravel.ldIdx}.svg`} alt={`/travelgroups/location/${randomTravel.ldIdx}.svg`} />
                    ) : (
                        <img className="travel-box-parent-container-img" src={`/travelgroups/location/${randomTravel.ldIdx}-${randomTravel.lsIdx}.svg`} alt={`/travelgroups/location/${randomTravel.ldIdx}-${randomTravel.lsIdx}.svg`} />
                    )
                )}
            </div>

            <br />
            {/* <span className='regular' style={{ fontSize: '12px', marginLeft: '10px' }}>추천 일정</span> */}

            <br />
            <br />
            <br />
            <div className="travelgroup-container">
                <span className='bold' style={{ fontSize: '14px', marginLeft: '10px', color: '#490085' }}>{travelGroup.grName}<span className='regular' style={{ fontSize: '14px', marginLeft: '10px', color: 'black' }}>님의</span></span>
                <span className='regular' style={{ fontSize: '14px', marginLeft: '10px', color: 'black' }}>랜덤 여행지를 찾았어요 !</span>
                <button className="long-nomal-button bottom-button-postion travelgroups-font-size" onClick={() => {
                    // 뒤로가기
                    window.history.back();
                }} style={{ top: '690px' }}>다시 랜덤</button>
                <button className="long-active-button bottom-button-postion travelgroups-font-size"
                onClick={() => {
                    //여행지 도 저장 , 여행지 시 저장하고 travelgroup/travel/period로 이동
                    if (isWithinRange) {
                        saveRandomTravel(randomTravel.ldIdx, randomTravel.lsIdx);
                    } else {
                        saveRandomTravel(randomTravel.ldIdx, randomTravel.lsIdx);                        
                    }
                    router.push(`/travelgroups/travel/period`);
                }}>갈래요</button>
            </div>

        </div >
    );
}