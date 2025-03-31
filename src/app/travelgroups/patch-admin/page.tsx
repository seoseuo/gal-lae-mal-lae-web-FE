import Header from "../../header";
import "@/styles/travelgroups/travelgroups-style.css";
import MemberListView from "@/components/travelgroups/member-list-view-admin";

export default function Home() {
    return (
        <div>
            <Header text="권한" icon="back"></Header>

            <div className="travelgroup-container" style={{ marginTop: '88px' }}>
                <img src="/travelgroups/big-admin.svg" alt="profile" />
                <br />
                <span className='bold' style={{ fontSize: '16px' , marginTop: '47px'}}>프로필을 선택해주세요!</span>
                <br />
                <span className='regular' style={{ fontSize: '12px', marginTop: '18px' }}>선택한 프로필의 회원에게 회장 권한이 넘어가요.</span>


                <div style={{ marginTop: '73px' }}>
                    <MemberListView />
                </div>

                
            </div>
        </div>
    );
}