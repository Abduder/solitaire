import { useEffect, useRef, useState } from 'react';
import './App.css';

import {
  CardBack,
  CardFront,
  CardPlaceholder
} from "./Components/card";

import cardSetManager from "./Utils/cardUtils";

function App() {
  var cardSet = new cardSetManager();

  const [gameState, setGameState] = useState({
    lists: Array.from(new Array(10), e => ({cards: []})),
    decks: 5
  })

  function newGame(){
    cardSet = new cardSetManager();
    setGameState({
      lists: Array.from(new Array(10), e => ({cards: []})),
      decks: 5
    })
  }

  function dealDeck(initial = false, back = false){
    for(const list of gameState.lists){
      const dealt = cardSet.dealCard();
      list.cards.push({
        ...dealt,
        back
      });
      if(back){
        // cardSet.setHidden() //TODO: make a hidden card system (save card info to reveal later)
      }
    }
    if(!initial) gameState.decks--
    setGameState({
      lists: gameState.lists,
      decks: gameState.decks
    })
  }

  function dealSingleCard(listIndex, back=false){
    const dealt = cardSet.dealCard();
    gameState.lists[listIndex].cards.push({...dealt, back})
    if(back){
      // cardSet.setHidden() //TODO: make a hidden card system (save card info to reveal later)
    }
    setGameState({
      lists: gameState.lists,
      decks: gameState.decks
    })
  }


  const gameContainerRef = useRef();
  useEffect(() => {
    newGame();
    for(var i = 1; i <= 4; i++) dealDeck(true, true);
    for(var i = 0; i < 4; i++) dealSingleCard(i, true);
    for(var i = 4; i < 10; i++) dealSingleCard(i, false);
    for(var i = 0; i < 4; i++) dealSingleCard(i, false);
    // dealDeck(true, true);
  }, [])

  return (
    <div className="main">
      <div className="gameContainer" ref={gameContainerRef}>
        {
          gameState.lists.map((cardList, i) => (
            <div className="cardList" key={i}>
              <CardPlaceholder />
              {cardList.cards.map((card, j) => {
                if(!card.back) return (<CardFront key={j} card={card} styles={{top: j * 30 + "px"}} />)
                else return (<CardBack key={j} styles={{top: j * 30 + "px"}} />)
              })}
            </div>
          ))
        }
      </div>
      <div className="deck">
        {
          (() => {
            const els = []
            for(var i = 1; i <= gameState.decks; i++){
              els.push(
                <CardBack 
                  onClick = {i == gameState.decks ? dealDeck : null} 
                  key={i} 
                  styles={{ right: i * 20 + "px" }} 
                />
              )
            }
            return els;
          })()
        }
      </div>
    </div>
  );
}

export default App;
