"use client";

import Header from "../../header";
import MemberListInviteView from "../../../components/travelgroups/member-list-invite-view";
import "@/styles/travelgroups/travelgroups-style.css";
import { searchUser } from "../../../lib/travelgroup-api";
import { useState } from "react";

export default function Home() {
    const [searchResult, setSearchResult] = useState<any[]>([]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const usEmail = formData.get('usEmail') as string;

        if (usEmail == "" || usEmail == null) {
            console.log("usEmail is empty");
            return;
        }        
        const result = await searchUser(usEmail);
        setSearchResult([result]); // 배열로 감싸서 저장
        console.log("검색 결과:", result);
    }

    return (
        <div>
            <Header text="초대" icon="back"></Header>
            <div className="travelgroup-container">
                <form method="get" name="invite-form" onSubmit={handleSubmit}>
                    <div className="search-bar">
                        <img src="/travelgroups/search.svg" alt="search" style={{ width: '17.49px', margin: '0 15px 0 15px' }} />
                        <input name="usEmail" style={{ color: '#490085', width: '80%' }} placeholder="이메일 입력"></input>
                    </div>
                </form>
            </div>

            <br />

            <MemberListInviteView userList={searchResult} />
        </div>
    );
}
