'use client';

export default function TraveloguePublicListView({ traveloguePublicList }: { traveloguePublicList: any[] }) {
    return (
        <div className="travelgroups-list-view-container">

            {traveloguePublicList.map((travelogue) => (
                <div key={travelogue.tlIdx}>
                    <div className="travelogue-public-view-profile">
                        <img className="travelogue-public-view-profile-img" src={`/s3/${travelogue.usProfile}`} alt={travelogue.usName} />
                        <span className="travelogue-public-view-profile-text-name">{travelogue.usName}</span>
                    </div>

                    <img className="travelogue-public-view-content-img" src={`/s3/${travelogue.tlImage}`} alt={travelogue.tlImage} />
                    <div className="travelogue-public-view-content-text">
                        <div><span className="travelogue-public-view-content-text-title regular" style={{ fontSize: '12px' }}>{travelogue.tlTitle}</span></div>
                        <div style={{ marginTop: '12px', fontSize: '12px' }}><span className="travelogue-public-view-content-text-content regular">{travelogue.tlContent}</span></div>
                    </div>
                </div>

            ))}

        </div>
    );
}
