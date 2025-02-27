import "@/styles/travelgroups/travelgroups-style.css";

export default function MemberListView() {
    return (
        <div className="member-list-container">

            <div className="search-location-si-result">
                <img className="invite-profile" src="" alt="profile" />
                <span className='regular' style={{ fontSize: '12px', marginRight: '150px' , color:'black'}}>유저 이름</span>
                <button className="location-si-select-btn regular">초대</button>
            </div>

        </div>
    );
}
