import "../../styles/travelgroups/travelgroups-style.css";
import { useRouter } from 'next/navigation';

export default function TravelgroupListView({ travelGroupList }: { travelGroupList: any[] }) {
    const router = useRouter();
    const NEXT_PUBLIC_UPLOAD_PATH = process.env.NEXT_PUBLIC_UPLOAD_PATH;
    return (
        <div>
            {
                travelGroupList.map((group) => (
                    <div key={group.grIdx} onClick={() => {
                        router.push(`/travelgroups/get`);
                        localStorage.setItem('grIdx', group.grIdx.toString());
                    }}>
                        <div className="travelgroup-list-view-container" style={{ cursor: 'pointer', minWidth: '400px' }}>
                            <div style={{ flex: '0 0 121px' }}>
                                <img className="travelgroup-list-view-img" src={`${NEXT_PUBLIC_UPLOAD_PATH}${group.grProfile}`} alt={group.grName} />
                            </div>
                            <div className="travelgroup-list-view-tag-container" style={{ flex: 1, minWidth: 0 }}>
                                <div className="bold" style={{ fontSize: "20px", color: "#490085" }}>{group.grName}</div>
                                <div style={{ marginTop: '20px' }}></div>
                                <div className="travelgroup-list-view-tag">{group.grCount}명</div>
                                {group.grLdList && group.grLdList.length > 0 && (
                                    <div className="travelgroup-list-view-tag-row" style={{
                                        overflowX: 'auto',
                                        whiteSpace: 'nowrap',
                                        width: '100%',
                                        display: 'flex',
                                        gap: '5px'
                                    }}>
                                        {group.grLdList.map((item: string, index: number) => (
                                            <div className="travelgroup-list-view-tag" key={index} style={{flexShrink: 0}}>{item}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}