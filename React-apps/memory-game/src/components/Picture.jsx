import React from 'react'

export const Picture = ({ element, handleClick, flipped, disabled }) => {

    const onChoice = () =>{
        if (!disabled) { //de esta manera solo podemos hacer el click cuando el disable está en false
            handleClick(element)
        }
    }


    return (
        <div className='picture'>

            <div className={flipped ? 'flipped' : ''}>

                <img src={element.src} alt="imagen" className='front' />

                <img 
                className='back' 
                src="../../assets/backPic.png" 
                alt="back-imagen" 
                onClick={onChoice} 
                />

            </div>

        </div>
    )
}
