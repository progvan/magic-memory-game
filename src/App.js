import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';
import {useTranslation} from "react-i18next";

const cardImages = [
  { "src": `${process.env.PUBLIC_URL}/img/apple-1.png`, matched: false },
  { "src": `${process.env.PUBLIC_URL}/img/cherrie-1.png`, matched: false },
  { "src": `${process.env.PUBLIC_URL}/img/mango-1.png`, matched: false },
  { "src": `${process.env.PUBLIC_URL}/img/pomegranate-1.png`, matched: false },
  { "src": `${process.env.PUBLIC_URL}/img/orange-1.png`, matched: false},
  { "src": `${process.env.PUBLIC_URL}/img/strawberry-1.png`, matched: false }
]

function App() {
  const [t, i18n] = useTranslation("global")

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false) 

  
  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    window.localStorage.setItem('USER_LANGUAGE', lang)
  }

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))    
      
      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)
    }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if(choiceOne && choiceTwo) {
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])
  
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className='App'>
      <div className="button-container">
        <button onClick={() => handleChangeLanguage('en')} className="combined_button">EN</button>
        <button onClick={() => handleChangeLanguage('ua')} className="combined_button">UA</button>
      </div>
      <h1>{t("header.title")}</h1>
      <button onClick={shuffleCards} className='new_game_button'>{t("header.new_game_button")}</button>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice} 
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>{t("body.turns")}: {turns}</p>
    </div>
  );
}

export default App
