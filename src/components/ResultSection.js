import React, { useState, useEffect } from 'react';
import { GradientBg1 } from "../icons/GradientBg1/GradientBg1.jsx";
import { useLocation } from 'react-router-dom'; // useLocation 추가
import '../css/section.css';
import '../css/index.css';

function ResultSection() {
    const [loading, setLoading] = useState(true);
    const location = useLocation(); // useLocation 훅 사용

    const stockButton = (isbn) => {
        return `/book/${isbn}/stock`;
    };

    const borrowButton = (isbn) => {
        return `/book/${isbn}/lending-library`;
    };

    useEffect(() => {
        // 데이터가 로드되면 로딩 상태를 false로 변경
        const data = location.state?.data; // location에서 data 받아오기
        if (data) {
            setLoading(false);
        }
    }, [location]);

    const data = location.state?.data; // location에서 data 받아오기

    console.log("Data:", data); // 데이터 확인용 콘솔 로그

    return (
        <>
            <div className="bgrectangle">
                <div className="result-wrapper">
                    {loading ? (
                        <div>데이터를 로딩 중입니다...</div>
                    ) : (
                        <>
                            {data && data.length > 0 ? (
                                <section>
                                    {data.map((item, index) => (
                                        <div key={index} className="source-isbn">
                                            <img src={item.ImageURL ? item.ImageURL : "../img/notFound.png"} alt="Thumbnail" className="thumbnail" />
                                            <div className="source-details">
                                                <p className="title">
                                                    <a href={item.ISBN} target="_blank" rel="noopener noreferrer">{item.Title}</a>
                                                </p>
                                                <p className="author">{item.Author}</p>
                                                <p className="price">{Number(item.Price).toLocaleString()}원</p>
                                                <div className="stock-button" onClick={() => window.location.href = stockButton(item.ISBN)}>재고</div>
                                                <div className="borrow-button" onClick={() => window.location.href = borrowButton(item.ISBN)}>대출</div>
                                            </div>
                                        </div>
                                    ))}
                                </section>
                            ) : (
                                <div>데이터가 없습니다.</div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default ResultSection;