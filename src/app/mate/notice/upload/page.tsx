"use client";
import axios from 'axios';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';  // Next.js Image 컴포넌트 추가

// 인터페이스 추가
interface Region {
  ldIdx: number;
  ldName: string;
}

interface City {
  ldIdx: number;
  lsIdx: number;
  lsName: string;
}

export default function UploadPage() {
  axios.defaults.withCredentials = true;
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [region, setRegion] = useState<number>(0);
  const [city, setCity] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // regionList 타입 수정
  const [regionList, setRegionList] = useState<Region[]>([
    { ldIdx: 0, ldName: '없음' },
  ]);

  const [cityList, setCityList] = useState<City[]>([
    { ldIdx: 0, lsIdx: 0, lsName: '없음' },
  ]);

  // init 함수를 useCallback으로 메모이제이션
  const init = useCallback(() => {
    getRegionList();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);  // getRegionList는 컴포넌트 내부에서 변경되지 않으므로 의존성 배열 비움

  useEffect(() => {
    init();
  }, [init]);  // init을 의존성 배열에 추가

  // getRegionList 수정
  const getRegionList = async () => {
    axios.get('/api/mate/location/do')
    .then((res) => {
      setRegionList([
        { ldIdx: 0, ldName: '없음' },
        ...res.data
      ]);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const getCityList = async (regionIdx: number) => {
    if (regionIdx <= 0) {
      setCityList([{ ldIdx: 0, lsIdx: 0, lsName: '없음' }]);
      return;
    }
    axios.get(`/api/mate/location/si/${regionIdx}`)
    .then((res) => {
      setCityList([
        { ldIdx: 0, lsIdx: 0, lsName: '없음' },
        ...res.data
      ]);
      //지역시 선택 태그 초기화
      setCity(0);
    })
  }
  
  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFile(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleImageDelete = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = () => {
    console.log(title, content, region, city, file);
    if (title === '') {
      alert('제목을 입력해주세요');
      return;
    }
    if (content === '') {
      alert('내용을 입력해주세요');
      return;
    }
    if (file === null) {
      alert('이미지를 업로드해주세요');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    axios.post('/api/s3/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
    const data = {
      boTitle: title,
      boContent: content,
      ldIdx: region,
      lsIdx: city,
      boImg: file.name
    }
    axios.post('/api/mate/board', data,{
      withCredentials: true
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <main className="min-h-screen bg-white flex flex-col">

      {/* Navigation Header */}
      <nav className="flex items-center gap-[30px] px-6 py-4">
        <button aria-label="뒤로 가기" onClick={() => router.push("/mate")}>
          <Image 
            src="/vector0.svg" 
            alt="뒤로가기 화살표" 
            width={12}
            height={20}
            className="w-[11.67px] h-[19.8px]"
          />
        </button>
        <h1 className="text-[#1D0E07] font-['NotoSansKr-Bold'] text-[16px]">게시물 생성하기</h1>
      </nav>

      <form className="flex flex-col items-center gap-2 flex-1 px-6 py-4">
        {/* Image Upload */}
        <section className="w-full max-w-[240px] h-[116px] border border-[#C4C4C4] rounded-[15px] flex flex-col items-center justify-center mb-4 relative">
          <input
            ref={fileInputRef}
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          {previewImage ? (
            <>
              <Image 
                src={previewImage} 
                alt="업로드된 이미지" 
                width={240}
                height={116}
                className="w-full h-full object-cover rounded-[15px]"
              />
              <button
                type="button"
                onClick={handleImageDelete}
                className="absolute -right-2 -top-2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
              >
                <Image 
                  src="/x.svg" 
                  alt="이미지 삭제" 
                  width={12}
                  height={12}
                  className="w-3 h-3"
                />
              </button>
            </>
          ) : (
            <>
              <label htmlFor="imageUpload" className="text-black font-['NotoSansKr-Light'] text-[13px] mb-2 cursor-pointer">
                Upload Image
              </label>
              <Image 
                src="/upload.svg" 
                alt="이미지 업로드 아이콘" 
                width={30}
                height={30}
                className="opacity-50"
              />
            </>
          )}
        </section>

        {/* Region Select */}
        <section className="max-w-[240px] mb-2 flex gap-6">
          <select 
            className="w-[110px] bg-white border border-[#DADADA] rounded-[20px] py-2 px-4"
            aria-label="지역(도) 선택"
            defaultValue=""
            onChange={(e) => {
              const selectedRegionIdx = parseInt(e.target.value);
              setRegion(selectedRegionIdx);
              getCityList(selectedRegionIdx);
            }}
          >
            <option value="0" disabled>지역(도)</option>
            {regionList.map((region) => (
              <option key={region.ldIdx} value={region.ldIdx}>
                {region.ldName}
              </option>
            ))}
          </select>

          <select 
            className="w-[110px] bg-white border border-[#DADADA] rounded-[20px] py-2 px-4"
            aria-label="지역(시) 선택"
            value={city || ""}
            onChange={(e) => {
              const selectedCityIdx = parseInt(e.target.value);
              setCity(selectedCityIdx);
            }}
          >
            <option value="0" disabled>지역(시)</option>
            {cityList.map((city) => (
              <option key={city.lsIdx} value={city.lsIdx}>
                {city.lsName}
              </option>
            ))}
          </select>
        </section>

        {/* Content Input */}
        <section className="w-full max-w-[303px] border border-[#C4C4C4] rounded-[10px] p-4 mb-2">
          <input 
            type="text" 
            placeholder="제목을 입력해주세요" 
            className="text-black font-['NotoSansKr-Bold'] text-[16px] mb-2 w-full outline-none placeholder:text-[#BBBBBC]"
            aria-label="게시글 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea 
            placeholder="내용을 입력해주세요" 
            className="text-black font-['NotoSansKr-Regular'] text-[12px] w-full outline-none resize-none h-[180px] min-h-[80px] placeholder:text-[#BBBBBC]"
            aria-label="게시글 내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </section>

        {/* Upload Button */}
        <footer className="w-full max-w-[292px] mt-2">
          <button 
            type="button" 
            className="w-full bg-[#C4C4C4] rounded-[12px] py-3 px-4 hover:bg-gray-500 transition-colors"
            aria-label="게시글 업로드"
            onClick={handleUpload}
          >
            <span className="text-white font-['NotoSansKr-Medium'] text-[17px] leading-[22px] tracking-[-0.41px]">업로드</span>
          </button>
        </footer>
      </form>
    </main>
  );
}