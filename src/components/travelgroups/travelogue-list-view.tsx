import "@/styles/travelgroups/travelgroups-style.css";

export default function TravelogueListView({ travelogueList }: { travelogueList: any[] }) {
    const memberList = JSON.parse(localStorage.getItem('memberList') || '[]');

    return (
        <div className="travelgroups-list-view-container">
            {travelogueList.map((travelogue) => (
                <div key={travelogue.tlIdx} className="travelgroups-list-view">
                    <div className="travelgroups-list-view-profile">
                        {/* Update the profile image source */}
                        <img className="travelgroups-list-view-profile-img"
                            src={memberList.find((member: any) => member.usIdx === travelogue.usIdx)?.meUser?.usProfile}
                            alt="profile-img" />
                        <div className="travelgroups-list-view-profile-text">
                            <span className='regular' style={{ fontSize: '12px', marginLeft: '7px' }}>
                                {memberList.find((member: any) => member.usIdx === travelogue.usIdx)?.meUser?.usName}
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={travelogue.tlPublic === 1 ? "/travelgroups/public-icon.svg" : "/travelgroups/private-icon.svg"}
                                    style={{ width: '12px', height: '12px', marginLeft: '7px' }}
                                    alt={travelogue.tlPublic === 1 ? "public-icon" : "private-icon"} />
                                <span className='regular' style={{ fontSize: '12px' }}>
                                    {travelogue.tlPublic === 1 ? "공개" : "비공개"}
                                </span>
                            </div>
                        </div>
                    </div>
                    <span className='regular' style={{ fontSize: '12px', marginBottom: '12px' }}>{travelogue.tlTitle}</span>
                    <span className='regular' style={{ fontSize: '12px', marginBottom: '12px' }}>{travelogue.tlContent}</span>
                    <img className="travelgroups-list-view-content-img" src={travelogue.tlImage} alt={travelogue.tlImage} />
                </div>
            ))}
        </div>
    );
}

