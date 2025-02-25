import Header from "../../../header";
import "@/styles/travelgroups/travelgroups-style.css";


export default function Home() {
    return (
        <div>
            <Header text="여행지 설정" icon="back"></Header>

            <div className="travelgroup-container"><div className="search-bar">
                <img src="/travelgroups/search.svg" alt="search" style={{ width: '17.49px', margin: '0 15px 0 15px' }} />
                <input style={{ color: '#490085', width: '80%' }}></input>
            </div></div>



        </div>
    );
}