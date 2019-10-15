import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

// For debugging & learning purposes
//let countMovieList = 0;


const MovieList = props => {
  // For debugging & learning purposes
  // console.log(`In MovieList function and its count is: ${countMovieList}`)
  // countMovieList++;
  
  
  const [movies, setMovies] = useState([])
  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          // console.log("In useEffect of MovieList function and its response is:",response);
          setMovies(response.data);
          // console.log("In useEffect of MovieList function and after the setMovies statment and movies is:",movies);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    
    getMovies();
  }, []);
  
  // console.log("In MovieList function right before the return statment and its movies array is:",movies);

  return (
    <div className="movie-list">
      {movies.map(movie => (
        <MovieDetails key={movie.id} movie={movie} />
      ))}
    </div>
  );
}


// For debugging & learning purposes
// let countMovieDetails = 0;



function MovieDetails({ movie }) {
  const { title, director, metascore, stars } = movie;
  // console.log(`In MovieDetails function and its count is: ${countMovieDetails}`)
  // countMovieDetails++;
  // console.log("In MovieDetails function and its movie parameter is:",movie)

  return (
    <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none' }} >
      <div className="movie-card">
        <h2>{title}</h2>
        <div className="movie-director">
          Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>
        <h3>Actors</h3>

        {stars.map(star => (
          <div key={star} className="movie-star">
            {star}
          </div>
        ))}
      </div>
    </Link>
  );
}

export default MovieList;
