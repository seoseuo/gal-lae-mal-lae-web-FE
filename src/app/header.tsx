"use client"

import { useRouter } from 'next/navigation';

// Header 컴포넌트
export default function Header({ text, icon, parent }: { text: string; icon: string, parent?: string }) {
  const router = useRouter();

  const handleClick = () => {
    if (parent) {
      router.push(parent);
    } else {
      router.back();
    }
  };

  return (
    <div>
      <p className="header">        
        <img 
          src={`/${icon}.svg`} 
          alt={`${icon}-icon`} 
          className="header-icon" 
          onClick={handleClick} 
          style={{ cursor: 'pointer' }} 
        />
        <span className="header-text bold">{text}</span>
      </p>      
      <hr/>
      <hr style={{ margin: "0 0 40px 0" }} />
    </div>
  );
}
