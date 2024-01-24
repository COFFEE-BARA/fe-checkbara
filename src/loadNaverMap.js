// const naverMapClientId = process.env.NAVER_MAP_CLIENT_ID;

function loadNaverMap(naverMapClientId){
    if (!naverMapClientId) {
        console.error('Naver Map Client ID가 없습니다.');
        return;
    }

    const naverMapUrl = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${naverMapClientId}`;

    if (document.querySelector(`script[src="${naverMapUrl}"]`)) {
        console.warn('Naver Map이 이미 불러와졌습니다.');
        // return;
    }

    const script = document.createElement('script');
    script.src = naverMapUrl;
    script.async = true;
    document.head.appendChild(script);  
}

export default loadNaverMap;