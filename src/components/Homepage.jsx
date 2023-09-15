import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Hero from "./Hero";
import MovieList from "./MovieList";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";
import Footer from "./Footer";

const Homepage = ({ searchQuery, onSearchInputChange, onHandleSearch }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = "dae42ea105aaad8d2419842ebb6c679e";
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_year=2023&sort_by=vote_average.desc&vote_count.gte=1000`;

    axios
      .get(apiUrl)
      .then((response) => {
        setMovies(response.data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        const errorMessage = error;
        setError(errorMessage);
      });
  }, []);

  return (
    <div className="relative">
      {isLoading ? (
        <LoadingPage />
      ) : error ? (
        <ErrorPage error={error} />
      ) : (
        <>
          <Navbar
            searchQuery={searchQuery}
            onSearchInputChange={onSearchInputChange}
            onHandleSearch={onHandleSearch}
          />
          <Hero heroMovies={movies} />
          <MovieList movieList={movies} />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Homepage;
