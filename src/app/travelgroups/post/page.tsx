import Header from "../../header";
import "@/styles/travelgroups/travelgroups-style.css";

export default function Home() {
  return (
    <div>
      <Header text="모임 프로필 생성" icon="back"></Header>

      <div className="travelgroup-container">
        <br />
        <br />
        <img src="/travelgroups/profile.png" alt="profile" />
        <br />
        <br />
        <br />
        <input 
        className='long-nomal-button travelgroups-font-size' 
        type="text" 
        placeholder="모임이름을 생성해주세요." 
        style={{ color: 'white'}}
        />

        <button className="long-nomal-button bottom-button-postion travelgroups-font-size">완료</button>
      </div>
    </div>
  );
}