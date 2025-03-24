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
                            <img
                                className="main-list-img"
                                src={group.tlImage ? group.tlImage : "/default-img.svg"} // 여행 일지 이미지
                                alt={group.tlTitle} // 제목을 대체 텍스트로 사용
                            />
                            <div className="main-list-profile">
                                <img
                                    src={group.usProfile ? group.usProfile : "/default-profile.svg"} // 유저 프로필 이미지
                                    alt={group.usName} // 유저 이름을 대체 텍스트로 사용
                                    style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                                />
                            </div>
                            <div className="main-list-text" style={{marginLeft:'95px' , marginBottom:'25px'}}>
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
