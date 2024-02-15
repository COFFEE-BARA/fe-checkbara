import React, { useRef, useEffect } from "react";
import ReactDOM from 'react-dom';
import { useSetRecoilState, useRecoilValue } from "recoil";
import { currentMyLocationAtom } from "../hooks/atoms.js";
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
    const mapRef = useRef<window.naver.maps.Map | null>(null);

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
        const sendLocationToBackend = async () => {
            try {
                const response = await axios.post(`/api/book/9788956609959/lending-library?lat=${currentMyLocation.lat}&lon=${currentMyLocation.lng}`, {
                    lat: currentMyLocation.lat,
                    lon: currentMyLocation.lng
                });
                console.log('Location sent to backend:', response.data);
            } catch (error) {
                console.error('Error sending location to backend:', error);
            }
        };

        if (currentMyLocation) {
            sendLocationToBackend();
        }
    }, [currentMyLocation])

    useEffect(() => {
        let map = new window.naver.maps.Map("map", {
            center: new window.naver.maps.LatLng(currentMyLocation.lat, currentMyLocation.lng),
            zoom: 15,
            minZoom: 10,
            zoomControl: true,
            mapTypeControl: true,
            zoomControlOptions: {
                position: window.naver.maps.Position.TOP_RIGHT,
            },
            mapDataControl: false,
        });

        ReactDOM.render(
            <LibraryMarkup currentMyLocation={currentMyLocation} map={map} />, 
            document.getElementById('library-markup-container')
        );

    }, [currentMyLocation]);

    return (
        <>
            {/* <LibraryMarkup currentMyLocation={currentMyLocation}/> */}
            <div class="top-bar">
                <div class="search-book">현재 검색어 | bookName</div>
                <div class="search-bar">
                    <input class="search-tap" type="text" placeholder="검색할 위치를 입력해주세요" />
                    <div class="search-button"></div>
                </div>
            </div>
            <div id="map" style={{ width: "100%", height: "100vh" }}></div>
            <div id="library-markup-container"></div>
        </>
    )
}

export default NaverMap;