import Header from "../../../header";
import "@/styles/travelgroups/travelgroups-style.css";
import ScheduleListView from "../../../../components/travelgroups/schedule-time-set-list-view";

export default function Home() {
    return (
        <div>
            <Header text="시간 선정" icon="back"></Header>
            <div className="travelgroup-container" style={{ marginTop: '-30px'}}>
                <ScheduleListView />
                <div className="schedule-set-modal-container">
                    <div className="schedule-set-modal-text">
                    <span className='regular' style={{ fontSize: '12px' , color: '#490085'}}>취소</span>
                    <span className='regular' style={{ fontSize: '12px'}}>일정 시간을 선택해주세요.</span>
                    <span className='regular' style={{ fontSize: '12px' , color: '#490085'}}>저장</span>
                    </div>
                </div>
            </div>
        </div>
    );
}