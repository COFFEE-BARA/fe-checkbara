import { BrowserRouter, Route, Routes } from 'react-router-dom'

import MainPage from './components/MainPage';
import BookDetailPage from './components/BookDetailPage';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<BookDetailPage />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default App;