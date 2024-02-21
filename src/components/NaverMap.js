import ReactDOM from "react-dom";
import React, { useRef, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { currentMyLocationAtom } from "../atom/currentMyLocationAtom.js";
import axios from 'axios';
import Markup from "./Markup.js";

import aladinIcon from "../images/aladin.png";
import kyoboIcon from "../images/kyobo.png";
import ypbookIcon from "../images/ypbooks.png";
import libraryIcon from "../images/library.png";

import '../css/NaverMap.css';

function NaverMap() {
    const setCurrentMyLocation = useSetRecoilState(currentMyLocationAtom);
    const currentMyLocation = useRecoilValue(currentMyLocationAtom); 
    const urlCheck = useLocation();
    const path = urlCheck.pathname;
    // const mapRef = useRef<window.naver.maps.Map | null>(null);÷
    const { isbn } = useParams();
    let marker;
    const [data, setData] = useState();
    const [result, setResult] = useState();
    const [map, setMap] = useState(null);

    async function getData(){
        let url;
        if (path.includes("/bookstore")) {
            url = `https://3cggt0xn0b.execute-api.ap-northeast-2.amazonaws.com/check-bara/api/book/${isbn}/bookstore?lat=${currentMyLocation.lat}&lon=${currentMyLocation.lng}`;
        } else if (path.includes("/library")) {
            url = `https://3cggt0xn0b.execute-api.ap-northeast-2.amazonaws.com/check-bara/api/book/${isbn}/library?lat=${currentMyLocation.lat}&lon=${currentMyLocation.lng}`;
        }
    
        try {
            const response = await axios.get(url);
            setData(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }    

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        const success = (location) => {
            setCurrentMyLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            });
        };
        
        const error = () => {
            setCurrentMyLocation({ lat: 37.5666103, lng: 126.9783882 });
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }, [setCurrentMyLocation]);

    useEffect(() => {
        if (!map) {
            setMap(new window.naver.maps.Map("map", {
                center: new window.naver.maps.LatLng(currentMyLocation.lat, currentMyLocation.lng),
                zoom: 16,
                minZoom: 10,
                zoomControl: true,
                mapTypeControl: true,
                zoomControlOptions: {
                    position: window.naver.maps.Position.TOP_RIGHT,
                },
                mapDataControl: false,
            }));
        }

        // ReactDOM.render(
        //     <Markup path={path} currentMyLocation={currentMyLocation} map={map} isbn={isbn}/>, 
        //     document.getElementById('library-markup-container')
        // );
    }, [currentMyLocation, map]);

    useEffect(() => {
        let resultData = [];
        if (data) {
            if (path.includes("/bookstore")) {
                const kyoboData = data.stockResult.kyoboStockList;
                const ypbookData = data.stockResult.ypbookStockList;
                const aladinData = data.stockResult.aladinStockList;
                resultData.push(...[kyoboData, ypbookData, aladinData]);
                setResult(resultData);
                console.log(result)
            } else if (path.includes("/library")) {
                const libraryData = data.libraryList;
                resultData.append(libraryData);
                setResult(resultData);
                console.log(result)
            }
        } else {
            console.log("로딩중");
            // 로딩 페이지를 만들어야 하나 recommend page보고 고쳐봐야지
        }
    },[data]);

    return (
        <>
            { <Markup path={path} result={result} currentMyLocation={currentMyLocation} map={map} isbn={isbn}/> }
            {data && (
                <div class="top-bar">
                    <div class="search-word">현재 검색어</div>
                    <div class="search-book">{data.title}</div>
                </div>
            )}
            <div id="map" style={{ width: "100%", height: "100vh" }}></div>
            <div id="library-markup-container"></div>
        </>
    )
}

export default NaverMap;