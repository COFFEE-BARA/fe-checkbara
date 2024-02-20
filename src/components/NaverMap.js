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
import aladin from "../images/aladin.png"
import kyobo from "../images/kyobo.png"
import ypbooks from "../images/ypbooks.png"

import '../css/NaverMap.css';

function NaverMap() {
    const setCurrentMyLocation = useSetRecoilState(currentMyLocationAtom);
    const currentMyLocation = useRecoilValue(currentMyLocationAtom); 
    // const currentIsbn = useRecoilValue(isbnAtom);=
    // const currentPrice = useRecoilValue(priceAtom);
    const urlCheck = useLocation();
    const path = urlCheck.pathname;
    var apiUrl;
    const mapRef = useRef<window.naver.maps.Map | null>(null);
    const [list, setList] = useState();

    const { isbn, price } = useParams();

    // async function getList() {
    //     console.log(path)
    //     // const url = `/book/${isbn}/${price}/bookstore`;
    //     const data = await axios.get(path);
    //     setList(data.data.data);
    // } 

    // useEffect(() => {
    //     getList();
    //   }, []);

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
            if (path.includes("/bookstore")) {
                apiUrl = `/api/book/${isbn}/${price}/bookstore?lat=${currentMyLocation.lat}&lon=${currentMyLocation.lng}`;
                console.log('서점 재고 조회\n');
                console.log(isbn, price);
            } else if (path.includes("/library")) {
                apiUrl = `/api/book/${isbn}/library?lat=${currentMyLocation.lat}&lon=${currentMyLocation.lng}`;
                console.log('도서관 재고 조회:');
            }

            try {
                const response = await axios.post(apiUrl, {
                    isbn: isbn,
                    price: price,
                    lat: currentMyLocation.lat,
                    lon: currentMyLocation.lng
                });
    
                if (response.status === 200) {
                    console.log('sendDataToBackend 함수 데이터 전달:', response.data);
                } else {
                    console.error('응답 상태 코드가 200이 아님');
                }
            } catch (error) {
                console.error('API 호출 중 오류 발생:', error);
            }
        };                  

        if (currentMyLocation && isbn != "0" ) { //&& price == "정보 없음" || price != "0"
            sendDataToBackend();
        } else {
            console.log('location 또는 isbn 데이터를 전달하지 못함:');
        }
    }, [currentMyLocation, urlCheck]);

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
    //     // 도서관 및 서점 리스트, 책 제목 백엔드에서 axios get으로 받아오기
    //     async function getList() {
    //         // 서점: bookstore, branch, stock, lat, lon
    //         // 도서관: libCode, libName, lat, lon
    //         data = await axios.get(apiUrl);
    //         setList(data.data.data);
    //     } 
    //     getList();

    //     if (data!=null){
    //         console.log("백엔드에서 도서관 및 서점 데이터를 받아옴: ", data);
    //     } else {
    //         console.log("백엔드에서 도서관 및 서점 데이터를 받아오지 못함");
    //     }
    //     // 도서관 마커 찍는 코드 작성

    // },[setList])

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