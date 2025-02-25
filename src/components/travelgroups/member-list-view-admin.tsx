import "@/styles/travelgroups/travelgroups-style.css";

export default function MemberListView() {
    return (
        <div className="member-admin-list-container">

            <div className="member-admin-profile">                
                <img className="member-admin-profile-img" src="/travelgroups/profile.png" alt="member-profile-img" />
                <span className="medium member-admin-profile-text">유저이름</span>
            </div>

            <div className="member-admin-profile">                
                <img className="member-admin-profile-img" src="/travelgroups/profile.png" alt="member-profile-img" />
                <span className="medium member-admin-profile-text">유저이름</span>
            </div>

            <div className="member-admin-profile">                
                <img className="member-admin-profile-img" src="/travelgroups/profile.png" alt="member-profile-img" />
                <span className="medium member-admin-profile-text">유저이름</span>
            </div>
            
        </div>
    );
}
