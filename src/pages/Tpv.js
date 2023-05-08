import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Image, Table, Accordion, Modal } from "react-bootstrap";
import { getData, getDataServed, pushDataServed, deleteOrders, pushDataPayed, deleteServed } from '../app/firebase/api';
import logo from '../img/logo.svg';
import Button from '../components/Button/Button';
import CardRecipe from '../components/CardRecipe/CardRecipe'
import axios from 'axios';

const Tpv = () => {

    const [allOrders, setAllOrders] = useState(null)
    const [served, setServed] = useState([])
    const [show, setShow] = useState(false);
    const [recipe, setRecipe] = useState({})
    const [ingredients, setIngredients] = useState([])
    const [measures, setMeasures] = useState([])
    // const [toPay, setToPay] = useState([])

    //Creo una variable para calcular el total
    let total = 0;

    //Creo las URL de llamada a la API
    const baseURL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

    //Recupero los datos de los pedidos
    const getDrinks = async () => {
        const res = await getData();
        setAllOrders(res.docs)
    }

    //Recupero los datos del pedidos servidos
    const getServed = async () => {
        const res = await getDataServed();
        setServed(res.docs)
    }

    useEffect(() => {
        getDrinks();
        getServed();
    }, [])

    const handleServed = async (data, key) => {
        //Paso el pedido a servidos
        pushDataServed(data);
        //Y lo borro de orders
        await deleteOrders(key);
        getDrinks();
        getServed();
    }

    const handlePayed = (data, key) => {
        //Paso el pedido a pagados
        pushDataPayed(data);
        //Y lo borro de served
        deleteServed(key);
        getDrinks();
        getServed();
    }

    const handleDrink = (id) => {
        console.log(id)
        setShow(true);
        GetRecipe(id);
    }

    const handleClose = () => {
        setShow(false)
        setIngredients([])
        setMeasures([])
    }

    const GetRecipe = async (id) => {
        const res = await axios.get(baseURL + id);
        let info = res.data.drinks[0]
        setRecipe(info)

        //Los ingredientes y las medidas en la API no están dentro de un array, tengo que rescatarlos por separado
        if (info.strIngredient1 !== null) { ingredients.push(info.strIngredient1) }
        if (info.strIngredient2 !== null) { ingredients.push(info.strIngredient2) }
        if (info.strIngredient3 !== null) { ingredients.push(info.strIngredient3) }
        if (info.strIngredient4 !== null) { ingredients.push(info.strIngredient4) }
        if (info.strIngredient5 !== null) { ingredients.push(info.strIngredient5) }
        if (info.strIngredient6 !== null) { ingredients.push(info.strIngredient6) }
        if (info.strIngredient7 !== null) { ingredients.push(info.strIngredient7) }
        if (info.strIngredient8 !== null) { ingredients.push(info.strIngredient8) }
        if (info.strIngredient9 !== null) { ingredients.push(info.strIngredient9) }
        if (info.strIngredient10 !== null) { ingredients.push(info.strIngredient10) }
        if (info.strIngredient11 !== null) { ingredients.push(info.strIngredient11) }
        if (info.strIngredient12 !== null) { ingredients.push(info.strIngredient12) }
        if (info.strIngredient13 !== null) { ingredients.push(info.strIngredient13) }
        if (info.strIngredient14 !== null) { ingredients.push(info.strIngredient14) }
        if (info.strIngredient15 !== null) { ingredients.push(info.strIngredient15) }

        if (info.strMeasure1 !== null) { measures.push(info.strMeasure1) }
        if (info.strMeasure2 !== null) { measures.push(info.strMeasure2) }
        if (info.strMeasure3 !== null) { measures.push(info.strMeasure3) }
        if (info.strMeasure4 !== null) { measures.push(info.strMeasure4) }
        if (info.strMeasure5 !== null) { measures.push(info.strMeasure5) }
        if (info.strMeasure6 !== null) { measures.push(info.strMeasure6) }
        if (info.strMeasure7 !== null) { measures.push(info.strMeasure7) }
        if (info.strMeasure8 !== null) { measures.push(info.strMeasure8) }
        if (info.strMeasure9 !== null) { measures.push(info.strMeasure9) }
        if (info.strMeasure10 !== null) { measures.push(info.strMeasure10) }
        if (info.strMeasure11 !== null) { measures.push(info.strMeasure11) }
        if (info.strMeasure12 !== null) { measures.push(info.strMeasure12) }
        if (info.strMeasure13 !== null) { measures.push(info.strMeasure13) }
        if (info.strMeasure14 !== null) { measures.push(info.strMeasure14) }
        if (info.strMeasure15 !== null) { measures.push(info.strMeasure15) }
    }

    return (
        <Container className="text-center text-white text-uppercase">
            <Row className="align-items-center mb-2" >
                <Col>
                    <h2>Management orders</h2>
                </Col>
            </Row>
            <Row className="align-items-start my-4">
                <Col>
                    <h3>Orders</h3>
                    {
                        allOrders !== null ? (
                            allOrders.map((order, index) => {
                                let key = order.id;
                                return (
                                    <Accordion key={index} className='mb-4'>
                                        <Accordion.Item eventKey="0" key={key}>
                                            <Accordion.Header bg="dark" variant="dark" key={'H' + key} ><h3 className='me-4'>Table - {order.data().table}</h3><h3>{order.data().client}</h3></Accordion.Header>
                                            <Accordion.Body key={'B' + key}>
                                                <Table striped bordered hover key={index + key}>
                                                    <thead>
                                                        <tr>
                                                            <th>Qty</th>
                                                            <th>Name</th>
                                                            <th>Price</th>
                                                        </tr>
                                                    </thead>
                                                    {order.data().drinks.map((drink, index) => {
                                                        return (
                                                            <tbody key={index + key}>
                                                                <tr>
                                                                    <td>{drink.qty}</td>
                                                                    <td onClick={() => { handleDrink(drink.id) }}>{drink.name}</td>
                                                                    <td>{drink.price} €</td>
                                                                </tr>
                                                            </tbody>
                                                        )
                                                    })}
                                                </Table>
                                                {order.data().drinks.map((drink) => {
                                                    total = total + drink.totalPrice
                                                })}
                                                <h4 key={'h' + key}>Total: {total} $</h4>
                                                <Button text="Served" onClick={() => {
                                                    handleServed(order.data(), key)
                                                }}></Button>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                )
                            })
                        ) : (
                            <Col className="sm-2 md-4 lg-6 my-5">
                                <Image fluid src={logo} alt="brand logo" className="w-50" />
                            </Col>
                        )}
                </Col>
                <Col>
                    <h3>To Pay</h3>

                    {served !== null ? (
                        served.map((serv, index) => {
                            let key = serv.id;
                            return (
                                <Accordion key={index} className='mb-4' >
                                    <Accordion.Item eventKey="0" key={key} >
                                        <Accordion.Header key={'H' + key} ><h3 className='me-4'>Table - {serv.data().table}</h3><h3>{serv.data().client}</h3></Accordion.Header>
                                        <Accordion.Body key={'B' + key}>
                                            <Table striped bordered hover key={index + key}>
                                                <thead>
                                                    <tr>
                                                        <th>Qty</th>
                                                        <th>Name</th>
                                                        <th>Price</th>
                                                    </tr>
                                                </thead>
                                                {serv.data().drinks.map((drink, index) => {
                                                    return (
                                                        <tbody key={index + key}>
                                                            <tr>
                                                                <td>{drink.qty}</td>
                                                                <td onClick={handleDrink}>{drink.name}</td>
                                                                <td>{drink.price} €</td>
                                                            </tr>
                                                        </tbody>
                                                    )
                                                })}
                                            </Table>
                                            {serv.data().drinks.map((drink) => {
                                                total = total + drink.totalPrice
                                            })}
                                            <h4 key={'h' + key}>Total: {total} $</h4>
                                            <Button text="Payed" onClick={() => {
                                                handlePayed(serv.data(), key)
                                            }}>
                                            </Button>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            )
                        })
                    ) : (
                        <Col className="sm-2 md-4 lg-6 my-5">
                            <Image fluid src={logo} alt="brand logo" className="w-50" />
                        </Col>
                    )}
                </Col>
            </Row>
            <Row>
                <Col className="sm-2 md-4 lg-6 my-5">
                    <Image fluid src={logo} alt="brand logo" className="w-50" />
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose} animation={false} >
                <Modal.Header closeButton>
                    <Modal.Title className="text-center text-uppercase fs-2">{recipe.strDrink}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CardRecipe name={recipe.strCategory} src={recipe.strDrinkThumb} alt={recipe.strDrink + ' photo'} text={recipe.strInstructions} >
                    </CardRecipe>
                </Modal.Body>
                <Modal.Footer >
                    <Table striped bordered hover className='mb-4'>
                        <thead>
                            <tr>
                                <th>Ingredient</th>
                                <th>Measure</th>
                            </tr>
                        </thead>
                        {ingredients.map((ingredient, index) => {
                            console.log(ingredient)
                            console.log(index)
                            return (
                                <tbody key={index}>
                                    <tr>
                                        <td>{ingredient}</td>
                                        <td>{measures[index]}</td>
                                    </tr>
                                </tbody>
                            )
                        })}

                    </Table>
                    <Button text='Close' onClick={handleClose} className=''></Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default Tpv


