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
    const { naver } = window;
    const markerRef = useRef([]);
    var icon;

    // useEffect(() => {
    //     const success = (location) => {
    //         setCurrentMyLocation({
    //             lat: location.coords.latitude,
    //             lng: location.coords.longitude,
    //         });
    //     };
        
    //     const error = () => {
    //         setCurrentMyLocation({ lat: 37.5666103, lng: 126.9783882 });
    //     };

    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(success, error);
    //     }
    // }, [setCurrentMyLocation]);

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
        if (!mapRef.current || !naver) return;

        if (currentMyLocation.lat !== 0 && currentMyLocation.lng !== 0) {
            
            const location = new naver.maps.LatLng(currentMyLocation.lat, currentMyLocation.lng);
            const mapOptions = {
                center: location,
                zoom: 16,
                minZoom: 10,
                zoomControl: true,
            }
            const map = new naver.maps.Map(mapRef.current, mapOptions);
            
            // mapRef.current = new window.naver.maps.Map("map", {
            //     center: new window.naver.maps.LatLng(currentMyLocation.lat, currentMyLocation.lng),
            //     zoom: 16,
            //     minZoom: 10,
            //     zoomControl: true,
            //     mapTypeControl: true,
            //     zoomControlOptions: {
            //         position: window.naver.maps.Position.TOP_RIGHT,
            //     },
            //     mapDataControl: false,
            // });

            if (result) {
                const validResults = result.filter(item => item !== null);
            
                validResults.forEach(bookplaces => {
                    bookplaces.forEach(bookplace => {
                        if (result) {
                            let type="";
                            const { name, latitude, longtitude } = bookplace;
                            if (path.includes("/bookstore")) {
                                type = bookplace.type;
                            }
                            
                            if (type == ""){
                                icon = libraryIcon;
                            } else if (type != "" && name == "교보문고"){
                                icon = kyoboIcon;
                            } else if (type != "" && name == "알라딘"){
                                icon = aladinIcon;
                            } else if (type != "" && name == "영풍문고"){
                                icon = ypbookIcon;
                            }
    
                            var lat = parseFloat(latitude);
                            var lon = parseFloat(longtitude);
                            const bookLocation = new naver.maps.LatLng(lat, lon);

                           
                            // if (Array.isArray(markerRef.current)){
                            //     markerRef.current.push(marker);
                            //     console.log("마커레프:",markerRef.current)
                            // } else {
                            //     markerRef.current = [marker];
                            //     console.log("마커레프 초기화:", markerRef.current);
                            // }
                        }

                        new naver.maps.Marker({
                            position: location,
                            map: map,
                            icon: {
                                content: `<img src="${icon}" alt="${name} Marker" style="width:30px; height:30px;">`,
                                anchor: new window.naver.maps.Point(15, 30),
                            },
                        });
                    });
                });
            }
        }
    }, [currentMyLocation, result]);

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

    // useEffect(() => {
    //     if (result) {
    //         const validResults = result.filter(item => item !== null);
        
    //         validResults.forEach(bookplaces => {
    //             bookplaces.forEach(bookplace => {
    //                 if (result) {
    //                     let type="";
    //                     const { name, latitude, longtitude } = bookplace;
    //                     if (path.includes("/bookstore")) {
    //                         type = bookplace.type;
    //                     }
                        
    //                     if (type == ""){
    //                         icon = libraryIcon;
    //                     } else if (type != "" && name == "교보문고"){
    //                         icon = kyoboIcon;
    //                     } else if (type != "" && name == "알라딘"){
    //                         icon = aladinIcon;
    //                     } else if (type != "" && name == "영풍문고"){
    //                         icon = ypbookIcon;
    //                     }
    //                     console.log("위도 경도", typeof(latitude), typeof(longtitude));

    //                     var lat = parseFloat(latitude);
    //                     var lon = parseFloat(longtitude);
    //                     const marker = new window.naver.maps.Marker({
    //                         position: new window.naver.maps.LatLng(lat, lon),
    //                         map: mapRef.current,
    //                         icon: {
    //                             content: `<img src="${icon}" alt="${name} Marker" style="width:30px; height:30px;">`,
    //                             anchor: new window.naver.maps.Point(15, 30),
    //                         },
    //                     });
    //                     if (Array.isArray(markerRef.current)){
    //                         markerRef.current.push(marker);
    //                         console.log("마커레프:",markerRef.current)
    //                     } else {
    //                         markerRef.current = [marker];
    //                         console.log("마커레프 초기화:", markerRef.current);
    //                     }
    //                 }
    //             });
    //         });
    //     }
    // }, [result, currentMyLocation]);

    return (
        <>
           
            {data && (
                <div class="top-bar">
                    <div class="search-word">현재 검색어</div>
                    <div class="search-book">{data.title}</div>
                </div>
            )}
             {/* { <Markup path={path} result={result} currentMyLocation={currentMyLocation}  isbn={isbn}/> } */}
            <div id="map" style={{ width: "100%", height: "100vh" }}></div>
            <div ref={mapRef} id="library-markup-container">
                {/* <MapContainer>
                    {markerRef.current && markerRef.current.length > 0  && markerRef.current.map((marker, index) => (
                        <Marker
                            key={index}
                            position={marker.getPosition()}
                        >
                            <Popup>{marker.name}</Popup>
                        </Marker>
                    ))}
                </MapContainer> */}
            </div>
        </>
    )
}

export default NaverMap;