"use client";

import "@/styles/travelgroups/travelgroups-style.css";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Home = () => {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/travelgroups/travel/random');
        }, 3000);

        const aElement = document.getElementById('a');
        if (aElement) {
            aElement.style.animation = 'rotate 4s linear infinite';
        }

        const dots = document.querySelectorAll<HTMLElement>('.random-dot');
        dots.forEach((dot, index) => {
            dot.style.animation = `dot-blink 1s ${index * 0.5}s linear infinite`;
        });

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div style={{ marginTop: '100px' }}>
            <div className="travelgroup-container">
                <img id="a" src="/travelgroups/random.svg" alt="random" />
                <div className="random-dot-container">
                    <div className="random-dot"></div>
                    <div className="random-dot"></div>
                    <div className="random-dot"></div>
                </div>
                <span className='regular' style={{ fontSize: '14px', textAlign: 'center', marginTop: '40px' }}>
                    잠시만요 ! 모임에 딱 맞는 여행지를 찾고 있어요
                </span>
            </div>
        </div>
    );
};

export default Home;