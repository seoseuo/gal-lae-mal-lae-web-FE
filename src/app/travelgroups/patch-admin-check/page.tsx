"use client";

import Header from "../../header";
import "@/styles/travelgroups/travelgroups-style.css";
import { useRouter, useSearchParams } from "next/navigation";
import { updateAdmin } from "@/lib/travelgroup-api";
export default function Home() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const user = JSON.parse(searchParams.get('user') || '{}');
    console.log("user", user);
    
    return (
        <div>
            <Header text="권한" icon="back"></Header>
            <br />
            <br />
            <div className="travelgroup-container">
                <img src={user.usProfile} alt="profile" style={{ width: '120px', height: '120px' }}/>

                <span className='regular' style={{ fontSize: '8px', marginTop: '8px' }}>{user.usName}</span>
                <br />
                <br />
                <span className='bold' style={{ fontSize: '16px' , marginTop: '45px' }}>해당 프로필에게 회장을 위임할까요?</span>
                <br />
                <span className='regular' style={{ fontSize: '12px', textAlign: 'center' , marginTop: '16px' }}>
                    유저 이름님은 회장이 아니더라도 회원으로써 <br />
                    계속 함께할 수 있어요.
                </span>



                <button className="long-nomal-button bottom-button-postion travelgroups-font-size" style={{ top: '690px' }} onClick={() => router.back()}>다른 프로필 선택</button>
                <button className="long-active-button bottom-button-postion travelgroups-font-size" onClick={() => updateAdmin(user.usIdx)}>완료</button>

            </div>
        </div>
    );
}