import React, { useState } from "react";
import { GradientBg1 } from "../icons/GradientBg1/GradientBg1.jsx";
import "../css/recommend.css";

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
                  model: 'gpt-3.5-turbo', //바꾸기
                  messages: [{ role: 'user', content: message }],
                  max_tokens: 1024, // 답변 최대 글자 수, 
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


  return (
    <>
    <div id='App'>
         <div className='recommend'>
            {messages.map((msg, index) => (
               <div key={index} className={`message ${msg.sender}`}>
                  {`${msg.sender === 'user' ? '나' : '챗봇'} : ${msg.message}`}
               </div>
            ))}
         </div>
         <div className='inputDiv'>
            <input
               type='text' placeholder='검색할 내용을 입력해주세요'
               value={userInput} onChange={(e) => setUserInput(e.target.value)}
               onKeyDown={handleKeyDown}
            />
            <div className = "scan-wrapper" onClick={handleSendMessage}>
            <img
                className="scan"
                alt="Scan"
                src=""
              />
            </div>
         </div>
      </div>


    <div className="index">
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <div className="rectangle" />
          <div className="user-chat-wrapper"></div>
          <img
            className="union"
            alt="Union"
            src="https://cdn.animaapp.com/projects/65c654a881257e46c59d2046/releases/65c66a91aeea4e0fd74766d7/img/union.svg"
          />
          <img
            className="line"
            alt="Line"
            src="https://cdn.animaapp.com/projects/65c654a881257e46c59d2046/releases/65c66a91aeea4e0fd74766d7/img/line-2.svg"
          />
          <div className="div">검색할 내용을 입력해주세요</div>
          <div className="text-wrapper-2">AI에게 책 추천받기</div>
          <img
            className="img"
            alt="Rectangle"
            src="https://cdn.animaapp.com/projects/65c654a881257e46c59d2046/releases/65c674f661a7c21531072443/img/rectangle-2044.png"
          />
          <div className="rectangle-2" />
          <div className="rectangle-3" />
          <div className="rectangle-4" />
          <div className="rectangle-5" />
          <p className="element">
            <span className="span">2위</span>
            <span className="text-wrapper-4"> | 무슨 증명</span>
          </p>
          <div className="rectangle-6" />
          <div className="rectangle-7" />
          <p className="p">
            <span className="span">3위</span>
            <span className="text-wrapper-4"></span>
          </p>
          <div className="rectangle-8" />
          <div className="rectangle-9" />
          <p className="element-2">
            <span className="span">4위</span>
            <span className="text-wrapper-4"> | 무슨 증명</span>
          </p>
          <div className="rectangle-10" />
          <div className="rectangle-11" />
          <p className="div-2">
            <span className="span">제목</span>
            <span className="text-wrapper-4">
              {" "}
              | 구의 증명
              <br />
            </span>
            <span className="span">저자</span>
            <span className="text-wrapper-4"> | 최진영</span>
          </p>
          <div className="rectangle-12" />
          <div className="rectangle-13" />
          <div className="text-wrapper-5">상세정보 보기</div>
          <div className="text-wrapper-6">주변 서점 재고확인하기</div>
          <img
            className="qoo-image"
            alt="Qoo image"
            src="https://cdn.animaapp.com/projects/65c654a881257e46c59d2046/releases/65c654e3cea0d4810c2d3337/img/qoo-image-1.png"
          />
          <p className="text-wrapper-7">최진영 작가는 증명을 너무 잘해서 구를 쿠우쿠우로 증명한 책을 추천합니다.</p>
          <div className="frame">
            <div className="scan-wrapper">
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
    </>
  );
};

export default RecommendInput;
