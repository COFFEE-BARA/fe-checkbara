import React, { useState, useEffect } from "react";
import { GradientBg1 } from "../icons/GradientBg1/GradientBg1.jsx";
import "../css/recommend.css";
import "../css/RecommendDefault.css";

function RecommendChat() {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const fetchedData = [
        {
            "Title": "파이썬",
            "ImageURL": "https://shopping-phinf.pstatic.net/main_3250509/32505092162.20221101113257.jpg",
            "ISBN": "9791158391461",
            "Price": "0",
            "Author": "조대표"
        }
    ];

    const apiKey = '';
    const apiEndpoint = 'https://api.openai.com/v1/chat/completions'; //바꾸기
    const isbn = '1234';
    const lati = '5678';
    const long = '910';

    // API에서 데이터를 가져오는 함수
    const fetchData = async () => {
        try {
            const response = await fetch('API 엔드포인트');
            const data = await response.json();
            setData(data); // 데이터 설정
        } catch (error) {
            console.error('데이터를 불러오는 중 오류 발생:', error);
        }
    };

    // 컴포넌트가 마운트될 때 데이터를 가져오도록 설정
    useEffect(() => {
        setData(fetchedData); //나중에 fetchData로 수정해야할듯
    }, []);

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
                            <div className='union'></div>
                            <input
                                type='text'
                                className="recommend-input"
                                placeholder='검색할 내용을 입력해주세요'
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
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
                    <div className="user-chat-box">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`} style={{ margin: '10px 20px' }}>
                                {msg.sender === 'user' && msg.message}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="chatbot-2nd-box" />
                <p className="chatbot-rank-title-element">
                    <span className="span">2위 | </span>
                    <span className="chatbot-2nd-text">무슨 증명</span>
                </p>
                <div className="chatbot-chat-box">
                    {data.map((item, index) => (
                        <div key={index} className="chatbot-1st-rank">
                            <img src={item.ImageURL ? item.ImageURL : "../img/notFound.png"} alt="book-image" className="book-image" />
                            <div>
                                <p className="chatbot-1st-title">제목 | {item.Title}</p>
                                <p className="chatbot-1st-author">저자 | {item.Author}</p>
                            </div>
                        </div>
                    ))}
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
                </div>
                <p className="chatbot-text">{messages[messages.length - 1]?.sender === 'bot' ? messages[messages.length - 1]?.message : '응답을 받아오는 중 에러가 발생했습니다.'}</p>
            </div>
        </>
    );
};

export default RecommendChat;
