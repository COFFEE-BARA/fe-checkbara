import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil';

import NaverMap from './components/NaverMap';
import MainPage from './components/MainPage';
import Distance from './components/LibraryMarkup';

function App() {
    return (
        <>
            <BrowserRouter>
                <RecoilRoot>
                    <Routes>
                        <Route path="/" element={<NaverMap />}></Route>
                        <Route path="/distance" element={<Distance />}></Route>
                    </Routes>
                </RecoilRoot>
            </BrowserRouter>
        </>
    )
}
export default App;