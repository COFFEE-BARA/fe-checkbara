import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NaverMap from './components/NaverMap';
import Distance from './components/LibraryMarkup';
import React, { useState } from 'react';
import { RecoilRoot } from 'recoil';
import InputSection from './components/InputSection.js';
import ResultSection from './components/ResultSection.js';
import MainPage from './components/MainPage.js';
import RecommendInput from './components/RecommendInput';
import RecommendChat from './components/RecommendChat';
// import { request } from './api/api.js'; //조정
import BookDetailPage from "./components/BookDetailPage";
import StatisticsPage from "./components/StatisticsPage";


const MAX_KEYWORD = 3;

function App() {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(null);
    const [keywords, setKeywords] = useState([]);

    const onSearch = async (keyword, pageNum) => {
        // const response = await request(keyword, pageNum); // 필요에 따라 적절한 방법으로 검색을 처리합니다.

        let newKeywords = [...keywords];
        if (newKeywords.indexOf(keyword) !== -1) {
            newKeywords.splice(newKeywords.indexOf(keyword), 1);
        }
        if (newKeywords.length === MAX_KEYWORD) {
            newKeywords.shift();
        }
        newKeywords.push(keyword);
        setKeywords(newKeywords);
        localStorage.setItem("keywords", JSON.stringify(newKeywords));

        // setData(response.documents);
        // setPageNum(pageNum);
    };

    return (
        <>
            <BrowserRouter>
                <RecoilRoot>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/statistics" element={<StatisticsPage />}/>
                        <Route path="/book/:isbn/bookstore" element={<NaverMap />} />
                        <Route path="/book/:isbn/library" element={<NaverMap />} />
                        <Route path="/mainpage" element={<MainPage />} />
                        <Route path="/resultsection" element={<ResultSection data={data} pageNum={pageNum} />} />
                        <Route path="/inputsection" element={<InputSection onSearch={onSearch} keywords={keywords} />} />
                        <Route path="/recommendinput" element={<RecommendInput />}/>
                        <Route path="/recommendchat" element={<RecommendChat />}/>
                        <Route path="/detailpage/:isbn" element={<BookDetailPage />}/>
                    </Routes>
                </RecoilRoot>
            </BrowserRouter>
        </>
    );    
}

export default App;