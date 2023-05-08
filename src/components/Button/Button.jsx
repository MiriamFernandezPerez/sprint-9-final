import React from 'react';
import ButtonStyle from './Button.styles';

const Button = ({onClick, icon, text, span, disabled}) => {
  return (
    <ButtonStyle onClick={onClick} disabled={disabled}>{icon}{text} {span}</ButtonStyle>
  )
}

export default Button;

