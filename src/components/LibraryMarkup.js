import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup } from "react-leaflet";
import AWS from "aws-sdk";
import markerImage from '../images/library.png';

function LibraryMarkup({ currentMyLocation, map }) {
    const [libraries, setLibraries] = useState([]);
    const [loading, setLoading] = useState(true); 

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
                        content: `<img src="${markerImage}" Marker" style="width:30px; height:30px;">`,
                        anchor: new window.naver.maps.Point(15, 30),
                    },
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
