"use client";

import { useState } from 'react';
import { savePeriod }  from '@/lib/travelgroup-api';
import Header from "../../../header";
import "@/styles/travelgroups/travelgroups-style.css";


export default function Home() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        const days = [];
        const firstDayIndex = firstDay.getDay();
        
        for (let i = 0; i < firstDayIndex; i++) {
            days.push(null);
        }
        
        for (let i = 1; i <= lastDay.getDate(); i++) {
            days.push(new Date(year, month, i));
        }
        
        return days;
    };

    const handleDateClick = (clickedDate: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (clickedDate < today) return;

        if (!selectedStartDate || !selectedEndDate) {
            setSelectedStartDate(clickedDate);
            setSelectedEndDate(clickedDate);
            return;
        }

        if (clickedDate.getTime() === selectedStartDate.getTime()) {
            setSelectedStartDate(null);
            setSelectedEndDate(null);
            return;
        }

        const daysDifference = Math.abs((clickedDate.getTime() - selectedStartDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDifference > 9) {
            return;
        }

        if (clickedDate < selectedStartDate) {
            setSelectedStartDate(clickedDate);
            setSelectedEndDate(selectedStartDate);
        } else {
            // 다음달 날짜 선택시 달력 이동하는 로직 제거
            setSelectedEndDate(clickedDate);
        }
    };

    const isDateInRange = (date: Date) => {
        if (!selectedStartDate || !selectedEndDate || !date) return false;
        return date >= selectedStartDate && date <= selectedEndDate;
    };

    const handleSubmit = () => {
        if (selectedStartDate && selectedEndDate) {
            const trStartTime = selectedStartDate.toISOString().split('.')[0] + '+09:00';
            const trEndTime = selectedEndDate.toISOString().split('.')[0] + '+09:00';
            console.log({
                "trStartTime": trStartTime,
                "trEndTime": trEndTime
            });
            savePeriod(trStartTime,trEndTime);
        }
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isCurrentMonth = currentDate.getMonth() === today.getMonth() && 
                          currentDate.getFullYear() === today.getFullYear();

    return (
        <div>
            <Header text="일정" icon="back"></Header>

            <div className="period-container">
                <span className='regular' style={{ fontSize: '18px', marginTop: '44px' }}>언제 떠나실 예정인가요 ?</span>

                <div className="calander-container" style={{ marginTop: '47px' }}>
                    <div className="calander-text-container">
                        <span className='regular' style={{ fontSize: '12px' }}>{currentDate.getFullYear()}년 {String(currentDate.getMonth() + 1).padStart(2, '0')}월</span>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <img 
                                src="/travelgroups/c-back.svg" 
                                alt="back" 
                                style={{ opacity: isCurrentMonth ? 0.3 : 1, cursor: isCurrentMonth ? 'default' : 'pointer' }}
                                onClick={() => {
                                    if (!isCurrentMonth) {
                                        const newDate = new Date(currentDate);
                                        newDate.setMonth(newDate.getMonth() - 1);
                                        setCurrentDate(newDate);
                                    }
                                }}
                            />
                            <img 
                                src="/travelgroups/c-next.svg" 
                                alt="next"
                                onClick={() => {
                                    const newDate = new Date(currentDate);
                                    newDate.setMonth(newDate.getMonth() + 1);
                                    setCurrentDate(newDate);
                                }}
                            />
                        </div>
                    </div>
                    <div className="calander-day-container">
                        <div className="calander-item" style={{color: '#212121'}}>일</div>
                        <div className="calander-item">월</div>
                        <div className="calander-item">화</div>
                        <div className="calander-item">수</div>
                        <div className="calander-item">목</div>
                        <div className="calander-item">금</div>
                        <div className="calander-item" style={{color: '#212121'}}>토</div>
                        
                        {getDaysInMonth(currentDate).map((date, index) => (
                            <div 
                                key={index}
                                className="calander-item"
                                data-date={date ? date.toISOString() : ''}
                                onClick={() => {
                                    if(date) {
                                        handleDateClick(date);
                                    }
                                }}
                                style={{
                                    color: date ? 
                                        (date < today ? '#CCCCCC' : 
                                            (index % 7 === 0 || index % 7 === 6 ? '#212121' : 'black')
                                        ) : 'transparent',
                                    backgroundColor: date && isDateInRange(date) ? '#EDE6F3' : 'transparent',
                                    cursor: date && date < today ? 'default' : 'pointer'
                                }}
                            >
                                {date ? date.getDate() : ''}
                            </div>
                        ))}
                    </div>
                </div>

                <span className='regular' style={{ fontSize: '12px', marginTop: '10px', color: '#787676' }}>Tip ) 최대 9박10일까지 설정 가능해요 !</span>
                <button 
                    className={selectedStartDate && selectedEndDate ? "long-active-button bottom-button-postion travelgroups-font-size" : "long-nomal-button bottom-button-postion travelgroups-font-size"}
                    onClick={handleSubmit}
                >
                    갈래요
                </button>
            </div>





        </div>
    );
}