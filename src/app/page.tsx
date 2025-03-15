'use client';

import Header from "./header";
export default function Home() {
  return (
    <div>
      <Header text="헤더" icon="back"></Header>
      <button className="active-button medium" onClick={() => {
        window.location.href = "/travelgroups";
      }}>travelGroups</button>

      <button className="active-button medium" onClick={() => {
        window.location.href = "/travelogues";
      }}>Travelogues</button>

    </div>



  );
}
