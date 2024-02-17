import React, { useState, useCallback, useEffect } from 'react';
import { GradientBg1 } from "../icons/GradientBg1/GradientBg1.jsx";
import { useNavigate } from 'react-router-dom';
import '../css/section.css';
import '../css/index.css';

function InputSection() {
    const [curKeywords, setCurKeywords] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const navigate = useNavigate(); // useNavigate 밖에서 호출

    const data = {
        source: [
            {
                "Title": "파이썬으로 배우는 알고리즘 트레이딩 (내 손으로 만드는 자동 주식 거래 시스템)",
                "ImageURL": "https://shopping-phinf.pstatic.net/main_3250509/32505092162.20221101113257.jpg",
                "ISBN": "9791158391461",
                "Price": "0",
                "Author": "조대표"
            },
            {
                "Title": "포인트 도해식 RFID",
                "ImageURL": "https://shopping-phinf.pstatic.net/main_3246655/32466553474.20220519215347.jpg",
                "ISBN": "9788958324263",
                "Price": "18000",
                "Author": "찾을 수 없음"
            },
            {
                "Title": "포인트 도해식 RFID",
                "ImageURL": "https://shopping-phinf.pstatic.net/main_3246655/32466553474.20220519215347.jpg",
                "ISBN": "9788958324263",
                "Price": "18000",
                "Author": "찾을 수 없음"
            },
            {
                "Title": "정보통신관련 국제기구 지식정보원",
                "ImageURL": "https://shopping-phinf.pstatic.net/main_3343597/33435978815.20221019123623.jpg",
                "ISBN": "9788926802304",
                "Price": "24300",
                "Author": "노영희"
            },
            {
                "Title": "다시 쓰는 통계분석 구조방정식모델분석",
                "ImageURL": "https://shopping-phinf.pstatic.net/main_3250589/32505895771.20221230071305.jpg",
                "ISBN": "9791196130329",
                "Price": "34200",
                "Author": "김원표"
            },
        ]
    };

    const handleKeyup = useCallback((e) => {
        if (e.key === "Enter") {
            e.preventDefault();

            console.log("Enter key pressed");

            const filteredData = data.source.filter(item =>
                item.Title.toLowerCase().includes(curKeywords.toLowerCase())
            );
            setSearchResult(filteredData.length > 0 ? filteredData : null); // 일치하는 데이터가 없으면 null로 설정
            console.log("Search Result:", filteredData);

            // navigate 함수 호출
            navigate('/resultsection', { state: { data: filteredData } });
        }
    }, [curKeywords, data.source, navigate]);

    const clickLeftButton = () => {
        window.location.href = '/mainpage'; 
    };

    return (
        <>
            <div className="bgrectangle"></div>
            <div className="index"></div>
            <div className="overlap-wrapper">
                <div className="overlap">
                    <div className="overlap-group">
                        <GradientBg1 className="gradient-BG" />
                        <div className="cur-keywords">
                            <div id="App">
                                <main>
                                    <div className="input-wrapper">
                                        <div className="chevron-left" onClick={clickLeftButton}>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="검색할 내용을 입력하세요"
                                            onKeyUp={handleKeyup}
                                            value={curKeywords}
                                            onChange={(e) => setCurKeywords(e.target.value)}
                                        />
                                    </div>
                                </main>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InputSection;
