"use client";

import Header from "../../../header";
import "@/styles/travelgroups/travelgroups-style.css";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getLocationSiList, saveLocationSi } from '@/lib/travelgroup-api';



// 초성 추출 함수
const getChosung = (str: string) => {
  const cho = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i) - 44032;
    if (code > -1 && code < 11172) {
      result += cho[Math.floor(code / 588)];
    }
  }
  return result;
};

export default function Home() {
    const [locationList, setLocationList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const searchParams = useSearchParams();
    const ldIdx = searchParams.get('ldIdx');

    useEffect(() => {
        const fetchLocationList = async () => {
            if (ldIdx) {
                const response = await getLocationSiList(parseInt(ldIdx));
                setLocationList(response);
                setFilteredList(response);
            }
        };
        fetchLocationList();
    }, [ldIdx]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);

        const filtered = locationList.filter((location: { lsName: string }) => {
            const name = location.lsName.toLowerCase();
            const search = searchTerm.toLowerCase();
            const chosung = getChosung(location.lsName);
            
            return name.includes(search) || chosung.includes(search);
        });
        setFilteredList(filtered);
    };

    return (
        <div>
            <Header text="여행지 설정" icon="back"></Header>
            <div className="travelgroup-container">
                <div className="search-bar">
                    <img src="/travelgroups/search.svg" alt="search" style={{ width: '17.49px', margin: '0 15px 0 15px' }} />
                    <input 
                        style={{ color: '#490085', width: '80%' }}
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            <br />
            <br />

            {filteredList.map((locationSi: { lsIdx: number, lsName: string, ldIdx: number }) => (
                <div key={locationSi.lsIdx} className="search-location-si-result">
                    <img src="/travelgroups/location.svg" alt="location" />
                    <span className='regular' style={{ fontSize: '16px', marginRight: '180px' }}>
                        {locationSi.lsName}
                    </span>
                    <button 
                        className="location-si-select-btn regular" 
                        onClick={() => saveLocationSi(locationSi.lsIdx)}
                    >
                        선택
                    </button>
                </div>
            ))}

        </div>
    );
}