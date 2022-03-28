import "./App.css";
import React, { useEffect, useState } from "react";
import SingleCard from "./SingleCard";

const cardImages = [
  {"src":"/image/g-idle.png",matched: false},
  {"src":"/image/blackpink.png",matched: false},
  {"src":"/image/mamamoo.png",matched: false},
  {"src":"/image/monst-x.png",matched: false},
  {"src":"/image/exo.png",matched: false},
  {"src":"/image/seventeen.png",matched: false}
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne,setChoiceOne] = useState(null)
  const [choiceTwo,setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards);
    setTurns(0);
  };

const handleChoice = (card) => {
  choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
}

useEffect(()=>{
  if (choiceOne && choiceTwo){
    setDisabled(true)
    if (choiceOne.src === choiceTwo.src){
      setCards(prevCards => {
        return prevCards.map(card => {
          if(card.src === choiceOne.src){
            return{...card, matched: true}
          } else {
            return card
          }
        })
      })
      resetTurn()
    } else{
      setTimeout(() => resetTurn(), 1000) 
    }
  }
},[choiceOne,choiceTwo])

console.log(cards)

const resetTurn = () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns => prevTurns + 1)
  setDisabled(false)
}
 
useEffect(()=>{
  shuffleCards()
})


  return (
    <div className="App">
      <h1>Card Matching</h1>
      <button onClick={shuffleCards}>Start!</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard 
          key={card.id} 
          card={card} 
          handleChoice = {handleChoice}
          flipped = {card === choiceOne|| card === choiceTwo || card.matched}
          disabled={disabled}
        />
        ))}
      </div>
      <p>Turns: {turns} </p>
    </div>
  );
}

export default App;
