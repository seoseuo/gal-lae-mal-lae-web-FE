import Header from "../../header";
import "@/styles/travelgroups/travelgroups-style.css";


export default function Home() {
    return (
        <div>
            <Header text="탈퇴" icon="back"></Header>
            <br />
            <br />
            <div className="travelgroup-container">
                <img src="/travelgroups/profile.png" alt="profile" />

                <span className='regular' style={{ fontSize: '13px', marginTop: '8px' }}>모임 이름</span>
                <br />
                <br />
                <span className='bold' style={{ fontSize: '16px' }}>정말 해당 모임에서 나가시겠어요 ?</span>
                <br />
                <span className='regular' style={{ fontSize: '12px', textAlign: 'center' }}>
                    모임에서 나가면 기존의 데이터들은 사라져요.
                </span>



                <button className="long-nomal-button bottom-button-postion travelgroups-font-size" style={{ top: '690px' }}>취소</button>
                <button className="long-active-button bottom-button-postion travelgroups-font-size">탈퇴</button>

            </div>
        </div>
    );
}