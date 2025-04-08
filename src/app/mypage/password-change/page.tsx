'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';

export default function PasswordChange() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = async () => {
    if (currentPassword === '' || newPassword === '' || confirmPassword === '') {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await axios.patch('/api/users/me/password', {
        usPw: currentPassword,
        newUsPw: newPassword,
      });
      if (response.data.success) {
        router.push('/mypage');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('비밀번호 변경 오류:', error);
    }
  };

  return (
    <main className="min-h-screen bg-white flex flex-col relative p-6">

      {/* Title */}
      <h1 className="text-black text-center font-['NotoSansKr-Bold'] text-[20px] tracking-[-0.17px] font-bold mb-4">
        비밀번호 변경
      </h1>

      {/* Divider */}
      <div className="w-full h-[1px] border-t border-[#DADADA] mb-8"></div>

      {/* Back Button */}
      <button className="mb-4" onClick={() => router.back()}>
        <Image
          src="/vector0.svg"
          alt="뒤로가기"
          width={12}
          height={16}
          className="w-[2.97%] h-[2.32%]"
        />
      </button>

      {/* Subtitle */}
      <h2 className="text-black font-['NotoSansKr-Regular'] text-[16px] tracking-[-0.17px] mb-6">
        비밀번호 변경
      </h2>

      {/* Password Inputs */}
      <div className="w-[235px] h-[32px] bg-white border border-[#DADADA] rounded-[5px] flex items-center px-[6px] mb-4">
        <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="현재 비밀번호" className="text-[#C4C4C4] font-['NotoSansKr-Regular'] text-[12px] tracking-[-0.17px] w-full" />
      </div>

      <div className="w-[235px] h-[33px] bg-white border border-[#DADADA] rounded-[5px] flex items-center px-[6px] mb-4">
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="새 비밀번호" className="text-[#C4C4C4] font-['NotoSansKr-Regular'] text-[12px] tracking-[-0.17px] w-full" />
      </div>

      <div className="w-[235px] h-[32px] bg-white border border-[#DADADA] rounded-[5px] flex items-center px-[6px] mb-8">
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="새 비밀번호 재입력" className="text-[#C4C4C4] font-['NotoSansKr-Regular'] text-[12px] tracking-[-0.17px] w-full" />
      </div>

      {/* Submit Button */}
      <div className="w-[292px] mx-auto">
        <button
          onClick={handlePasswordChange}
          className="w-full bg-[#C4C4C4] rounded-[12px] py-[15px] px-6 text-white font-['NotoSansKr-Medium'] text-[17px] leading-[22px] tracking-[-0.41px]">
          비밀번호 변경
        </button>
      </div>
    </main>
  );
}

