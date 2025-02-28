import "@/styles/travelgroups/travelgroups-style.css";

export default function ScheduleTimeSetListView() {
    return (
        <div className="tour-spots-container">

            <fieldset>
                <div className="tour-spots-view">
                    <div className="tour-spots-checkbox">
                        <input id="tsIdx" type="radio" name="schedule-time" value="tsIdx" />
                    </div>
                    <label htmlFor="tsIdx">
                        <div className="tour-spots-card">
                            <img src="/travelgroups/tsimg.png" alt="img" className="tour-spots-img" />
                            <div className="tour-spots-detail">
                                <span className='regular' style={{ fontSize: '11px', marginLeft: '5px' }}>tsName</span>
                                <div className="tour-spots-detail-box">
                                    <img src="/travelgroups/time-icon.svg" alt="time-icon"/>
                                    <span className='regular' style={{ fontSize: '9px', marginLeft:'3px'}}>start_time</span>
                                    <span className='regular' style={{ fontSize: '9px' }}>&nbsp;~&nbsp;</span>
                                    <span className='regular' style={{ fontSize: '9px', marginLeft: '2px' }}>end_time</span>
                                </div>

                            </div>
                        </div>
                    </label>
                </div>




            </fieldset>
        </div>
    );
}
