"use client";

import React, { useState, useEffect } from 'react';
import Header from "../../../header";
import "@/styles/travelgroups/travelgroups-style.css";
import { getRandomTravel } from "@/lib/travelgroup-api";

export default function Home() {

    const [randomTravel, setRandomTravel] = useState(null);

    useEffect(() => {
        async function fetchRandomTravel() {
            const travelData = await getRandomTravel();
            setRandomTravel(travelData);
        }
        fetchRandomTravel();
    }, []);

    return (
        <div>
            <Header text="여행지 설정" icon="back"></Header>
            {randomTravel && (
                <span className='regular' style={{ fontSize: '14px', marginLeft: '10px' }}>
                    {randomTravel.ldIdx >= 1 && randomTravel.ldIdx <= 8 ? (
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
                {randomTravel.ldIdx >= 1 && randomTravel.ldIdx <= 8 ? (
                    <img className="travel-box-parent-container-img" src={`/travelgroups/location/${randomTravel.ldIdx}.svg`} alt={`/travelgroups/location/${randomTravel.ldIdx}.svg`} />
                ) : (
                    <img className="travel-box-parent-container-img" src={`/travelgroups/location/${randomTravel.ldIdx}-${randomTravel.lsIdx}.svg`} alt={`/travelgroups/location/${randomTravel.ldIdx}-${randomTravel.lsIdx}.svg`} />
                )}
            </div>

            <br />
            <span className='regular' style={{ fontSize: '12px', marginLeft: '10px' }}>추천 일정</span>

            <br />
            <br />
            <br />
            <div className="travelgroup-container">
                <span className='bold' style={{ fontSize: '14px', marginLeft: '10px', color: '#490085' }}>모임 이름<span className='regular' style={{ fontSize: '14px', marginLeft: '10px', color: 'black' }}>님의</span></span>
                <span className='regular' style={{ fontSize: '14px', marginLeft: '10px', color: 'black' }}>랜덤 여행지를 찾았어요 !</span>
                <button className="long-nomal-button bottom-button-postion travelgroups-font-size" style={{ top: '690px' }}>다시 랜덤</button>
                <button className="long-active-button bottom-button-postion travelgroups-font-size">갈래요</button>
            </div>

        </div >
    );
}