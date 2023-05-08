import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { DataContext } from "../useContext/DataContext";
import Navbar from "../components/Navbar/Navbar";
import Card from "../components/Card/Card";
import axios from "axios";
import logo from "../img/logo.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import beer from '../img/beer.jpg'
import cocktail from '../img/cocktail.jpg'
import cocoa from '../img/cocoa.webp'
import coffeetea from '../img/coffee-tea.jpg'
import homemade from '../img/homemade-liquor.jpeg'
import ordinary from '../img/ordinary-drinks.jpg'
import other from '../img/other.jpg'
import punch from '../img/punch-party.jpg'
import shake from '../img/shake.webp'
import shot from '../img/shot.jpg'
import soft from '../img/soft-drink.jpg'

const Category = () => {

    //Hago uso de useContext para recuperar los datos 
    const { makeOrder, price } = useContext(DataContext);

    //Creo las URL de llamada a la API
    const categoryListURL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const categoryURL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

    const [category, setCategory] = useState(null);
    const [selection, setSelection] = useState(null);

    //Creo un array con las fotos de las bebidas
    const pictures = [beer, cocktail, cocoa, coffeetea, homemade, ordinary, other, punch, shake, shot, soft]


    useEffect(() => {
        const categoryList = [];
        const GetCategory = async (url) => {
            const res = await axios.get(url);
            categoryList.push(res.data.drinks)
            setCategory(categoryList)
        }
        GetCategory(categoryListURL)
    }, [])

    const handleCat = (event) => {
        GetSearch(event.target.parentElement.firstChild.innerHTML)
    }

    const GetSearch = async (letter) => {
        const res = await axios.get(categoryURL + letter)
        setSelection(res.data.drinks)
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
        <Row className="align-items-start mb-4">
            {
                selection == null ? (
                    category != null ? (
                        category[0].map((cat, index) => {
                            return (
                                <Col xs={6} s={6} md={4} lg={3} key={cat.strCategory}>
                                    <Card name={cat.strCategory} btnText='See' onClick={handleCat} src={pictures[index]} alt={cat.strCategoty + ' photo'}>
                                    </Card>
                                </Col>
                            )
                        })
                    ) : (
                        <Col className="my-5">
                            <Image fluid src={logo} alt="brand logo" className="w-50" />
                        </Col>
                    )
                ) : (
                    selection.map((cat) => {
                        return (
                            <Col xs={6} s={6} md={4} lg={3} key={cat.idDrink}>
                                <Card name={cat.strDrink} src={cat.strDrinkThumb} alt={cat.strDrink + ' photo'} icon={<FontAwesomeIcon icon={faCartShopping} className="pe-3"></FontAwesomeIcon>} btnText={price + '$'} onClick={() => handleClick(cat.idDrink, cat.strDrink, price)}>
                                </Card>
                            </Col>
                        )
                    })
                )
            }
        </Row>
    </Container>
}

export default Category;