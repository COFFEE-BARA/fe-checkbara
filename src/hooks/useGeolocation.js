import { useState, useEffect } from 'react';

const useGeolocation = () => {
    const [location, setlocation] = useState({
        loaded: true,
        coordinates: { lat:0, lng:0 },
    });

    const onSuccess = (location) => {
        if (location.coords && location.coords.latitude && location.coords.longitude) {
            setlocation({
                loaded: false,
                coordinates: {
                    lat: location.coords.latitude,
                    lng: location.coords.longitude,
                },
            });
        }
    };

    const onError = (error) => {
        setlocation({
            loaded: true,
            error,
        });
    };

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "현재 위치 정보를 가져오지 못했습니다."
            });
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);

    return location;
}

export default useGeolocation;