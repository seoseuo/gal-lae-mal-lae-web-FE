"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "@/styles/travelgroups/travelgroups-style.css";

export default function MemberListViewAdmin() {
    const [memberList, setMemberList] = useState<any[]>([]);
    const router = useRouter();

    // 클라이언트 사이드에서만 localStorage를 사용하도록 useEffect 사용
    useEffect(() => {
        const storedMemberList = localStorage.getItem('memberList');
        if (storedMemberList) {
            setMemberList(JSON.parse(storedMemberList));
        }
    }, []); // 컴포넌트가 마운트된 후에 실행되도록

    return (
        <div className="member-admin-list-container">
            {memberList.map((member: any) => (
                member.meRole !== "ADMIN" && ( // ADMIN이 아닐 경우에만 렌더링
                    <div className="member-admin-profile" style={{ cursor: 'pointer' }} key={member.meUser.usIdx} onClick={() => {
                        router.push(`/travelgroups/patch-admin-check?user=${JSON.stringify(member.meUser)}`);
                    }}>
                        <img className="member-admin-profile-img" src={`/s3/${member.meUser.usProfile}`} alt="member-profile-img" />
                        <span className="medium member-admin-profile-text">{member.meUser.usName}</span>
                    </div>
                )
            ))}
        </div>
    );
}
