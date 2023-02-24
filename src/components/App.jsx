import { React, useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Main from "./Main";
import Movies from "./Movies";
import SavedMovies from "./SavedMovies";
import Profile from "./Profile";
import Register from "./Register";
import Login from "./Login";
import ErrorPage from "./ErrorPage";
import * as auth from "../utils/auth";
import { mainApi } from "../utils/MainApi";
import moviesApi from "../utils/moviesApi";
import { CurrentUserContext } from "../context/currentUserContext";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Footer from "./Footer";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [movies, setMovies] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [moreCards, setMoreCards] = useState(0);
  const [savedMovies, setSavedMovies] = useState([]);
  const { pathname } = useLocation();

  useEffect(() => {
    if (loggedIn)
      mainApi
        .getMovies()
        .then((savedMovies) => {
          setSavedMovies(savedMovies);
        })
        .catch((err) => {
          console.log(err);
        });
    mainApi
      .getProfile()
      .then((currentUserData) => {
        setIsLoading(true);
        setCurrentUser(currentUserData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, [loggedIn]);

  const handleEditProfile = ({ name, email }) => {
    mainApi
      .editProfile({ name, email })
      .then((currentUserData) => {
        setCurrentUser(currentUserData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const tokenCheck = () => {
      const token = localStorage.getItem("token");
      if (token) {
        auth
          .checkToken(token)
          .then((res) => {
            if (res?.data?.email) {
              setLoggedIn(true);
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
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
      })
      .catch((err) => {
        setErrorMessage("Вы ввели неверный логин или пароль.");
        console.log(err);
      });
  };

  useEffect(() => {
    if (!loggedIn) return;
    navigate("movies");
  }, [loggedIn]);

  const handleRegister = (name, email, password) => {
    return auth
      .register(name, email, password)
      .then((data) => {
        if (data) {
          navigate("/signin");
        }
      })
      .catch((err) => {
        setErrorMessage("Что-то пошло не так...");
        console.log(err);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setCurrentUser({});
    setLoggedIn(false);
    navigate("/");
  }

  function checkWidth() {
    setWidth(window.innerWidth);
  }

  const handleWidthResize = () => {
    const foundMovies = JSON.parse(localStorage.getItem("foundMovies"));
    if (foundMovies === null) {
      return;
    }
    if (width >= 1280) {
      setMovies(foundMovies.slice(0, 12));
      setMoreCards(3);
    } if (width > 480 && width < 1280) {
      setMovies(foundMovies.slice(0, 8));
      setMoreCards(2);
    } if (width <= 480) {
      setMovies(foundMovies.slice(0, 5));
      setMoreCards(2);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", checkWidth);
    handleWidthResize();
  }, [width]);

  function searchMovie(movieName, isShortFilms) {
    setIsLoading(true);
    moviesApi
      .getApiMovies()
      .then((movies) => {
        const viewedMovies = movies.filter((item) =>
          item.nameRU.toLowerCase().includes(movieName.toLowerCase())
        );
        const foundMovies = isShortFilms
          ? viewedMovies.filter((item) => item.duration <= 40)
          : viewedMovies;
        localStorage.setItem("foundMovies", JSON.stringify(foundMovies));
        localStorage.setItem("searchMovieName", movieName);
        localStorage.setItem("shortFilms", isShortFilms);
        setIsLoading(false);
        handleWidthResize();
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
        setServerError(true);
      });
  }

  const handleSearch = (movieName, isShortFilms) => {
    searchMovie(movieName, isShortFilms);
  }

  const handleShowMore = () => {
    const foundMovies = JSON.parse(localStorage.getItem("foundMovies"));
    setMovies(foundMovies.slice(0, movies.length + moreCards));
  }

  const isSaved = (movie) => {
    return savedMovies.some(
      (i) => i.movieId === movie.id && i.owner === currentUser._id
    );
  }

  const handleCardSave = (movie) => {
    mainApi
      .addMovie(movie)
      .then((movie) => {
        setSavedMovies([...savedMovies, movie.data]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const handleCardDelete = (movie) => {
    const movieCard = savedMovies.find(
      (i) =>
        i.movieId === (movie.id || movie.movieId) && i.owner === currentUser._id
    );
    console.log(movieCard)
    if (!movieCard) return;
    mainApi
      .deleteMovie(movieCard._id)
      .then(() => {
        //console.log(savedMovies.filter((c) => c._id !== movieCard._id))
        setSavedMovies(savedMovies.filter((c) => c._id !== movieCard._id));
       /*mainApi
        .getMovies()
        .then((savedMovies) => {
          setSavedMovies(savedMovies);
        })
        .catch((err) => {
          console.log(err);
        });*/
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          {pathname === "/" ||
          pathname === "/profile" ||
          pathname === "/movies" ||
          pathname === "/saved-movies" ? (
            <Header loggedIn={loggedIn} />
          ) : (
            ""
          )}
          <Routes>
            <Route path="/" element={<Main loggedIn={loggedIn} />} />
            <Route
              path="/movies"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Movies
                    component={Movies}
                    handleSearch={handleSearch}
                    defaultValue={localStorage.getItem("searchMovieName") || ""}
                    cards={movies}
                    handleShowMore={handleShowMore}
                    isSaved={isSaved}
                    onCardSave={handleCardSave}
                    onCardDelete={handleCardDelete}
                    serverError={serverError}
                    loading={isLoading}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <SavedMovies
                    component={SavedMovies}
                    loading={isLoading}
                    cards={savedMovies}
                    isSaved={isSaved}
                    onCardDelete={handleCardDelete}
                    serverError={serverError}
                    handleSearch={handleSearch}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Profile
                    component={Profile}
                    onEditProfile={handleEditProfile}
                    handleSignOut={handleSignOut}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signin"
              element={
                <Login onLogin={handleLogin} errorMessage={errorMessage} />
              }
            />
            <Route
              path="/signup"
              element={
                <Register
                  onRegister={handleRegister}
                  errorMessage={errorMessage}
                />
              }
            />

            <Route path="*" element={<ErrorPage />} />
          </Routes>
          {pathname === "/" ||
          pathname === "/movies" ||
          pathname === "/saved-movies" ? (
            <Footer />
          ) : (
            ""
          )}
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
