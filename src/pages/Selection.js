import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { DataContext } from "../useContext/DataContext";
import Navbar from "../components/Navbar/Navbar";
import Card from "../components/Card/Card";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const Selection = () => {

    //Hago uso de useContext para recuperar los datos 
    const { order, makeOrder, price } = useContext(DataContext);

    //Creo las URL de llamada a la API
    const baseURL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

    //ID, estado Populares
    const popularId = ['11000', '11006', '11007', '17196'];
    const [popular, setPopular] = useState(null);

    //ID, estado Dulces
    const sweetId = ['17207', '12754', '15184', '17186'];
    const [sweet, setSweet] = useState(null);

    //ID, estado Fuertes
    const braveId = ['11003', '17241', '12127', '11008'];
    const [brave, setBrave] = useState(null);

    useEffect(() => {
        //Hago una llamada a cada listado
        const popularList = [];
        const GetPopular = async (url) => {
            for await (const id of popularId) {
                const res = await axios.get(url + id);
                popularList.push(res.data.drinks)
            }
            setPopular(popularList)
        }
        GetPopular(baseURL)

        const sweetList = [];
        const GetSweet = async (url) => {
            for await (const id of sweetId) {
                const res = await axios.get(url + id);
                sweetList.push(res.data.drinks)
            }
            setSweet(sweetList)
        }
        GetSweet(baseURL)

        const braveList = [];
        const GetBrave = async (url) => {
            for await (const id of braveId) {
                const res = await axios.get(url + id);
                braveList.push(res.data.drinks)
            }
            setBrave(braveList)
        }
        GetBrave(baseURL)

    }, [])

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
            <Col className="text-center text-white ">
                <h2>More Popular</h2>
            </Col>
        </Row>
        <Row className="align-items-start mb-4">
            {popular != null ? (
                popular.map((drink) => {
                    return (
                        <Col xs={6} s={6} md={4} lg={3} key={drink[0].idDrink}>
                            <Card name={drink[0].strDrink} src={drink[0].strDrinkThumb} alt={drink[0].strDrink + ' photo'} icon={<FontAwesomeIcon icon={faCartShopping} className="pe-3"></FontAwesomeIcon>} btnText={price + '$'} onClick={() => handleClick(drink[0].idDrink, drink[0].strDrink, price)}>
                            </Card>
                        </Col>
                    )
                })
            ) : (<h2>Loading</h2>)}
        </Row>
        <Row className="align-items-center mb-2" >
            <Col className="text-center text-white mt-1">
                <h2>The Sweeties</h2>
            </Col>
        </Row>
        <Row className="align-items-start mb-4">
            {sweet != null ? (
                sweet.map((drink) => {
                    return (
                        <Col xs={6} s={6} md={4} lg={3} key={drink[0].idDrink}>
                            <Card name={drink[0].strDrink} src={drink[0].strDrinkThumb} alt={drink[0].strDrink + ' photo'} icon={<FontAwesomeIcon icon={faCartShopping} className="pe-3"></FontAwesomeIcon>} btnText={price + '$'} onClick={() => handleClick(drink[0].idDrink, drink[0].strDrink, price)}>
                            </Card>
                        </Col>
                    )
                })
            ) : (<h2>Loading</h2>)}
        </Row>
        <Row className="align-items-center mb-2" >
            <Col className="text-center text-white mt-1">
                <h2>For the Brave</h2>
            </Col>
        </Row>
        <Row className="align-items-start">
            {brave != null ? (
                brave.map((drink) => {
                    return (
                        <Col xs={6} s={6} md={4} lg={3} key={drink[0].idDrink}>
                            <Card name={drink[0].strDrink} src={drink[0].strDrinkThumb} alt={drink[0].strDrink + ' photo'} icon={<FontAwesomeIcon icon={faCartShopping} className="pe-3"></FontAwesomeIcon>} btnText={price + '$'} onClick={() => handleClick(drink[0].idDrink, drink[0].strDrink, price)}>
                            </Card>
                        </Col>
                    )
                })
            ) : (<h2>Loading</h2>)}
        </Row>


    </Container>

}

export default Selection;