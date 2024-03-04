import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";

import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { useCallAPI } from "../../customHooks/useCallAPI";
import MyDatePicker from "../CreateTask/MyDatePicker";
import TaskStatus from "../CreateTask/TaskStatus";
import { capitalize, priorityFileds, statusFields } from "../../constant";
import MainScreen from "../../components/MainScreen/MainScreen";
import { useSelector } from "react-redux";

const UpdateTask = () => {
  const [taskData, setTaskData] = useState({
    title: "",
    content: "",
    category: "",
    status: "",
    priority:"",
    dueDate: new Date(),
    updatedAt: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const { error,loading, ids,updatePostTaskAPI, deleteTaskAPI,getSingleTaskAPI} = useCallAPI();

  const singleTask = useSelector((state) => state.singleTask.singleTask);

  const deleteHandler = async () => {
    if (window.confirm("Are you sure?")) {
      await deleteTaskAPI(id);
      navigate("/mytasks");
    }
  };
 
  useEffect(() => { 
    getSingleTaskAPI(id);
    setTaskData(prevTaskData => ({ ...prevTaskData ,...singleTask}));
  }, [ids, id]);
  

  const resetHandler = () => {
    setTaskData({
      title: "",
      content: "",
      category: "",
      status: "",
      priority:"",
      dueDate: new Date(),
      updatedAt: "",
    });
  };

  const updateHandler = (e) => {
    e.preventDefault();
    if (!taskData.title || !taskData.content || !taskData.category || !taskData.status || !taskData.priority) return;
    updatePostTaskAPI(id, taskData.title, taskData.content, taskData.category, taskData.status,taskData.priority, taskData.dueDate, taskData.updatedAt);
    resetHandler();
    navigate("/mytasks");
  };

  const handleStatusChange = (status) => {
    setTaskData({ ...taskData, status });
  };

  const handlePriorityChange = (priority) => {
      setTaskData({...taskData,priority})
  }
  return (
    <MainScreen title="Edit Note">
      <Card>
        <Card.Header>Edit your Task</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading ? <Loading /> : (
              <>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="title"
                    placeholder="Enter the title"
                    value={taskData.title}
                    onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="content">
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter the content"
                    rows={4}
                    value={taskData.content}
                    onChange={(e) => setTaskData({ ...taskData, content: e.target.value })}
                  />
                </Form.Group>
                {taskData.content && (
                  <Card>
                    <Card.Header>Note Preview</Card.Header>
                    <Card.Body>
                      <ReactMarkdown>{taskData.content}</ReactMarkdown>
                    </Card.Body>
                  </Card>
                )}

                <Form.Group className="mb-3" controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="category"
                    placeholder="Enter the Category"
                    value={taskData.category}
                    onChange={(e) => setTaskData({ ...taskData, category: e.target.value })}
                  />
                </Form.Group>

                <div style={{display:"flex"}} className="mb-3">
                <div className="flex w-50">
                   <TaskStatus title="Status" statusAndPrioriryFields={statusFields} handleChange={handleStatusChange} />
                   <span className="p-2">{capitalize(taskData.status)}</span>
                </div>
                <div className="flex w-50">
                <TaskStatus title="Priority"  statusAndPrioriryFields={priorityFileds} handleChange={handlePriorityChange} />
                 <span className="p-2">{capitalize(taskData.priority)}</span>
                </div>
            </div>
                <Formik
                  initialValues={{ date: taskData.dueDate }}
                  onSubmit={(values) => {
                    setTaskData({ ...taskData, dueDate: values.date });
                  }}
                >
                  {(props) => (
                    <div className="form-group">
                      <MyDatePicker name="date" setDate={(date) => setTaskData({ ...taskData, dueDate: date })} />
                    </div>
                  )}
                </Formik>

                <Button variant="primary" type="submit">Update Task</Button>
                <Button className="mx-2" variant="danger" onClick={deleteHandler}>Delete Task</Button>
              </>
            )}
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">Updated on - {taskData.updatedAt?.substring(0, 10)}</Card.Footer>
      </Card>
    </MainScreen>
  );
};

export default UpdateTask;
