import Header from "../../../header";
import TourSpotsListView from "../../../../components/travelgroups/tour-spots-list-view"
import "@/styles/travelgroups/travelgroups-style.css";


export default function Home() {
    return (
        <div>
            <Header text="관광지 선정" icon="back"></Header>
            <div className="travelgroup-container">
                <div className="search-bar">
                    <img src="/travelgroups/search.svg" alt="search" style={{ width: '17.49px', margin: '0 15px 0 15px' }} />
                    <input style={{ color: '#490085', width: '80%' }} placeholder="관광지 검색"></input>
                </div>
            </div>
            <TourSpotsListView/>
            <button className="long-nomal-button bottom-button-postion travelgroups-font-size">추가</button>
        </div>
    );
}