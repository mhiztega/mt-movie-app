import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
  const[movies, setMovies] = useState([
    {
      "Title": "Under Paris",
      "Year": "2024",
      "imdbID": "tt13964390",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMDM5ODBiN2ItOTk4Yi00NzgyLWE2YTktYzhjYTc2ODE4ZTE4XkEyXkFqcGc@._V1_SX300.jpg"
  },
  {
      "Title": "Under the Roofs of Paris",
      "Year": "1930",
      "imdbID": "tt0021409",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BZGJiYjkxZTktNDA0OC00MzkxLThjMDgtZTBkZWVjY2Q5ZDM2XkEyXkFqcGdeQXVyNTUyMTMyMDg@._V1_SX300.jpg"
  },
  {
      "Title": "Paris Under Watch",
      "Year": "2012",
      "imdbID": "tt2106321",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BOGM5YTVhNjItNDNkZi00NmUwLTg5YzYtYjE2MmJhZDkyZWVjXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
  },
  ]);
  const[favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async (searchValue) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=a103b6b6`;
    
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
    setMovies(responseJson.Search);
  }
  };

  useEffect(()=>{
    getMovieRequest(searchValue);
  }, [searchValue]); 

  useEffect(()=>{
    const movieFavourites = JSON.parse(localStorage.getItem('mt-movie-app-favourites')
  );

  if (movieFavourites) {
  setFavourites(movieFavourites);
  }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('mt-movie-app-favourites',JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList)
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return ( 
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading = 'MT Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
        <MovieList movies ={movies} handleFavouritesClick ={addFavouriteMovie} 
        favouriteComponent={AddFavourites}/>
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading = 'Favourites' />
      </div>
      <div className='row'>
        <MovieList movies ={favourites} 
        handleFavouritesClick ={removeFavouriteMovie} 
        favouriteComponent={RemoveFavourites}/>
      </div>
    </div>
  );
};

export default App;
