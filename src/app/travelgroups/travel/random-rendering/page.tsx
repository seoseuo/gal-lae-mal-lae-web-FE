import "@/styles/travelgroups/travelgroups-style.css";


export default function Home() {
    return (
        <div>

            <br />
            <br />
            <br />
            <div className="travelgroup-container">
                <img src="/travelgroups/random.svg" alt="random" />

                <div className="random-dot-container">
                    <div className="random-dot">
                    </div>
                    <div className="random-dot">
                    </div>
                    <div className="random-dot">
                    </div>
                </div>
                <br />
                <br />
                <span className='regular' style={{ fontSize: '14px', textAlign: 'center' }}>
                    잠시만요 ! 모임에 딱 맞는 여행지를 찾고 있어요
                </span>


            </div>
        </div>
    );
}