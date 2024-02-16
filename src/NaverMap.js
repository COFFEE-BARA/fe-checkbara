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
            default:
                // 기본적으로 사용할 이미지 또는 처리 로직을 여기에 추가
                break;
        }

        const marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(loc.latitude, loc.longitude),
            map: map,
            title: loc.stock.toString(),
            icon: {
                content: `<img src="${markerImage}" alt="${loc.bookstore} Marker" style="width:60px; height:70px;">`,
                anchor: new naver.maps.Point(15, 30),
            },
        });
    });
}, []);
