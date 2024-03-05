import { Button, Container, Row } from "react-bootstrap";

import "./LandingPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
// import { createUser } from "../../redux/slices/createUserSlice";

const LandingPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    useEffect(()=>{
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if(userInfo){
        navigate("/mytasks");
        // dispatch(createUser(userInfo));
      }
  
    },[navigate,dispatch])
  
  
  return (
    <div className="main">
        <Container>
            <Row>
                <div className="intro__text">
                    <div>
                        <h1 className="title">Welcome to Task Manager</h1>
                        <p className="subtitle">One Safe place for all your Tasks.</p>
                    </div>
                    <div className="button__container">
                        <Link to="/login">
                        <Button size="lg" className="landing__button">Login</Button>
                        </Link>
                           
                        <Link to="/register">
                            <Button size="lg" className="landing__button" variant="outline-primary">register</Button>
                        </Link>
                    </div>
                </div>
            </Row>
        </Container>
    </div>
  )
}

export default LandingPage
