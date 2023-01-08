import { React, useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Main from './Main';
import Movies from './Movies';
import SavedMovies from './SavedMovies';
import Profile from "./Profile";
import Register from './Register';
import Login from './Login';
import ErrorPage from './ErrorPage';
import * as auth from "../utils/auth";
import { mainApi } from "../utils/MainApi";
import moviesApi from "../utils/moviesApi";
import CurrentUserContext from "../context/currentUserContext";
import ProtectedRoute from "./ProtectedRoute";

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
  const location = useLocation;
  
  function getSavedMovies() {
    mainApi.getMovies()
      .then((savedMovies) => {
        setSavedMovies(savedMovies)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  useEffect(() => {  
    
    const path = location.pathname
    mainApi.getProfile()
    .then((currentUserData) => {
      setLoggedIn(true);
      navigate.push(path);
      setCurrentUser(currentUserData);
      getSavedMovies();
    })
    .catch((err) => {
      console.log(err.message);
    })
    .finally(() => setIsLoading(false));
  }, []);

  const handleEditProfile = ({ name, email }) => {
    mainApi
      .editProfile({ name, email })
      .then((currentUserData) => {
        setCurrentUser(currentUserData);
      })
      .catch((err) => {
        setErrorMessage('Что-то пошло не так...')
        console.log(err);
      });
  }

  useEffect(() => {
    const tokenCheck = () => {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        auth
          .checkToken(jwt)
          .then((res) => {
            if (res?.data?.email) {
              setEmail(res.email);
              setLoggedIn(true);
              navigate.push("/movies");
            }
          })
          .catch((err) => console.log(err));
      }
    };
    tokenCheck();
  }, [navigate]);

  const handleLogin = (email, password) => {
    return auth
      .login(email, password)
      .then((data) => {
        if (!data?.token) {
          return Promise.reject("No data");
        }
        localStorage.setItem("jwt", data.token);
        setEmail(email);
        setLoggedIn(true);
      })
      .catch((err) => {
        setErrorMessage('Что-то пошло не так...')
        console.log(err);
      });
  };

  useEffect(() => {
    if (!loggedIn) return;
    navigate.push("/movies");
  }, [navigate, loggedIn]);

  const handleRegister = (name, email, password) => {
    return auth
      .register(name, email, password)
      .then((res) => {
        console.log(res);
        navigate.push("/signin");
      })
      .catch((err) => {
        setErrorMessage('Что-то пошло не так...')
        console.log(err)
      });
  };

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setCurrentUser({});
    setLoggedIn(false);
    navigate.push("/signin");
  }


  useEffect(() => {
    if (!loggedIn) return;
    navigate.push("/movies");
  }, [loggedIn, navigate]);



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
    mainApi.addMovie(movie)
      .then((movieData) => {
        setSavedMovies([...savedMovies, movieData])
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  function handleCardDelete(card) {
    const deleteCard = savedMovies.find(c => c.movieId === (card.id || card.movieId) && c.owner === currentUser._id)
    if (!deleteCard) return
    mainApi.deleteMovie(deleteCard._id)
      .then(() => {
        setSavedMovies(savedMovies.filter(c => c._id !== deleteCard._id))
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return ( 
    <CurrentUserContext.Provider value={currentUser}>
    <div className="body">
      <div className="page">
        <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route path="/movies" element={
          
          <Movies
          component={Movies}
          loggedIn={loggedIn}
          handleSearch={handleSearch}
          defaultSearchValue={localStorage.getItem('searchMovieName') || ""}
          cards={movies}
          handleShowMore={handleShowMore}
          isSaved={isSaved}
          onCardSave={handleCardSave}
          onCardDelete={handleCardDelete}
          serverError={serverError}
          loading={isLoading}
          />
      
          } /> 
          <Route path="/saved-movies" element={<SavedMovies 
          component={SavedMovies}
          loading={isLoading}
          cards={savedMovies}
          isSaved={isSaved}
          onCardDelete={handleCardDelete}
          serverError={serverError}
        />} />
          <Route path="/profile" element={<Profile
          component={Profile}
          loggedIn={loggedIn}
          handleEditProfile={handleEditProfile}
          handleSignOut={handleSignOut}
        />} />  
          <Route path="/signin" element={<Login
           onLogin={handleLogin}
           errorMessage={errorMessage}
           />} />
          <Route path="/signup" element={<Register onRegister={handleRegister} errorMessage={errorMessage} />} />
          <Route path="*"
             element={<ErrorPage />} />     
        </Routes> 
        
     </div>
     </div>
     </CurrentUserContext.Provider>
      );
    }

  export default App;