"use client"
import Header from "../../header";
import "@/styles/travelgroups/travelgroups-style.css";
import { useState } from "react";
import { postGroup } from "@/lib/travelgroup-api";
export default function Home() {
  const [previewImage, setPreviewImage] = useState<string>('/travelgroups/profile.png');
  const [hasGroupName, setHasGroupName] = useState(false);
  const [hasChangedImage, setHasChangedImage] = useState(false);

  const handleImageClick = () => {
    document.getElementById('profile-input')?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const warningText = document.getElementById('warning-text');
    
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes

      if (!allowedTypes.includes(file.type) || file.size > maxSize) {
        if (warningText) {
          warningText.textContent = '최대 10MB, 파일 형식: jpg, png만 가능합니다.';
        }
        event.target.value = ''; // 파일 선택 초기화
        setHasChangedImage(false);
      } else {
        if (warningText) {
          warningText.textContent = ''; // 경고 메시지 제거
        }
        // 이미지 미리보기 생성
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result as string);
          setHasChangedImage(true); // 이미지가 성공적으로 변경되었을 때만 true로 설정
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleGroupNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setHasGroupName(value.trim().length > 0);
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
    try {
      const form = document.getElementById('post-group') as HTMLFormElement;
      const formData = new FormData(form);
      
      await postGroup(formData);
    } catch (error) {
      console.error('Error submitting form:', error);      
    }
  };

  return (
    <div>
      <Header text="모임 프로필 생성" icon="back"></Header>

      <div className="travelgroup-container">
        <br />
        <br />
        
        <form className="travelgroup-container" id='post-group' method={'post'} encType="multipart/form-data">
        
        <img 
          src={previewImage}
          alt="profile" 
          onClick={handleImageClick}
          style={{ 
            cursor: 'pointer',
            width: '121px',
            height: '121px',
            borderRadius: '50%',            
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
          }}
        />
        <input 
          type="file" 
          name="setGrProfile" 
          id="profile-input"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png"
        />
        <span id="warning-text" style={{fontSize: '12px', color: '#490085'}}></span>
        <br />
        <br />
        <br />
        <input
          id="group-name"
          name="grName"
          className={`long-${hasGroupName ? 'active' : 'nomal'}-button travelgroups-font-size`}
          type="text"
          placeholder="모임이름을 생성해주세요."
          style={{ color: 'white', marginTop: '57px' }}
          onChange={handleGroupNameChange}
        />
        <button 
          id="group-button" 
          className={`long-${hasChangedImage && hasGroupName ? 'active' : 'nomal'}-button bottom-button-postion travelgroups-font-size`}
          disabled={!hasChangedImage || !hasGroupName}
          onClick={handleSubmit}
          style={{ cursor: (hasChangedImage && hasGroupName) ? 'pointer' : 'not-allowed' }}
        >
          완료
        </button>
        </form>        
      </div>
    </div>
  );
}