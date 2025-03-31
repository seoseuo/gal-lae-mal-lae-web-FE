import "@/styles/travelgroups/travelgroups-style.css";
import { useState } from "react";
import { inviteUser } from "@/lib/travelgroup-api";
export default function MemberListInviteView({ userList }: { userList: any }) {
    console.log("userList의 구조:", JSON.stringify(userList, null, 2));
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    const handleInvite = (user: any) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    return (
        <div className="member-list-view-container">
            {userList[0] && userList[0].length > 0 ? (
                userList[0].map((user: any) => (
                    <div className="search-location-si-result" id={user.usIdx} key={user.usIdx}>
                        <img className="invite-profile" src={`/s3/${user.usProfile}`} alt="profile" />
                        <div className="invite-profile-text">
                            <span className='regular' style={{ fontSize: '12px', color: 'black' }}>
                                {user.usName}
                            </span>
                            <span className='regular' style={{ fontSize: '7px', color: 'gray' }}>
                                {user.usEmail}
                            </span>
                        </div>
                        <button
                            className="location-si-select-btn regular"
                            onClick={() => handleInvite(user)}
                        >
                            초대
                        </button>
                    </div>
                ))
            ) : (
                <div>초대할 친구의 이메일을 검색해주세요.</div>
            )}

            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '10px',
                        width: '80%',
                        maxWidth: '400px'
                    }}>                        
                        <p style={{ textAlign: 'center' }}>{selectedUser?.usName} 님을 모임에 초대합니다.</p>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '10px',
                            marginTop: '20px'
                        }}>
                            <button
                                className="location-si-select-btn regular"

                                style={{
                                    backgroundColor: '#c4c4c4',
                                    borderRadius: '15px',
                                }}
                                onClick={() => setShowModal(false)}
                            >
                                취소
                            </button>
                            <button
                                className="location-si-select-btn regular"
                                style={{
                                    borderRadius: '15px',
                                }}
                                onClick={() => {
                                    // TODO: 초대 로직 구현
                                    inviteUser(selectedUser.usIdx);                                    
                                    setShowModal(false);
                                }}
                            >
                                확인
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
