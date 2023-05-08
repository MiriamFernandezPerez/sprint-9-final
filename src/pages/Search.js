import React, { useState, useContext } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { DataContext } from "../useContext/DataContext";
import Navbar from "../components/Navbar/Navbar";
import Card from "../components/Card/Card";
import axios from "axios";
import logo from "../img/logo.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Search = () => {

    //Hago uso de useContext para recuperar los datos 
    const { makeOrder, price } = useContext(DataContext);

    //Creo las URL de llamada a la API
    const byLetterURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

    //Letras del abecedario
    const ABC = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const [search, setSearch] = useState(null);


    const handleSearch = (event) => {
        const letter = event.target.innerHTML;
        GetSearch(letter)
    }

    const GetSearch = async (letter) => {
        const res = await axios.get(byLetterURL + letter)
        setSearch(res.data.drinks)
    }

    const handleClick = (id, name, price) => {
        makeOrder(id, name, price)
    }

    return <Container>
        <Row>
            <Col>
                <Navbar></Navbar>
            </Col>
        </Row>
        <Row className="align-items-center mb-2" >
            <Col className="text-center text-white text-uppercase">

                <ul className="d-flex flex-wrap justify-content-center">
                    {ABC.map((e) => {
                        return (<h3 className="mx-2" onClick={handleSearch} key={e}>{e}</h3>)
                    })}
                </ul>

            </Col>
        </Row>
        <Row className="align-items-start mb-4">
            {search != null ? (
                search.map((drink) => {
                    return (
                        <Col className="sm-2 md-4 lg-6 mb-5" key={drink.idDrink}>
                            <Card name={drink.strDrink} src={drink.strDrinkThumb} alt={drink.strDrink + ' photo'} icon={<FontAwesomeIcon icon={faCartShopping} className="pe-1"></FontAwesomeIcon>} btnText={price + '$'} onClick={() => handleClick(drink.idDrink, drink.strDrink, price)}>
                            </Card>
                        </Col>
                    )
                })
            ) : (
                <Col className="sm-2 md-4 lg-6 my-5">
                    <Image fluid src={logo} alt="brand logo" className="w-50" />
                </Col>
            )}
        </Row>



    </Container>

}

export default Search;
