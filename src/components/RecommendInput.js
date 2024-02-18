import React, { useState } from "react";
import { GradientBg1 } from "../icons/GradientBg1/GradientBg1.jsx";
import "../css/recommend.css";
import "../css/RecommendDefault.css";


const RecommendInput = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);

    const apiKey = '';
    const apiEndpoint = 'https://api.openai.com/v1/chat/completions'; //바꾸기

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


    return (
        <>
            <div id='App'>
                <div className="overlap-group-wrapper">
                <div className="chevron-left" onClick={clickLeftButton}></div>
                    <div className="index">
                    <div className="head-text">AI에게 책 추천받기</div>
                    <div className="user-chat-wrapper"></div>
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
                    <img
                        className="user-chat-box"
                        alt="Rectangle"
                        src="https://cdn.animaapp.com/projects/65c654a881257e46c59d2046/releases/65c674f661a7c21531072443/img/rectangle-2044.png"
                    />
                    <div className="user-chat-box-rect" />
                    <div className="chatbot-2nd-box-rect" />
                    <div className="chatbot-2nd-box" />
                    <p className="chatbot-rank-title-element">
                        <span className="span">2위 | </span>
                        <span className="chatbot-2nd-text">무슨 증명</span>
                    </p>
                    <div className="rectangle-7" />
                    <div className="rectangle-8" />
                    <div className="rectangle-9" />
                    <div className="chatbot-chat-box" />
                    <div className="chatbot-chat-box-rect" />
                    <p className="chatbot-1st-rank">
                        <span className="span">제목 | </span>
                        <span className="text-wrapper-4">
                            {"구의 증명 "}
                            <br />
                        </span>
                        <span className="span">저자 | </span>
                        <span className="text-wrapper-4">최진영</span>
                    </p>
                    <div className="detail-rect" />
                    <div className="stock-rect" />
                    <div className="detail-text">상세정보 보기</div>
                    <div className="stock-text">주변 서점 재고확인하기</div>
                    <p className="chatbot-text">최진영 작가는 증명을 너무 잘해서 구를 쿠우쿠우로 증명한 책을 추천합니다.</p>
                </div>
            </div>
        </>
    );
};

export default RecommendInput;
