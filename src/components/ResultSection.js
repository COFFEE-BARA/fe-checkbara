import React, { useState, useEffect, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // useLocation 추가
import "../css/section.css";
import "../css/index.css";

function ResultSection({ data, loading }) {
  const navigate = useNavigate();
  const stockButton = (isbn, price) => {
    return `/book/${isbn}/${price}/bookstore`;
  };

  const borrowButton = isbn => {
    return `/book/${isbn}/library`;
  };

  const moveToDetail = isbn => {
    navigate(`/detailpage/${isbn}`);
  };

  return (
    <>
      <div className="bgrectangle">
        <div className="result-wrapper">
          {/* {loading ? (
            <div>데이터를 로딩 중입니다...</div>
          ) : ( */}
            <>
              {data && data.length > 0 ? (
                <section>
                  {data.map((item, index) => (
                    <div key={index} className="source-isbn">
                      <img
                        src={item.image ? item.image : "../img/notFound.png"}
                        alt="Thumbnail"
                        className="thumbnail"
                        onClick={() => moveToDetail(item.isbn)}
                      />
                      <div className="source-details">
                        <div className="title" onClick={() => moveToDetail(item.isbn)}>
                          {item.title}
                        </div>
                        <p className="author" onClick={() => moveToDetail(item.isbn)}>
                          {item.author.replace(/\^/g, ", ")}
                        </p>
                        <p className="price" onClick={() => moveToDetail(item.isbn)}>
                          {Number(item.price) !== 0 ? Number(item.price).toLocaleString() + "원" : "정보 없음"}
                        </p>
                      </div>
                      <div className="button-wrapper">
                        <div className="stock-button" onClick={() => (window.location.href = stockButton(item.isbn, parseFloat(item.price).toFixed(0)))}>
                          재고
                        </div>
                        <div className="borrow-button" onClick={() => (window.location.href = borrowButton(item.isbn))}>
                          대출
                        </div>
                      </div>
                    </div>
                  ))}
                </section>
              ) : (
                <div>원하는 책을 검색해 보세요!</div>
              )}
            </>
          {/* )} */}
        </div>
      </div>
    </>
  );
}

export default ResultSection;
