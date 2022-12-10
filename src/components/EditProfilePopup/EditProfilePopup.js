import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import PopupWithForm from '../Popup/PopupWithForm/PopupWithForm';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [placeHolders, setPlaceHolders] = React.useState({});

    React.useEffect(() => {
        setPlaceHolders({
            name: currentUser ? currentUser.name : '',
            about: currentUser ? currentUser.about : ''
        })
    }, [currentUser, props.isEditProfilePopupOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser(placeHolders);
    }

    function handleChange(evt) {
        setPlaceHolders({
            ...placeHolders,
            [evt.target.name]: evt.target.value,
        })
    }

    return (
        <PopupWithForm
            isOpen={props.isEditProfilePopupOpen}
            onClose={props.onClose}
            name="edit-profile"
            title="Редактировать профиль"
            buttonText="Сохранить"
            onSubmit={handleSubmit}
        >
            <input type="text" onChange={handleChange} value={placeHolders.name || ''} className="popup__input popup__input_type_name" id="name-input"
                placeholder="Ваше Имя" required minLength="2" maxLength="40" name="name" />
            <span className="popup__input-error name-input-error"></span>

            <input type="text" onChange={handleChange} value={placeHolders.about || ''} className="popup__input popup__input_type_about" id="about-input"
                placeholder="Интересы" required minLength="2" maxLength="200" name="about" />
            <span className="popup__input-error about-input-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;