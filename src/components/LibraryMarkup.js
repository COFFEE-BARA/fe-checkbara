import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup } from "react-leaflet";
import AWS from "aws-sdk";
import markerImage from '../images/library.png';

function LibraryMarkup({ currentMyLocation, map }) { //NaverMap에서 isbn값 받아와서 넘겨줘야함
    const [libraries, setLibraries] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [currentMyLocation, setCurrentMyLocation] = useState(null); 

    useEffect(() => {
        const sendLocationToServer = async () => {
            try {
                // Axios를 사용해 서버의 엔드포인트로 POST 요청 보내기
                const response = await axios.post('/api/book/9788956609959/lending-library', { currentMyLocation });
                console.log('Location sent to server:', response.data);
            } catch (error) {
                console.error('Error sending location to server:', error);
            }
        };

        // 컴포넌트가 처음 렌더링될 때 한 번만 위치 정보를 서버에 전송함
        if (currentMyLocation) {
            sendLocationToServer();
        }
    }, [currentMyLocation]);

    useEffect(() => {
        AWS.config.update({
            region: process.env.REACT_APP_REGION,
            credentials: new AWS.Credentials({
                accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
                secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
            })
        });

        const docClient = new AWS.DynamoDB.DocumentClient();

        const params = {
            TableName: process.env.REACT_APP_TABLE_NAME 
        };

        docClient.scan(params, function(err, data) {
            if (err) {
                console.error("Error fetching data from DynamoDB:", err);
            } else {
                setLibraries(data.Items);
                setLoading(false);
            }
        });
        
    }, []);

    useEffect(() => {
        // libraries에는 latitude, longitude, libName, libCode만 있음

        if (!loading && currentMyLocation) {
            libraries.forEach(loc => {
                const marker = new window.naver.maps.Marker({
                    position: new window.naver.maps.LatLng(loc.latitude, loc.longitude),
                    map: map,
                    icon: {
                        content: `<img src="${markerImage}" alt= "${loc.libName}" Marker" style="width:30px; height:30px;">`,
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
                });
            });
        }
    }, [currentMyLocation, loading, libraries]);

    return (
        <>
            {loading && <div>Loading...</div>}
            <MapContainer>
                {libraries.map(library => (
                    <Marker
                        key={library.libCode}
                        position={[parseFloat(library.latitude), parseFloat(library.longitude)]}
                    >
                        <Popup>{library.libName}</Popup>
                    </Marker>
                ))}
            </MapContainer>
            
        </>
    )
}

export default LibraryMarkup;
