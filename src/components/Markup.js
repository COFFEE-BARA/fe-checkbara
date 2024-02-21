import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup } from "react-leaflet";
// import { useLocation } from "react-router-dom";

import aladinIcon from "../images/aladin.png";
import kyoboIcon from "../images/kyobo.png";
import ypbookIcon from "../images/ypbooks.png";
import libraryIcon from "../images/library.png";

function Markup({ path, result, currentMyLocation, map, isbn }) {
    const [bookplaces, setBookplaces] = useState([]);
    // const [libraries, setLibraries] = useState([]);
    const [loading, setLoading] = useState(true); 
    let icon, name;
    let array=[], marker;

    useEffect(() => {
        if (result) {
            for (var i = 0; i < 3; i++) {
                if (result[i]) {
                    for (var j = 0; j < result[i].length; j++) {
                        let icon;
                        switch (result[i][j].type) {
                            case "교보문고":
                                icon = kyoboIcon;
                                break;
                            case "알라딘":
                                icon = aladinIcon;
                                break;
                            case "영풍문고":
                                icon = ypbookIcon;
                                break;
                            default:
                                icon = libraryIcon;
                        }
                        marker = new window.naver.maps.Marker({
                            position: new window.naver.maps.LatLng(result[i][j].latitude, result[i][j].longitude),
                            map: map,
                            icon: {
                                content: `<img src="${icon}" alt="${result[i][j].name} Marker" style="width:30px; height:30px;">`,
                                anchor: new window.naver.maps.Point(15, 30),
                            },
                        });
                        array.push(marker);
        
                        marker.addListener('mouseover', () => {
                            new window.naver.maps.InfoWindow({
                                content: result[i][j].name,
                                position: marker.getPosition(),
                            }).open(map, marker);
                        });
        
                        marker.addListener('mouseout', () => {
                            map.closeInfoWindow();
                        });
                    }
                }
            }
        }
        console.log(marker);
    }, [result]);
    

    return (
        <>
            {loading && <div>Loading...</div>}
            <MapContainer>
                {bookplaces.map(bookplace => (
                    <Marker
                        key={bookplace.name}
                        position={[parseFloat(bookplace.latitude), parseFloat(bookplace.longitude)]}
                    >
                        <Popup>{bookplace.name}</Popup>
                    </Marker>
                ))}
            </MapContainer>
            
        </>
    )
}

export default Markup;
