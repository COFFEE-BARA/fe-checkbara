import React, { useState, useEffect } from 'react';
import { GradientBg1 } from "../icons/GradientBg1/GradientBg1.jsx";
import { useLocation } from 'react-router-dom'; // useLocation 추가
import '../css/section.css';
import '../css/index.css';

function ResultSection({data, loading}) {
    const stockButton = (isbn) => {
        return `/book/${isbn}/stock`;
    };

    const borrowButton = (isbn) => {
        return `/book/${isbn}/lending-library`;
    };

    return (
        <>
            <div className="bgrectangle">
                <div className="result-wrapper">
                    {loading ? (
                        <div>데이터를 로딩 중입니다...</div>
                    ) : (
                        <>
                            {data && data.length > 0 && (
                                <section>
                                    {data.map((item, index) => (
                                        <div key={index} className="source-isbn">
                                            <img src={item.ImageURL ? item.ImageURL : "../img/notFound.png"} alt="Thumbnail" className="thumbnail" />
                                            <div className="source-details">
                                                <div className="title">
                                                    <a href={item.ISBN} target="_blank" rel="noopener noreferrer">{item.Title}</a>
                                                </div>
                                                <p className="author">{item.Author}</p>
                                                <p className="price">{Number(item.Price).toLocaleString()}원</p>
                                                <div className="stock-button" onClick={() => window.location.href = stockButton(item.ISBN)}>재고</div>
                                                <div className="borrow-button" onClick={() => window.location.href = borrowButton(item.ISBN)}>대출</div>
                                            </div>
                                        </div>
                                    ))}
                                </section>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default ResultSection;