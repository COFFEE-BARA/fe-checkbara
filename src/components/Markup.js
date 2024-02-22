import React, { useEffect, useState, useRef } from "react";
import { MapContainer, Marker, Popup } from "react-leaflet";
// import { useLocation } from "react-router-dom";

import aladinIcon from "../images/aladin.png";
import kyoboIcon from "../images/kyobo.png";
import ypbookIcon from "../images/ypbooks.png";
import libraryIcon from "../images/library.png";
import { circleMarker } from "leaflet";

function Markup({ path, result, currentMyLocation, map, isbn }) {

    // const [libraries, setLibraries] = useState([]);
    const [loading, setLoading] = useState(true); 
    let icon, name;
    let array=[];
    const markerRef = useRef([]);

    useEffect(() => {
        if (result) {
            const validResults = result.filter(item => item !== null);
        
            validResults.forEach(bookplaces => {
                bookplaces.forEach(bookplace => {
                    if (result) {
                        const { type, name, stock, latitude, longtitude } = bookplace;
                        console.log("위도 경도", latitude, longtitude);
                        console.log(bookplace);
                        const marker = new window.naver.maps.Marker({
                            position: new window.naver.maps.LatLng(latitude, longtitude),
                            map: map,
                            icon: {
                                content: `<img src="${aladinIcon}" alt="${name} Marker" style="width:30px; height:30px;">`,
                                anchor: new window.naver.maps.Point(15, 30),
                            },
                        });
                        if (Array.isArray(markerRef.current)){
                            markerRef.current.push(marker);
                            console.log("마커레프:",markerRef.current)
                        } else {
                            markerRef.current = [marker];
                            console.log("마커레프 초기화:", markerRef.current);
                        }
                        
                        // console.log("마커들 : ",marker)
                        // console.log("마커레프:",markerRef.current)
                        // if (markerRef.current && result){
                        //     console.log("마커레프:",markerRef.current)
                        //     markerRef.current.push(marker);
                        // }
                        

                    }
                });

            });
        }
    }, [map, result]);
    

    return (
        <>
            {/* {bookplace && <div>Loading...</div>} */}
            <MapContainer>
                {markerRef.current && markerRef.current.length > 0  && markerRef.current.map((marker, index) => (
                    <Marker
                        key={index}
                        position={marker.getPosition()}
                    >
                        <Popup>{marker.name}</Popup>
                    </Marker>
                ))}
            </MapContainer>
            
        </>
    )
}

export default Markup;
