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
        console.log(keyword)
        const url=`https://3cggt0xn0b.execute-api.ap-northeast-2.amazonaws.com/api/book/search?keyword=${keyword}`

        const data = await axios.get(url);
      
        return data.data.bookList;
      }

    const getBookList=async ()=>{
        try{
        const data=await getData(curKeywords)
        console.log(data)
        const filteredData = data&& data.filter(item =>
            item.Title.toLowerCase().includes(curKeywords.toLowerCase())
        );
        setSearchResult(filteredData?.length > 0 ? filteredData : null); // 일치하는 데이터가 없으면 null로 설정
        console.log("Search Result:", filteredData);
        // setData(response)
        }
        catch(err){console.log(err)}
    }

    const handleKeyup = useCallback((e) => {
        if (e.key === "Enter") {
            e.preventDefault();

            console.log("Enter key pressed");

            getBookList()

            // const filteredData = data&& data.filter(item =>
            //     item.Title.toLowerCase().includes(curKeywords.toLowerCase())
            // );
            // setSearchResult(filteredData?.length > 0 ? filteredData : null); // 일치하는 데이터가 없으면 null로 설정
            // console.log("Search Result:", filteredData);

            // const bgRectangleElement = document.querySelector('.bgrectangle');

            // if (bgRectangleElement) {
            //     ReactDOM.render(<ResultSection data={filteredData} />, bgRectangleElement);
            // } else {
            //     console.error('Class 이름이 bgrectangle인 요소를 찾을 수 없습니다.');
            // }
            // navigate('/resultsection', { state: { data: filteredData } });
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
            <ResultSection data={searchResult}  loading={loading}/>
        </>
    );
}

export default InputSection;