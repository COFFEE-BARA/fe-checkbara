import React, { useState, useCallback, useEffect } from 'react';
import { GradientBg1 } from "../icons/GradientBg1/GradientBg1.jsx";
import { useNavigate } from 'react-router-dom';
import '../css/section.css';
import '../css/index.css';
import ResultSection from './ResultSection.js';
import axios from "axios";


function InputSection() {
    const [curKeywords, setCurKeywords] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const navigate = useNavigate(); // useNavigate 밖에서 호출
    const [loading, setLoading] = useState(true);
    
    async function getData(keyword) {
        // MEMO: 여기까지 잘 들어옴
        const url=`https://3cggt0xn0b.execute-api.ap-northeast-2.amazonaws.com/check-bara/api/book/search?keyword=${keyword}`

        const data = await axios.get(url);
        // console.log(data)
      
        return data.data.data.bookList;
      }

    const getBookList=async ()=>{
        try{
        const data=await getData(curKeywords)
        
        setSearchResult(data)
        
        }
        catch(err){console.log(err)}
    }

    const handleKeyup = useCallback((e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            getBookList()

        }
    }, [curKeywords, searchResult, navigate]);

    useEffect(()=>{!searchResult&&setLoading(false)},[searchResult])

    const clickLeftButton = () => {
        window.location.href = '/mainpage';
    };

    return (
        <>
            <div className="bgrectangle"></div>
            <div className="index"></div>
            <div className="overlap-wrapper">
                <div className="overlap">
                    <div className="overlap-group">
                        <div className="cur-keywords">
                            <div id="App">
                                <main>
                                    <input
                                        type="text"
                                        placeholder="검색할 내용을 입력하세요"
                                        class="input-input"
                                        onKeyUp={handleKeyup}
                                        value={curKeywords}
                                        onChange={(e) => setCurKeywords(e.target.value)}
                                    />
                                    <div className="chevron-left-input" onClick={clickLeftButton}>
                                    </div>
                                </main>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ResultSection data={searchResult} loading={loading}/>
        </>
    );
}

export default InputSection;