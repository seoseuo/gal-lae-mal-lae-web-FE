"use client";

import Header from "../../header";
import "@/styles/travelgroups/travelgroups-style.css";
import { leaveGroup } from "@/lib/travelgroup-api";
import { useRouter } from "next/navigation";

export default function Home() {
    const travelGroup = JSON.parse(localStorage.getItem('travelGroup') || '{}');
    const router = useRouter();
    return (
        <div>
            <Header text="탈퇴" icon="back"></Header>
            <br />
            <br />
            <div className="travelgroup-container" style={{ marginTop: '88px' }}>
                <img src={travelGroup.grProfile} alt="profile" style={{ width: '120px', height: '120px' }} />

                <span className='regular' style={{ fontSize: '13px', marginTop: '14px' }}>{travelGroup.grName}</span>
                <br />
                <br />
                <span className='bold' style={{ fontSize: '16px', marginTop: '34px' }}>정말 해당 모임에서 나가시겠어요 ?</span>
                <br />
                <span className='regular' style={{ fontSize: '12px', textAlign: 'center', marginTop: '16px' }}>
                    모임에서 나가면 기존의 데이터들은 사라져요.
                </span>



                <button className="long-nomal-button bottom-button-postion travelgroups-font-size" style={{ top: '690px' }} onClick={() => router.back()}>취소</button>
                <button className="long-active-button bottom-button-postion travelgroups-font-size" onClick={() => leaveGroup()}>탈퇴</button>

            </div>
        </div>
    );
}