import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { DataContext } from "../useContext/DataContext";
import Navbar from "../components/Navbar/Navbar";
import Card from "../components/Card/Card";
import axios from "axios";
import logo from "../img/logo.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Category = () => {

    //Hago uso de useContext para recuperar los datos 
    const { makeOrder, price } = useContext(DataContext);

    //Creo las URL de llamada a la API
    const categoryListURL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const categoryURL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

    const [category, setCategory] = useState(null);
    const [selection, setSelection] = useState(null);

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
                        category[0].map((cat) => {
                            return (
                                <Col className="sm-2 md-4 lg-6 mb-5" key={cat.strCategory}>
                                    <Card name={cat.strCategory} btnText='See' onClick={handleCat}>
                                    </Card>
                                </Col>
                            )
                        })
                    ) : (
                        <Col className="sm-2 md-4 lg-6 my-5">
                            <Image fluid src={logo} alt="brand logo" className="w-50" />
                        </Col>
                    )
                ) : (
                    selection.map((cat) => {
                        return (
                            <Col className="sm-2 md-4 lg-6" key={cat.idDrink}>
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