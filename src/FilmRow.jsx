import React from 'react';
import './FilmRow.css';

const FilmRow = (props) => {
  const posterURL = `https://image.tmdb.org/t/p/w780${props.poster_path}`;
  const year = new Date(props.year).getFullYear();
  return (
    <>
      <div className="FilmRow">
        <img src={posterURL} alt={`${props.title} film poster`} />
        <div className="film-summary" onClick={props.onClicked}>
          <h3>{props.title}</h3>
          <p>Released: {year}</p>
        </div>

        {props.added ? (
          <button className="fave" onClick={props.removeFromFavourite}>
            <span className="material-icons">remove_from_queue</span>
          </button>
        ) : (
          <button className="fave" onClick={props.addToFavourite}>
            <span className="material-icons">add_to_queue</span>
          </button>
        )}
      </div>
    </>
  );
};

export default FilmRow;
