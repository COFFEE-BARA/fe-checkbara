import React, { useRef, useEffect } from "react";
import ReactDOM from 'react-dom';
import { useLocation, useParams } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { currentMyLocationAtom } from "../atom/currentMyLocationAtom.js";
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
    const urlCheck = useLocation();
    const path = urlCheck.pathname;
    const mapRef = useRef<window.naver.maps.Map | null>(null);
    const { isbn } = useParams();
    var response;
    let map;
    let name;
    let marker;

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

    // isbn, lat, lon 백엔드로 전달
    useEffect(() => {
        const sendDataToBackend = async () => {
            try {
                if (path.includes("/bookstore")) {
                    response = await axios.post(`https://3cggt0xn0b.execute-api.ap-northeast-2.amazonaws.com/check-bara/api/book/${isbn}/bookstore?lat=${currentMyLocation.lat}&lon=${currentMyLocation.lng}`, {
                        isbn: isbn,
                        lat: currentMyLocation.lat,
                        lon: currentMyLocation.lng
                    });
                    console.log('서점 재고 조회\n', response);
                } else if (path.includes("/library")) {
                    response = await axios.get(`https://3cggt0xn0b.execute-api.ap-northeast-2.amazonaws.com/check-bara/api/book/${isbn}/library?lat=${currentMyLocation.lat}&lon=${currentMyLocation.lng}`, {
                        isbn: isbn,
                        lat: currentMyLocation.lat,
                        lon: currentMyLocation.lng
                    });
                    console.log('도서관 재고 조회', response);
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
        map = new window.naver.maps.Map("map", {
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

    useEffect(() => {
        var data;
        let markerImage = "";

        if (currentMyLocation && response) {
            if (path.includes("/bookstore")){
                data = response.data.bookstoreList
            } else if (path.includes("/library")){
                data = response.data.libraryList
            }
            console.log("marker useeffect", path);

            data.forEach(loc => {
                if (path.includes("/bookstore")){
                    switch (loc.bookstore) {
                        case "교보문고":
                            markerImage = kyoboIcon;
                            break;
                        case "영풍문고":
                            markerImage = ypbookIcon;
                            break;
                        case "알라딘":
                            markerImage = aladinIcon;
                            break;
                    }  
                } else if (path.includes("/library")){
                    markerImage = libraryIcon;
                }
                name = loc.name

                marker = new window.naver.maps.Marker({
                    position: new window.naver.maps.LatLng(loc.latitude, loc.longitude),
                    map: map,
                    icon: {
                        content: `<img src="${markerImage}" alt= "${name}" Marker" style="width:30px; height:30px;">`,
                        anchor: new window.naver.maps.Point(15, 30),
                    },
                });

                marker.addListener('mouseover', () => {
                    new window.naver.maps.InfoWindow({
                        content: loc.libName,
                        position: marker.getPosition(),
                    }).open(map, marker);
                });
            
                marker.addListener('mouseout', () => {
                    map.closeInfoWindow();
                });;
            });
        }
    }, [currentMyLocation]);

    return (
        <>
            <div class="top-bar">
                <div class="search-book">현재 검색어 | {response.title} </div>
            </div>
            <div id="map" style={{ width: "100%", height: "100vh" }}></div>
            <div id="library-markup-container"></div>
        </>
    )
}

export default NaverMap;