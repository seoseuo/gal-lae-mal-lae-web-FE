import "@/styles/travelgroups/travelgroups-style.css";
import MemberListView from "@/components/travelgroups/member-list-view";
import TravelListView from "@/components/travelgroups/travel-list-view";



export default function Home() {
  return (
    <div>
      <div>
        <p className="header">
          <img src="/back.svg" alt="back-icon" className="header-icon" />
          <span className="header-text bold">디저트를 위해 모인 사람들</span>
          <img src="/option.svg" alt="option-icon" className="header-icon-option" />
        </p>
        <hr style={{ margin: "0 0 20px 0" }} />
      </div>

      <div>
        <span className='bold' style={{ marginLeft: '30px', fontSize: '10px' }}>모임 인원</span>
      </div>
      <div className="travelgroup-container">
        <MemberListView />
      </div>
      <div>
        <span className='bold' style={{ marginLeft: '30px', fontSize: '10px' }}>모임여행</span>
      </div>
      <div className="travelgroup-container">
        <TravelListView />
      </div>
    </div>
  );
}
