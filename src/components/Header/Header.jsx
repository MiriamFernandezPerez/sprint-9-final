import React, {useState, useContext} from "react";
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
    }else if (path === '/Tpv'){
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
    }

    const handleOption = (event) => {
        setTable(event.target.value)
        localStorage.setItem("table", JSON.stringify(event.target.value))
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
                <Button text="Confirm Order" onClick={handleOrder} disabled>
                    Save Changes
                </Button>
                <Button text='Close' onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    </HeaderStyle>        
    )
}

export default Header;