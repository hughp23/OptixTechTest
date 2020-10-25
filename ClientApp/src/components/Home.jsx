import React, { Component } from 'react';
import $ from 'jquery';

export class Home extends Component {
    state = {
        cards: [],
        dealtCards: [],
        dealtCardSuit: "",
        dealtCardValue: ""
    }
    render() {
    return (
      <div>
        <h1>Deal/Shuffle Cards</h1>
        <h3>{this.state.dealtCardValue}</h3>
        <h3>{this.state.dealtCardSuit}</h3>

        <button onClick={() => this.shuffleCards()}>Shuffle</button>
        <button onClick={() => this.dealCard()}>Deal</button>
        <button onClick={() => this.resetDeck()}>Reset</button>
      </div>
    );
    }

    shuffleCards = () => {
        const { dealtCards } = this.state;
        console.log(dealtCards, 'dealtCards')

        $.ajax({
            url: 'api/CardData/ShuffleCards',
            type: 'GET',
            data: { dealtCards: JSON.stringify(dealtCards) },
            dataType: 'json',
            success: (data) => {
                console.log(data, 'data');
                this.setState({ cards: data });
                console.log(this.state.cards, 'cards');
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
