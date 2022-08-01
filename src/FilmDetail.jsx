import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TMDB_API_KEY } from './APIkey';
import './FilmDetail.css';

function FilmDetail(props) {
  const params = useParams();
  const [movieDetail, setMovieDetail] = useState([]);
  const [moreDetailClicked, setMoreDetailClicked] = useState(false);

  // parameter Format
  const paramFormat = (data) => {
    return {
      id: data.id,
      title: data.title,
      posterURL: `https://image.tmdb.org/t/p/w780${data.poster_path}`,
      backdropURL: `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`,
      overview: data.overview,
      tagline: data.tagline,
    };
  };

  useEffect(() => {
    // get More Detail by ID
    const getMovieDetail = async (id) => {
      // check error by js try & catch
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`
        );
        if (!response.ok) {
          throw new Error('Something went wrong');
        }

        const datas = await response.json();
        console.log(datas);
        setMovieDetail(paramFormat(datas));

        // const preTagline = await datas.tagline;
      } catch (error) {
        console.log(error);
      }
    };
    setMoreDetailClicked(false);
    getMovieDetail(params.FilmId);
  }, [params]);

  if (!params.FilmId) {
    console.log(params.FilmId);
    return <FilmDetailEmpty />;
  }

  return (
    <div className="FilmDetail is-hydrated">
      <figure className="film-backdrop">
        <img
          src={movieDetail.backdropURL}
          alt={`${movieDetail.title} backdrop`}
        />
        <h1 className="film-title">{movieDetail.title}</h1>
      </figure>

      <div className="film-meta">
        <p className="film-detail-overview">
          <img
            src={movieDetail.posterURL}
            className="film-detail-poster"
            alt={`${movieDetail.title} poster`}
          />
        </p>
        {moreDetailClicked && <h2>{movieDetail.tagline}</h2>}
        {movieDetail.tagline === '' && (
          <p style={{ color: 'black' }}> !! tagline is missing !!</p>
        )}

        {movieDetail.overview}
      </div>
      <div>
        <button className="details" onClick={() => setMoreDetailClicked(true)}>
          <span className="material-icons">read_more</span>
        </button>
      </div>
    </div>
  );
}

function FilmDetailEmpty() {
  return (
    <div className="FilmDetail">
      <p>
        <i className="material-icons">subscriptions</i>
        <span>No film selected</span>
      </p>
    </div>
  );
}

export default FilmDetail;
