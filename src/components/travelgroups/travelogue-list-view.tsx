import "@/styles/travelgroups/travelgroups-style.css";

export default function TravelogueListView() {
    return (

        <div className="travelgroups-list-view-container">

            <div className="travelgroups-list-view">
                <div className="travelgroups-list-view-profile">
                    <img className="travelgroups-list-view-profile-img" src="" alt="profile-img" />
                    <div className="travelgroups-list-view-profile-text">
                        <span className='regular' style={{ fontSize: '12px', marginLeft: '7px' }}>usName</span>
                        <span className='regular' style={{ fontSize: '12px', marginLeft: '7px' }}>tlDate추가고려</span>
                    </div>
                </div>
                <span className='regular' style={{ fontSize: '12px', marginBottom: '12px' }}>tlTitle</span>
                <span className='regular' style={{ fontSize: '12px', marginBottom: '12px' }}>tlContent</span>
                <img className="travelgroups-list-view-content-img" src="d" alt="content-img" />
            </div>

            

    

        </div>

    );
}
