"use client";

import { useState, useEffect, useRef } from 'react';
import "@/styles/travelgroups/travelgroups-style.css";
import { editScheduleTime } from "@/lib/travelgroup-api";

export default function ScheduleTimeSetListView({ scheduleList, scDate }: { scheduleList: any[], scDate: string }) {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
    const [localScheduleList, setLocalScheduleList] = useState(scheduleList);

    // 원본 prop(scheduleList)이 변경되면 로컬 상태 업데이트
    useEffect(() => {
        setLocalScheduleList(scheduleList);
    }, [scheduleList]);

    // 모달 외부 클릭 감지를 위한 ref
    const modalRef = useRef<HTMLDivElement>(null);

    const handleRadioChange = (schedule: any) => {
        setSelectedSchedule(schedule);
        // 모달 내 타임 input 값 초기화
        (document.getElementById('start-time-slider') as HTMLInputElement).value = schedule.scStartTime;
        (document.getElementById('end-time-slider') as HTMLInputElement).value = schedule.scEndTime;
    };

    const handleTimeChangeClick = () => {
        if (selectedSchedule) {
            setModalVisible(true);
        }
    };

    const handleDeleteClick = () => {
        if (selectedSchedule) {
            console.log("삭제 객체", selectedSchedule);
        }
    };

    const handleSave = () => {
        const startTime = (document.getElementById('start-time-slider') as HTMLInputElement)?.value;
        const endTime = (document.getElementById('end-time-slider') as HTMLInputElement)?.value;

        const startTimeText = document.getElementById('start-time-text') as HTMLSpanElement;
        const endTimeText = document.getElementById('end-time-text') as HTMLSpanElement;

        // 입력 검증: 두 값 모두 없을 때
        if (!startTime && !endTime) {
            startTimeText.innerHTML = "시작 시간을 선택해주세요.";
            endTimeText.innerHTML = "종료 시간을 선택해주세요.";
            startTimeText.style.color = "#490085";
            endTimeText.style.color = "#490085";
            return;
        }
        if (!startTime) {
            startTimeText.innerHTML = "시작 시간을 선택해주세요.";
            startTimeText.style.color = "#490085";
            endTimeText.innerHTML = "종료 시간";
            endTimeText.style.color = "#000000";
            return;
        }
        if (!endTime) {
            endTimeText.innerHTML = "종료 시간을 선택해주세요.";
            endTimeText.style.color = "#490085";
            startTimeText.innerHTML = "시작 시간";
            startTimeText.style.color = "#000000";
            return;
        }

        // 시작 시간이 종료 시간보다 늦은 경우
        if (startTime > endTime) {
            endTimeText.innerHTML = "시작 시간이 종료 시간보다 느릴 수 없습니다.";
            endTimeText.style.color = "#490085";
            return;
        }

        // 수정된 시간을 포맷팅 (예: "09:00:00")
        const formattedStartTime = startTime + ":00";
        const formattedEndTime = endTime + ":00";

        // 선택된 스케줄 업데이트
        const updatedSchedule = {
            ...selectedSchedule,
            scStartTime: formattedStartTime,
            scEndTime: formattedEndTime,
        };
        setSelectedSchedule(updatedSchedule);

        // 로컬 스케줄 리스트에서 해당 항목 업데이트
        setLocalScheduleList(prevList =>
            prevList.map(s => s.scIdx === selectedSchedule.scIdx ? updatedSchedule : s)
        );

        // 서버에 수정 내용 저장
        editScheduleTime(selectedSchedule.scIdx, formattedStartTime, formattedEndTime);
        console.log("Schedule updated:", { startTime: formattedStartTime, endTime: formattedEndTime });

        setModalVisible(false);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    // 모달 외부 클릭 시 모달 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setModalVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="tour-spots-container">
            <fieldset>
                {localScheduleList.map((schedule) => (
                    <div key={schedule.scIdx} className="tour-spots-view">
                        <div className="tour-spots-checkbox">
                            <input
                                id={`${schedule.scIdx}`}
                                type="radio"
                                name="schedule-time"
                                value={`${schedule.scIdx}`}
                                onChange={() => handleRadioChange(schedule)}
                            />
                        </div>
                        <label htmlFor={`${schedule.scIdx}`}>
                            <div className="tour-spots-card">
                                <img
                                    src={schedule.tsFirstImage || "/travelgroups/tour-spot.png"}
                                    alt={`${schedule.tsName}-img`}
                                    className="tour-spots-img"
                                />
                                <div className="tour-spots-detail">
                                    <span className='regular' style={{ fontSize: '11px', marginLeft: '5px' }}>
                                        {schedule.tsName}
                                    </span>
                                    <div className="tour-spots-detail-box">
                                        <img src="/travelgroups/time-icon.svg" alt="time-icon" />
                                        <span className='regular' style={{ fontSize: '9px', marginLeft: '3px' }}>
                                            {schedule.scStartTime}
                                        </span>
                                        <span className='regular' style={{ fontSize: '9px' }}>
                                            &nbsp;~&nbsp;
                                        </span>
                                        <span className='regular' style={{ fontSize: '9px', marginLeft: '2px' }}>
                                            {schedule.scEndTime}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </label>
                    </div>
                ))}
            </fieldset>

            <div className="bottom-button-postion">
                <button
                    className={selectedSchedule ? "active-button travelgroups-font-size" : "nomal-button travelgroups-font-size"}
                    onClick={handleTimeChangeClick}
                >
                    시간 변경
                </button>
                <button
                    className={selectedSchedule ? "active-button travelgroups-font-size" : "nomal-button travelgroups-font-size"}
                    style={{ marginLeft: '20px' }}
                    onClick={handleDeleteClick}
                >
                    삭제
                </button>
            </div>

            <div className={`schedule-set-modal-container ${isModalVisible ? 'show' : ''}`} ref={modalRef}>
                <div className="schedule-set-modal-text">
                    <span className='regular' style={{ fontSize: '12px', color: '#490085' }} onClick={closeModal}>
                        취소
                    </span>
                    <span className='regular' style={{ fontSize: '12px' }}>
                        일정 시간을 선택해주세요.
                    </span>
                    <span className='regular' style={{ fontSize: '12px', color: '#490085' }} onClick={handleSave}>
                        저장
                    </span>
                </div>
                <div className='travelgroup-container'>
                    <span className='medium' id='start-time-text' style={{ fontSize: '12px', marginTop: '10px' }}>
                        시작 시간
                    </span>
                    <div className='time-set-slider'>
                        <input
                            id='start-time-slider'
                            type="time"
                            className='time-set-slider-input'
                            defaultValue={selectedSchedule?.scStartTime || ""}
                        />
                    </div>

                    <span className='medium' id='end-time-text' style={{ fontSize: '12px', marginTop: '10px' }}>
                        종료 시간
                    </span>
                    <div className='time-set-slider'>
                        <input
                            id='end-time-slider'
                            type="time"
                            className='time-set-slider-input'
                            defaultValue={selectedSchedule?.scEndTime || ""}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
