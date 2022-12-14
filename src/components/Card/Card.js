import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardAgreement }) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;

    const cardDeleteButtonClassName = (
        `card__delete-button ${isOwn ? 'card__delete-button_active' : 'card__delete-button'}`
    );

    function handleClickImage() {
        onCardClick(card);
    }
    function handleCardLike() {
        onCardLike(card);
    }
    function handleAgreementClick() {
        onCardAgreement(card);
    }

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `card__like-button ${isLiked ? 'card__like-button_active' : 'card__like-button'}`
    );

    return (
        <article id="template" className="card">
            <button
                onClick={handleAgreementClick}
                type="button"
                className={cardDeleteButtonClassName}
            />
            <img
                onClick={handleClickImage}
                className="card__photo"
                src={card.link}
                alt={card.name}
            />
            <div className="card__place">
                <h2 className="card__tittle">{card.name}</h2>
                <div className="card__container">
                    <button
                        onClick={handleCardLike}
                        type="button" aria-label="like"
                        className={cardLikeButtonClassName}
                    />
                    <p className="cards__likes-scorer">{card.likes.length}</p>
                </div>
            </div>
        </article>
    )
}

export default Card;