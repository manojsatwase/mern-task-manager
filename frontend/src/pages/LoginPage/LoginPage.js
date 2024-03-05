import React, {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import MainScreen from '../../components/MainScreen/MainScreen';
import { Button } from 'react-bootstrap';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { useCallAPI } from '../../customHooks/useCallAPI';
import ShowHidePassword from '../../components/ShowPasswordFeature/ShowHidePassword';

import "./LoginPage.css";


const LoginPage = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  
  const {error,loading,callLoginPostAPI} = useCallAPI();
  const userInfo = useSelector(state=>state.createUser.userInfo);

  const onChangeEmail = ({target:{value}}) => setEmail(value);
  const onChangePassword = ({target:{value}})=> setPassword(value);

const submitHandler = e => {
  e.preventDefault();
  callLoginPostAPI(email,password);
}

const navigate = useNavigate();
const dispatch = useDispatch();

useEffect(()=>{
  if(userInfo){
    navigate("/mytasks");
  }
},[userInfo,navigate,dispatch])

if(loading) return <Loading/>
  return (
   <>
    <MainScreen title="LOGIN">
    <div className='loginContainer'>
      {error && (
        <ErrorMessage variant='danger'>
          {error}
        </ErrorMessage>
      )}
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
         type="email"
         placeholder="Enter email"
         value={email}
         onChange={onChangeEmail}
         />
      </Form.Group>
      <Form.Group className="mb-3 password" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <ShowHidePassword
              title="Password"
              inputComponent={
                <Form.Control
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={onChangePassword}
                />
              }
            />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    <Row className="py-3">
      <Col>
         New Customer ? <Link to="/register">Register</Link>
      </Col>
    </Row>
    </div>
    </MainScreen>
    </>
  )
}

export default LoginPage;
