import Header from "../header";
import TravelgroupListView from "@/components/travelgroups/travelgroup-list-view";

export default function Home() {
  return (
    <div>
      <Header text="모임 관리" icon="back"></Header>

      <div className="travelgroup-container">
        <TravelgroupListView />
        <button className="add-button bottom-button-postion"><p className="add-button-text bold">+</p></button>        
      </div>
    </div>
  );
}
