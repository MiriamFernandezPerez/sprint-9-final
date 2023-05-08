import React from 'react';
import ButtonStyle from './Button.styles';

const Button = ({onClick, icon, text, span}) => {
  return (
    <ButtonStyle onClick={onClick}>{icon}{text} {span}</ButtonStyle>
  )
}

export default Button;

