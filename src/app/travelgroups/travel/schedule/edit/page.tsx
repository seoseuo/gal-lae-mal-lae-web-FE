"use client";

import Header from "../../../../header";
import "@/styles/travelgroups/travelgroups-style.css";
import ScheduleListView from "../../../../../components/travelgroups/schedule-time-set-list-view";

export default function Home() {
    const scDate = localStorage.getItem("scDate");
    const scheduleList = JSON.parse(localStorage.getItem("filteredScheduleList") || '[]');
    return (
        <div>
            <Header text={`${scDate}일차 일정 수정`} icon="back" parent="/travelgroups/travel/get"></Header>
            <div className="travelgroup-container" style={{ marginTop: '-30px' }}>
                <ScheduleListView scheduleList={scheduleList} scDate={scDate}/>
                                
            </div>
        </div>
    );
}