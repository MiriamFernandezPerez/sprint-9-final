import React, { useState } from 'react';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import { Container, Row, Col } from 'react-bootstrap';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('')
    const codes = ['XXX', 'YYY', 'ZZZ'];
    console.log('Los codigos privados para registrarse son: ' + codes)

    let users = [];
    let ok = document.getElementById('ok');
    let error = document.getElementById('error');
    let errorcode = document.getElementById('errorcode');
    let response;

    const handleSubmit = (event) => {
        event.preventDefault();
        const newUser = {
            username: username,
            code: code,
            password: password
        };
        verifyUser(newUser);
    }

    const verifyUser = (newUser) => {
        //Compruebo que el codigo de acceso sea correcto        
        let verifCode = codes.map(code => code).filter(search => search === code);
        if (verifCode.length > 0) {
            //Verifico si hay algun registrado 
            if (localStorage.registered === undefined) {
                localStorage.setItem("registered", JSON.stringify([...users, newUser]));
                response = 'ok';
                showAlert(response)
            } else {
                //Si hay registrados verifico que no coincida el code ni el nombre
                let usersLocal = localStorage.getItem("registered");
                let usersReg = JSON.parse(usersLocal);
                let result = usersReg.find(user => user.username === newUser.username || user.code === newUser.code);
                if (result) {
                    response = 'error';
                    showAlert(response);
                } else {
                    //SI es correcto acepto el registro
                    localStorage.setItem("registered", JSON.stringify([...usersReg, newUser]));
                    response = 'ok';
                    showAlert(response);
                }
            }
        } else {
            response = 'errorcode';
            showAlert(response);
        }
    }

    const showAlert = (response) => {
        if (response === "ok") {
            //Redirijo al Login con un delay de 5 segundos para mostrar aviso de registro correcto
            ok.classList.add("mostrar");
            setTimeout('window.location = "./Login"', 3000);
        } else if (response === "errorcode") {
            errorcode.classList.add("mostrar");
            setTimeout('error.classList.remove("mostrar") ', 3000);
        } else {
            //Muestro mensaje de error de usuario ya registrado
            error.classList.add("mostrar");
            setTimeout('error.classList.remove("mostrar") ', 3000);
        }
    }

    return <Container className="mt-3">
        <Row className=" text-center">
            <Col className="col-md-12 my-3">
                <h2 className="form-label text-white text-decoration-underline">Sign Up</h2>
                <div className="alert alert-success w-50 text-center mb-3 ocultar mx-auto" id="ok" role="alert">Signup approved!</div>
                <div className="alert alert-success w-50 text-center mb-3 ocultar mx-auto" id="error" role="alert">The user already exist</div>
                <div className="alert alert-success w-50 text-center mb-3 ocultar mx-auto" id="errorcode" role="alert">Code Incorrect</div>
                <form onSubmit={handleSubmit}>
                    <Col className="md-12">
                        <h4><label className="form-label text-white mt-4">Username</label></h4>
                        <Input type="text" placeholder="Entry username" onChange={(event) => setUsername(event.target.value)} value={username}>
                        </Input>
                    </Col>
                    <Col className="md-12">
                        <h4><label className="form-label text-white mt-4">Password</label></h4>
                        <Input type="password" placeholder="Entry password" onChange={(event) => setPassword(event.target.value)} value={password}>
                        </Input>
                    </Col>
                    <Col className="md-12">
                        <h4><label className="form-label text-white mt-4">CODE STAFF</label></h4>
                        <Input type="text" placeholder="See console.log" onChange={(event) => setCode(event.target.value)} value={code}>
                        </Input>
                    </Col>
                    <Col className="md-12 mt-5">
                        <Button text="Create Account" className="btn-submit" ></Button>
                    </Col>
                </form>
            </Col>
        </Row>
    </Container>
}

export default Register