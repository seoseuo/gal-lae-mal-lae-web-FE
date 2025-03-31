"use client";

import { useState, useEffect } from "react";
import Header from "../../../../header";
import "@/styles/travelgroups/travelgroups-style.css";
import ScheduleListView from "../../../../../components/travelgroups/schedule-time-set-list-view";

export default function Home() {
    const [scDate, setScDate] = useState<string | null>(null);
    const [scheduleList, setScheduleList] = useState<any[]>([]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setScDate(localStorage.getItem("scDate"));
            setScheduleList(JSON.parse(localStorage.getItem("filteredScheduleList") || "[]"));
        }
    }, []);

    return (
        <div>
            <Header text={`${scDate ?? ''}일차 일정 수정`} icon="back" parent="/travelgroups/travel/get" />
            <div className="travelgroup-container" style={{ marginTop: "-30px" }}>
                {scDate && <ScheduleListView scheduleList={scheduleList} />}
            </div>
        </div>
    );
}
