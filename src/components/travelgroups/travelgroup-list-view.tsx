import "../../styles/travelgroups/travelgroups-style.css";

export default function TravelgroupListView() {
    return (
        <div className="travelgroup-list-view-container">
            
            <img className="travelgroup-list-view-img" src="../../../public/travelgrouplist.png" alt="" />

            <div className="travelgroup-list-view-tag-container">
                <div className="bold" style={{fontSize: "20px", color: "#490085"}}>제목</div>
                <br></br>
                <div className="travelgroup-list-view-tag">명수</div>
                <div className="travelgroup-list-view-tag">여행지</div>
            </div>
        </div>
    )
}