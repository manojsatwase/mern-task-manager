import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserToLocalStorage } from "../constant";
import { createTask } from "../redux/slices/createTaskSlice";

export const useCallAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tasksId,setTasksId] = useState(null);
  const [success,setSuccess] = useState(false);


  const userInfo = useSelector(state=>state.createUser?.userInfo);
  const dispatch = useDispatch();

  const options = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userInfo?.token}`,
    },
  };

  const callRegisterPostAPI = async (name, email, password, pic) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "/api/users",
        { name, email, password, pic },
        options
      );
      setLoading(false);
      setSuccess(true);
      setUserToLocalStorage(data);
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      setError(error.response.data?.message);
    }
  };

  const callLoginPostAPI = async (email, password) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        options
      );
      setLoading(false);
      setUserToLocalStorage(data);
     
    } catch (error) {
      setLoading(false);
      setError(error.response.data?.message);
    }
  };

  const fetchNotes = async () => {
    try {
      setLoading(true);
      if (userInfo?.token) {
        const { data } = await axios.get("/api/tasks", options);
        dispatch(createTask(data));
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response.data?.message);
    }
  };

  const createPostTaskAPI = async (title,content,category,status,priority,dueDate,date) => {
    try {
      setLoading(true);
      if (userInfo?.token) {
        const { data } = await axios.post(
          "/api/tasks/create",
          { title,content,category,status,priority,dueDate,date},
          options
        );
       fetchNotes(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data?.message);
    }
  };

  const updatePostTaskAPI = async (id, title, content, category,status,priority,dueDate,date) => {
    console.log({
      id, title, content, category,status,dueDate,date
    })
    try {
      setLoading(true);
     
      if (userInfo?.token) {
        const { data } = await axios.put(
          `/api/tasks/${id}`,
          {id, title, content, category,status,priority,dueDate,date},
          options
        );
        fetchNotes();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data?.message);
    }
  };

  const deleteTaskAPI = async(id) => {
    try{
    const {data} = await axios.delete(`/api/tasks/${id}`,options);
    setLoading(false);
    setTasksId(id);
    fetchNotes();
    }catch(error){
      setLoading(false);
      setError(error.response.data?.message);
    }
  }

  const updateProfilePostAPI = async (name,email,password,pic) => {
    try{
      setLoading(true);
      if (userInfo?.token) {
      const {data} = await axios.post("/api/users/profile",{name,email,password,pic},options);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      setSuccess(true);
      }
      }catch(error){
        setLoading(false);
        setError(error.response.data?.message);
      }
  }


  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
    }, 3500);
    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  return {
    loading,
    error,
    success,
    callRegisterPostAPI,
    callLoginPostAPI,
    fetchNotes,
    createPostTaskAPI,
    updatePostTaskAPI,
    updateProfilePostAPI,
    deleteTaskAPI,
    tasksId,
    setError
   
  };
};


