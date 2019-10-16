import React, { useState, useEffect } from 'react';
import axios from 'axios';

// For debugging & learning purposes
// let countMovie = 0;

const Movie = (props) => {
  // For debugging & learning purposes
  // console.log(`In Movie function and its count is: ${countMovie}`);
  // console.log("In Movie function and its props is: ",props);
  // countMovie++;  
  
  const [movie, setMovie] = useState({});
  

  useEffect(() => {
    // const id = 1;
    const id = props.match.params.bananaID;
    // change ^^^ that line and grab the id from the URL
    // You will NEED to add a dependency array to this effect hook

       axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(response => {
          // console.log("In useEffect of Movie function and its response is:",response);
          setMovie(response.data);
          // console.log("In useEffect of Movie function and after the setMovie statement and movie is:",movie);
        })
        .catch(error => {
          console.error(error);
        });

  },[props.match.params.bananaID]);
  
  // Uncomment this only when you have moved on to the stretch goals
  // const saveMovie = () => {
  //   const addToSavedList = props.addToSavedList;
  //   addToSavedList(movie)
  // }


  // console.log("In Movie function right before the if statment and its movie object is:",movie);



  if (!movie.title) {
    return <div>Loading movie information...</div>;
  }

  const { title, director, metascore, stars } = movie;
  return (
    <div className="save-wrapper">
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
      {/* <div className="save-button" >Save</div> */}
      {/* <div className="save-button" onClick={props.addToSavedList(movie)}>Save</div> */}
      {/* <div className="save-button" onClick={ () => saveMovie(movie) }>Save</div> */}
      <div className="save-button" onClick={ () => props.addToSavedList(movie) }>Save</div>
    </div>
  );
}



export default Movie;
