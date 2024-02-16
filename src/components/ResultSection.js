import React from 'react';
import { GradientBg1 } from "../icons/GradientBg1/GradientBg1.jsx";
import '../css/section.css';
import '../css/index.css';

function ResultSection({ data }) {
    const stockButton = (isbn) => {
        return '/book/${isbn}/stock';
    };
    
    const borrowButton = (isbn) => {
        return '/book/${isbn}/lending-library';
    };

    console.log("Data:", data); // 데이터 확인용 콘솔 로그

    return (
        <>
            <div className="result-wrapper">
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
                                    <p className="price">{item.Price}</p>
                                    <button onClick={() => window.location.href = stockButton(item.ISBN)}>재고</button>
                                    <button onClick={() => window.location.href = borrowButton(item.ISBN)}>대출</button>
                                </div>
                            </div>
                        ))}
                    </section>
                ) : (
                    <div>데이터가 없습니다.</div>
                )}
            </div>
        </>
    );
}

export default ResultSection;
