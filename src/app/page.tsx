import Image from "next/image";
import Header from "./header";
export default function Home() {
  return (
    <div>
      <Header text="헤더"></Header>
      <button className="active-button medium">기본</button>
      <button className="nomal-button medium">추가</button>    
      <button className="long-nomal-button">추가</button>
      <button className="long-active-button">추가</button>      
      <button className="middle-nomal-button">추가</button>
      <button className="middle-active-button">추가</button>
      <button className="middle-active-button">추가</button>
      <button className="middle-active-button">추가</button>
      <button className="middle-active-button">추가</button>
      <br />      
    </div>
    
  );
}
