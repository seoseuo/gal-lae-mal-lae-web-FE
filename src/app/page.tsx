'use client';

import { useRouter } from 'next/navigation';
import { MainTravelgroupsView } from "@/components/main-travelgroups-view";
import { MainTraveloguesView } from "@/components/main-travelogues-view ";
import { getTravelGroupList, getPublicTravelogueList, getMe } from "@/lib/travelgroup-api";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  
  const [travelGroupList, setTravelGroupList] = useState([]);
  const [travelogueList, setTravelogueList] = useState([]);

  useEffect(() => {
    async function fetchUserData() {
      const userData = await getMe();
      localStorage.setItem("user", JSON.stringify(userData));
    }
    fetchUserData();
  }, []);

  useEffect(() => {
    async function fetchTravelGroupData() {
      const data = await getTravelGroupList();
      setTravelGroupList(data);
    }
    fetchTravelGroupData();
  }, []);

  useEffect(() => {
    async function fetchTravelogueData() {
      const data = await getPublicTravelogueList();
      setTravelogueList(data.travelogueList);
      
    }
    fetchTravelogueData();
  }, []);

  return (
    <div>
      <div className="main-top">
        <span className="bold" style={{ fontSize: '16px', color: 'black' }}>갈래말래</span>
        <img 
          src="/talk.svg" 
          style={{ cursor: 'pointer' }} 
          onClick={() => router.push('/chat')} 
        />
      </div>

      {/* 여행 모임 리스트 */}
      <MainTravelgroupsView mainTravelGroupsViewList={travelGroupList} />
      
      {/* 여행 일지 리스트 */}
      <MainTraveloguesView mainTraveloguesViewList={travelogueList} />
    </div>
  );
}
