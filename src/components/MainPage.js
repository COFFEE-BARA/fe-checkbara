import React from 'react';
import '../css/MainPage.css'

function MainPage() {
    function clickAiChatbotButton(e) {
        e.preventDefault();
        window.location.href='/recommendinput';
    }

    function clickBookSearchButton(e) {
        e.preventDefault();
        window.location.href='/inputsection';
    }

    function clickStatisticsButton(e) {
        e.preventDefault();
        window.location.href='/';
    }

    return (
        <>
            <div className="main-background">
                <div className="main-page-container">
                    <div className="check-bara-icon">
                        <div className="check-bara-icon-text">Check Bara</div>
                        <div className="check-bara-icon-hello">안녕하세요</div>
                    </div>
                    <div className="ai-chatbot-button" onClick={clickAiChatbotButton}>
                        <div className="image-wrapper">
                            <div className="ai-chatbot-image"></div>
                        </div>
                        <div className="ai-chatbot-button-text-1">AI 챗봇</div>
                        <div className="ai-chatbot-button-text-2">책 추천받기</div>
                    </div>
                    <div className="book-search-button" onClick={clickBookSearchButton}>
                        <div className="image-wrapper">
                            <div className="book-search-image"></div>
                        </div>
                        <div className="book-search-button-text-1">책 검색하기</div>
                        <div className="book-search-button-text-2">책 정보보기</div>
                    </div>
                    <div className="statistics-button" onClick={clickStatisticsButton}>
                        <div className="image-wrapper">
                            <div className="statistics-image"></div>
                        </div>
                        <div className="statistics-button-text-1">통계</div>
                        <div className="statistics-button-text-2">통계 확인하기</div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default MainPage;
