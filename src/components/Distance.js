import React, { useEffect, useState } from "react";
import AWS from "aws-sdk";

function Distance({ currentMyLocation }) {
    const [libraries, setLibraries] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [distances, setDistances] = useState([]);

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
        if (currentMyLocation && !loading) {
            const distances = libraries.map(library => {
                const distance = calculateDistance(
                    currentMyLocation.lat,
                    currentMyLocation.lng,
                    library.latitude,
                    library.longitude
                );
                return { library, distance };
            });
            setDistances(distances);
        }
    }, [currentMyLocation, loading, libraries]);

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const toRadians = (angle) => angle * (Math.PI / 180);
        const earthRadius = 6371;

        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = earthRadius * c; 
        return distance;
    };

    if (loading) {
        return <div> Loading... </div>;
    }

    return (
        <div>
            <h2>Library Distances:</h2>
            <ul>
                {distances.map(({ library, distance }) => (
                    <li key={library.libCode}>
                        {library.libName}: {distance} km
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Distance;
