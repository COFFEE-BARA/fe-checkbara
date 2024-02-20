import React, { useRef, useEffect, useParams, useState } from "react";
import ReactDOM from 'react-dom';
import { useSetRecoilState, useRecoilValue } from "recoil";
import { currentMyLocationAtom } from "../atom/currentMyLocationAtom.js";
import { isbnAtom } from "../atom/isbnAtom.js";
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
    const currentIsbn = useRecoilValue(isbnAtom);
    const mapRef = useRef<window.naver.maps.Map | null>(null);
    const [detail, setDetail] = useState();

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
        const sendDataToBackend = async () => {
            try {
                // 백엔드로 isbn, lat, lon 전달
                const response = await axios.post(`/api/book/${currentIsbn.isbn}/lending-library?lat=${currentMyLocation.lat}&lon=${currentMyLocation.lng}`, {
                    isbn: currentIsbn.isbn,
                    lat: currentMyLocation.lat,
                    lon: currentMyLocation.lng
                });
                console.log('Location sent to backend:', response.data);
            } catch (error) {
                console.error('Error sending location to backend:', error);
            }
        };

        if (currentMyLocation && currentIsbn != "0") {
            console.log(currentMyLocation, currentIsbn);
            sendDataToBackend();
        }
    }, [currentMyLocation, currentIsbn])

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
            <LibraryMarkup currentMyLocation={currentMyLocation} map={map} isbn={currentIsbn}/>, 
            document.getElementById('library-markup-container')
        );

    }, [currentMyLocation]);

    useEffect(() => {
        // 도서관 및 서점 리스트, 잭 제목 백엔드에서 axios get으로 받아오기
        // 도서관 마커 찍는 코드 작성

    })

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