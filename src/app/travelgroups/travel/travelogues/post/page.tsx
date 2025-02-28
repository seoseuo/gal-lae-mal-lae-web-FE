import "@/styles/travelgroups/travelgroups-style.css";



export default function Home() {
  return (
    <div>
      <div>
        <p className="header">
          <img src="/back.svg" alt="back-icon" className="header-icon" />
          <span className="header-text bold">여행록 기록하기</span>
          <span className='regular header-icon-option' style={{ fontSize: '15px' }}>등록</span>
        </p>
        <hr style={{ margin: "0 0 20px 0" }} />
      </div>

      <div>

        <input className="travelgroups-post-editer" type="text" placeholder="제목" style={{ fontSize: '16px' }} />
        <hr style={{ margin: "0 0 20px 0" }} />
        <div className="travelgroups-post-editer-icons">
          <img src="/travelgroups/img-icon.svg" alt="img-icon" />
          <img src="/travelgroups/public-icon.svg" alt="public-icon" />
        </div>
        <br />
        <textarea
          className="travelgroups-post-editer"
          placeholder={`나만의 여행앨범을 완성해 보세요!  

Tip) 자물쇠를 통해 여행록을 우리 모임만 보게 하거나  
다른 이웃들이 볼 수 있게 설정할 수 있어요.`}
          style={{ height: "200px" }}
        />
        <div className="travelgroup-container">
          <img src="-" alt="content-img" className="travelgroups-list-view-content-img" />
        </div>
      </div>
    </div>
  );
}
