"use client";

import { useRouter } from "next/navigation";
import "@/styles/travelgroups/travelgroups-style.css";
import { updateAdmin } from "@/lib/travelgroup-api";

export default function MemberListViewAdmin() {
    const router = useRouter();
    const memberList = JSON.parse(localStorage.getItem('memberList') || '[]');
    console.log("memberList", memberList);
    return (
        <div className="member-admin-list-container">
            {memberList.map((member: any) => (
                member.meRole !== "ADMIN" && ( // ADMIN이 아닐 경우에만 렌더링
                    <div className="member-admin-profile" style={{ cursor: 'pointer' }} key={member.meUser.usIdx} onClick={() => {
                        router.push(`/travelgroups/patch-admin-check?user=${JSON.stringify(member.meUser)}`);
                    }}>
                        <img className="member-admin-profile-img" src={member.meUser.usProfile} alt="member-profile-img" />
                        <span className="medium member-admin-profile-text">{member.meUser.usName}</span>
                    </div>
                )
            ))}
        </div>
    );
}
