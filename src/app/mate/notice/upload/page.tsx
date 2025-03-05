export default function UploadPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">

      {/* Navigation Header */}
      <nav className="flex items-center gap-[30px] px-6 py-4">
        <button aria-label="뒤로 가기">
          <img src="vector0.svg" alt="뒤로가기 화살표" className="w-[11.67px] h-[19.8px]" />
        </button>
        <h1 className="text-[#1D0E07] font-['NotoSansKr-Bold'] text-[16px]">게시물 생성하기</h1>
      </nav>

      <form className="flex flex-col items-center gap-5 flex-1 px-6 py-4">
        {/* Image Upload */}
        <section className="w-full max-w-[290px] h-[140px] border border-[#C4C4C4] rounded-[15px] flex flex-col items-center justify-center mb-4">
          <label htmlFor="imageUpload" className="text-black font-['NotoSansKr-Light'] text-[15px] mb-2">Upload Image</label>
          <input type="file" id="imageUpload" accept="image/*" className="hidden" />
          <img src="/upload.svg" alt="이미지 업로드 아이콘" className="w-[36px] h-[36.2px] opacity-50" />
        </section>

        {/* Region Select */}
        <section className="w-full max-w-[290px] mb-4">
          <select 
            className="w-full bg-white border border-[#DADADA] rounded-[20px] py-2 px-4"
            aria-label="지역 선택"
          >
            <option value="" disabled selected>지역</option>
          </select>
        </section>

        {/* Content Input */}
        <section className="w-full max-w-[303px] border border-[#C4C4C4] rounded-[10px] p-4 mb-4">
          <input 
            type="text" 
            placeholder="제목을 입력해주세요" 
            className="text-[#BBBBBC] font-['NotoSansKr-Bold'] text-[14px] mb-3 w-full outline-none"
            aria-label="게시글 제목"
          />
          <textarea 
            placeholder="내용을 입력해주세요" 
            className="text-[#BBBBBC] font-['NotoSansKr-Regular'] text-[12px] w-full outline-none resize-none"
            aria-label="게시글 내용"
          />
        </section>

        {/* Upload Button */}
        <footer className="w-full max-w-[292px] mt-auto">
          <button 
            type="submit" 
            className="w-full bg-[#C4C4C4] rounded-[12px] py-3 px-4 hover:bg-gray-500 transition-colors"
            aria-label="게시글 업로드"
          >
            <span className="text-white font-['NotoSansKr-Medium'] text-[17px] leading-[22px] tracking-[-0.41px]">업로드</span>
          </button>
        </footer>
      </form>
    </main>
  );
}