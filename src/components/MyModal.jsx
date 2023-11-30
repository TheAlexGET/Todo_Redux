import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { changeModalAction } from "../store/modalReducer";
import { useDispatch, useSelector } from "react-redux";
import { addTaskAction, sortByDateAction, sortByStatusAction } from "../store/taskReducer";
import { setSortAction } from "../store/sortReducer";

const MyModal = ({ show }) => {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.sort.sort);
  const [post, setPost] = useState({ title: "", body: "", status: true });
  const [shake, setShake] = useState(false);

  const startShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const addPost = (post) => {
    dispatch(addTaskAction(post));
    setPost({ title: "", body: "", status: true });
    dispatch(changeModalAction(false));
  };
  return (
    <div>
      <Modal
        className={shake ? "shake" : ""}
        size="lg"
        show={show}
        onHide={() => dispatch(changeModalAction(false))}
      >
        <Modal.Header closeButton>
          <h1 style={{ color: "black" }}>Make a Task</h1>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Post Name</Form.Label>
              <Form.Control
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                type="text"
                placeholder="Name"
                required
                autoFocus
              />
              <Form.Control.Feedback>Insert Title</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Post Description</Form.Label>
              <Form.Control
                value={post.body}
                onChange={(e) => setPost({ ...post, body: e.target.value })}
                type="text"
                placeholder="Description"
              />
            </Form.Group>
            <Form.Group className="sm">
              <Form.Label>Post Status</Form.Label>
              <Form.Check
                checked={post.status}
                onChange={(e) => setPost({ ...post, status: e.target.checked })}
                type="checkbox"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => dispatch(changeModalAction(false))}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={
              post.title !== ""
                ? () => {
                    addPost({ ...post, id: Date.now() });
                    if(sort === 'date'){
                      dispatch(sortByDateAction())
                    }
                    else if(sort === 'status'){
                      dispatch(sortByStatusAction())
                    }
                  }
                : () => startShake()
            }
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyModal;
