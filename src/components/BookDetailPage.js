import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import "../css/BookDetailPage.css";
import image from "../images/book-image.png";
import axios from "axios";

function BookDetailPage() {
  const navigate = useNavigate();
  const onClickBackButton = () => {
    navigate(-1);
  };
  const { isbn } = useParams();
  const [detail, setDetail] = useState();

  async function getDetail() {
    const url = `https://3cggt0xn0b.execute-api.ap-northeast-2.amazonaws.com/check-bara/api/book/${isbn}/detail`;

    const data = await axios.get(url);

    setDetail(data.data.data);
  }

  useEffect(() => {
    getDetail();
  }, []);
  
  return (
    <>
      {detail && (
        <body>
          <header class="book-info1">
            <button onClick={onClickBackButton}>{"<"}</button>
            <div class="book-title-author">
              <div class="book-title">{detail.title}</div>
              <div class="book-author">{detail.authore}</div>
            </div>
          </header>
          <main>
            <div class="book-info2">
              <div class="book-image">
                <img src={image} />
              </div>
              <div class="book-info2-child">
                <div class="book-publisher">
                  <div class="book-publisher1">{detail.publisher}</div>
                  <div class="book-publisher2">출판사</div>
                </div>
                <div class="book-date">
                  <div class="book-date1">{detail.publishingDate}</div>
                  <div class="book-date2">출간일</div>
                </div>
                <div class="book-price">
                  <div class="book-price1">{detail.price}</div>
                  <div class="book-price2">가격</div>
                </div>
              </div>
            </div>
            <div class="book-info3">
              <div class="book-review">
                <h3 class="book-reivew1">책 소개</h3>
                <div class="book-reivew2">{detail.introduction}</div>
              </div>
              <div class="book-agenda">
                <h3 class="book-agenda1">목차</h3>
                <div class="book-agenda2">
                  {/* 1. 구<br/>
                                2. 의<br/>
                                3. 증<br/>
                                4. 명<br/>
                                5. 구<br/>
                                6. 의<br/>
                                7. 증<br/>
                                8. 명<br/> */}
                  {detail.publisherBookReview}
                </div>
              </div>
            </div>
          </main>
          <footer>
            <div class="bookstore-stock-button">서점 재고</div>
            <div class="library-stock-button">도서관 재고</div>
            <div class="sales-link-button">판매 링크</div>
          </footer>
        </body>
      )}
    </>
  );
}
export default BookDetailPage;
