import "@/styles/travelgroups/travelgroups-style.css";

export default function ScheduleListView() {
    return (
        <div className="tour-spots-container">
            <div className="schedule-list-view-container">
                <div className="schedule-list-view">
                    <img src="/travelgroups/tsimg.png" alt="img" className="schedule-list-view-img" />
                    <div>
                        <div className="schedule-list-view-text">
                            <img src="/travelgroups/time-icon.svg" alt="time-icon" />
                            <span className='regular' style={{ fontSize: '12px', marginLeft: '5px' }}>start_time</span>
                            <span className='regular' style={{ fontSize: '12px' }}>&nbsp;~&nbsp;</span>
                            <span className='regular' style={{ fontSize: '12px', marginLeft: '2px' }}>end_time</span>
                        </div>

                        <div className="schedule-list-view-text">
                            <img src="/travelgroups/location-black.svg" alt="location" />
                            <span className='regular' style={{ fontSize: '12px', marginLeft: '5px' }}>tsName</span>
                            
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
