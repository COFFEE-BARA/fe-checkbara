import React from 'react';

function EmbeddedDashboard() {
    // 로그인 정보
    const username = 'guest';
    const password = 'guest11';

    // 링크
    const embeddedLink = `https://smw-coffeebara.kb.us-east-2.aws.elastic-cloud.com:9243/app/dashboards?auth_provider_hint=anonymous1#/view/0af5f220-d022-11ee-b9f1-c5b3500cd5a1?_g=(refreshInterval:(pause:!t,value:60000),time:(from:now-15m,to:now))&_a=()`;

    // iframe 내용
    const iframeContent = `
        <html>
        <head>
            <title>Embedded Dashboard</title>
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
        <iframe src={embeddedUrl} width="100%" height="932px" />
    );
}

export default EmbeddedDashboard;
