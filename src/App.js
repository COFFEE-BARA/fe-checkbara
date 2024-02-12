import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil';
import Booklist from './Booklist.js'
// import NaverMap from ‘./components/NaverMap’;
// import MainPage from ‘./components/MainPage’;
import MainPage from './components/MainPage'

function App() {
    return (
        <>
            <BrowserRouter>
                <RecoilRoot>
                    <Routes>
                        <Route path="/" element={<Booklist />}></Route>
                        <Route path="/" element={<MainPage />}></Route>
                    </Routes>
                </RecoilRoot>
            </BrowserRouter>
        </>
    )
}
export default App;