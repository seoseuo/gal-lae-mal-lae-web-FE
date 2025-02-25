import "@/styles/travelgroups/travelgroups-style.css";

export default function TravelListView() {
    return (
        <div>
            <div className="travel-list-view">
                <div className="travel-list-view-text">
                    <span>ㅇㅇ도 - ㅇㅇ시</span>
                    <img src="/travelgroups/delete.svg" alt="delete" style={{ width: '8px' }} />
                </div>

                <div className="travel-list-img-view">
                    <img className="travel-list-img" src="/travelgroups/profile.png" alt="travelImg" />
                    <img className="travel-list-img" src="/travelgroups/profile.png" alt="travelImg" />
                </div>

                <div className="travelgroup-container">
                    <div className="travel-list-img-bar"></div>
                </div>
            </div>

            <br />
            <br />
            <br />

        </div>
    );
}
