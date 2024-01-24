import React, { useEffect } from "react";

import useGeolocation from "./useGeolocation";
import loadNaverMap from "./loadNaverMap";

function App() {

    const location = useGeolocation();
    const naverMapClientId = process.env.NAVER_MAP_CLIENT_ID;
    const jsonData = {
        bookstores: [
            {
                "bookstore":"교보문고",
                "branch":"광화문",
                "stock":3,
                "latitude": 37.5956, 
                "longitude": 126.9769
            },
            {
                "bookstore":"교보문고",
                "branch":"가든파이브",
                "stock":0,
                "latitude": 37.5656, 
                "longitude": 126.9729
            },
            {
                "bookstore":"교보문고",
                "branch":"강남",
                "stock":2,
                "latitude": 37.6656, 
                "longitude": 126.9069
            },
            {
                "bookstore":"영풍문고",
                "branch":"용산 아이파크몰점",
                "stock":1,
                "latitude": 37.4656, 
                "longitude": 126.9569
            }
        ]
    }

    useEffect(() => {
        loadNaverMap(naverMapClientId);

        window.onload = () => {
            const map = new window.naver.maps.Map('map', {
                center: new window.naver.maps.LatLng(37.5656, 126.9769),
                zoom: 14,
            });

            jsonData.bookstores.forEach(loc => {
                let markerImage = "";
                switch (loc.bookstore) {
                    case "교보문고":
                      markerImage = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FF0000";
                      break;
                    case "영풍문고":
                      markerImage = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|00FF00";
                      break;
                    default:
                      markerImage = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|0000FF";
                      break;
                  }

                const marker = new window.naver.maps.Marker({
                    position: new window.naver.maps.LatLng(loc.latitude, loc.longitude),
                    map: map,
                    title: loc.stock.toString(),
                    icon: {
                        content: `<img src="${markerImage}" alt="${loc.bookstore} Marker" style="width:30px; height:30px;">`,
                        anchor: new window.naver.maps.Point(15, 30),
                    },
                });
            });

           
        };
    });

    return (
        <div className="App" style={{ height: '100vh' }}>
            <div id="map" style={{ width: '500px', height: '100%' }}></div>
        </div>
    )
}

export default App;