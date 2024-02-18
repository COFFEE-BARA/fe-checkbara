import React, { useState } from "react";
import { GradientBg1 } from "../icons/GradientBg1/GradientBg1.jsx";
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
          max_tokens: 1365, // 답변 최대 글자 수, 
          top_p: 1, // 다음 단어를 선택할 때 상위 p%의 확률 분포를 사용하는 매개변수, 높을수록 안정된 선택
          temperature: 1, // 답변의 다양성과 창의성, 낮을수록 일관적 (0~2)
          frequency_penalty: 0.5, // 전문적 단어의 빈도, 낮을수록 전문적 (0~1)
          presence_penalty: 0.5, // 반복되는 구문 억제, 낮을수록 억제하지 않음 (0~1)
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
        <div className="index">
          <div className="overlap-group-wrapper-default">
          <GradientBg1 className="gradient-BG" />
            <div className="overlap-group">
              <div className="rectangle" />
              <div className="chevron-left" onClick={clickLeftButton}></div>
              <div className="head-text">AI에게 책 추천받기</div>
              <div className="bgrectangle">
                <p className="example-text">질문 예시입니다</p>
                <div className="example-rect" />
                <p className="p">도커에 대한 정보도 친절하게 설명이 되어 있는 쿠버네티스 입문 책 추천해줘</p>

                <div className="example-rect2" />
                <p className="p2">쿠우쿠우 많이 먹을 수 있는 방법이 나와있는 책 추천해줘</p>

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
        </div>
      </div>
    </>
  );
};

export default RecommendInput;