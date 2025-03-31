"use client";

import { useRouter } from "next/navigation";
import "@/styles/travelgroups/travelgroups-style.css";

export function MainTraveloguesView({ mainTraveloguesViewList }: { mainTraveloguesViewList: any[] }) {
    const router = useRouter();

    return (
        <div>
            <div style={{ paddingLeft: '10px', marginTop: '25px' }}>
                <span className="regular" style={{ fontSize: '12px', color: 'black' }}>내 이웃들의 여행일기를 확인해보세요 !</span>
            </div>

            <div className="travelgroup-container">
                <div className="main-list-container">
                    {mainTraveloguesViewList.map((group) => (
                        <div
                            key={group.tlIdx}
                            className="main-list-item"
                            onClick={() => router.push(`/travelogues`)} // 이동할 경로 설정
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="main-list-img"
                                style={{ objectFit: 'cover' }}>
                                <img
                                    className="main-list-img"
                                    src={`/s3/${group.tlImage || 'default-img.svg'}`}
                                    style={{ width: '100%', height: "100%", borderRadius: '7%' }}
                                    alt={group.tlTitle} // 제목을 대체 텍스트로 사용
                                />
                            </div>


                            <img className="main-list-profile"
                                src={`/s3/${group.usProfile || 'default-profile.svg'}`}
                                
                                alt={group.usName} // 유저 이름을 대체 텍스트로 사용
                            />

                            <div className="main-list-text" style={{ marginLeft: '95px', marginBottom: '25px' }}>
                                <span className="bold" style={{ fontSize: '12px' }}>{group.tlTitle}</span><br />
                                <span className="regular" style={{ fontSize: '12px' }}>{group.usName}</span> {/* 유저 이름 */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
