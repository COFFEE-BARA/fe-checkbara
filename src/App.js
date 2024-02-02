import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil';

import NaverMap from './components/NaverMap';
import MainPage from './components/MainPage';

function App() {
    return (
        <>
            <BrowserRouter>
                <RecoilRoot>
                    <Routes>
                        <Route path="/" element={<NaverMap />}></Route>
                    </Routes>
                </RecoilRoot>
            </BrowserRouter>
        </>
    )
}
export default App;