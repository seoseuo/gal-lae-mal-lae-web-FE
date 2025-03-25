'use client';

import { useState } from "react";
import "@/styles/travelgroups/travelgroups-style.css";
import { deleteTravelogue } from "@/lib/travelgroup-api";

export default function TravelogueListView({ travelogueList: initialList }) {
    const memberList = JSON.parse(localStorage.getItem('memberList') || '[]');
    const user = JSON.parse(localStorage.getItem('user') || '0');

    // 내부 상태로 관리
    const [travelogueList, setTravelogueList] = useState(initialList);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedTravelogue, setSelectedTravelogue] = useState(null);

    const handleDeleteClick = (travelogue) => {
        setSelectedTravelogue(travelogue);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedTravelogue) return;
        try {
            await deleteTravelogue(selectedTravelogue.tlIdx);
            setTravelogueList((prevList) =>
                prevList.filter((item) => item.tlIdx !== selectedTravelogue.tlIdx)
            );
        } catch (error) {
            console.error("Error deleting travelogue:", error);
        } finally {
            setSelectedTravelogue(null);
            setIsDeleteModalOpen(false);
        }
    };

    const closeModal = () => {
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="travelgroups-list-view-container">
            {travelogueList.map((travelogue) => (
                <div key={travelogue.tlIdx} className="travelgroups-list-view">
                    <div className="travelgroups-list-view-profile">
                        <img className="travelgroups-list-view-profile-img"
                            src={`/s3/${memberList.find(member => member.usIdx === travelogue.usIdx)?.meUser?.usProfile || 'default-profile.png'}`}
                            alt="profile-img" />
                        <div className="travelgroups-list-view-profile-text">
                            <span className='regular' style={{ fontSize: '12px', marginLeft: '7px' }}>
                                {memberList.find(member => member.usIdx === travelogue.usIdx)?.meUser?.usName || 'Unknown'}
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img
                                    src={`/travelgroups/${travelogue.tlPublic === 1 ? 'public-icon.svg' : 'private-icon.svg'}`}
                                    style={{ width: '12px', height: '12px', marginLeft: '7px' }}
                                    alt={travelogue.tlPublic === 1 ? "public-icon" : "private-icon"} />
                                <span className='regular' style={{ fontSize: '12px' }}>
                                    {travelogue.tlPublic === 1 ? "공개" : "비공개"}
                                </span>
                                {user.usIdx === travelogue.usIdx && (
                                    <img src="/travelgroups/delete.svg"
                                        style={{ width: '20px', height: '20px', marginLeft: '7px', position: 'absolute', right: '20px', cursor: 'pointer' }}
                                        onClick={() => handleDeleteClick(travelogue)}
                                        alt="delete" />
                                )}
                            </div>
                        </div>
                    </div>
                    <span className='regular' style={{ fontSize: '12px', marginBottom: '12px' }}>{travelogue.tlTitle}</span>
                    <span className='regular' style={{ fontSize: '12px', marginBottom: '12px' }}>{travelogue.tlContent}</span>
                    <img className="travelgroups-list-view-content-img" src={travelogue.tlImage} alt={travelogue.tlTitle} />
                </div>
            ))}

            {/* 삭제 확인 모달 */}
            {isDeleteModalOpen && (
                <div className="modal-overlay" style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: '1000'
                }}>
                    <div className="modal" style={{
                        backgroundColor: '#fff',
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        textAlign: 'center',
                        width: '90%',
                        height: '140px'
                    }}>
                        <p>정말로 삭제하시겠어요?</p>
                        <div style={{ marginTop: '20px' }}>
                            <button className="nomal-button" onClick={confirmDelete}>삭제</button>
                            <button className="active-button" onClick={closeModal} style={{ marginLeft: '10px' }}>취소</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
