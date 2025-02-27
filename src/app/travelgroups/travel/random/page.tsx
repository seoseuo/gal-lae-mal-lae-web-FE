import Header from "../../../header";
import "@/styles/travelgroups/travelgroups-style.css";


export default function Home() {
    return (
        <div>
            <Header text="여행지 설정" icon="back"></Header>
            <span className='regular' style={{ fontSize: '14px', marginLeft: '10px' }}>ㅇㅇ도-ㅇㅇ시</span>
            <br />
            <br />
            <div className="travelgroup-container">
                <img src="/travelgroups/chuncheon.svg" alt="chuncheon" />

            </div>

            <br />
            <span className='regular' style={{ fontSize: '12px', marginLeft: '10px' }}>추천 일정</span>

            <br />
            <br />
            <br />
            <div className="travelgroup-container">
                <span className='bold' style={{ fontSize: '14px', marginLeft: '10px', color: '#490085' }}>모임 이름<span className='regular' style={{ fontSize: '14px', marginLeft: '10px', color: 'black' }}>님의</span></span>
                <span className='regular' style={{ fontSize: '14px', marginLeft: '10px', color: 'black' }}>랜덤 여행지를 찾았어요 !</span>
                <button className="long-nomal-button bottom-button-postion travelgroups-font-size" style={{ top: '690px' }}>다시 랜덤</button>
                <button className="long-active-button bottom-button-postion travelgroups-font-size">갈래요</button>
            </div>



        </div >
    );
}