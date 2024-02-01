import React from 'react';
import '../css/MainPage.css'

function MainPage() {
    return (
        <>
            <div class="main-background">
                <div class="main-page-container">
                    <div class="check-bara-icon">
                        <h3 class="check-bara-icon-text">Check Bara</h3>
                        <p class="check-bara-icon-hello">안녕하세요</p>
                    </div>
                    <div class="ai-chatbot-button">
                        <div class="ai-chatbot-image"></div>
                        <p class="ai-chatbot-button-text-1">AI 챗봇</p>
                        <p class="ai-chatbot-button-text-2">책 추천받기</p>
                    </div>
                    <div class="book-search-button">
                        <div class="book-search-image"></div>
                        <p class="book-search-button-text-1">책 검색하기</p>
                        <p class="book-search-button-text-2">책 정보보기</p>
                    </div>
                    <div class="statistics-button">
                        <div class="statistics-image"></div>
                        <p class="statistics-button-text-1">통계</p>
                        <p class="statistics-button-text-2">통계 확인하기</p>
                    </div>
                </div>
            </div>
        </>
    );
}
export default MainPage