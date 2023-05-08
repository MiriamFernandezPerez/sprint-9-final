import React from 'react';
import CardStyle from './Card.styles';
import Button from '../Button/Button';

const Card = ({name, src, alt, icon, btnText, onClick}) => {
  
  return (
    <CardStyle>
      <h3>{name}</h3>
      <img src={src} alt={alt} className="mb-3"/>
      <Button icon={icon} text={btnText} onClick={onClick} ></Button>
    </CardStyle>
  )
}

export default Card;
