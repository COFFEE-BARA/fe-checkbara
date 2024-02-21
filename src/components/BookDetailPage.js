import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import "../css/BookDetailPage.css";
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

  const stockButton = isbn => {
    return `/book/${isbn}/bookstore`;
  };

  const handleBookstoreStockButtonClick = () => {
    navigate(stockButton(detail.isbn)); 
  };

  const borrowButton = isbn => {
    return `/book/${isbn}/library`;
  };

  const handleLibraryStockButtonClick = () => {
    navigate(borrowButton(detail.isbn)); 
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <>
      {detail && (
        <body>
          <header class="book-info1">
            <div className="back-button" onClick={onClickBackButton}/>
            <div class="book-title-author">
              <div class="book-title">{detail.title}</div>
              <div class="book-author">{detail.authore}</div>
            </div>
          </header>
          <main>
            <div class="book-info2">
              <div class="book-image">
                <img src={detail.image} />
              </div>
              <div class="book-info2-child">
                <div class="book-publisher">
                  <div class="book-publisher1">{detail.publisher}</div>
                  <div class="book-publisher2">출판사</div>
                </div>
                <div class="book-date">
                  <div class="book-date1">{detail.publishingDate.slice(2).replace(/-/g, '')}</div>
                  <div class="book-date2">출간일</div>
                </div>
                <div class="book-price">
                  <div class="book-price1">{Number(detail.price) !==0 ? Number(detail.price).toLocaleString()+ "원" : "정보 없음"}</div>
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
                  {detail.tableOfContents}
                </div>
              </div>
              <div class="book-review">
                <h3 class="book-reivew1">출판사 서평</h3>
                <div class="book-reivew2">{detail.publisherBookReview}</div>
              </div>
            </div>
          </main>
          <div className="footer-box">
            <footer>
              <div class="bookstore-stock-button" onClick={(handleBookstoreStockButtonClick)}>서점 재고</div>
              <div class="library-stock-button" onClick={(handleLibraryStockButtonClick)}>도서관 재고</div>
              <div class="sales-link-button"><a href={detail.purchaseURL}>판매 링크</a></div>
            </footer>
          </div>
        </body>
      )}
    </>
  );
}
export default BookDetailPage;
