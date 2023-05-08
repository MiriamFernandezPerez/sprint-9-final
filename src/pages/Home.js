import React from "react";
// import { Link } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import Button from "../components/Button/Button";
import logo from '../img/logo.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
    return <Container>

        <Row className="align-items-center mb-5">
            <Col className="text-center text-white">
                <h3 className="mt-5">Wellcome to The Cocktail Experience</h3>
                <h3 className="mt-5">We are professionals bartenders</h3>
                <h3 className="mb-5">We take care of each of our cocktails to offer you an unforgettable experience.</h3>
                <Image fluid src={logo} alt="brand logo" className="w-25" />
                <h3 className="my-5">Are you ready?</h3>
                <a className="mb-5" href='/Selection'>
                    <Button icon=<FontAwesomeIcon icon={faRocket} className="pe-3"></FontAwesomeIcon> text="Let's Go"></Button>
                </a>
            </Col>
        </Row>
    </Container>;
};

export default Home;