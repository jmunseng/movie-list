/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import FilmDetail from './FilmDetail';
import FilmRow from './FilmRow';
import { TMDB_API_KEY } from './APIkey';
import { Outlet, useNavigate } from 'react-router-dom';

import './FilmLibrary.css';

function FilmLibrary() {
  const [FavouriteList, setFavouriteList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const [movieListTrigger, setmovieListTrigger] = useState(false);
  const [pageNum, setPageNum] = useState(2);
  const [loading, setLoading] = useState(false);

  const yearInput = useRef('');

  const navigate = useNavigate();

  // parameter Format
  const paramFormat = (params) => {
    return {
      id: params.id,
      title: params.title,
      posterURL: `https://image.tmdb.org/t/p/w780${params.poster_path}`,
      backdropURL: `https://image.tmdb.org/t/p/w1280${params.backdrop_path}`,
      overview: params.overview,
    };
  };

  const getMovieList = async (year, page, loadmore) => {
    if (!TMDB_API_KEY) {
      console.log('API key is missing');
    }

    const moviseURL = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&primary_release_year=${year}&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`;

    const resolve = await fetch(moviseURL);
    const parsedResolve = await resolve.json();
    const newMovieList = parsedResolve.results;

    if (newMovieList.length === 0 || newMovieList.length === undefined) {
      console.log('Fetch didnt get data from API');
    }

    if (!resolve.ok) {
      console.log('getMovieList is wrong');
    }

    if (loadmore) {
      setMovieList((prev) => [...prev, ...newMovieList]);
      setLoading(false);
    } else {
      setMovieList(newMovieList);
    }
  };

  // get movie data from API
  useEffect(() => {
    const year = new Date().getFullYear();

    // check error use promise nested catch() func
    getMovieList(year, 1).catch((err) => {
      console.log(err);
    });
  }, []);

  // onClick hander
  const filmOnClickedHandler = (param) => {
    navigate(`./${param.id}`);
  };
  //  add to Favourite list
  const addToFavouriteHandler = (movie) => {
    setFavouriteList((prev) => {
      console.log(prev);
      if (prev.includes(movie)) {
        return prev;
      } else {
        return [...prev, movie];
      }
    });
  };

  // remove from favourite list
  const removeFromFavouriteHandler = (movie) => {
    const newFavourate = FavouriteList.filter((item) => item.id !== movie.id);

    setFavouriteList(newFavourate);
  };

  const list = !movieListTrigger
    ? movieList.map((movie, k) => {
        return (
          <FilmRow
            key={k}
            title={movie.title}
            year={movie.release_date}
            poster_path={movie.poster_path}
            onClicked={filmOnClickedHandler.bind(null, paramFormat(movie))}
            addToFavourite={addToFavouriteHandler.bind(null, movie)}
          />
        );
      })
    : FavouriteList.map((movie, k) => {
        return (
          <FilmRow
            key={k}
            title={movie.title}
            year={movie.release_date}
            poster_path={movie.poster_path}
            onClicked={filmOnClickedHandler.bind(null, paramFormat(movie))}
            addToFavourite={addToFavouriteHandler.bind(null, movie)}
            added={movieListTrigger}
            removeFromFavourite={removeFromFavouriteHandler.bind(null, movie)}
          />
        );
      });

  // change films Year
  const onChangedYearHandler = (year) => {
    getMovieList(year);
  };

  // load more list
  const loadMoreLists = () => {
    setLoading(true);
    const year = yearInput.current.value;
    setPageNum(pageNum + 1);
    getMovieList(year, pageNum, true).catch((err) => {
      console.log('loadMoreLists', err);
    });
  };

  return (
    <div className="FilmLibrary">
      <div className="film-list">
        <h1 className="section-title">
          FILMS
          <select
            name="year"
            id="year"
            onChange={(e) => onChangedYearHandler(e.target.value)}
            ref={yearInput}
          >
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
          </select>
        </h1>

        <div className="film-list-filters">
          <button
            className={`film-list-filter ${!movieListTrigger && 'is-active'}`}
            onClick={() => setmovieListTrigger(false)}
          >
            ALL
            <span className="section-count">{movieList.length}</span>
          </button>
          <button
            className={`film-list-filter ${movieListTrigger && 'is-active'}`}
            onClick={() => setmovieListTrigger(true)}
          >
            FAVES
            <span className="section-count">{FavouriteList.length}</span>
          </button>
        </div>
        {list}
        {!movieListTrigger && (
          <button className="load_more" onClick={loadMoreLists}>
            {loading ? 'Loading' : 'Load More'}
          </button>
        )}
      </div>
      <div className="film-details">
        <h1 className="section-title">DETAILS</h1>
        {/* <FilmDetail /> */}
        <Outlet />
      </div>
    </div>
  );
}

export default FilmLibrary;
