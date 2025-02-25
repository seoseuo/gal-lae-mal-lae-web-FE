import Header from "../../../header";
import "@/styles/travelgroups/travelgroups-style.css";


export default function Home() {
    return (
        <div>
            <Header text="여행지 설정" icon="back"></Header>

            <br />
            <br />
            <div className="location-do-list-view">
                <button className="location-do-list-view-item">
                    <span className='regular' style={{ fontSize: '14px' }}>서울</span>
                </button>

                <button className="location-do-list-view-item">
                    <span className='regular' style={{ fontSize: '14px' }}>인천</span>
                </button>

                <button className="location-do-list-view-item">
                    <span className='regular' style={{ fontSize: '14px' }}>대구</span>
                </button>

                <button className="location-do-list-view-item">
                    <span className='regular' style={{ fontSize: '14px' }}>대전</span>
                </button>

                <button className="location-do-list-view-item">
                    <span className='regular' style={{ fontSize: '14px' }}>광주</span>
                </button>

                <button className="location-do-list-view-item">
                    <span className='regular' style={{ fontSize: '14px' }}>부산</span>
                </button>

                <button className="location-do-list-view-item">
                    <span className='regular' style={{ fontSize: '14px' }}>울산</span>
                </button>

                <button className="location-do-list-view-item">
                    <span className='regular' style={{ fontSize: '14px' }}>경기도</span>
                </button>

                <button className="location-do-list-view-item">
                    <span className='regular' style={{ fontSize: '14px' }}>충청북도</span>
                </button>

                <button className="location-do-list-view-item">
                    <span className='regular' style={{ fontSize: '14px' }}>충청남도</span>
                </button>

                <button className="location-do-list-view-item">
                    <span className='regular' style={{ fontSize: '14px' }}>경상북도</span>
                </button>

                <button className="location-do-list-view-item">
                    <span className='regular' style={{ fontSize: '14px' }}>경상남도</span>
                </button>

                <button className="location-do-list-view-item">
                    <span className='regular' style={{ fontSize: '14px' }}>전라남도</span>
                </button>

                <button className="location-do-list-view-item">
                    <span className='regular' style={{ fontSize: '14px' }}>세종특별자치시</span>
                </button>

                <button className="location-do-list-view-item">
                    <span className='regular' style={{ fontSize: '14px' }}>강원특별자치도</span>
                </button>

                <button className="location-do-list-view-item">
                    <span className='regular' style={{ fontSize: '14px' }}>전북특별자치시</span>
                </button>

                <button className="location-do-list-view-item">
                    <span className='regular' style={{ fontSize: '14px' }}>제주도</span>
                </button>

                <button className="location-do-list-view-item-spe">
                    <span className='regular' style={{ fontSize: '14px' }}>랜덤여행지</span>
                </button>


            </div>
        </div>
    );
}