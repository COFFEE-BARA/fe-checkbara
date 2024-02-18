import React from 'react';
import InputSection from './InputSection';

function Header({ onSearch }) {
    return (
        <InputSection onSearch={onSearch} />
    );
}

export default Header;
