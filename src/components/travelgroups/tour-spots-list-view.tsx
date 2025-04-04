"use client";

import { useState } from "react";
import "@/styles/travelgroups/travelgroups-style.css";
import { saveTourSpot } from "@/lib/travelgroup-api";
import { useRouter } from "next/navigation";

export default function TourSpotsListView({ tourSpotList = [], scDate }: { tourSpotList: any[], scDate: number }) {
    const router = useRouter();
    // 선택된 체크박스를 추적하는 상태 변수
    const [selectedSpots, setSelectedSpots] = useState<Set<number>>(new Set());

    // 체크박스를 클릭할 때마다 선택 여부를 토글
    const handleCheckboxChange = (index: number, tsIdx: number) => {
        setSelectedSpots((prevSelectedSpots) => {
            const newSelectedSpots = new Set(prevSelectedSpots);
            if (newSelectedSpots.has(tsIdx)) {
                newSelectedSpots.delete(tsIdx); // 이미 선택된 항목이면 제거
            } else {
                newSelectedSpots.add(tsIdx); // 새로운 항목이면 추가
            }
            return newSelectedSpots;
        });
    };

    // "추가" 버튼 클릭 시 로그를 출력하는 함수
    const handleAddButtonClick = () => {
        selectedSpots.forEach((tsIdx) => {
            console.log(`선택된 투어 스팟의 tsIdx: ${tsIdx}`);
        });
        saveTourSpot(Array.from(selectedSpots), scDate);
        router.push("/travelgroups/travel/get");
    };

    return (
        <div className="tour-spots-container">
          {tourSpotList.map((tourSpot, index) => (
            <div key={index}>
              <div className="tour-spots-view">
                <div className="tour-spots-checkbox"
                >
                  <input
                    id={`checkbox-${index}`}
                    type="checkbox"
                    name="tour-spots-name"
                    value={tourSpot.tsIdx}
                    onChange={() => handleCheckboxChange(index, tourSpot.tsIdx)} // 체크박스 클릭 시 핸들러 호출
                    
                  />
                  
                  <label htmlFor={`checkbox-${index}`}
                  //  style={{marginLeft:'20px'}}
                   >
                    <div className="tour-spots-card"
                    >
                      <img
                        src={tourSpot.tsFirstImage || "/travelgroups/tour-spot.png"}
                        alt="img"
                        className="tour-spots-img"
                      />
                      <div className="tour-spots-detail">
                        <span className="regular" style={{ fontSize: '11px', marginLeft: '5px' }}>
                          {tourSpot.tsName}
                        </span>
                        <div className="tour-spots-detail-box">
                          <img
                            src="/travelgroups/call.svg"
                            alt="img"
                            className="call tour-span-img"
                            style={{ width: '8px' }}
                          />
                          <span className="regular tour-span-text" style={{ fontSize: '5px' }}>
                            {tourSpot.tsTel || "전화번호가 없습니다."}
                          </span>
                          <img
                            src="/travelgroups/place.svg"
                            alt="img"
                            className="place tour-span-img"
                            style={{ marginLeft: '-50px' }}
                          />
                          <span
                            className="regular tour-span-text"
                            style={{ fontSize: '5px', marginLeft: '2px' }}
                          >
                            {tourSpot.tsAddr1}
                          </span>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          ))}
      
          {/* 선택된 체크박스가 1개 이상이면 버튼 클래스 변경 */}
          <button
            className={`${selectedSpots.size > 0 ? 'long-active-button' : 'long-nomal-button'} bottom-button-postion travelgroups-font-size`}
            onClick={selectedSpots.size > 0 ? handleAddButtonClick : undefined} // 선택된 체크박스가 있으면 클릭 이벤트 활성화
          >
            추가
          </button>
        </div>
    );
}
