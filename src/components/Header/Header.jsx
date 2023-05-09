import React, {useState, useContext, useEffect} from "react";
import { DataContext } from "../../useContext/DataContext";
import HeaderStyle from "./Header.styles";
import {Container, Row, Col, Image, Modal, Table, Form } from "react-bootstrap";
import logosm from '../../img/logosm.svg';
import logotitle from '../../img/logotitle.svg';
import waves from '../../img/waves.svg';
import Button from '../Button/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faLock } from "@fortawesome/free-solid-svg-icons";
import { pushData} from "../../app/firebase/api";

const Header = () => {

    //Hago uso de useContext para recuperar los datos 
    const { setTable, setClient, order, verifyQty, setOrder } = useContext(DataContext);

    //Creo un estado para manejar el Modal
    const [show, setShow] = useState(false);

    //Creo estados para verificar que el cliente introduce nombre y numero de mesa y así habilitar botón de confirmación de comanda
    let [inputName, setInputName] = useState('')
    let [optionNum, setOptionNum] = useState(0)
    let [activeButton, setActiveButton] = useState(true)
    
    //Creo una variable para calcular el total
    let total = 0;

    //Creo el total de mesas para servir
    const numTables = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

    let drinksLocal = localStorage.getItem("drinks")
    let parseDrinks = JSON.parse(drinksLocal)
    let numDrinks = 0
    if (parseDrinks !== null){
        numDrinks = parseDrinks.length;
    }

    //Capturo la URL para mostrar solo el botón Private Area en el Home, Login y Register, en la parte pública se mostrará el acceso al carrito.
    let URL = window.location;
    let path = URL.pathname;
    let upButton;
    if (path === '/' || path === '/login' || path === '/register'){
        upButton = 'private';
    }else if (path === '/tpv'){
        upButton = 'tpv'
    }
    else{
        upButton = 'cart';
    }
      
    const handleShow = () => {
        setShow(true);
        verifyQty();
    }
     
    const handleClose = () => {
        setShow(false)
    }

    const handleInput = (event) => {
        let name = event.target.value;
        setClient(name)
        localStorage.setItem("client", JSON.stringify(event.target.value))
        //Seteo para verificar que han introducido un nombre
        name !== '' ? (setInputName(name)) : (setInputName(''))
    }

    const handleOption = (event) => {
        let num = event.target.value 
        setTable(num)
        localStorage.setItem("table", JSON.stringify(num))
        num !== '' ? (setOptionNum(num)) : (setOptionNum(0))
    }

    const handleOrder = () => {
        //Recupero todos los datos de la mesa y el cliente
        let localTable = localStorage.getItem("table")
        let table = JSON.parse(localTable)
        let localClient = localStorage.getItem("client")
        let client = JSON.parse(localClient)
        
        const data = {
            table: table,
            client: client,
            drinks: order
        }
        //Subo el pedido a Firebase
        pushData(data)

        //Borro las comanda del localStorage
        localStorage.removeItem("drinks");
        localStorage.removeItem("table");
        localStorage.removeItem("client");

        //Seteo a vacío el array order
        setOrder([])

        //Cierro el modal
        setShow(false)
    } 

    const handleRequest = () => {
        window.location.reload(true);
    }

    const activateButton = () =>{
        inputName !== '' && optionNum !== 0 ? (setActiveButton(false)) : (setActiveButton(true))
    }

    useEffect(()=>activateButton())

    return(
    <HeaderStyle>
        <Container fluid>
            <Row className="align-items-center">
                <Col sm={2}>
                    <a href='./'>
                        <Image fluid src={logosm} className="logo" alt="brand logo" />
                    </a>
                </Col>
                <Col sm={8}>
                    <a href='./'>
                        <Image fluid src={logotitle} alt="brand logo title" />
                    </a>
                </Col>
                {
                    upButton === 'private' ? (
                        <Col sm={2}>
                            <a href='./Login'>
                                <Button icon=<FontAwesomeIcon icon={faLock} className="pe-3"></FontAwesomeIcon> text='Private Area'></Button>
                            </a>
                        </Col>
                    ) : (
                        upButton === 'cart' ? (
                            <Col>
                            <Button icon=<FontAwesomeIcon icon={faCartShopping} className="pe-1"></FontAwesomeIcon> text='Cart' span=<span className="badge bg-black text-white ms-1 rounded-pill" id="count_product">{numDrinks}</span> onClick={handleShow}>
                            </Button>
                            
                        </Col>
                        ) : (
                            
                            <Col>
                            <Button text='See Orders' onClick={handleRequest}>
                            </Button>
                            
                        </Col>
                        )
                    )
                }
            </Row>
            <Row>
                <Col><Image fluid src={waves} alt="waves logo" /></Col>
            </Row>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title className="text-center fs-2">Your Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {
                order.length === 0 ? (<h6>No order yet</h6>)
                    : (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Qty</th>
                                <th>Cocktail</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        {
                            order.map((data, index)=>{
                                return(
                                    <tbody key={index}>
                                        <tr>
                                            <td>{data.qty}</td>
                                            <td>{data.name}</td>
                                            <td>{data.price}</td>
                                        </tr>
                                    </tbody>
                                )
                            })
                        }
                        </Table>
                    )
                }
                </Modal.Body>
                <Modal.Footer className="justify-content-center ">
                {
                    order.map((data) => {
                        total = total + data.totalPrice
                    })
                }
                <h4> Total: {total} $</h4>                
                <Form.Group className="mb-3 w-100">
                    <Form.Label>Your name</Form.Label>
                    <Form.Control className="border border-dark" placeholder="Type your name" onChange={handleInput}/>
                </Form.Group>
                <Form.Group className="mb-3 w-100">
                    <Form.Label>Select your table</Form.Label>
                    <Form.Select className="border border-dark" onChange={handleOption}>
                    <option></option>
                    {numTables.map((num) => {
                        return(
                            <option key={num} value={num}>{num}</option>
                        )
                    })}
                    </Form.Select>
                </Form.Group>
                <Button text="Confirm Order" onClick={handleOrder} disabled={activeButton}></Button>
                <Button text='Close' onClick={handleClose}></Button>
                </Modal.Footer>
            </Modal>
        </Container>
    </HeaderStyle>        
    )
}

export default Header;
