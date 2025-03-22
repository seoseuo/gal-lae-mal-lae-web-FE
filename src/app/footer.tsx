"use client";

import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  return (
    <div className="footer-container">
      <div onClick={() => router.push("/")} className="footer-item">
        <img src="/footer-home.svg" alt="Home" />
      </div>

      <div onClick={() => router.push("/travelgroups")} className="footer-item">
        <img src="/footer-tg.svg" alt="TG" />
      </div>

      <div onClick={() => router.push("/travelogues")} className="footer-item">
        <img src="/footer-tl.svg" alt="TL" />
      </div>

      <div onClick={() => router.push("/mate")} className="footer-item">
        <img src="/footer-tm.svg" alt="TM" />
      </div>

      <div onClick={() => router.push("/mypage")} className="footer-item">
        <img src="/footer-user.svg" alt="User" />
      </div>
    </div>
  );
}
