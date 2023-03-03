import { useEffect, useState } from 'react';
import _ from 'underscore';
import { v4 as uuid } from "uuid"
import { Picture } from './components/Picture';



const boardPictures = [
  { src: "../assets/1.png", matched: false },
  { src: "../assets/2.png", matched: false },
  { src: "../assets/3.png", matched: false },
  { src: "../assets/4.png", matched: false },
  { src: "../assets/5.png", matched: false },
  { src: "../assets/6.png", matched: false },
  { src: "../assets/7.png", matched: false },
  { src: "../assets/8.png", matched: false },
  { src: "../assets/9.png", matched: false },
  { src: "../assets/10.png", matched: false },
  { src: "../assets/11.png", matched: false },
  { src: "../assets/12.png", matched: false },
  { src: "../assets/13.png", matched: false },
  { src: "../assets/14.png", matched: false },
  { src: "../assets/15.png", matched: false },
]

export function App() {

  //*estado para controlar cada juego particular
  const [pictures, setPictures] = useState([])
  //*estado para contar los movimientos que el juegador hace en cada juego
  const [move, setMove] = useState(0)
  //*estados para controlar cuando dos cartas iguales aparecen
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  //*estado para desabilitar las pictures cuando sea necesario
  const [disabled, setDisabled] = useState(false)

  const shufflePictures = () => {
    let shufflePictures = [...boardPictures, ...boardPictures];
    shufflePictures = _.shuffle(shufflePictures);
    shufflePictures = shufflePictures.map((element) => ({ ...element, id: uuid() }));

    setPictures(shufflePictures)
    setMove(0) //*cada vez que se mezclan las imagenes y empiza un nuevo juego los moves vuelven a 0
    setChoiceOne(null)
    setChoiceTwo(null)
  }

  //*vamos a pasar esta función como una propiedad al BoardPictures para actualizar los estados choiceOne/two
  const handleClick = (pic) => {
    //*¿cómo sabemos si es la primera elección o la segunda? Si ya tenemos un valor entonces es choiceTwo
    //*si choice one NO es null tiene un valor y por tanto el condicional responde true, por tanto actualiza la choiceTwo
    choiceOne ? setChoiceTwo(pic) : setChoiceOne(pic);
    setMove(move + 1)
  }



  // //*averiguar si las choices son iguales
  // //*useEffect dispara cuando la app corre por primera vez y  luego cada vez que la dependencia especificada cambia
  useEffect(() => {

    if (choiceOne && choiceTwo) {//* de esta manera la comparación se hace solo cuando ambas choices tengan un valor y no en cada click

      //*en este punto en que estamos comparando dos cartas es que se activa el disable
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {

        setPictures(currentPics => {
          return currentPics.map(pic => {
            if (pic.src === choiceOne.src) {
              return { ...pic, matched: true }
            } else {
              return pic
            }
          })
        })

        // setChoiceOne(null)
        // setChoiceTwo(null)
        // setDisabled(false)
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 800)
        // setTimeout(() => setChoiceOne(null), 800)
        // setTimeout(() => setChoiceTwo(null), 800)
      }
    }
  }, [choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setDisabled(false)
  }


  useEffect(() => {
    shufflePictures()
  }, [])






  return (
    <>
      <h1>
        Are you sure you have a good memory?
      </h1>

      <h2>
        <span className="subtitle">PLAY THE MEMO-GAME</span>
      </h2>

      <section>


        <div className='info'>
          <div>
            <button onClick={shufflePictures} className="new-game">New Game</button>
          </div>

          <div className="stats">
            <h3>Moves: </h3>
            <p>{move}</p>
          </div>
        </div>

        {/* ya tenemos nuestro state pictures que almacena el arreglo de cartar tal como fue desparramado por la función shufflePictures al clickear new game
          agarramos el arreglo contenido en el state pictures y le aplicamos un map que nos devuelva por cada elemento un div con su imagen y su key=id correspondiente */}
        <div className='board'>
          {
            pictures.map(element => (
              <Picture
                element={element}
                key={element.id}
                handleClick={handleClick}
                flipped={element === choiceOne || element === choiceTwo || element.matched} //con esta propiedad que devuelve un boolean vamos a evaluar cuando una carta debe estar destapada y para eso nos va a servir nuestra propiedad matched
                disabled={disabled}
              />
            ))
          }
        </div>




      </section>
    </>
  )
}



