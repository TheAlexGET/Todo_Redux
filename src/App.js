import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import {Badge, Button, Modal} from 'react-bootstrap'
import PostTasks from './components/PostTasks';
import { addMultipleAction, removeTaskAction, sortByDateAction, sortByStatusAction } from './store/taskReducer';
import MyModal from './components/MyModal';
import { useEffect, useState } from 'react';
import { changeModalAction } from './store/modalReducer';
import MySelect from './components/MySelect';
import {setSortAction} from './store/sortReducer';
function App() {
  const dispatch = useDispatch()
  const tasks = useSelector((state) => state.tasks.tasks)
  const modal = useSelector((state) => state.modal.modal)

  useEffect(() =>{
    dispatch(sortByDateAction())
  }, [])

  const sortTasks = (sort) => {
    if(sort === 'date'){
      dispatch(sortByDateAction())
    }
    else if(sort === 'status'){
      dispatch(sortByStatusAction())
    }
    dispatch(setSortAction(sort))
  }

  return (
    <div className="App">
      <h1 style={{color:'white'}}>TODO</h1>
      <div className="modal__btn"><Button onClick={()=>dispatch(changeModalAction(true))}>Open Modal</Button></div>
      <MySelect 
      tasks={tasks}
      onChange={sortTasks}
      defaultValue={'Filter'}
      options={[
        {name: 'date', value: 'date'},
        {name: 'status', value: 'status'},
      ]}
      ></MySelect>
      <MyModal show={modal}></MyModal>
      {tasks.length > 0
      ?<PostTasks tasks={tasks}></PostTasks>
      :<h1>No Tasks</h1>
      }
    </div>
  );
}

export default App;
