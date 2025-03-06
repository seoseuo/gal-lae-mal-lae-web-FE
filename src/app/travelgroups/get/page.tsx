"use client"

import "@/styles/travelgroups/travelgroups-style.css";
import MemberListView from "@/components/travelgroups/member-list-view";
import TravelListView from "@/components/travelgroups/travel-list-view";
import { getGroup } from "@/lib/travelgroup-api";
import { useEffect, useState } from "react";

export default function Home() {
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const grIdx = localStorage.getItem('grIdx');
    if (grIdx) {
      getGroup(parseInt(grIdx)).then(data => {
        setResult(data);
        console.log("data-memberList",data.memberList);
        localStorage.setItem('memberList', JSON.stringify(data.memberList));
        localStorage.setItem('travelGroup', JSON.stringify(data.travelGroup));
      });
    }
  }, []);

  if (!result) return <div>Loading...</div>;

  return (
    <div className="travelgroup-get-container">
      <div>
        <p className="header">
          <img src="/back.svg" alt="back-icon" className="header-icon" style={{cursor: 'pointer'}} onClick={() => window.history.back()} />
          <span className="header-text bold">{result.travelGroup.grName}</span>
          <img src="/option.svg" alt="option-icon" className="header-icon-option" style={{cursor: 'pointer'}} onClick={() => location.href = '/travelgroups/option'} />
        </p>
        <hr style={{ margin: "0 0 20px 0" }} />
      </div>
      
      <div>
        <span className='bold' style={{ marginLeft: '30px', fontSize: '10px' }}>모임 인원</span>
      </div>
      <div className="travelgroup-container">
        <MemberListView memberList={result.memberList} />
      </div>
      <div>
        <span className='bold' style={{ marginLeft: '30px', fontSize: '10px' }}>모임여행</span>
      </div>
      <div className="travelgroup-container">
        <TravelListView travelList={result.travelList} />
      </div>
    </div>
  );
}
