"use client"

import { useRouter } from 'next/navigation';

// Header 컴포넌트
export default function Header({ text, icon }: { text: string; icon: string }) {
  const router = useRouter();

  return (
    <div>
      <p className="header">
        <img src={`/${icon}.svg`} alt={`${icon}-icon`} className="header-icon" onClick={() => router.back()} style={{cursor:'pointer'}}/>
        <span className="header-text bold">{text}</span>
        
      </p>
      <hr style={{ margin: "0 0 40px 0" }} />
    </div>
  );
}
