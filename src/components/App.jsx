import { React, useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Main from './Main';
import Movies from './Movies';
import SavedMovies from './SavedMovies';
import Profile from "./Profile";
import Register from './Register';
import Login from './Login';
import ErrorPage from './ErrorPage';
import * as auth from "../utils/auth";
import { api } from "../utils/Api";
import moviesApi from "../utils/moviesApi";
import CurrentUserContext from "../context/currentUserContext";

function App() {
 const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [movies, setMovies] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [moreCards, setMoreCards] = useState(0);
  const [savedMovies, setSavedMovies] = useState([]);
  

  useEffect(() => {
    setIsLoading(true);

    if (loggedIn)
      api
        .getProfile()
        .then((currentUserData) => {
          setCurrentUser(currentUserData);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoading(false));
  }, [loggedIn]);

  useEffect(() => {
    const tokenCheck = () => {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        auth
          .checkToken(jwt)
          .then((res) => {
            if (res?.data?.email) {
              setEmail(res.data.email);
              setLoggedIn(true);
              navigate.push("/movies");
            }
          })
          .catch((err) => console.log(err));
      }
    };
    tokenCheck();
  }, []);


  const handleLogin = (email, password) => {
    return auth
      .login(email, password)
      .then((data) => {
        if (!data?.token) {
          return Promise.reject("No data");
        }
        localStorage.setItem("jwt", data.token);
        setEmail(data.email);
        setLoggedIn(true);
        navigate.push("/movies");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /*React.useEffect(() => {
    if (!loggedIn) return;
    navigate.push("/movies");
  }, [loggedIn]);*/


  const handleRegister = (name, email, password) => {
    return auth
      .register(name, email, password)
      .then((res) => {
        console.log(res);
        handleLogin(email, password)
        navigate.push("/signin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function checkWindowWidth() {
    setWindowWidth(window.innerWidth)
  }

  function handleResize() {
    const foundMovies = JSON.parse(localStorage.getItem('foundMovies'))
    if (foundMovies === null) {
      return
    }
    if (windowWidth >= 1280) {
      setMovies(foundMovies.slice(0, 12))
      setMoreCards(3)
    } else if (windowWidth > 480 && windowWidth < 1280) {
      setMovies(foundMovies.slice(0, 8))
      setMoreCards(2)
    } else if (windowWidth <= 480) {
      setMovies(foundMovies.slice(0, 5))
      setMoreCards(2)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', checkWindowWidth)
    handleResize()
  }, [windowWidth])


  function searchMovie(movieName, isShortFilms) {
    setIsLoading(true)
    moviesApi.getApiMovies()
      .then((movies) => {
        const searchedMovies = movies.filter((item) => item.nameRU.toLowerCase().includes(movieName.toLowerCase()))
        const foundMovies = isShortFilms ? searchedMovies.filter((item) => item.duration <= 40) : searchedMovies
        localStorage.setItem('foundMovies', JSON.stringify(foundMovies))
        localStorage.setItem('searchMovieName', movieName)
        localStorage.setItem('shortFilms', isShortFilms)
        setIsLoading(false)
        handleResize()
      })
      .catch((err) => {
        console.log(err.message)
        setIsLoading(false)
        setServerError(true)
      })
  }

  function handleSearch(movieName, isShortFilms) {
    searchMovie(movieName, isShortFilms)
  }

  function handleShowMore() {
    const foundMovies = JSON.parse(localStorage.getItem('foundMovies'))
    setMovies(foundMovies.slice(0, movies.length + moreCards))
  }

  function isSaved(card) {
    return savedMovies.some(item => item.movieId === card.id && item.owner === currentUser._id)
  }

  function handleCardSave(movie) {
    api.addMovie(movie)
      .then((movieData) => {
        setSavedMovies([...savedMovies, movieData.data])
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  function handleCardDelete(card) {
    const deleteCard = savedMovies.find(c => c.movieId === (card.id || card.movieId) && c.owner === currentUser._id)
    if (!deleteCard) return
    api.deleteMovie(deleteCard._id)
      .then(() => {
        setSavedMovies(savedMovies.filter(c => c._id !== deleteCard._id))
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  function handleEditProfile(name, email) {
    api.editProfile({ name, email })
      .then(() => {
        setCurrentUser({ name, email })
      })
      .catch((err) => {
        setErrorMessage('Что-то пошло не так...')
        console.log(err.message)
      })
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setCurrentUser({});
    setLoggedIn(false);
    navigate.push("/signin");
  }

  return ( 
    <CurrentUserContext.Provider value={currentUser}>
    <div className="body">
      <div className="page">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies
          
          handleSearch={handleSearch}
          defaultSearchValue={localStorage.getItem('searchMovieName') || ""}
          cards={movies}
          handleShowMore={handleShowMore}
          isSaved={isSaved}
          onCardSave={handleCardSave}
          handleCardDelete={handleCardDelete}
          serverError={serverError}
          loading={isLoading}
          />} /> 
          <Route path="/saved-movies" element={<SavedMovies 
          
          loading={isLoading}
          cards={savedMovies}
          isSaved={isSaved}
          handleCardDelete={handleCardDelete}
          serverError={serverError}
        />} />
          <Route path="/profile" element={<Profile
          loggedIn={loggedIn}
          handleEditProfile={handleEditProfile}
          handleSignOut={handleSignOut}
        />} />  
          <Route path="/signin" element={<Login
           onLogin={handleLogin}
           />} />
          <Route path="/signup" element={<Register onRegister={handleRegister} />} />
          <Route path="*"
             element={<ErrorPage />} />     
        </Routes> 
        
     </div>
     </div>
     </CurrentUserContext.Provider>
      );
    }

  export default App;