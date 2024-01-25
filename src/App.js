import React, { useEffect } from "react";

import useGeolocation from "./hooks/useGeolocation";
import aladin from "./images/aladin.png"
import kyobo from "./images/kyobo.png"
import ypbooks from "./images/ypbooks.png"

function App() {
    const location = useGeolocation();
    let lat = location.coordinates.lat;
    let lng = location.coordinates.lng;
    const { naver } = window;
    const naverMapClientId = "naverMapClientId";
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
        const naverMapUrl = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${naverMapClientId}`;

        const naverMapScript = document.createElement('script');
        naverMapScript.src = naverMapUrl;
        naverMapScript.async = true;
        document.head.appendChild(naverMapScript); 
        const container = document.getElementById('map');

        const options = {
            center: new naver.maps.LatLng(lat, lng),
            zoom: 17,
        };
        const map = new naver.maps.Map(container, options);

        // 마커 표시 코드는 다른 함수로 
        jsonData.bookstores.forEach(loc => {
            let markerImage = "";
            switch (loc.bookstore) {
                case "교보문고":
                    markerImage = kyobo;
                    break;
                case "영풍문고":
                    markerImage = ypbooks;
                    break;
                case "알라딘":
                    markerImage = aladin;
                    break;
              }

            const marker = new naver.maps.Marker({
                position: new window.naver.maps.LatLng(loc.latitude, loc.longitude),
                map: map,
                title: loc.stock.toString(),
                icon: {
                    content: `<img src="${markerImage}" alt="${loc.bookstore} Marker" style="width:60px; height:70px;">`,
                    anchor: new naver.maps.Point(15, 30),
                },
            });
        });
    }, []);

    return (
        <div className="App" style={{ height: '100vh' }}>
            <div id="map" style={{ width: '500px', height: '100%' }}></div>
        </div>
    )
}

export default App;