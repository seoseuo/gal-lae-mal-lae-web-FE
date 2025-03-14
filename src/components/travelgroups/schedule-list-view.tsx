"use client";

import "@/styles/travelgroups/travelgroups-style.css";

export default function ScheduleListView({ scheduleList }: { scheduleList: any[] }) {
    return (
        <div className="tour-spots-container">
            <div className="schedule-list-view-container">
                {scheduleList.slice().reverse().map((schedule, index) => (
                    <div key={index} className="schedule-list-view" style={{ marginBottom: '20px' }}>
                        <img src={schedule.tsFirstImage} alt="img" className="schedule-list-view-img" />
                        <div>
                            <div className="schedule-list-view-text">
                                <span className='medium' style={{ fontSize: '13px', marginLeft: '5px' }}>{schedule.tsName}</span>
                            </div>
                            <div className="schedule-list-view-text">
                                <img src="/travelgroups/time-icon.svg" alt="time-icon" />
                                <span className='regular' style={{ fontSize: '12px', marginLeft: '5px' }}>{schedule.scStartTime}</span>
                                <span className='regular' style={{ fontSize: '12px' }}>&nbsp;~&nbsp;</span>
                                <span className='regular' style={{ fontSize: '12px', marginLeft: '2px' }}>{schedule.scEndTime}</span>
                            </div>

                            <div className="schedule-list-view-text">
                                <img src="/travelgroups/location-black.svg" alt="location" />
                                <span className='regular' style={{ fontSize: '12px', marginLeft: '5px' }}>{schedule.tsAddr1}</span>
                            </div>

                            <div className="schedule-list-view-text">
                                <img src="/travelgroups/call.svg" alt="phone-icon" style={{ width: '15px', height: '15px' }}/>
                                <span className='regular' style={{ fontSize: '12px', marginLeft: '5px'}}>
                                    {schedule.tsTel ? schedule.tsTel : "전화번호가 없습니다."}
                                </span>
                            </div>

                            {/* <div className="schedule-list-view-text">
                                <img src="/travelgroups/location-black.svg" alt="location" />
                                <span className='regular' style={{ fontSize: '12px', marginLeft: '5px' }}>{schedule.tsTel}</span>
                            </div> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
