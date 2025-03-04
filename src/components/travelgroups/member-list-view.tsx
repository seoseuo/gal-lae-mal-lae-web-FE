import "@/styles/travelgroups/travelgroups-style.css";

export default function MemberListView({ memberList }: { memberList: any[] }) {
    return (
        <div className="member-list-container">

            {/* 첫번째만 꺼내서 여기 넣어주기 */}

            <div className="member-profile">
                <img src="/travelgroups/admin.svg" />
                <img className="member-profile-img" src={memberList[0].meUser.usProfile} alt="admin-profile-img" />
                <span className="medium member-profile-text">{memberList[0].meUser.usName}</span>
            </div>

            {/* 1번째 부터 추출 */}
            {memberList.slice(1).map((member) => (
                <div className="member-profile" key={member.usIdx}>
                    <div style={{ height: '16px' }}></div>
                    <img className="member-profile-img" src={member.meUser.usProfile} alt="member-profile-img" />
                    <span className="medium member-profile-text">{member.meUser.usName}</span>
                </div>
            ))}

            

        </div>
    );
}
