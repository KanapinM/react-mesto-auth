import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import api from '../utils/Api';
import auth from '../utils/Auth';

import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import InfoTooltip from './InfoTooltip/InfoTooltip';

import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import Footer from '../components/Footer/Footer';
import ImagePopup from '../components/Popup/ImagePopup/ImagePopup';
import EditProfilePopup from '../components/EditProfilePopup/EditProfilePopup'
import EditAvatarPopup from '../components/EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from '../components/AddPlacePopup/AddPlacePopup';
import AgreementPopup from '../components/AgreementPopup/AgreementPopup';

function App() {
  const history = useHistory();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAgreementPopupOpen, setIsAgreementPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [card, setCard] = React.useState({});
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [email, setEmail] = React.useState({});
  const [responce, setResponce] = React.useState(false);


  React.useEffect(() => {
    tokenCheck();
  }, []);
  React.useEffect(() => {
    history.push('/');
    Promise.all([api.getUserData(), api.getInitialCards()])
      .catch((err) => console.log(err))
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards.map((card) => (card)
        ));
      })

  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleAgreementClick(card) {
    setIsAgreementPopupOpen(true);
    setCard(card);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
  }
  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards(cards.filter((cards) => cards._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  function handleUpdateUser(dataUser) {
    api
      .editUserData(dataUser)
      .catch((err) => console.log(err))
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
  }
  function handleUpdateAvatar(dataAvatar) {
    api
      .changeAvatar(dataAvatar)
      .catch((err) => console.log(err))
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
  }
  function handleAddPlace(newCard) {
    api
      .addCard(newCard)
      .catch((err) => console.log(err))
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
  }

  function handleLogin(email, password) {
    auth
      .signin(email, password)
      .then((data) => {
        if (data.token) {
          setEmail(email);
          setLoggedIn(true);
          history.push('/');
          return data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegister(email, password) {
    auth
      .signup(email, password)
      .then((data) => {
        if (data) {
          setEmail(email);
          setLoggedIn(true);
          setInfoTooltipOpen(true);
          handleInfoTooltip(true);
          history.push('/signin');
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipOpen(true);
        handleInfoTooltip(false);
      });
  }

  function onQuit() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      return auth
        .getToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email);
            history.push('/');
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function handleInfoTooltip(boolean) {
    setInfoTooltipOpen(true);
    setResponce(boolean);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAgreementPopupOpen(false);
    setSelectedCard(null);
    setInfoTooltipOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={email}
          onQuit={onQuit}
        />
        <Switch>

          <Route path="/signup">
            <Register auth={auth} onSubmit={handleRegister} />
            <InfoTooltip
              isInfoTooltipOpen={isInfoTooltipOpen}
              onClose={closeAllPopups}
            />

          </Route>

          <Route path="/signin">
            <Login auth={auth} onSubmit={handleLogin} />
          </Route>

          <ProtectedRoute
            exact
            path="/"
            component={Main}
            loggedIn={loggedIn}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardAgreement={handleAgreementClick} />

        </Switch>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
        </Route>
        <Footer />

        <EditProfilePopup
          isEditProfilePopupOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isAddPlacePopupOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

        <EditAvatarPopup
          isEditAvatarPopupOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AgreementPopup
          isAgreementPopupOpen={isAgreementPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          card={card}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isInfoTooltipOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider >

  );
}

export default App;