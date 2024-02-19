import React, { useState,useEffect } from "react";
import { GradientBg1 } from "../icons/GradientBg1/GradientBg1.jsx";
import "../css/RecommendDefault.css";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import {useRecoilState} from "recoil";
import {chatMessages} from "../atom/chatMessages"

const RecommendInput = () => {
  const [messages, setMessages] = useRecoilState(chatMessages);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()

  //const apiKey = '';
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

  useEffect(() => {
    const len=messages?.length
    if (len>0&&len%2==0){
      navigate("/recommendchat", {state:messages})
    }
  }, [messages])
  

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const clickLeftButton = () => {
    window.location.href = '/mainpage';
  };


  if(loading){
    return <div className="loading">로딩 중입니다.</div>
  }

  return (
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
              <p className="p2">Elasitcsearch 공부하기 좋은 책 추천해줘</p>

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
      </div>
    </div>
  );
};

export default RecommendInput;
