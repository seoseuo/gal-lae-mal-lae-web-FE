"use client";

import "@/styles/travelgroups/travelgroups-style.css";

export default function ScheduleListView({ scheduleList }: { scheduleList: any[] }) {
    return (
        <div className="tour-spots-container">
            <div className="schedule-list-view-container">
                {scheduleList
                    .slice() // 원본 배열 복사
                    .sort((a, b) => {
                        const hasTimeA = !!(a.scStartTime && a.scEndTime);
                        const hasTimeB = !!(b.scStartTime && b.scEndTime);

                        // 둘 다 시간 값이 있는 경우, 시작 시간을 기준으로 오름차순 정렬
                        if (hasTimeA && hasTimeB) {
                            if (a.scStartTime < b.scStartTime) return -1;
                            if (a.scStartTime > b.scStartTime) return 1;
                            return 0;
                        }
                        // a는 시간 값이 있고 b는 없으면 a가 앞으로
                        if (hasTimeA && !hasTimeB) return -1;
                        // a는 시간 값이 없고 b는 있으면 b가 앞으로
                        if (!hasTimeA && hasTimeB) return 1;
                        return 0;
                    })
                    .map((schedule, index) => (
                        <div key={index}>
                            <div className="schedule-list-view" style={{ marginBottom: '20px' }}>
                                <img
                                    src={schedule.tsFirstImage ? schedule.tsFirstImage : "/travelgroups/tour-spot.png"}
                                    alt="img"
                                    className="schedule-list-view-img"
                                />
                                <div>
                                    <div className="schedule-list-view-text">
                                        <span className="medium" style={{ fontSize: '13px', marginLeft: '5px' }}>
                                            {schedule.tsName}
                                        </span>
                                    </div>
                                    <div className="schedule-list-view-text">
                                        <img src="/travelgroups/time-icon.svg" alt="time-icon" />
                                        <span className="regular" style={{ fontSize: '10px', marginLeft: '5px' }}>
                                            {schedule.scStartTime}
                                        </span>
                                        <span className="regular" style={{ fontSize: '10px' }}>&nbsp;~&nbsp;</span>
                                        <span className="regular" style={{ fontSize: '10px', marginLeft: '2px' }}>
                                            {schedule.scEndTime}
                                        </span>
                                    </div>
                                    <div className="schedule-list-view-text">
                                        <img src="/travelgroups/location-black.svg" alt="location" />
                                        <span className="regular" style={{ fontSize: '11px', marginLeft: '5px' }}>
                                            {schedule.tsAddr1}
                                        </span>
                                    </div>
                                    <div className="schedule-list-view-text">
                                        <img
                                            src="/travelgroups/call.svg"
                                            alt="phone-icon"
                                            style={{ width: '15px', height: '15px' }}
                                        />
                                        <span className="regular" style={{ fontSize: '11px', marginLeft: '5px' }}>
                                            {schedule.tsTel ? schedule.tsTel : "전화번호가 없습니다."}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

            </div>
        </div>
    );
}
