import React from 'react';
import CardRecipeStyle from './CardRecipe.styles';

const CardRecipe = ({name, src, alt, text, btnText, onClick}) => {
  
  return (
    <CardRecipeStyle>
        <div>
            <h3>{name}</h3>
            <img src={src} alt={alt}/>
        </div>
        <p>{text}</p>
    </CardRecipeStyle>
  )
}

export default CardRecipe;
