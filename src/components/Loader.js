import React, { useEffect } from 'react';
import '../css/section.css'
import '../css/loader.css'
import '../css/index.css'

function Loader() {
    useEffect(() => {
        return () => {
            // 컴포넌트가 언마운트될 때 loader를 제거
            removeLoader();
        };
    }, []);

    const removeLoader = () => {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.remove();
        }
    };
}

export default Loader;
