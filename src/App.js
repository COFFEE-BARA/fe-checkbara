import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import InputSection from './components/InputSection.js';
import ResultSection from './components/ResultSection.js';
import MainPage from './components/MainPage.js';
import RecommendInput from './components/RecommendInput';
import RecommendChat from './components/RecommendChat';
import { request } from './api/api.js'; //조정


const MAX_KEYWORD = 3;

function App() {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(null);
    const [keywords, setKeywords] = useState([]);

    const onSearch = async (keyword, pageNum) => {
        const response = await request(keyword, pageNum); // 필요에 따라 적절한 방법으로 검색을 처리합니다.

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

        setData(response.documents);
        setPageNum(pageNum);
    };

    return (
        <>
            <BrowserRouter>
                <RecoilRoot>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/mainpage" element={<MainPage />} />
                        <Route path="/resultsection" element={<ResultSection data={data} pageNum={pageNum} />} />
                        <Route path="/inputsection" element={<InputSection onSearch={onSearch} keywords={keywords} />} />
                        <Route path="/recommendinput" element={<RecommendInput />}/>
                        <Route path="/recommendchat" element={<RecommendChat />}/>
                    </Routes>
                </RecoilRoot>
            </BrowserRouter>
        </>
    );    
}

export default App;
