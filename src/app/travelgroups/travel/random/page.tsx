"use client";

import React, { useState, useEffect } from 'react';
import Header from "../../../header";
import "@/styles/travelgroups/travelgroups-style.css";
import { getRandomTravel } from "@/lib/travelgroup-api";
import { useRouter } from 'next/navigation';
import { saveRandomTravel, getRandomTravelPreview } from "@/lib/travelgroup-api";

export default function Home() {
  const router = useRouter();
  const [randomTravel, setRandomTravel] = useState<any>(null);
  const [isWithinRange, setIsWithinRange] = useState(false);
  const travelGroup = JSON.parse(localStorage.getItem("travelGroup") || "{}");
  const [randomTravelPreview, setRandomTravelPreview] = useState<any[]>([]);

  useEffect(() => {
    async function fetchRandomTravel() {
      const travelData = await getRandomTravel();
      setRandomTravel(travelData);
      setIsWithinRange(travelData.ldIdx >= 1 && travelData.ldIdx <= 8);

      if (travelData) {
        if (travelData.ldIdx >= 1 && travelData.ldIdx <= 8) {
          const travelPreview = await getRandomTravelPreview(travelData.ldIdx);
          setRandomTravelPreview(travelPreview);
        } else {
          const travelPreview = await getRandomTravelPreview(travelData.ldIdx, travelData.lsIdx);
          setRandomTravelPreview(travelPreview);
        }
      }
    }
    fetchRandomTravel();
  }, []);

  return (
    <div>
      <Header text="여행지 설정" icon="back" parent="/travelgroups/get" />
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

      <br /><br />
      <div className="travelgroup-container">
        {randomTravel && (
          isWithinRange ? (
            <img className="travel-box-parent-container-img" src={`/travelgroups/location/${randomTravel.ldIdx}.svg`} alt={`location-${randomTravel.ldIdx}.svg`} />
          ) : (
            <img className="travel-box-parent-container-img" src={`/travelgroups/location/${randomTravel.ldIdx}-${randomTravel.lsIdx}.svg`} alt={`location-${randomTravel.ldIdx}-${randomTravel.lsIdx}.svg`} />
          )
        )}
      </div>

      <br /><br /><br /><br />
      <div className="travelgroup-container">
        <span className='bold' style={{ fontSize: '14px', marginLeft: '10px', color: '#490085' }}>
          {travelGroup.grName}
          <span className='regular' style={{ fontSize: '14px', marginLeft: '10px', color: 'black' }}>님의</span>
        </span>
        <span className='regular' style={{ fontSize: '14px', marginLeft: '10px', color: 'black' }}>
          랜덤 여행지를 찾았어요!
        </span>

        {/* 횡 스크롤 무한 애니메이션 영역 */}
        <div className="tour-spots-preview-wrapper">
          <div className="tour-spots-preview-container">
            {/* 원본 리스트를 복제하여 붙임 */}
            {[...randomTravelPreview, ...randomTravelPreview].map((preview, index) => (
              <div key={index} className="tour-spots-preview-item">
                <div className="tour-spots-preview-card">
                  <img className="tour-spots-preview-card-img" src={preview.tsFirstImage} alt={preview.tsName} />
                  <span className='regular' style={{ fontSize: '10px', marginLeft: '10px', color: 'black' }}>
                    {preview.tsName}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="long-nomal-button bottom-button-postion travelgroups-font-size" onClick={() => {
          window.history.back();
        }} style={{ top: '690px' }}>
          다시 랜덤
        </button>
        <button className="long-active-button bottom-button-postion travelgroups-font-size" onClick={() => {
          // 여행지 저장 후 이동
          saveRandomTravel(randomTravel.ldIdx, randomTravel.lsIdx);
          router.push(`/travelgroups/travel/period`);
        }}>
          갈래요
        </button>
      </div>
    </div>
  );
}
