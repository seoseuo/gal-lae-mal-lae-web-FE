import Header from "../../../header";
import "@/styles/travelgroups/travelgroups-style.css";


export default function Home() {
    return (
        <div>
            <Header text="여행지 설정" icon="back"></Header>
            <div className="travelgroup-container">
                <div className="search-bar">
                    <img src="/travelgroups/search.svg" alt="search" style={{ width: '17.49px', margin: '0 15px 0 15px' }} />
                    <input style={{ color: '#490085', width: '80%' }}></input>
                </div>
            </div>

            <br />
            <br />

            <div className="search-location-si-result">
                <img src="/travelgroups/location.svg" alt="location" />
                <span className='regular' style={{ fontSize: '16px' , marginRight: '180px'}}>도시이름</span>
                <button className="location-si-select-btn regular">선택</button>
            </div>

            <div className="search-location-si-result">
                <img src="/travelgroups/location.svg" alt="location" />
                <span className='regular' style={{ fontSize: '16px' , marginRight: '180px'}}>도시이름</span>
                <button className="location-si-select-btn regular">선택</button>
            </div>

            <div className="search-location-si-result">
                <img src="/travelgroups/location.svg" alt="location" />
                <span className='regular' style={{ fontSize: '16px' , marginRight: '180px'}}>도시이름</span>
                <button className="location-si-select-btn regular">선택</button>
            </div>

        </div>
    );
}