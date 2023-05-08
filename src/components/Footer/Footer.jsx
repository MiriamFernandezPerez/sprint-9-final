import React from 'react';
import FooterStyle from './Footer.styles';
import {Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <FooterStyle>
        <Container fluid>
            <Row className='align-items-center'>
                <Col sm={2} className='fs-2'>
                    <a href="https://www.facebook.com/"><FontAwesomeIcon icon={faFacebook} className='px-3'/></a>
                    <a href="https://www.instagram.com/"><FontAwesomeIcon icon={faInstagram} className='px-3'/></a>
                    <a href="https://www.tiktok.com/"><FontAwesomeIcon icon={faTiktok} className='px-3'/></a>
                </Col>
                <Col sm={8}>
                    <h5>Copyright©</h5>
                    <a href="https://www.google.com/search?q=Privacy+Policy"><h6>Privacy Policy</h6></a>
                </Col>
                <Col sm={2}>
                    <h5>Coctail Experience ©</h5>
                    <h6>61 Goodge St, London W1T 1TL, UK</h6>
                    <h6>+44 214 4157 5874</h6>
                </Col>
            </Row>
        </Container>
    </FooterStyle>
  )
}

export default Footer;