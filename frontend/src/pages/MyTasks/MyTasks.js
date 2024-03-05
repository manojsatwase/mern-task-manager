import { useEffect, } from "react";
import {Link, useNavigate} from "react-router-dom";
import { Button} from "react-bootstrap";
import { useSelector } from "react-redux";

import MainScreen from "../../components/MainScreen/MainScreen";
import { capitalize } from "../../constant";
import { useCallAPI } from "../../customHooks/useCallAPI";
import ErrorMessage from "../../components/ErrorMessage";
import PaginationComponent from "../Pagination/PaginationPage";

import "./MyTasks.css";


const MyTasks = () => {
  const userInfo = useSelector(state=>state.createUser?.userInfo);
  const searchText = useSelector(state => state.searchText.search);
 const navigate = useNavigate();

const {loading,error,ids,fetchTasks,} = useCallAPI();
const tasks = useSelector(state=>state.createTask?.tasks);
useEffect(() => {
  fetchTasks();
}, [ids]); // Only fetch notes when createnote changes

useEffect(() => {
  if (!userInfo) {
    navigate("/");
  }
}, [userInfo, navigate]); // Navigate to "/" only when userInfo changes

 const filteredTasks = filteredTask => {
  const filterByTitleAndStatus = filteredTask?.title + filteredTask?.status + filteredTask?.priority;
  if(filterByTitleAndStatus){
    return filterByTitleAndStatus?.toLowerCase().includes(searchText?.toLowerCase())
  }
 }
 const reversedTasks = tasks ? [...tasks]?.reverse()?.filter(filteredTasks) : [];

  return (
    <MainScreen title={`Welcome Back ${capitalize(userInfo?.name)}`}>
        <Link to="createtask">
            <Button size="lg">
                Create New Task
            </Button>
         </Link>
         {error && <ErrorMessage variant="danger">
           {error}
          </ErrorMessage>}
        <PaginationComponent tasks = {reversedTasks} loading={loading}/>
    </MainScreen>
  )
}

export default MyTasks
