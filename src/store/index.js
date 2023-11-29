import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import { taskReducer } from "./taskReducer";
import { composeWithDevTools } from "@redux-devtools/extension";
import { modalReducer } from "./modalReducer";
import { sortReducer } from "./sortReducer";

const rootReducer = combineReducers({
    tasks: taskReducer,
    modal: modalReducer,
    sort: sortReducer,
})


export const store = createStore(rootReducer, composeWithDevTools())
