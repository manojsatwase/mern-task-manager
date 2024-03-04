import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import MainScreen from '../../components/MainScreen/MainScreen';
import { PICS } from '../../constant';
import { useCallAPI } from '../../customHooks/useCallAPI';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import { createUser } from '../../redux/slices/createUserSlice';

import "./RegisterPage.css";

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    pic: PICS,
    password: "",
    confirmPassword: "",
    message: null,
    picMessage: null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading,userInfo,success, callRegisterPostAPI } = useCallAPI();

  useEffect(() => {
    const timer = setTimeout(() => {
      setUserData(prevState => ({ ...prevState, message: "" }));
    }, 3500);
    return () => clearTimeout(timer);
  }, [userData.message]);

  useEffect(() => {
    if (userInfo) {
      navigate("/mytasks");
      dispatch(createUser(userInfo));
    }
  }, [navigate, dispatch,userInfo]);

  const postDetails = (pics) => {
    if (!pics) {
      setUserData(prevState => ({ ...prevState, picMessage: "Please Select an Image" }));
      return;
    }
    setUserData(prevState => ({ ...prevState, picMessage: null }));
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics); // data
      data.append("upload_preset", "taskmanager"); // folder name
      data.append("cloud_name", "manoj-mern"); // user name
      fetch("https://api.cloudinary.com/v1_1/manoj-mern/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setUserData(prevState => ({ ...prevState, pic: data.url.toString() }));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setUserData(prevState => ({ ...prevState, picMessage: "Please Select an Image" }));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const { name, email, password, pic, confirmPassword } = userData;
    if (password !== confirmPassword) {
      setUserData(prevState => ({ ...prevState, message: "Password Do Not Match" }));
    } else {
      callRegisterPostAPI(name, email, password, pic);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <MainScreen title="REGISTER">
      <div className="registrationContainer">
        {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
        {userData.message && <ErrorMessage variant='danger'>{userData.message}</ErrorMessage>}
        {loading && <Loading />}
        {success && (
                <ErrorMessage variant="success">
                   Successfully Registration
                </ErrorMessage>
              )}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label className='my-2'>Name</Form.Label>
            <Form.Control
              type="name"
              value={userData.name}
              placeholder="Enter name"
              onChange={handleChange}
              name="name"
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label className='my-2'>Email address</Form.Label>
            <Form.Control
              type="email"
              value={userData.email}
              placeholder="Enter email"
              onChange={handleChange}
              name="email"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className='my-2'>Password</Form.Label>
            <Form.Control
              type="password"
              value={userData.password}
              placeholder="Password"
              onChange={handleChange}
              name="password"
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label className='my-2'>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={userData.confirmPassword}
              placeholder="Confirm Password"
              onChange={handleChange}
              name="confirmPassword"
            />
          </Form.Group>
          {userData.picMessage && (
            <ErrorMessage variant='danger'>{userData.picMessage}</ErrorMessage>
          )}
          <Form.Group controlId="pic">
            <Form.Label className='my-2'>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              accept="image/png,image/jpeg"
              onChange={(e) => postDetails(e.target.files[0])}
              label="Upload Profile Picture"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className='my-3'>
            Register
          </Button>
        </Form>
        <Row>
          <Col>
            Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  )
}

export default RegisterPage;
