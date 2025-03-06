"use client";

import Header from "../../../header";
import "@/styles/travelgroups/travelgroups-style.css";
import { useRouter } from 'next/navigation';
import { saveLocationDo } from "@/lib/travelgroup-api";

export default function Home() {
    const router = useRouter();

    const selectDo = (value: any) => {
        if (value >= 1 && value <= 8) {
            console.log(`특별시/광역시 선택: ${value}`);
        } else {
            if (value == "random") {
                console.log(`랜덤 여행지: ${value}`);
                router.push('/travelgroups/travel/random-rendering');
            }
            else {
                console.log(`도 선택: ${value}`);
                saveLocationDo(value);
                router.push(`/travelgroups/travel/location-si?ldIdx=${value}`);
            }
        }
    };

    return (
        <div>
            <Header text="여행지 설정" icon="back"></Header>

            <br />
            <br />
            <div className="location-do-list-view">
                <button className="location-do-list-view-item" onClick={() => selectDo(1)}>
                    <span className='regular' style={{ fontSize: '14px' }}>서울</span>
                </button>

                <button className="location-do-list-view-item" onClick={() => selectDo(2)}>
                    <span className='regular' style={{ fontSize: '14px' }}>인천</span>
                </button>

                <button className="location-do-list-view-item" onClick={() => selectDo(4)}>
                    <span className='regular' style={{ fontSize: '14px' }}>대구</span>
                </button>

                <button className="location-do-list-view-item" onClick={() => selectDo(3)}>
                    <span className='regular' style={{ fontSize: '14px' }}>대전</span>
                </button>

                <button className="location-do-list-view-item" onClick={() => selectDo(5)}>
                    <span className='regular' style={{ fontSize: '14px' }}>광주</span>
                </button>

                <button className="location-do-list-view-item" onClick={() => selectDo(6)}>
                    <span className='regular' style={{ fontSize: '14px' }}>부산</span>
                </button>

                <button className="location-do-list-view-item" onClick={() => selectDo(7)}>
                    <span className='regular' style={{ fontSize: '14px' }}>울산</span>
                </button>

                <button className="location-do-list-view-item" onClick={() => selectDo(31)}>
                    <span className='regular' style={{ fontSize: '14px' }}>경기도</span>
                </button>

                <button className="location-do-list-view-item" onClick={() => selectDo(33)}>
                    <span className='regular' style={{ fontSize: '14px' }}>충청북도</span>
                </button>

                <button className="location-do-list-view-item" onClick={() => selectDo(34)}>
                    <span className='regular' style={{ fontSize: '14px' }}>충청남도</span>
                </button>

                <button className="location-do-list-view-item" onClick={() => selectDo(35)}>
                    <span className='regular' style={{ fontSize: '14px' }}>경상북도</span>
                </button>

                <button className="location-do-list-view-item" onClick={() => selectDo(36)}>
                    <span className='regular' style={{ fontSize: '14px' }}>경상남도</span>
                </button>

                <button className="location-do-list-view-item" onClick={() => selectDo(38)}>
                    <span className='regular' style={{ fontSize: '14px' }}>전라남도</span>
                </button>

                <button className="location-do-list-view-item" onClick={() => selectDo(8)}>
                    <span className='regular' style={{ fontSize: '14px' }}>세종특별자치시</span>
                </button>

                <button className="location-do-list-view-item" onClick={() => selectDo(32)}>
                    <span className='regular' style={{ fontSize: '14px' }}>강원특별자치도</span>
                </button>

                <button className="location-do-list-view-item" onClick={() => selectDo(37)}>
                    <span className='regular' style={{ fontSize: '14px' }}>전북특별자치도</span>
                </button>

                <button className="location-do-list-view-item" onClick={() => selectDo(39)}>
                    <span className='regular' style={{ fontSize: '14px' }}>제주도</span>
                </button>

                <button className="location-do-list-view-item-spe" onClick={() => selectDo("random")}>
                    <span className='regular' style={{ fontSize: '14px' }}>랜덤여행지</span>
                </button>
            </div>
        </div>
    );
}
