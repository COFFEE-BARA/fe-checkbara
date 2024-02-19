import React, { useState, useEffect } from "react";
import {ClipLoader} from "react-spinners";
import { GradientBg1 } from "../icons/GradientBg1/GradientBg1.jsx";
import "../css/recommend.css";
import "../css/RecommendDefault.css";
import { useLocation, useNavigate } from "react-router-dom";
import {useRecoilState} from "recoil";
import {chatMessages} from "../atom/chatMessages"
import axios from "axios";


function RecommendChat() {
  const [messages, setMessages] = useRecoilState(chatMessages);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { state } = useLocation();
  const navigate=useNavigate()


  useEffect(()=>{
    if(messages.length==0){state&&setMessages(state)}
  },[])
  
  
  const lati = "5678";
  const long = "910";

  // API에서 데이터를 가져오는 함수
  const fetchData = async () => {
    try {
      const response = await fetch("API 엔드포인트");
      const data = await response.json();
      setData(data); // 데이터 설정
    } catch (error) {
      console.error("데이터를 불러오는 중 오류 발생:", error);
    }
  };
  
  const apiEndpoint = 'https://3cggt0xn0b.execute-api.ap-northeast-2.amazonaws.com/check-bara/api/book/recommendation';

  const addMessage = (sender, message) => {
    setMessages(prevMessages => [...prevMessages, { sender, message }]);
  };
  
  async function postData(query) {
    console.log(query)
    const data = await axios.post(apiEndpoint, { query:query});
    
    return data.data.data.recommendedBookList;
  }


const handleSendMessage = async () => {
    const message = userInput.trim();
    if (message.length === 0) return;

    addMessage('user', message);
    setUserInput('');
    setLoading(true);

    try {
      const data=await postData(userInput)
      
      addMessage('bot', data);
    } catch (error) {
      console.error('오류 발생', error);
      addMessage('bot', '오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };


  const clickLeftButton = () => {
    window.location.href = "/mainpage";
  };

  const handleDetailButtonClick = isbn => {
    navigate (`/detailpage/${isbn}`);
  };

  const handleStockButtonClick = isbn => {
    window.location.href = `/api/book/${isbn}/stock`;
  };

  const handleBorrowButtonClick = isbn => {
    window.location.href = `/api/book/${isbn}/lending-library?lat=${lati}&lon=${long}`;
  };


  const moveToDetail = isbn => {
    navigate(`/detailpage/${isbn}`);
  };

  if(loading){
    return (
      <>
        <div className="chevron-left"></div>
        <div className="bgrectangle">
          <div className="loading">
            <h1>챗봇의 추천을 받아오는 중입니다</h1>
            <ClipLoader color="#c89cff" height={15} width={15} margin={30} />
          </div>
        </div>
        <div className="head-text">AI에게 책 추천받기</div>
      </>
    );
  }

  return (
    <>
      <div id="App">
        <div className="overlap-group-wrapper">
          <div className="chevron-left" onClick={clickLeftButton}></div>
          <div className="index">
            <div className="head-text">AI에게 책 추천받기</div>
            <div className="bgrectangle">
              {messages?.length>0&&messages.map((msg, index) => {
                return (
                  <div key={index}>
                    {msg.sender === "user" && (
                      <div className="user-chat-wrapper">
                        <div className="user-chat-box">
                          <div className={`message ${msg.sender}`} style={{ margin: "10px 20px" }}>
                            {msg.message}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="total-bots">
                    {msg.sender === "bot" && (
                      <>
                        {msg.message?.map((message, idx) => {
                          return (
                            <div key={idx} onClick={()=>moveToDetail(message.isbn)}>
                              {idx === 0 ? (
                                <div className="chatbot-chat-box">
                                  <div key={index} className="chatbot-1st-rank">
                                    <div className="book-content-wrapper">
                                    <img
                                      src={message.image ? message.image : "../img/notFound.png"}
                                      alt="book-image"
                                      className="book-image-chat"
                                    />
                                    <div>
                                      <p className="chatbot-1st-title">제목 | {message.title}</p>
                                      <p className="chatbot-1st-author">저자 | {message.author.replace(/\^/g, ", ")}</p>
                                    </div>
                                    </div>

                                    <div className="button-group">
                                      <div className="chat-button" onClick={() => handleDetailButtonClick(message.isbn)}>
                                        상세정보
                                      </div>
                                      <div className="chat-button" onClick={() => handleStockButtonClick(message.isbn)}>
                                        서점재고
                                      </div>
                                      <div className="chat-button" onClick={() => handleBorrowButtonClick(message.isbn)}>
                                        대출여부
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                idx < 4 && (
                                  <>
                                    <div className="chatbot-2nd-box">
                                    {idx + 1}위 | {message.title}
                                    </div>
                                  </>
                                )
                              )}
                            </div>
                          );
                        })}
                      </>
                    )}
                    </div>
                  </div>
                );
              })}

              <div className="scan-wrapper" onClick={handleSendMessage}>
                <img className="scan" alt="Scan" src="" />
              </div>
              <div className="union"></div>
              <input
                type="text"
                className="recommend-input"
                placeholder="검색할 내용을 입력해주세요"
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        </div>

        {/* 유저 질문 */}
        {/* <div className="user-chat-wrapper">
          <div className="user-chat-box">
            {state.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`} style={{ margin: "10px 20px" }}>
                {msg.sender === "user" && msg.message}
              </div>
            ))}
          </div>
        </div> */}

        {/* 책 추천 */}
        {/* <div className="chatbot-2nd-box" />
        <p className="chatbot-rank-title-element">
          <span className="span">2위 | </span>
          <span className="chatbot-2nd-text">무슨 증명</span>
        </p>
        <div className="chatbot-chat-box">
          {state.map((msg, index) => {
            console.log(msg);
            return (
              <>
                {msg.sender === "bot" && (
                  <div key={index} className="chatbot-1st-rank">
                    <img
                      src={msg.ImageURL ? msg.ImageURL : "../img/notFound.png"}
                      alt="book-image"
                      className="book-image"
                    />
                    <div>
                      <p className="chatbot-1st-title">제목 | {msg.Title}</p>
                      <p className="chatbot-1st-author">저자 | {msg.Author}</p>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
        <div className="button-group">
          <div className="detail-rect" onClick={() => handleDetailButtonClick(isbn)}>
            <div className="detail-text">상세정보</div>
          </div>
          <div className="stock-rect" onClick={() => handleStockButtonClick(isbn)}>
            <div className="stock-text">서점재고</div>
          </div>
          <div className="borrow-rect" onClick={() => handleBorrowButtonClick(isbn)}>
            <div className="borrow-text">대출여부</div>
          </div>
        </div> */}
        {/* 여기까지 */}

        {/* <p className="chatbot-text">
          {messages[messages.length - 1]?.sender === "bot"
            ? messages[messages.length - 1]?.message
            : "응답을 받아오는 중 에러가 발생했습니다."}
        </p> */}
      </div>
    </>
  );
}

export default RecommendChat;
