import React, { useRef, useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { useLocation, useParams } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { currentMyLocationAtom } from "../atom/currentMyLocationAtom.js";
import { isbnAtom } from "../atom/isbnAtom.js";
import { priceAtom } from "../atom/priceAtom.js";
import axios from 'axios';
import LibraryMarkup from "./LibraryMarkup.js";

import useGeolocation from "../hooks/useGeolocation";
import aladinIcon from "../images/aladin.png";
import kyoboIcon from "../images/kyobo.png";
import ypbookIcon from "../images/ypbooks.png";
import libraryIcon from "../images/library.png";

import '../css/NaverMap.css';

function NaverMap() {
    const setCurrentMyLocation = useSetRecoilState(currentMyLocationAtom);
    const currentMyLocation = useRecoilValue(currentMyLocationAtom); 
    // const currentIsbn = useRecoilValue(isbnAtom);=
    // const currentPrice = useRecoilValue(priceAtom);
    const urlCheck = useLocation();
    const path = urlCheck.pathname;
    const mapRef = useRef<window.naver.maps.Map | null>(null);
    const [list, setList] = useState();

    const { isbn } = useParams();
    // var data;
    var response;

    // async function getList() {
    //     var apiUrl;
    //     if (path.includes("/bookstore")) {
    //         apiUrl = `https://3cggt0xn0b.execute-api.ap-northeast-2.amazonaws.com/check-bara/api/book/${isbn}/${price}/bookstore`;
    //     } else if (path.includes("/library")) {
    //         apiUrl = `https://3cggt0xn0b.execute-api.ap-northeast-2.amazonaws.com/check-bara/api/book/${isbn}/${price}/library`;
    //     }
        
    //     data = await axios.get(apiUrl);
    //     setList(data.data.data);
    // } 

    // useEffect(() => {
    //     async function getList() {
    //         var apiUrl;
    //         console.log(path);
    //         if (path.includes("/bookstore")) {
    //             apiUrl = `https://3cggt0xn0b.execute-api.ap-northeast-2.amazonaws.com/check-bara/api/book/${isbn}/${price}/bookstore`;
    //             data = await axios.get(apiUrl);
    //             console.log(apiUrl);
    //             setList(data.data.data);
    //         } else if (path.includes("/library")) {
    //             apiUrl = `https://3cggt0xn0b.execute-api.ap-northeast-2.amazonaws.com/check-bara/api/book/${isbn}/${price}/library`;
    //             data = await axios.get(apiUrl);
    //             console.log(apiUrl);
    //             setList(data.data.data);
    //         }
    //     } 

    //     getList();
    //     if (data!=null){
    //         console.log("백엔드에서 도서관 및 서점 데이터를 받아옴: ", data);
    //     } else {
    //         console.log("백엔드에서 도서관 및 서점 데이터를 받아오지 못함");
    //     }
    // }, []);

    // 위치 데이터 저장
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

    // isbn, (price), lat, lon 백엔드로 전달
    useEffect(() => {
        const sendDataToBackend = async () => {
            try {
                if (path.includes("/bookstore")) {
                    response = await axios.post(`https://3cggt0xn0b.execute-api.ap-northeast-2.amazonaws.com/check-bara/api/book/${isbn}/bookstore?lat=${currentMyLocation.lat}&lon=${currentMyLocation.lng}`, {
                        isbn: isbn,
                        lat: currentMyLocation.lat,
                        lon: currentMyLocation.lng
                    });
                    console.log('서점 재고 조회\n');
                    console.log(response.isbn, response.price, response.lat, response.lon);
                } else if (path.includes("/library")) {
                    response = await axios.post(`https://3cggt0xn0b.execute-api.ap-northeast-2.amazonaws.com/check-bara/api/book/${isbn}/library?lat=${currentMyLocation.lat}&lon=${currentMyLocation.lng}`, {
                        isbn: isbn,
                        lat: currentMyLocation.lat,
                        lon: currentMyLocation.lng
                    });
                    console.log('도서관 재고 조회');
                    console.log(response.isbn, response.lat, response.lon);
                }
                
                console.log(response.status);
                if (response.status === 200) {
                    console.log('sendDataToBackend 함수 데이터 전달:', response.data);
                } else {
                    console.error('응답 상태 코드가 200이 아님');
                }

            } catch (error) {
                console.error('API 호출 중 오류 발생:', error);
            }
        };                  

        if (currentMyLocation && isbn != "0") { 
            sendDataToBackend();
        } else {
            console.log('location 또는 isbn 데이터를 전달하지 못함:');
        }
    });

    // 지도 표시
    useEffect(() => {
        let map = new window.naver.maps.Map("map", {
            center: new window.naver.maps.LatLng(currentMyLocation.lat, currentMyLocation.lng),
            zoom: 16,
            minZoom: 10,
            zoomControl: true,
            mapTypeControl: true,
            zoomControlOptions: {
                position: window.naver.maps.Position.TOP_RIGHT,
            },
            mapDataControl: false,
        });

        ReactDOM.render(
            <LibraryMarkup currentMyLocation={currentMyLocation} map={map} isbn={isbn}/>, 
            document.getElementById('library-markup-container')
        );

    }, [currentMyLocation]);

    // useEffect(() => {
    //     var data;
    //     if (currentMyLocation && response) {
    //         if (path.includes("/bookstore")){
    //             data = response.data.
    //         } else if (path.includes("/library")){

    //         }
    //         libraries.forEach(loc => {
    //             const marker = new window.naver.maps.Marker({
    //                 position: new window.naver.maps.LatLng(loc.latitude, loc.longitude),
    //                 map: map,
    //                 icon: {
    //                     content: `<img src="${markerImage}" Marker" style="width:30px; height:30px;">`,
    //                     anchor: new window.naver.maps.Point(15, 30),
    //                 },
    //             });
    //         });
    //     }
    // }, [currentMyLocation, loading, libraries]);

    return (
        <>
            <div class="top-bar">
                <div class="search-book">현재 검색어 | bookName</div>
            </div>
            <div id="map" style={{ width: "100%", height: "100vh" }}></div>
            <div id="library-markup-container"></div>
        </>
    )
}

export default NaverMap;