"use client";

import { useState, useEffect } from "react";
import Header from "../../header";
import "@/styles/travelgroups/travelgroups-style.css";
import { leaveGroup } from "@/lib/travelgroup-api";
import { useRouter } from "next/navigation";

export default function Home() {
    const [travelGroup, setTravelGroup] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        // 클라이언트 사이드에서만 localStorage 접근
        const storedGroup = localStorage.getItem('travelGroup');
        if (storedGroup) {
            setTravelGroup(JSON.parse(storedGroup));
        }
    }, []);

    if (!travelGroup) {
        return <div>Loading...</div>; // 데이터 로드 중 표시
    }

    return (
        <div>
            <Header text="모임 탈퇴" icon="back" />
            <br />
            <br />
            <div className="travelgroup-container">
                <img src={`/s3/${travelGroup.grProfile}`} alt="profile" style={{ width: '120px', height: '120px', borderRadius: '50%' }} />
                <span className='regular' style={{ fontSize: '13px', marginTop: '14px' }}>{travelGroup.grName}</span>
                <br />
                <br />
                <span className='bold' style={{ fontSize: '16px', marginTop: '34px' }}>해당 모임을 탈퇴하시겠어요?</span>
                <br />
                <span className='regular' style={{ fontSize: '12px', textAlign: 'center', marginTop: '16px' }}>
                    모임에서 나가면 기존의 데이터들은 사라져요.
                </span>

                <button
                    className="long-nomal-button bottom-button-postion travelgroups-font-size"
                    style={{ top: '650px' }}
                    onClick={() => router.back()}
                >
                    취소
                </button>
                <button
                    className="long-active-button bottom-button-postion travelgroups-font-size"
                    onClick={() => leaveGroup()}
                >
                    탈퇴
                </button>
            </div>
        </div>
    );
}
