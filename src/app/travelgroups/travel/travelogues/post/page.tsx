"use client";

import { saveTravelogue } from "@/lib/travelgroup-api";
import "@/styles/travelgroups/travelgroups-style.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [tlPublic, setTlPublic] = useState(false);
  const [imagePreview, setImagePreview] = useState("/travelgroups/tour-spot.png");

  const handlePublic = () => {
    setTlPublic(!tlPublic);
    console.log("tlPublic:", !tlPublic);
  };

  const saveLogue = () => {
    const tlTitle = (document.querySelector('input[name="tlTitle"]') as HTMLInputElement)?.value;
    const tlContent = (document.querySelector('textarea[name="tlContent"]') as HTMLTextAreaElement)?.value;
    const setTlImage = (document.querySelector('input[name="setTlImage"]') as HTMLInputElement)?.files;


    const titleWarningElement = document.getElementById("title-warning");
    const imgWarningElement = document.getElementById("img-warning");

    if (!tlTitle) {
      if (titleWarningElement) {
        titleWarningElement.textContent = "제목을 입력해주세요.";
      }
      return;
    } else {
      if (titleWarningElement) {
        titleWarningElement.textContent = `⠀`;
      }
    }

    // 이미지 예외
    if (!setTlImage || setTlImage.length === 0) {
      if (imgWarningElement) {
        imgWarningElement.textContent = "이미지를 업로드해주세요.";
        imgWarningElement.style.color = '#490085';
      }
      return;
    } else {
      if (imgWarningElement) {
        imgWarningElement.textContent = `⠀`;
      }
    }
    console.log(tlTitle, tlContent, setTlImage, tlPublic);


    saveTravelogue(tlTitle, tlContent, setTlImage, tlPublic);
  };

  const handleImageClick = () => {
    // Trigger the file input click event
    document.getElementById("fileInput")?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const allowedExtensions = ["image/jpeg", "image/png", "image/jpg"];  // 허용되는 확장자
    const maxSize = 5 * 1024 * 1024; // 5MB (용량 제한)

    // img-warning 요소 찾기
    const warningElement = document.getElementById("img-warning");

    // 파일이 선택되지 않으면 처리 안 함
    if (!file) return;

    // 파일 확장자 체크
    if (!allowedExtensions.includes(file.type)) {
      // 확장자 초과 시 예외 처리
      if (warningElement) {
        warningElement.style.color = '#490085';
        warningElement.textContent = "허용되는 파일 형식은 PNG, JPG, JPEG 입니다.";
      }
      return;
    }

    // 파일 용량 체크
    if (file.size > maxSize) {
      // 용량 초과 시 예외 처리
      if (warningElement) {
        warningElement.style.color = '#490085';
        warningElement.textContent = "파일 용량은 5MB 이하만 업로드 가능합니다.";
      }
      return;
    }

    // 파일이 유효한 경우, 이미지 미리보기 설정
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
      if (warningElement) {
        warningElement.textContent = ""; // 경고 메시지 초기화
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div>
        <p className="header">
          <img
            src="/back.svg"
            alt="back-icon"
            className="header-icon"
            style={{ cursor: 'pointer' }}
            onClick={() => router.back()}
          />
          <span className="header-text bold">여행록 기록하기</span>
          <span
            className="regular header-icon-option"
            style={{ fontSize: '15px', cursor: 'pointer' }}
            onClick={saveLogue}
          >
            등록
          </span>
        </p>
        <hr style={{ margin: "0 0 20px 0" }} />
      </div>

      <form id="travelogue-post-form" encType="multipart/form-data" onSubmit={saveLogue}>
        <div>
          <input
            name="tlTitle"
            className="travelgroups-post-editer"
            type="text"
            placeholder="제목"
            style={{ fontSize: '16px' }}
          />
          <hr />
          <span
            id="title-warning"
            className="regular"
            style={{ fontSize: '10px', cursor: 'pointer', height: '10px', color: '#490085' }}
          >
            &nbsp;
          </span>

          <div className="travelgroups-post-editer-icons">
            <img
              style={{ cursor: 'pointer' }}
              onClick={handlePublic}
              src={tlPublic ? "/travelgroups/public-icon.svg" : "/travelgroups/private-icon.svg"}
              alt={tlPublic ? "public-icon" : "private-icon"}
            />
          </div>
          <br />

          <textarea
            name="tlContent"
            className="travelgroups-post-editer"
            placeholder={`나만의 여행앨범을 완성해 보세요!  

Tip) 자물쇠를 통해 여행록을 우리 모임만 보게 하거나  
다른 이웃들이 볼 수 있게 설정할 수 있어요.`}
            style={{ height: "130px" }}
          />

          <div className="travelgroup-container">
            <input
              id="fileInput"
              type="file"
              name="setTlImage"
              multiple
              style={{ display: "none" }}
              onChange={handleFileChange}


            />
            <img
              src={imagePreview}
              alt="content-img"
              className="travelgroups-list-view-content-img"
              style={{ cursor: "pointer" }}
              onClick={handleImageClick}
            />
            <span
              id="img-warning"
              className="regular"
              style={{ fontSize: '10px', cursor: 'pointer' }}
            >
              5MB 이하의 png, jpg, jpeg 파일만 업로드 가능합니다.
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
