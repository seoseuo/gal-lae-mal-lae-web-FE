"use client";

import { useRouter } from "next/navigation";
import "@/styles/travelgroups/travelgroups-style.css";

export function MainTravelgroupsView({ mainTravelGroupsViewList }: { mainTravelGroupsViewList: any[] }) {
    const router = useRouter();

    return (
        <div>
            <div style={{ paddingLeft: '10px', marginTop: '25px' }}>
                {/* 리스트 길이가 0일 때 텍스트 변경 */}
                <span className="regular" style={{ fontSize: '12px', color: 'black' }}>
                    {mainTravelGroupsViewList.length === 0
                        ? "모임이 없어요, 생성하거나 참여해보세요 !"
                        : "기록된 나의 모임들을 확인해보세요 !"}
                </span>
            </div>

            <div className="travelgroup-container">
                <div className="main-list-container">
                    {mainTravelGroupsViewList.map((group) => (
                        <div
                            key={group.grIdx}
                            className="main-list-item"
                            onClick={() => router.push(`/travelgroups`)}
                            style={{ cursor: 'pointer' }}
                        >

                            <div className="main-list-img"
                                style={{ objectFit: 'cover' }}>
                                <img
                                    className="main-list-img"
                                    style={{ width: '100%', height: "100%", borderRadius: '7%' , objectFit:'cover' }}
                                    src={`/s3/${group.grProfile || 'default-img.svg'}`}
                                    // src="/default-profile.svg"
                                    // src="/travelgroups/delete.svg"
                                    alt={group.grProfile ? group.grProfile : "/default-img.svg"}
                                />
                            </div>
                            <div className="main-list-text">
                                <span className="bold" style={{ fontSize: '12px' }}>{group.grName}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
