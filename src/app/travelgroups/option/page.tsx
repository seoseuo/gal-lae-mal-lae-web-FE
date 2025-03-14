"use client"
import { useEffect, useState } from "react";
import { getMe } from "@/lib/travelgroup-api";
import Header from "../../header";
import "@/styles/travelgroups/travelgroups-style.css";
import { useRouter } from "next/navigation";

export default function Home() {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const userData = await getMe();
            setUser(userData);
            const memberList = JSON.parse(localStorage.getItem('memberList') || '[]');
            const adminCheck = memberList.find((member) => member.usIdx === userData.usIdx)?.meRole === 'ADMIN';
            setIsAdmin(adminCheck);
        }
        fetchData();
    }, []);

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <Header text="설정" icon="back" parent="/travelgroups/get" />

            <div className="travelgroup-container">
                <br />
                <br />
                {/* 관리자인 경우에만 admin 아이콘 렌더링 */}
                {isAdmin && (
                    <>
                        <img className="admin-icon" src="/travelgroups/admin.svg" alt="admin" style={{ width: '24' }} />
                    </>
                )}

                <img id="profile-icon" src="/travelgroups/profile.png" alt="profile" />
                <br />
                <span className='regular' style={{ fontSize: '16px', marginTop: '10px' }}>{user.usName}</span>

                <div className="travel-list-view-text" style={{ gap: '20px', marginTop: '10px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                        <div className="travelgroup-container" style={{ cursor: 'pointer' }} onClick={() => {
                            if (isAdmin) {
                                const modal = document.createElement('div');
                                modal.style.cssText = `
                                    position: fixed;
                                    top: 40%;
                                    left: 50%;
                                    transform: translate(-50%, -50%);
                                    background: white;
                                    padding: 20px;
                                    border-radius: 10px;                                
                                    z-index: 1000;
                                    text-align: center;
                                    font-size: 8px;
                                    color: #490085;
                                `;
                                modal.innerHTML = '회장은 모임에 탈퇴할 수 없어요.<br>회장을 양도한 후 탈퇴할 수 있어요.';
                                document.body.appendChild(modal);
                                setTimeout(() => modal.remove(), 3000);
                            } else {
                                router.push('/travelgroups/leave');
                            }
                        }}>
                            <img src="/travelgroups/deletegroup.svg" alt="모임 탈퇴" />
                            <span className='regular' style={{ fontSize: '8px', marginTop: '5px' }}>모임 탈퇴</span>
                        </div>

                        {isAdmin && (
                            <>
                                <div className="travelgroup-container admin-icon" style={{ cursor: 'pointer' }} onClick={() => {
                                    router.push('/travelgroups/travel/location-do');
                                }}>
                                    <img src="/travelgroups/new-travel.svg" alt="새로운 여행지" />
                                    <span className='regular' style={{ fontSize: '8px', marginTop: '5px' }} >새로운 여행지</span>
                                </div>

                                <div className="travelgroup-container admin-icon" style={{ cursor: 'pointer' }} onClick={() => {
                                    router.push('/travelgroups/patch-admin');
                                }}>
                                    <img src="/travelgroups/giveadmin.svg" alt="권한" />
                                    <span className='regular' style={{ fontSize: '8px', marginTop: '5px' }}>권한</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
