import {Navbar,Container,Nav,NavDropdown,Form} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { capitalize, getUserToLocalStorage, removeUserToLocalStorage } from '../../constant';
import { searchTask } from '../../redux/slices/searchTaskSlice';
import { createUser } from '../../redux/slices/createUserSlice';
import { createTask } from '../../redux/slices/createTaskSlice';

const Header = () => {
  const [searchText,setSearchText] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(state=>state.createUser.userInfo);
  
  const Logout = () => {
    removeUserToLocalStorage();
    dispatch(createUser(null));
    dispatch(createTask(null));
    navigate("/");
  }

  const onChangeHandler = ({target:{value}}) => {
    setSearchText(value)
  }
  useEffect(()=>{
      const timer = setTimeout(() => {
        dispatch(searchTask(searchText));
      }, 500);
  
      return () => {
        clearTimeout(timer);
      };
    }, [searchText,dispatch]);

    useEffect(()=>{
      dispatch(createUser(getUserToLocalStorage()));
    },[dispatch]);
  

  return (
    <Navbar expand="lg" bg="primary" variant='dark' className="bg-body-tertiary">
    <Container>
      <Navbar.Brand>
        <Link to="/">Task Manager</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
     { userInfo ? (
       <Navbar.Collapse id="navbarScroll">
       <Nav
         className="m-auto my-2 my-lg-0"
         style={{ maxHeight: '100px' }}
         navbarScroll
       >
        <Form className="d-flex">
         <Form.Control
           type="search"
           placeholder="Search"
           className="me-2"
           aria-label="Search"
           value={searchText}
           onChange={onChangeHandler}
         />
       </Form>
       </Nav>
         <Link to="mytasks" className='px-2'>My Tasks</Link>
         <Link to="/mytasks/createtask">CreateTask</Link>
         <NavDropdown className='mx-3' title={capitalize(userInfo?.name)} id="navbarScrollingDropdown">
             <Link className='p-4' to="myprofile">My Profile</Link>
           <NavDropdown.Divider />
           <NavDropdown.Item onClick={Logout}>
             Logout
           </NavDropdown.Item>
         </NavDropdown>
     </Navbar.Collapse>
     ) : (
      <Link className='ml-auto' to="/login">Login</Link>
     )}
    </Container>
  </Navbar>
  )
}

export default Header
