import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Image, Table, Accordion } from "react-bootstrap";
import { getData, getDataServed, pushDataServed, deleteOrders, pushDataPayed, deleteServed } from '../app/firebase/api';
import logo from '../img/logo.svg';
import Button from '../components/Button/Button';

const Tpv = () => {

    const [allOrders, setAllOrders] = useState(null)
    const [served, setServed] = useState([])
    // const [toPay, setToPay] = useState([])

    //Creo una variable para calcular el total
    let total = 0;

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
                                                                    <td>{drink.name}</td>
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
                                                                <td>{drink.name}</td>
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
        </Container>
    )
}

export default Tpv


