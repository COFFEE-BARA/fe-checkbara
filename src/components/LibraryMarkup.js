import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup } from "react-leaflet";

import aladinIcon from "../images/aladin.png";
import kyoboIcon from "../images/kyobo.png";
import ypbookIcon from "../images/ypbooks.png";
import libraryIcon from "../images/library.png";

function LibraryMarkup({ currentMyLocation, map, isbn }) { //NaverMap에서 isbn값 받아와서 넘겨줘야함
    const [libraries, setLibraries] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        fetch(`/api/book/${isbn}/library`)
            .then(response => response.json())
            .then(data => {
                setLibraries(data); 
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data from backend:", error);
            });
        
    }, []);

    useEffect(() => {
        if (!loading && currentMyLocation) {
            libraries.forEach(loc => {
                const marker = new window.naver.maps.Marker({
                    position: new window.naver.maps.LatLng(loc.latitude, loc.longitude),
                    map: map,
                    icon: {
                        content: `<img src="${libraryIcon}" alt= "${loc.libName}" Marker" style="width:30px; height:30px;">`,
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
