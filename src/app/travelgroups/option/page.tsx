import Header from "../../header";
import "@/styles/travelgroups/travelgroups-style.css";


export default function Home() {
    return (
        <div>
            <Header text="설정" icon="back"></Header>

            <div className="travelgroup-container">
                <br />
                <br />
                <img src="/travelgroups/admin.svg" alt="admin" style={{ width: '24' }} />
                <img src="/travelgroups/profile.png" alt="profile" />
                <br />
                유저이름

                <div className="travel-list-view-text" style={{gap :'20px'}}>
                    <div className="travelgroup-container">
                    <img src="/travelgroups/deletegroup.svg" alt="profile" />                    
                    <span className='regular' style={{fontSize: '8px', marginTop:'5px'}}>모임 탈퇴</span>
                    </div>
                    <div className="travelgroup-container">
                    <img src="/travelgroups/giveadmin.svg" alt="profile" />
                    <span className='regular' style={{fontSize: '8px', marginTop:'5px'}}>권한</span>
                    </div>
                </div>
                
            </div>
        </div>
    );
}