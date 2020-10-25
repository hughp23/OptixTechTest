import React, { Component } from 'react';
import $ from 'jquery';
import '../styling/_home.css';
const diamonds = require("../assets/diamonds.png");
const hearts = require("../assets/hearts.png");
const clubs = require("../assets/clubs.png");
const spades = require("../assets/spades.png");

export class Home extends Component {
    state = {
        cards: [],
        dealtCards: [],
        dealtCardSuit: "",
        dealtCardValue: ""
    }
    render() {
        let dealtImg;
        if (this.state.dealtCardSuit === "Diamonds") {
            dealtImg = diamonds
        }
        else if (this.state.dealtCardSuit === "Hearts") {
            dealtImg = hearts
        }
        else if (this.state.dealtCardSuit === "Clubs") {
            dealtImg = clubs
        }
        else if (this.state.dealtCardSuit === "Spades") {
            dealtImg = spades
        }
        return (
          <div>
            <div className="header-container">
                <h1>Deal/Shuffle Cards</h1>
            </div>
            <div className="card-container">
                <h2>Dealt Card</h2>
                <div className="cardDetails-container">
                    <div className="cardDetails">
                        <h3>{this.state.dealtCardValue}</h3>
                        <img src={dealtImg} />
                    </div>
                </div>
                </div>
            <div className="allCards-container">
                <h2>Deck</h2>
                <div className="cards">
                    {this.state.cards.map((card, index) => {
                        let img;
                        let cardValue = '';
                        if (card.suit === "Diamonds") {
                            img = diamonds
                        }
                        else if (card.suit === "Hearts") {
                            img = hearts
                        }
                        else if (card.suit === "Clubs") {
                            img = clubs
                        }
                        else if (card.suit === "Spades") {
                            img = spades
                        }
                        if (card.value === 1) {
                            cardValue = "Ace"
                        }
                        else if (card.value === 11) {
                            cardValue = "Jack"
                        }
                        else if (card.value === 12) {
                            cardValue = "Queen"
                        }
                        else if (card.value === 13) {
                            cardValue = "King"
                        }
                        else {
                            cardValue = card.value;
                        }
                        return (
                            <div className="cardDetails" key={index}>
                                <h4>{cardValue}</h4>
                                <img src={img} />
                            </div>)
                        })}
                </div>
            </div>
            <div className="buttons-container">
                <button onClick={() => this.shuffleCards()}>Shuffle</button>
                <button onClick={() => this.dealCard()}>Deal</button>
                <button onClick={() => this.resetDeck()}>Start Over</button>
            </div>
          </div>
        );
    }

    shuffleCards = () => {
        const { dealtCards } = this.state;
        $.ajax({
            url: 'api/CardData/ShuffleCards',
            type: 'GET',
            data: { dealtCards: JSON.stringify(dealtCards) },
            dataType: 'json',
            success: (data) => {
                if (data !== null) {
                    this.setState({ cards: data });
                }
                else {
                    alert("There has been an error retrieving the shuffled deck of cards!");
                }
            }
        });
    }

    dealCard = () => {
        let { cards, dealtCards } = this.state;
        const selectedCard = cards[0];
        let dealtCardSuit = selectedCard.suit;
        let dealtCardValue = selectedCard.value;
        if (selectedCard.value === 1) {
            dealtCardValue = "Ace"
        }
        else if (selectedCard.value === 11) {
            dealtCardValue = "Jack"
        }
        else if (selectedCard.value === 12) {
            dealtCardValue = "Queen"
        }
        else if (selectedCard.value === 13) {
            dealtCardValue = "King"
        }

        //add card to dealt log
        dealtCards.push({ Value: selectedCard.value, Suit: selectedCard.suit });

        //remove card from deck
        cards.splice(0, 1);

        this.setState({ dealtCardSuit, dealtCardValue, dealtCards, cards });
    }

    resetDeck = () => {
        this.setState({
            cards: [],
            dealtCards: [],
            dealtCardSuit: "",
            dealtCardValue: ""
        })
        this.shuffleCards();
    }

    componentDidMount() {
        this.shuffleCards();
    }
}
