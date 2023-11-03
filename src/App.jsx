import { useState, useEffect, useLayoutEffect } from 'react'
import axios from 'axios'
import './App.css'
import desktop_divider from "./images/pattern-divider-desktop.svg";
import mobile_divider from "./images/pattern-divider-mobile.svg";
import dice from "./images/icon-dice.svg"
export default function App() {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [adviceNumber, setAdviceNumber] = useState(0);

  const fetchAdvice = () => {
    setLoading(true)
    axios.get("https://api.adviceslip.com/advice")
    .then(response => {
        setLoading(false)
        setAdvice(response.data.slip.advice)
        setAdviceNumber(response.data.slip.id)
    })
    .catch(error => {
      console.log(error)
      setLoading(false)
    })
  }

  useLayoutEffect(() => {
    console.log(screen.width)
    screen.width <= 320 ? setIsMobile(true): setIsMobile(false)
  })

  useEffect(() => {
    fetchAdvice()
  }, [])
  return (
    <div className="wrapper">
      <div className="advice-box">
        <h6 className="advice-number">Advice #{adviceNumber}</h6>
        <p className="advice">{advice}</p>
        <div className="divider"><img src={isMobile ? mobile_divider : desktop_divider} width="max-content" /></div>

        <div className="dice" onClick={fetchAdvice}>
          <img src={dice} className={loading && 'dice-roll'}/>
        </div>
      </div>
    </div>
  )
}
