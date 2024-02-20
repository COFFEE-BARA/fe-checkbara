import React from 'react';

function EmbeddedDashboard() {
    // 로그인 정보
    const username = 'elastic';
    const password = 'RS8rIglWM3Wr3K8b0gR4uIfp';

    // 링크
    const embeddedLink = 'https://smw-coffeebara.kb.us-east-2.aws.elastic-cloud.com:9243/app/dashboards#/view/0af5f220-d022-11ee-b9f1-c5b…60000),time:(from:now-15m,to:now))';

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

    // Base64로 인코딩
    const encodedContent = btoa(iframeContent);

    // iframe을 포함하는 URL
    const embeddedUrl = `data:text/html;base64,${encodedContent}`;

    return (
        <iframe src={embeddedUrl} width="100%" height="600px" />
    );
}

export default EmbeddedDashboard;
