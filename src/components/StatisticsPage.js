import React from 'react';
import '../css/section.css';
import '../css/recommend.css';

function EmbeddedDashboard() {
    // MEMO: 로그인 정보 삭제함 없어도 연결됨

    const clickLeftButton = () => {
        window.location.href = '/mainpage';
    };

    // 링크
    const embeddedLink = `https://smw-coffeebara.kb.us-east-2.aws.elastic-cloud.com:9243/app/dashboards?auth_provider_hint=anonymous1#/view/8704a1b0-d0c0-11ee-9f44-f53cb9148fa7?_g=(refreshInterval:(pause:!t,value:60000),time:(from:now-15m,to:now))&_a=()`;

    // iframe 내용
    const iframeContent = `
        <html>
        <head>
            <title>Embedded Dashboard</title>
                <style>
                body {
                    margin-top: 50px; 
                }
            </style>
        </head>
        <body>
            <iframe src="${embeddedLink}" width="100%" height="100%" frameborder="0"></iframe>
        </body>
        </html>
    `;

    // 문자열을 UTF-8로 인코딩
    const utf8EncodedContent = new TextEncoder().encode(iframeContent);

    // Base64로 인코딩
    const encodedContent = btoa(String.fromCharCode.apply(null, utf8EncodedContent));

    // iframe을 포함하는 URL
    const embeddedUrl = `data:text/html;base64,${encodedContent}`;

    return (
        <>
            <div className="chevron-left-input" style={{ marginTop: '10px', marginLeft: '-5px' }} onClick={clickLeftButton}></div>
            <div className="head-text" style={{ marginTop: '-20px' , marginLeft: '-10px'}}>Kibana 통계 확인하기</div>
            <iframe src={embeddedUrl} width="100%" height="932px" />
        </>
    );    
}

export default EmbeddedDashboard;
