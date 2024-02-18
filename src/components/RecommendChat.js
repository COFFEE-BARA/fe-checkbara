import React, { useState } from "react";
import { GradientBg1 } from "../icons/GradientBg1/GradientBg1.jsx";
import "../css/recommend.css";
import "../css/RecommendDefault.css";

const RecommendChat = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);

    const apiKey = '';
    const apiEndpoint = 'https://api.openai.com/v1/chat/completions'; //바꾸기
    const isbn = '1234';
    const lati = '5678';
    const long = '910';

    const addMessage = (sender, message) => {
        setMessages(prevMessages => [...prevMessages, { sender, message }]);
    };

    const handleSendMessage = async () => {
        const message = userInput.trim();
        if (message.length === 0) return;

        addMessage('user', message);
        setUserInput('');
        setLoading(true);

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: 'kdhyun08__taaco_sts',
                    messages: [{ role: 'user', content: message }],
                    max_tokens: 1365,
                    stop: ['문장 생성 중단 단어'],
                }),
            });

            const data = await response.json();
            const aiResponse = data.choices?.[0]?.message?.content || 'No response';
            addMessage('bot', aiResponse);
        } catch (error) {
            console.error('오류 발생', error);
            addMessage('오류 발생');
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
        window.location.href = '/mainpage';
    };

    const handleDetailButtonClick = (isbn) => {
        window.location.href = `/api/book/${isbn}/detail`;
    };

    const handleStockButtonClick = (isbn) => {
        window.location.href = `/api/book/${isbn}/stock`;
    };

    const handleBorrowButtonClick = (isbn) => {
        window.location.href = `/api/book/${isbn}/lending-library?lat=${lati}&lon=${long}`;
    };

    return (
        <>
            <div id='App'>
                <div className="overlap-group-wrapper">
                    <div className="chevron-left" onClick={clickLeftButton}></div>
                    <div className="index">
                        <div className="head-text">AI에게 책 추천받기</div>
                        <div className="bgrectangle">
                            <div className='recommend'>
                                {messages.map((msg, index) => (
                                    <div key={index} className={`message ${msg.sender}`}>
                                        {`${msg.sender === 'user' ? '나' : '챗봇'} : ${msg.message}`}
                                    </div>
                                ))}
                                <div className='union'></div>
                                <input
                                    type='text'
                                    class="recommend-input"
                                    placeholder='검색할 내용을 입력해주세요'
                                    value={userInput} onChange={(e) => setUserInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                                <div className="scan-wrapper" onClick={handleSendMessage}>
                                    <img
                                        className="scan"
                                        alt="Scan"
                                        src=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="user-chat-wrapper">
                        <div className="user-chat-box">{userInput}</div>
                    </div>
                    <div className="chatbot-2nd-box" />
                    <p className="chatbot-rank-title-element">
                        <span className="span">2위 | </span>
                        <span className="chatbot-2nd-text">무슨 증명</span>
                    </p>
                    <div className="chatbot-chat-box" />
                    <p className="chatbot-1st-rank">
                        <span className="chatbot-1st-title">제목 | </span>
                        <span className="text-wrapper-4">
                            {" "}
                            <br />
                        </span>
                        <span className="span"> </span>
                        <span className="text-wrapper-4"></span>
                    </p>

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
                    </div>
                    <p className="chatbot-text">최진영 작가는 증명을 너무 잘해서 구를 쿠우쿠우로 증명한 책을 추천합니다.</p>
                </div>
            </div>
        </>
    );
};

export default RecommendChat;
