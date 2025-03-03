import "../../styles/travelgroups/travelgroups-style.css";

export default function TravelgroupListView({ travelGroupList }) {

    const NEXT_PUBLIC_UPLOAD_PATH = process.env.NEXT_PUBLIC_UPLOAD_PATH;
    return (
        <div>
            {
                travelGroupList.map((group) => (
                    <div key={group.grIdx} onClick={() => getTravelGroup(group.grIdx)}>
                        <div className="travelgroup-list-view-container" style={{ cursor: 'pointer' }}>
                            <img className="travelgroup-list-view-img" src={`${NEXT_PUBLIC_UPLOAD_PATH}${group.grProfile}`} alt={group.grName} />
                            <div className="travelgroup-list-view-tag-container">
                                <div className="bold" style={{ fontSize: "20px", color: "#490085" }}>{group.grName}</div>
                                <div style={{ marginTop: '20px' }}></div>
                                <div className="travelgroup-list-view-tag">{group.grCount}명</div>
                                {group.grLdList && group.grLdList.length > 0 && (
                                    <div className="travelgroup-list-view-tag-row">
                                        {group.grLdList.map((item, index) => (
                                            <div className="travelgroup-list-view-tag" key={index}>{item}</div>
                                        ))}
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}