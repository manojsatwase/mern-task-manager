import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { ErrorMessage, Formik } from "formik";
import ReactMarkdown from "react-markdown";
import MyDatePicker from "./MyDatePicker";
import { useNavigate } from "react-router-dom";

import { useCallAPI } from "../../customHooks/useCallAPI";
import Loading from "../../components/Loading";
import MainScreen from "../../components/MainScreen/MainScreen";
import { capitalize, priorityFileds, statusFields } from "../../constant";
import TaskStatus from "./TaskStatus";

import "./CreateTask.css"


const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [priority,setPriority] = useState("");
  const [date, setDate] = useState(new Date());
  
  const navigate = useNavigate();

  const {loading,error,createPostTaskAPI} = useCallAPI();

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !content || !category || !status) return;
    createPostTaskAPI(title, content, category, status,priority, date,date);
    resetHandler();
    navigate("/mytasks"); 
  };

  const handleStatusChange = (status) => {
    setStatus(status);
  };

  const handlePriorityChange = (priority) => {
    setPriority(priority);
  };

  return (
    <MainScreen title="Create a Task">
      <Card>
        <Card.Header>Create a new Task</Card.Header>
        <Card.Body>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading size={50} />}
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the content"
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="content">
                 {content && (
                    <Card>
                    <Card.Header>Note Preview</Card.Header>
                    <Card.Body>
                      <ReactMarkdown>{content}</ReactMarkdown>
                    </Card.Body>
                  </Card>
                )}

             </Form.Group>
            <Form.Group className="mb-3" controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <div style={{display:"flex"}} className="mb-3">
                <div className="flex w-50">
                   <TaskStatus title="Status" statusAndPrioriryFields={statusFields} handleChange={handleStatusChange} />
                   <span className="p-2">{capitalize(status)}</span>
                </div>
                <div className="flex w-50">
                <TaskStatus title="Priority"  statusAndPrioriryFields={priorityFileds} handleChange={handlePriorityChange} />
                 <span className="p-2">{capitalize(priority)}</span>
                </div>
            </div>
            <Formik
              initialValues={{ date: new Date() }}
              onSubmit={(values) => {
                setDate(values.date);
              }}
            >
              {(props) => (
                <div className="form-group">
                  <MyDatePicker name="date" setDate={setDate} />
                </div>
              )}
            </Formik>

            <Button type="submit" variant="primary">
              Create Note
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
};

export default CreateTask;
