import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addTaskAction, removeTaskAction, sortByDateAction, sortByStatusAction } from "../store/taskReducer";

const PostTasks = ({ tasks }) => {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.sort.sort)
  const stateTasks = useSelector((state) => state.tasks.tasks)

  const changeTask = (index) => {
    let newTasks = [...stateTasks]
    console.log(newTasks[index])
    const newTitle = prompt('New Title', newTasks[index].title)
    const newBody = prompt('New Description', newTasks[index].body)
    
    let task = {...newTasks[index], title: newTitle, body: newBody}
    dispatch(removeTaskAction(task.id))
    dispatch(addTaskAction(task))
    if(sort === 'date'){
      dispatch(sortByDateAction())
    }
    else if(sort === 'status'){
      dispatch(sortByStatusAction())
    }
  }
  return (
    <div>
      {tasks.map((task, index) => (
        <div key={task.id} className={task.status ? "task" : "task_done"}>
            <input type="checkbox" name="status" className="status_btn" onClick={() =>{
                dispatch({ type: "CHANGE_STATUS", payload: task.id });
                if(sort === 'date'){
                  setTimeout(() => dispatch(sortByDateAction()), 300)
                }
                else if(sort === 'status'){
                  setTimeout(()=>dispatch(sortByStatusAction()), 300)
                }
            }     
                  }/>
          <div className="task__panel">
              <div className="task__panel__text">
                <div>
                  {index + 1}. {task.title}
                </div>
                <div>{task.body}</div>
              </div>
              <div className="buttons">
                <Button
                  variant="secondary"
                  onClick={() => changeTask(index)}
                >Change</Button>
                <Button
                  variant="danger"
                  size="md"
                  onClick={() => dispatch({ type: "REMOVE", payload: task.id })}
                >
                  Delete
                </Button>
              </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default PostTasks;
