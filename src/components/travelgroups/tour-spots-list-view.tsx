"use client";

import "@/styles/travelgroups/travelgroups-style.css";

export default function TourSpotsListView({ tourSpotList = [] }: { tourSpotList: any[] }) {
    console.log("Tour Spot List:", tourSpotList); // 데이터 확인용

    return (
        <div className="tour-spots-container">
            {tourSpotList.map((tourSpot, index) => (
                <div key={index} className="tour-spots-view">
                    <div className="tour-spots-checkbox">
                        <input id={`checkbox-${index}`} type="checkbox" name="tour-spots-name" value={tourSpot.tsIdx} />
                    </div>
                    <label htmlFor={`checkbox-${index}`}>
                        <div className="tour-spots-card">
                            <img src={tourSpot.tsFirstImage ? tourSpot.tsFirstImage : "/travelgroups/tour-spot.png"} alt="img" className="tour-spots-img" />
                            <div className="tour-spots-detail">
                                <span className='regular' style={{ fontSize: '11px', marginLeft: '5px' }}>{tourSpot.tsName}</span>
                                
                                <div className="tour-spots-detail-box">
                                    <img src="/travelgroups/call.svg" alt="img" className="call tour-span-img"  style={{ width: '8px' }}/>
                                    <span className='regular tour-span-text' style={{ fontSize: '5px'}}>{tourSpot.tsTel ? tourSpot.tsTel : "전화번호가 없습니다."}</span>
                                    <img src="/travelgroups/place.svg" alt="img" className="place tour-span-img" style={{ marginLeft: '-50px' }} />
                                    <span className='regular tour-span-text' style={{ fontSize: '5px', marginLeft: '2px' }}>{tourSpot.tsAddr1}</span>
                                </div>
                            </div>
                        </div>
                    </label>
                </div>
            ))}
        </div>
    );
}
