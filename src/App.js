import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import FilmLibrary from './FilmLibrary';
import NoFoundPage from './NoFoundPage';
import FilmDetail from './FilmDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<FilmLibrary />}>
          <Route path=":FilmId" element={<FilmDetail />} />
        </Route>

        <Route path="*" element={<NoFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
