import Header from "../../../header";
import TravelogueListView from "../../../../components/travelgroups/travelogue-list-view"
import "@/styles/travelgroups/travelgroups-style.css";


export default function Home() {
    return (
        <div>
            <Header text="일정" icon="back"></Header>

            <div className="travel-header-container" style={{ marginTop: '-30px' }}>
                <img src="/travelgroups/user-icon.svg" alt="user-icon" />
                <span className='regular' style={{ fontSize: '12px' }}>모임 이름</span>
            </div>
            <div className="travel-header-container">
                <img src="/travelgroups/time-icon.svg" alt="time-icon" />
                <span className='regular' style={{ fontSize: '12px' }}>여행 날짜</span>
            </div>

            <div className="travelgroup-container">
                <div className="travel-box-container">
                    <div className="travel-box-inner-container-1" style={{ marginBottom: '40px' }}>
                        <span className='regular custom-underline' style={{ fontSize: '16px', color: '#787676' }}>여행록</span>
                        <span className='regular' style={{ fontSize: '16px', color: '#787676' }}>알정</span>
                    </div>
                    <br />
                    <br />

                    <hr />

                    <TravelogueListView />



                    <img className="travel-box-btn" id="plus-btn-postion" src="/travelgroups/plus-btn.svg" alt="plus-btn" />

                </div>



            </div>

        </div>
    );
}