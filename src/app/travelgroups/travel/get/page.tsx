import Header from "../../../header";
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
                    <div className="travel-box-inner-container-1">
                        <span className='regular' style={{ fontSize: '16px', color: '#787676' }}>여행 날짜</span>
                        <span className='regular custom-underline' style={{ fontSize: '16px', color: '#787676' }}>여행 날짜</span>
                    </div>
                    <br/>
                    <br/>
                    <hr/>

                    <div className="travel-box-inner-container-2">
                        <div className="period-dot">n일차</div>
                        <div className="period-dot">n일차</div>
                        <div className="period-dot">n일차</div>
                        <div className="period-dot">n일차</div>
                        <div className="period-dot">n일차</div>
                    </div>

                    <img id="tip-box" src="/travelgroups/tipbox.svg" alt="tipbox" />
                    <span id="tip-box-text" className='bold' style={{ fontSize: '12px', color: '#696969' }}>Tip) 어떻게 일정을 짜야할 지 모르시겠다고요 ?<br />그럼 AI가 추천해주는 일정으로 떠나보세요 !</span>
                    <img className="travel-box-btn" id="ai-btn-postion" src="/travelgroups/ai-btn.svg" alt="ai-btn" />
                    <img className="travel-box-btn" id="plus-btn-postion" src="/travelgroups/plus-btn.svg" alt="plus-btn" />

                </div>

                
                
            </div>

        </div>
    );
}