import "@/styles/travelgroups/travelgroups-style.css";

export default function TravelListView({ travelList }: { travelList: any[] }) {
    return (
        <div>

            {travelList.map((travel) => (
                <div className="travel-list-view" key={travel.trIdx}>
                    <div className="travel-list-view-text">
                        <span>{travel.ldName} {travel.lsName}</span>
                        <img src="/travelgroups/delete.svg" alt="delete" style={{ width: '8px' }} />
                    </div>

                    {travel.tlImgList.length === 0 && (
                        <div className="travel-list-img-view">
                            <img className="travel-list-img" src="/travelgroups/travelView.png" alt="travelImg" style={{width: '318px'}}/>                            
                            
                        </div>
                    )}

                    {travel.tlImgList.length === 1 && (
                        <div className="travel-list-img-view">
                            <img className="travel-list-img" src={travel.tlImgList[0]} alt="travelImg" />
                            <img className="travel-list-img" src="/travelgroups/travelView.png" alt="travelImg" />
                        </div>
                    )}

                    {travel.tlImgList.length > 1 && (
                        <div className="travel-list-img-view">
                            {travel.tlImgList.map((img: string) => (
                                <img className="travel-list-img" src={img} alt="travelImg" key={img} />
                            ))}
                        </div>
                    )}

                    <div className="travelgroup-container">
                        <div className="travel-list-img-bar"></div>
                    </div>
                </div>
            ))}

            <br />
            <br />



        </div>
    );
}
