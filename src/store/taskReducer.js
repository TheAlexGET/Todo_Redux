const defaultState = {
  tasks: [
    { id: 1699274947619, title: "test3", body: "test_body", isDone: false},
    { id: 1699274947618, title: "test2", body: "test_body", isDone: false},
  ],
};

const ADD = "ADD";
const SORT_BY_DATE = "SORT_BY_DATE";
const REMOVE = "REMOVE";
const CHANGE_STATUS = "CHANGE_STATUS";
const SORT_BY_STATUS = "SORT_BY_STATUS";

export const taskReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case SORT_BY_DATE:
      let sortedTasks = [...state.tasks];
      for (let i = 0; i < sortedTasks.length - 1; i++) {
        for (let j = 0; j < sortedTasks.length - 1; j++) {
          if (sortedTasks[j + 1].id < sortedTasks[j].id) {
            let tmp = sortedTasks[j];
            sortedTasks[j] = sortedTasks[j + 1];
            sortedTasks[j + 1] = tmp;
          }
        }
      }
      return { ...state, tasks: [...sortedTasks] };
    case SORT_BY_STATUS:
      let statusSortedTasks = [...state.tasks];
      for (let i = 0; i < statusSortedTasks.length - 1; i++) {
        for (let j = 0; j < statusSortedTasks.length - 1; j++) {
          if (statusSortedTasks[i].isDone) {
            let tmp = statusSortedTasks[i];
            statusSortedTasks.splice(i, 1);
            statusSortedTasks.push(tmp);
          }
        }
      }
      return { ...state, tasks: [...statusSortedTasks] };
    case REMOVE:
      return {
        ...state,
        tasks: [...state.tasks.filter((task) => task.id !== action.payload)],
      };
    case CHANGE_STATUS:
      let newTasks = [...state.tasks];
      newTasks.forEach((task) => {
        if (task.id === action.payload) {
          task.isDone = !task.isDone;
        }
      });
      return { ...state, tasks: [...newTasks] };
    default:
      return state;
  }
};

export const addTaskAction = (payload) => ({ type: "ADD", payload });
export const sortByDateAction = () => ({ type: "SORT_BY_DATE" });
export const sortByStatusAction = () => ({ type: "SORT_BY_STATUS" });
export const removeTaskAction = (payload) => ({ type: "REMOVE", payload });
export const changeStatusAction = (payload) => ({
  type: "CHANGE_STATUS",
  payload,
});
