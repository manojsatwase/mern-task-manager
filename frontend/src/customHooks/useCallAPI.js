import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserToLocalStorage } from "../constant";
import { createTask } from "../redux/slices/createTaskSlice";
import { createUser } from "../redux/slices/createUserSlice";
import { singleTask } from "../redux/slices/singleTaskSlice";

export const useCallAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [ids,setIds] = useState("");
  const userInfo = useSelector((state) => state.createUser?.userInfo);
  const dispatch = useDispatch();
  
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo?.token}`,
    },
  }

  // Cache object to store API responses
  const cache = {};

  const callAPI = async (method, url, data = null) => {
    try {
      setLoading(true);

      // Check if the response is cached
      if (cache.hasOwnProperty(url)) {
        setLoading(false);
        return cache[url];
      }

      const response =
        ["get", "delete"].includes(method?.toLowerCase())
          ? await axios[method?.toLowerCase()](url, options)
          : await axios[method?.toLowerCase()](url, data, options);

      setLoading(false);
      setSuccess(true);
      cache[url] = response.data; // Store response in cache
      return response.data;
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      setError(error.response.data?.message);
    }
  };

  const callRegisterPostAPI = async (name, email, password, pic) => {
    const data = { name, email, password, pic };
    const response = await callAPI("post", "/api/users", data);
    setUserToLocalStorage(response);
    dispatch(createUser(response));
  };

  const callLoginPostAPI = async (email, password) => {
    const data = { email, password };
    const response = await callAPI("post", "/api/users/login", data);
    setUserToLocalStorage(response);
    dispatch(createUser(response));
  };

  const fetchTasks = async () => {
      const data = await callAPI("get", "/api/tasks");
      dispatch(createTask(data));

  };

  const createOrUpdateTaskAPI = async (method, id, title, content, category, status, priority, dueDate, date) => {
    const url = id ? `/api/tasks/${id}` : "/api/tasks/create";
    const data = id ? { title, content, category, status, priority, dueDate, date } : { title, content, category, status, priority, dueDate };
    await callAPI(method, url, data);
    fetchTasks();
  };

  const createPostTaskAPI = async (title, content, category, status, priority, dueDate, date) => {
    await createOrUpdateTaskAPI("post", null, title, content, category, status, priority, dueDate, date);
  };

  const updatePostTaskAPI = async (id, title, content, category, status, priority, dueDate, date) => {
    await createOrUpdateTaskAPI("put", id, title, content, category, status, priority, dueDate, date);
  };

  const getSingleTaskAPI = async (id) => {
    const response = await callAPI("get",`/api/tasks/${id}`)
    if(response){
      dispatch(singleTask(response));
      setIds(id)
    }
  }

  const deleteTaskAPI = async (id) => {
    await callAPI("delete", `/api/tasks/${id}`);
    fetchTasks();
  };

  const updateProfilePostAPI = async (name, email, password, pic) => {
    const data = { name, email, password, pic };
    const response = await callAPI("post", "/api/users/profile", data);
    if(response){
      setUserToLocalStorage(response);
      dispatch(createUser(response));
    }
  };

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
    ids,
    setError,
    callRegisterPostAPI,
    callLoginPostAPI,
    fetchTasks,
    createPostTaskAPI,
    updatePostTaskAPI,
    getSingleTaskAPI,
    deleteTaskAPI,
    updateProfilePostAPI,
  };
};

