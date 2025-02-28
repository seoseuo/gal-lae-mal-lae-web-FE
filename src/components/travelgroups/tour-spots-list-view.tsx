import "@/styles/travelgroups/travelgroups-style.css";

export default function TourSpotsListView() {
    return (
        <div className="tour-spots-container">
            <div className="tour-spots-view">
                <div className="tour-spots-checkbox">
                    <input id="1" type="checkbox" name="tour-spots-name" value="tsIdx" />
                </div>
                <label htmlFor="1">
                    <div className="tour-spots-card">
                        <img src="/travelgroups/tsimg.png" alt="img" className="tour-spots-img" />
                        <div className="tour-spots-detail">
                            <span className='regular' style={{ fontSize: '11px', marginLeft: '5px' }}>tsName</span>
                            <div className="tour-spots-detail-box">
                                <img src="/travelgroups/call.svg" alt="img" className="call" />
                                <span className='regular' style={{ fontSize: '5px'}}>tsName</span>
                                <img src="/travelgroups/place.svg" alt="img" className="place" style={{marginLeft:'5px'}}/>
                                <span className='regular' style={{ fontSize: '5px', marginLeft: '2px' }}>tsPlace</span>
                            </div>
                            
                        </div>
                    </div>
                </label>
            </div>
        </div>
    );
}
