import "@/styles/travelgroups/travelgroups-style.css";

export default function MemberListView() {
    return (
        <div className="member-list-container">

            <div className="member-profile">
                <img src="/travelgroups/admin.svg" />
                <img className="member-profile-img" src="/travelgroups/profile.png" alt="member-profile-img" />
                <span className="medium member-profile-text">유저이름</span>
            </div>

            <div className="member-profile">
                <div style={{ height: '16px' }}></div>
                <img className="member-profile-img" src="/travelgroups/profile.png" alt="member-profile-img" />
                <span className="medium member-profile-text">유저이름</span>
            </div>

            <div className="member-profile">
                <div style={{ height: '16px' }}></div>
                <img className="member-profile-img" src="/travelgroups/profile.png" alt="member-profile-img" />
                <span className="medium member-profile-text">유저이름</span>
            </div>

            <div className="member-profile">
                <div style={{ height: '16px' }}></div>
                <img className="member-profile-img" src="/travelgroups/profile.png" alt="member-profile-img" />
                <span className="medium member-profile-text">유저이름</span>
            </div>

            <div className="member-profile">
                <div style={{ height: '16px' }}></div>
                <img className="member-profile-img" src="/travelgroups/profile.png" alt="member-profile-img" />
                <span className="medium member-profile-text">유저이름</span>
            </div>

        </div>
    );
}
