import "@/styles/travelgroups/travelgroups-style.css";

export default function MemberListInviteView({ userList }: { userList: any }) {
    console.log("userList의 구조:", JSON.stringify(userList, null, 2));

    return (
        <div className="member-list-container">
            {userList[0] && userList[0].length > 0 ? (
                userList[0].map((user: any) => (
                    <div className="search-location-si-result" key={user.usIdx}>
                        <img className="invite-profile" src={user.usProfile} alt="profile" />
                        <div className="invite-profile-text">
                            <span className='regular' style={{ fontSize: '12px', color: 'black' }}>
                                {user.usName}
                            </span>                            
                            <span className='regular' style={{ fontSize: '7px', color: 'gray' }}>
                                {user.usEmail}
                            </span>
                        </div>
                        <button className="location-si-select-btn regular">초대</button>
                    </div>
                ))
            ) : (
                <div>검색 결과가 없습니다.</div>
            )}
        </div>
    );
}
