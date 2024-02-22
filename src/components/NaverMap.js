import ReactDOM from "react-dom";
import React, { useRef, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { MapContainer, Marker, Popup } from "react-leaflet";

import { currentMyLocationAtom } from "../atom/currentMyLocationAtom.js";
import axios from 'axios';
// import Markup from "./Markup.js";

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
    const mapRef = useRef(null);
    const { isbn } = useParams();
    let marker;
    const [data, setData] = useState();
    const [result, setResult] = useState();
    const markerRef = useRef([]);
    var icon = libraryIcon;

    async function getLocation() {
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
    }

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
        getLocation();
    }, [setCurrentMyLocation]);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (currentMyLocation.lat !== 0 && currentMyLocation.lng !== 0) {
            mapRef.current = new window.naver.maps.Map("map", {
                center: new window.naver.maps.LatLng(currentMyLocation.lat, currentMyLocation.lng),
                zoom: 16,
                zoomControl: true,
            });
        }
    }, [currentMyLocation]);

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
                resultData.push(...[libraryData]);
                setResult(resultData);
                console.log(result)
            }
        } else {
            console.log("로딩중");
            // 로딩 페이지를 만들어야 하나 recommend page보고 고쳐봐야지
        }
    },[data]);

    useEffect(() => {
        if (result) {
            const validResults = result.filter(item => item !== null);
        
            validResults.forEach(bookplaces => {
                bookplaces.forEach(bookplace => {
                    if (result) {
                        let type="";
                        const { name, latitude, longtitude } = bookplace;
                        if (latitude && longtitude){
                            if (path.includes("/bookstore")) {
                                type = bookplace.type;
                            }
                            console.log("위도 경도", latitude, longtitude);
                            
                            if (type == "교보문고"){
                                icon = kyoboIcon;
                            } else if (type == "알라딘"){
                                icon = aladinIcon;
                            } else if (type == "영풍문고"){
                                icon = ypbookIcon;
                            }
                            console.log("아이콘",icon);
                            const marker = new window.naver.maps.Marker({
                                position: new window.naver.maps.LatLng(latitude, longtitude),
                                map: mapRef.current,
                                icon: {
                                    content: `<img src="${icon}" alt="${name} Marker" style="width:30px; height:30px;">`,
                                    anchor: new window.naver.maps.Point(15, 30),
                                },
                            });
                            if (Array.isArray(markerRef.current)){
                                markerRef.current.push(marker);
                            } else {
                                markerRef.current = [marker];
                            }
                        }
                       
                    }
                });
            });
        }
    }, [result]);

    return (
        <>
            {data && (
                <div class="top-bar">
                    <div class="search-word">현재 검색어</div>
                    <div class="search-book">{data.title}</div>
                </div>
            )}
            <div ref={mapRef} id="map" style={{ width: "100%", height: "100vh" }}></div>
        </>
    )
}

export default NaverMap;